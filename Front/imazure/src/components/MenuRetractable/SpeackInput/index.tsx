import React, { useState, useEffect } from "react";

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
      Props.setSearch(transcript)
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
    <div>
      <button onClick={startListening} disabled={listening}>
        Démarrer
      </button>
      <button onClick={stopListening} disabled={!listening}>
        Arrêter
      </button>
    </div>
  );
};

export default SpeackInput;
