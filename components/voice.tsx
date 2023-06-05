import { useState } from "react";

export default function MicrophoneButton() {
    const [isRecording, setIsRecording] = useState(false);

const transcribe = async () => {
  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = () => {
    setIsRecording(true);
  };

  recognition.onend = () => {
    setIsRecording(false);
  };

  recognition.onresult = async (event:any) => {
    const interimTranscript = [];
    const finalTranscript = [];

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript.push(transcript);
      } else {
        interimTranscript.push(transcript);
      }
    }

    const transcript = finalTranscript.join("");
    console.log("Transcript:", transcript);
    // Send transcript to Google Cloud Speech-to-Text API
  };

  recognition.onerror = (event:any) => {
    console.error("Recognition error:", event.error);
    setIsRecording(false);
  };

  recognition.start();
};


  return (
    <button
  className={`w-12 h-12 bg-red-500 text-white font-bold rounded-full focus:outline-none
    ${isRecording ? "animate-pulse" : ""}`}
  onClick={transcribe}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 m-auto"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15l5 5m0 0l-5-5m5 5V9a7 7 0 00-14 0v6a7 7 0 0014 0z"
    />
  </svg>
</button>

  );
}
