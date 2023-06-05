import React, { useState, useEffect } from 'react';

const SpeechRecognition = () => {
    const [transcript, setTranscript] = useState<any>('');
    const [isListening, setIsListening] = useState<any>(false);
    let recognition = new window.webkitSpeechRecognition();;
    useEffect(() => {
        if (isListening) {
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onresult = (event: SpeechRecognitionEvent) => {
                let interimTranscript = '';
                let finalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;

                    if (event.results[i].isFinal) {
                        finalTranscript += transcript + ' ';
                    } else {
                        interimTranscript += transcript;
                    }
                }
                setTranscript(finalTranscript);
            };

            recognition.start();
        }

        return () => {
            if (recognition) {
                recognition.stop();
            }
        };
    }, [isListening]);

    const handleStart = () => {
        setIsListening(true);
    };

    const handleStop = () => {
        setIsListening(false);
    };

    return (
        <div>
            <p>{transcript}</p>
            {!isListening ? (
                <button onClick={handleStart}>Start</button>
            ) : (
                <button onClick={handleStop}>Stop</button>
            )}
        </div>
    );
};

export default SpeechRecognition;
