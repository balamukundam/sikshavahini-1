import React, { useState } from "react";
import { EngToTelService } from "../services/engToTelugu";
import PToolTip from "./PToolTip";

interface Props {
  paraComp: any;
  curLang: string;
  orderType: number; //0 normal, 1 bullet, 2 ordered
  updateDisctionary: (str: string, sentence: string) => void;
}

const PreviewParaComponent = ({
  paraComp,
  curLang,
  orderType,
  updateDisctionary,
}: Props) => {
  let ett: EngToTelService = new EngToTelService();
  const [isSpeaking, setIsSpeaking] = useState(false);
  let utterance = new SpeechSynthesisUtterance(
    ett.getStringInTelugu(paraComp["lines"].join())
  );
  utterance.lang = "te";
  utterance.rate = 0.85;

  const speakText = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel(); // Stop any ongoing speech
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);

      utterance.onend = () => setIsSpeaking(false); // Reset state when finished
    } else {
      alert("Your browser does not support text-to-speech.");
    }
  };

  const stopSpeech = () => {
    speechSynthesis.cancel(); // Stop speech
    setIsSpeaking(false);
  };

  const createDictionary = (str: string) => {
    updateDisctionary(str, "");
  };

  let margin =
    paraComp["floatDirection"] === "left" ? "0 15px 15px 0" : "0 0 15px 15px";
  return (
    <div className="wrapper" style={{ textAlign: "justify" }}>
      {paraComp["image"] && (
        <img
          src={paraComp["image"]}
          alt="Sample Image"
          width={paraComp["imageWidth"]}
          style={{
            float: paraComp["floatDirection"],
            margin: margin,
            height: "auto",
          }}
        />
      )}
      {orderType === 0 &&
        paraComp["lines"].map((line: any) => (
          <p className="card-text">
            <PToolTip
              textToShow={line}
              curLang={curLang}
              handleClick={createDictionary}
            ></PToolTip>
          </p>
        ))}

      {orderType === 1 && (
        <ol style={{ listStyleType: "decimal-leading-zero;" }}>
          {paraComp["lines"].map((line: any) => (
            <li>
              <PToolTip
                textToShow={line}
                curLang={curLang}
                handleClick={createDictionary}
              ></PToolTip>
            </li>
          ))}
        </ol>
      )}

      {orderType === 2 && (
        <ul style={{ listStyleType: "decimal-leading-zero;" }}>
          {paraComp["lines"].map((line: any) => (
            <li>
              <PToolTip
                textToShow={line}
                curLang={curLang}
                handleClick={createDictionary}
              ></PToolTip>
            </li>
          ))}
        </ul>
      )}

      <button onClick={speakText} className="btn btn-primary">
        🔊 Speak
      </button>
      <button
        onClick={stopSpeech}
        className="btn btn-danger"
        disabled={!isSpeaking}
        style={{ marginLeft: "25px" }}
      >
        ⛔ Stop
      </button>
    </div>
  );
};

export default PreviewParaComponent;
