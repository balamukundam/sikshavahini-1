import React from "react";
import { EngToTelService } from "../services/engToTelugu";

interface Props {
  imageComp: any;
  curLang: string;
}

const PreviewImageComponent = ({ imageComp, curLang }: Props) => {
  let ett: EngToTelService = new EngToTelService();
  return (
    <div>
      <img
        src={imageComp["image"]}
        alt="Sample Image"
        width={"100%"}
        style={{
          margin: "0 15px 15px 0",
          aspectRatio: "1 / 1",
        }}
      />
      {imageComp["title"] !== "" && (
        <p className="text-center">
          {ett.getStringInUserLanguage(curLang, imageComp["title"])}
        </p>
      )}
    </div>
  );
};

export default PreviewImageComponent;
