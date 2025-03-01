import React, { useEffect, useId, useState } from "react";
import { EngToTelService } from "../services/engToTelugu";
import PToolTip from "./PToolTip";

interface Props {
  multiQuestComp: any;
  curLang: string;
  updateDisctionary: (str: string, sentence: string) => void;
}

const PreviewMultipleQuestionComp = ({
  multiQuestComp,
  curLang,
  updateDisctionary,
}: Props) => {
  let ett: EngToTelService = new EngToTelService();

  const [selected, setSelected] = useState<number | null>(null);
  const [shuffledAnswers, setShuffledAnswers] = useState<number[]>([]);
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const shuffleArray = (array: string[]): number[] => {
    const indexArray = [...Array(array.length).keys()];

    let shuffled = [...indexArray]; // Create a copy to avoid mutating original array
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled;
  };

  const createDictionary = (str: string) => {
    updateDisctionary(str, "");
  };

  const uniqueRadioName = useId();

  // Shuffle only once when component mounts
  useEffect(() => {
    console.log("Question Changed:", multiQuestComp);
    setShuffledAnswers(shuffleArray([...multiQuestComp["choices"]]));
  }, [multiQuestComp]);

  const optionChanged = (e: any) => {
    setSelected(Number(e.target.value));
    setCheckAnswer(true);
    setShowAnswer(false);
  };

  const onCheckAnswer = () => {
    setCheckAnswer(false);
    setShowAnswer(true);
  };

  return (
    <div className="wrapper" style={{ textAlign: "justify" }}>
      {multiQuestComp["lines"].map((line: any) => (
        <p className="card-text">
          <PToolTip
            textToShow={line}
            curLang={curLang}
            handleClick={createDictionary}
          ></PToolTip>
        </p>
      ))}

      <div className="container mt-3">
        <div className="form-check">
          {shuffledAnswers.map((option: number, index: number) => (
            <div key={index} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={uniqueRadioName}
                id={`radio${uniqueRadioName}${index}`}
                value={option}
                checked={selected === option}
                onChange={optionChanged}
              />
              <label className="form-check-label" htmlFor={`radio${index}`}>
                <PToolTip
                  textToShow={multiQuestComp["choices"][option]}
                  curLang={curLang}
                  handleClick={createDictionary}
                ></PToolTip>
              </label>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          {checkAnswer && (
            <button
              className={"btn btn-primary"}
              onClick={onCheckAnswer}
              style={{ fontSize: "1.5vw" }}
            >
              Check Answer
            </button>
          )}
          {showAnswer && (
            <p>
              {selected === 0 ? (
                <span style={{ color: "green" }}>✔ Right Answer</span>
              ) : (
                <span style={{ color: "red" }}>✖ Wrong Answer</span>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewMultipleQuestionComp;
