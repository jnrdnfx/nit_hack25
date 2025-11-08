# FakeCheck - AI Fact Checker

A fact-checking application powered by Google Gemini AI that analyzes URLs, text, and images for credibility.

## Features

- **Multi-Input Support**: Analyze URLs, text snippets, or images
- **AI-Powered Analysis**: Uses Google Gemini 2.5 Flash for fact-checking
- **Source Verification**: Automatically finds and displays related sources
- **Credibility Scoring**: Provides detailed credibility assessments

## Setup Instructions

### 1. Install Frontend Dependencies

```bash
npm install
```

### 2. Setup Backend Server

Navigate to the server directory:

```bash
cd server
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `server` directory:

```env
API_KEY=your_google_gemini_api_key_here
PORT=5001
```

Get your API key from: https://makersuite.google.com/app/apikey

### 4. Start the Backend Server

In the `server` directory:

```bash
npm start
# or for development with auto-reload:
npm run dev
```

The server will run on `http://localhost:5001`

### 5. Start the Frontend

In the root directory:

```bash
npm run dev
```

## Project Structure

```
nit_hack25-temp/
├── server/              # Backend Express server with Gemini AI
│   ├── index.js        # Server entry point
│   └── package.json    # Backend dependencies
├── src/
│   ├── components/
│   │   ├── RightPanel.jsx  # AI analysis input panel
│   │   └── ResultPane.jsx  # Results display
│   └── services/
│       └── api.js      # API service (connects to backend)
└── package.json        # Frontend dependencies
```

## Usage

1. Start both the backend server and frontend application
2. Navigate to the home page
3. Use the right panel to:
   - Select input type (URL, Text, or Image)
   - Enter your content
   - Click "Verify" to analyze
4. View the credibility assessment and key points

## Technology Stack

- **Frontend**: React, Vite, Framer Motion
- **Backend**: Express.js, Google Gemini AI
- **AI Model**: Gemini 2.5 Flash with Google Search grounding
