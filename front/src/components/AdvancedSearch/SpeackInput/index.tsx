import React, { useEffect, useState } from "react";
import { MdMic, MdMicOff } from "react-icons/md";

interface Speak {
  setSearch: Function;
  setIsFocused: Function;
}

const SpeackInput: React.FC<Speak> = (Props:Speak) => {
  const [recognition, setRecognition] = useState<any | null>(null);
  const [listening, setListening] = useState<boolean>(false);
  const isFirefox:boolean = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;

  useEffect(() => {
    if (isFirefox) {
      return; // exit the effect if the browser is Firefox
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = "fr-FR";
    recognitionInstance.interimResults = true;
    recognitionInstance.maxAlternatives = 1;

    recognitionInstance.onresult = (event: any) => {
      const last:number = event.results.length - 1;
      const transcript = event.results[last][0].transcript;
      Props.setSearch(transcript);
    };

    recognitionInstance.onsoundend = () => {
      setListening(false);
      Props.setIsFocused(false);
      recognitionInstance.stop();
    };

    setRecognition(recognitionInstance);
  }, [Props, isFirefox]); // adding dependencies here

  const startListening = () => {
    if (isFirefox) {
      return; // prevent listening if the browser is Firefox
    }
    Props.setIsFocused(true);

    if (recognition) {
      setListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      setListening(false);
      Props.setIsFocused(false);
      recognition.stop();
    }
  };

  return (
    <div
      style={{
        marginTop: "1px",
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
