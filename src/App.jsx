import React from "react";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">FakeCheck</h1>
      <p className="text-gray-700 mb-6 max-w-xl">
        Verify the credibility of news articles instantly using AI-powered analysis.
      </p>
      <input
        type="text"
        placeholder="Paste news URL or text here..."
        className="border border-gray-300 p-3 w-full max-w-md rounded-md mb-4"
      />
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md">
        Verify
      </button>
    </div>
  );
}

export default App;
