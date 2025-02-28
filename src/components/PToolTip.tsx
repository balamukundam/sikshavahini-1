import React from "react";
import { EngToTelService } from "../services/engToTelugu";

interface Props {
  textToShow: string;
  curLang: string;
  handleClick: (str: string) => void;
}

const PToolTip = ({ textToShow, curLang, handleClick }: Props) => {
  let ett: EngToTelService = new EngToTelService();
  let bConvert = false;

  const getConvert = () => {
    bConvert = !bConvert;
    return bConvert;
  };

  return (
    <>
      {textToShow.split("`").map((words) =>
        getConvert() ? (
          words.split(" ").map((item, index) => (
            <a
              key={index}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={`${ett.getStringInUserLanguage("transcription", item)}`}
              onClick={() => handleClick(item)}
            >
              {ett.getStringInUserLanguage(curLang, item) + " "}
            </a>
          ))
        ) : (
          <a style={{ color: "red" }}>{words}</a>
        )
      )}
    </>
  );
};

export default PToolTip;
