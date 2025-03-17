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
  let originalOption = curLang;

  const getConvert = (words: string) => {
    bConvert = !bConvert;
    if (bConvert) {
      if (words.startsWith("#te")) curLang = "telugu";
      if (words.startsWith("#sa")) curLang = "devanagari";
      if (words.startsWith("#de")) curLang = originalOption;
    }
    return bConvert;
  };

  function startsWithPattern(text: string): string {
    if (
      bConvert &&
      (text.startsWith("#te") ||
        text.startsWith("#sa") ||
        text.startsWith("#de"))
    )
      return text.slice(3);
    return text;
  }

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
        getConvert(words) ? (
          getSplitSenteces(startsWithPattern(words), "।").map((sentence1) =>
            getSplitSenteces(sentence1, ".").map((sentence2) =>
              sentence2.split(" ").map((item, index) => (
                <span
                  key={index}
                  className={"div-" + curLang + "gen"}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={`${ett.getStringInUserLanguage(
                    "transcription",
                    item
                  )}`}
                  onClick={() => handleClick(item, sentence2)}
                >
                  {ett.getStringInUserLanguage(curLang, item) + " "}
                </span>
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
