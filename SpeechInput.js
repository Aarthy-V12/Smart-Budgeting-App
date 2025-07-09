import React, { useState } from "react";

const SpeechInput = ({ onSubmit }) => {
  const [text, setText] = useState("");

  const handleSpeech = () => {
    const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setText(spokenText);
      onSubmit(spokenText);
    };
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
    recognition.start();
  };

  return (
    <div className="mt-4 flex items-center space-x-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="Speak or type your expense"
      />
      <button
        onClick={handleSpeech}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        🎤 Speak
      </button>
    </div>
  );
};

export default SpeechInput;