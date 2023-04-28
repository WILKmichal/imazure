import React, { useState, useEffect } from "react";
import { MdMic, MdMicOff } from "react-icons/md";

interface Speak {
  setSearch: any;
}
const SpeackInput: React.FC<Speak> = (Props) => {
  // const [transcription, setTranscription] = useState<string>("");
  const [recognition, setRecognition] = useState<any | null>(null);
  const [listening, setListening] = useState<boolean>(false);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = "fr-FR";
    recognitionInstance.interimResults = true;
    recognitionInstance.maxAlternatives = 1;

    recognitionInstance.onresult = (event: any) => {
      const last = event.results.length - 1;
      const transcript = event.results[last][0].transcript;
      // setTranscription(transcript);
      Props.setSearch(transcript);
    };

    recognitionInstance.onsoundend = () => {
      setListening(false);
      recognitionInstance.stop();
    };

    setRecognition(recognitionInstance);
  }, []);

  const startListening = () => {
    if (recognition) {
      setListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      setListening(false);
      recognition.stop();
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "red",
        borderRadius: "30px",
        height: "25px",
        width: "25px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!listening ? (
        <MdMic style={{ cursor: "pointer" }} onClick={startListening} />
      ) : (
        <MdMicOff style={{ cursor: "pointer" }} onClick={stopListening} />
      )}
    </div>
  );
};

export default SpeackInput;
