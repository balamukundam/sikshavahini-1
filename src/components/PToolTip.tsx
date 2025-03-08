import React from "react";
import { EngToTelService } from "../services/engToTelugu";

interface Props {
  textToShow: string;
  curLang: string;
  handleClick: (str: string, sentence: string) => void;
}

const PToolTip = ({ textToShow, curLang, handleClick }: Props) => {
  let ett: EngToTelService = new EngToTelService();
  let bConvert = false;

  const getConvert = () => {
    bConvert = !bConvert;
    return bConvert;
  };

  const getSplitSenteces = (para: string, splChar: string): string[] => {
    let sentences: string[] = para.split(splChar);
    const lastChar = para.slice(-1);
    sentences = sentences.map((item, index) => {
      if (index < sentences.length - 1) {
        return item + splChar;
      } else {
        if (item == "") return item;
        if (lastChar === splChar) {
          return item + splChar;
        }
        return item;
      }
    });

    return sentences;
  };

  return (
    <>
      {textToShow.split("`").map((words) =>
        getConvert() ? (
          getSplitSenteces(words, "।").map((sentence1) =>
            getSplitSenteces(sentence1, ".").map((sentence2) =>
              sentence2.split(" ").map((item, index) => (
                <a
                  key={index}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={`${ett.getStringInUserLanguage(
                    "transcription",
                    item
                  )}`}
                  onClick={() => handleClick(item, sentence2)}
                >
                  {ett.getStringInUserLanguage(curLang, item) + " "}
                </a>
              ))
            )
          )
        ) : (
          <a style={{ color: "red" }}>{words}</a>
        )
      )}
    </>
  );
};

export default PToolTip;
