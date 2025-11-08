require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenAI, Type } = require('@google/genai');

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Increase limit for base64 images

// --- Gemini AI Setup ---
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

// --- Schemas & Prompts ---
const imageResponseSchema = {
    type: Type.OBJECT,
    properties: {
        credibility: { type: Type.STRING },
        explanation: { type: Type.STRING },
        keyPoints: { type: Type.ARRAY, items: { type: Type.STRING } }
    },
    required: ["credibility", "explanation", "keyPoints"]
};

const getTextAnalysisPrompt = (content) => `
    Analyze the credibility of the following content. Follow this pipeline:
    1. Identify main claims.
    2. Fact-Check using Google Search.
    3. Synthesize and classify credibility.
    4. Explain and summarize key points.
    Content: "${content}"
    Your response MUST be only a raw JSON object with the structure:
    { "credibility": "...", "explanation": "...", "keyPoints": ["..."] }
`;

const getImageAnalysisPrompt = () => `
    You are a visual misinformation expert. Analyze the image using this pipeline:
    1. Assess key visual elements.
    2. Analyze for digital manipulation or out-of-context usage.
    3. Synthesize and classify credibility.
    4. Explain and summarize findings.
    Return your analysis in the specified JSON format.
`;

// --- API Routes ---

app.post('/api/analyze-text', async (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ message: 'Content is required' });
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: getTextAnalysisPrompt(content),
            config: { tools: [{ googleSearch: {} }] },
        });

        const responseText = response.text.trim();
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const jsonText = jsonMatch ? jsonMatch[0] : responseText;
        const parsedData = JSON.parse(jsonText);

        const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
        const sources = groundingMetadata?.groundingChunks
            ?.map(chunk => chunk.web)
            .filter(web => !!web?.uri && !!web.title) || [];
        
        res.json({ ...parsedData, sources });

    } catch (error) {
        console.error("Error in /api/analyze-text:", error);
        res.status(500).json({ message: 'Failed to analyze content. The model may have returned an invalid format.' });
    }
});

app.post('/api/analyze-image', async (req, res) => {
    const { image: base64Image, mimeType } = req.body;
    if (!base64Image || !mimeType) {
        return res.status(400).json({ message: 'Image data and mimeType are required' });
    }

    try {
        const imagePart = { inlineData: { mimeType: mimeType, data: base64Image } };
        const textPart = { text: getImageAnalysisPrompt() };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: "application/json",
                responseSchema: imageResponseSchema,
            }
        });

        const parsedData = JSON.parse(response.text);
        res.json({ ...parsedData, sources: [] });

    } catch (error) {
        console.error("Error in /api/analyze-image:", error);
        res.status(500).json({ message: 'Failed to analyze image. The model may have returned an unexpected response.' });
    }
});


// --- Server Start ---
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

