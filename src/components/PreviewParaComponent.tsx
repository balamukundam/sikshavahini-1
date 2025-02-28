import React from "react";
import { EngToTelService } from "../services/engToTelugu";
import PToolTip from "./PToolTip";

interface Props {
  paraComp: any;
  curLang: string;
  orderType: number; //0 normal, 1 bullet, 2 ordered
  updateDisctionary: (str: string) => void;
}

const PreviewParaComponent = ({
  paraComp,
  curLang,
  orderType,
  updateDisctionary,
}: Props) => {
  let ett: EngToTelService = new EngToTelService();
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
              handleClick={updateDisctionary}
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
                handleClick={updateDisctionary}
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
                handleClick={updateDisctionary}
              ></PToolTip>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PreviewParaComponent;
