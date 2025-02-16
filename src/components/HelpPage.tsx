import React, { useState, useEffect } from "react";
import DropDown from "./DropDown";
import { EngToTelService } from "../services/engToTelugu";
import LanguageSelector from "./LanguageSelector";

const HelpPage = () => {
  const [inLang, setInLang] = useState("telugu");
  const [outLang, setOutLang] = useState("telugu");
  const [outText, setOutText] = useState("");

  const [scriptLoaded, setScriptLoaded] = useState(false);

  let ett: EngToTelService = new EngToTelService();

  const onSelectInLanguage = (value: string) => {
    setInLang(value);
  };
  const onSelectOutLanguage = (value: string) => {
    setOutLang(value);
  };

  const onConvert = () => {
    if (window.Sanscript && window.Sanscript.t) {
      // Example function call (adjust based on what functions are available)
      const textArea = document.getElementById(
        "textArea1"
      ) as HTMLTextAreaElement;
      if (textArea) {
        let inputText = textArea.value;
        let inLangCopy = inLang;
        if (inLang == "english") {
          inLangCopy = "kolkata";
          inputText = ett.getStringInTranscript(inputText);
        }
        let outLangCopy = outLang;
        if (outLang == "english") {
          outLangCopy = "kolkata";
        }
        let result = window.Sanscript.t(inputText, inLangCopy, outLangCopy);
        if (outLang == "english") {
          result = ett.getStringInLekhini(result);
          result = result
            .replaceAll("ṛ", "R")
            .replaceAll("ḍ", "D")
            .replaceAll("ḻ", "L")
            .replaceAll("ఱ", "~ra");
        }
        setOutText(result);
      }
    } else {
      setOutText("Got error while conversion...");
    }
  };

  return (
    <>
      <div className="w3-col m4 l4 w3-mobile" style={{ padding: "10px;" }}>
        <div>
          <div className="row">
            <div className="col-8">
              <div>
                <LanguageSelector
                  OnSelectChange={onSelectInLanguage}
                ></LanguageSelector>

                <textarea
                  rows={8}
                  cols={0}
                  id="textArea1"
                  spellCheck="false"
                  autoCorrect="off"
                  autoCapitalize="off"
                  placeholder="Add text"
                  style={{ width: "100%", marginTop: "10px" }}
                  className="div-telugugen fontup"
                ></textarea>
              </div>

              <div>
                <div className="row">
                  <div className="col-6">
                    <LanguageSelector
                      OnSelectChange={onSelectOutLanguage}
                    ></LanguageSelector>
                  </div>
                  <div className="col-6">
                    <label className={"btn btn-secondary"} onClick={onConvert}>
                      Convert
                    </label>
                  </div>
                </div>

                <textarea
                  rows={8}
                  cols={0}
                  id="textArea2"
                  spellCheck="false"
                  autoCorrect="off"
                  autoCapitalize="off"
                  placeholder="Add text"
                  style={{ width: "100%", marginTop: "10px" }}
                  className="div-telugugen fontup"
                  value={outText}
                >
                  raamuDu
                </textarea>
              </div>
            </div>
            <div
              className="col-4 div-telugugen fontup"
              style={{ backgroundColor: "lightpink" }}
            >
              <table className="help-board">
                <tbody>
                  <tr>
                    <td>
                      <div className="btext">అ</div>
                      <div className="stext">a</div>
                    </td>
                    <td>
                      <div className="btext">ఆ</div>
                      <div className="stext">A,aa</div>
                    </td>
                    <td>
                      <div className="btext">ఇ</div>
                      <div className="stext">i</div>
                    </td>
                    <td>
                      <div className="btext">ఈ</div>
                      <div className="stext">I,ii,ee</div>
                    </td>
                    <td>
                      <div className="btext">ఉ</div>
                      <div className="stext">u</div>
                    </td>
                    <td>
                      <div className="btext">ఊ</div>
                      <div className="stext">U,uu,oo</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="btext">ఋ</div>
                      <div className="stext">R</div>
                    </td>
                    <td>
                      <div className="btext">ౠ</div>
                      <div className="stext">F,Ru</div>
                    </td>
                    <td>
                      <div className="btext">ఌ</div>
                      <div className="stext">z</div>
                    </td>
                    <td>
                      <div className="btext">ౡ</div>
                      <div className="stext">Z,zu</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="btext">ఎ</div>
                      <div className="stext">e</div>
                    </td>
                    <td>
                      <div className="btext">ఏ</div>
                      <div className="stext">E,ea</div>
                    </td>
                    <td>
                      <div className="btext">ఐ</div>
                      <div className="stext">Y,ai</div>
                    </td>
                    <td>
                      <div className="btext">ఒ</div>
                      <div className="stext">o</div>
                    </td>
                    <td>
                      <div className="btext">ఓ</div>
                      <div className="stext">O,oe</div>
                    </td>
                    <td>
                      <div className="btext">ఔ</div>
                      <div className="stext">W,au,ou</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="btext">అం</div>
                      <div className="stext">aM</div>
                    </td>
                    <td>
                      <div className="btext">అఁ</div>
                      <div className="stext">ax</div>
                    </td>
                    <td>
                      <div className="btext">అః</div>
                      <div className="stext">a@h</div>
                    </td>
                    <td>
                      <div className="btext">అఽ</div>
                      <div className="stext">aX</div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="help-board">
                <tbody>
                  <tr>
                    <td>
                      <div className="btext">క</div>
                      <div className="stext">k</div>
                    </td>
                    <td>
                      <div className="btext">ఖ</div>
                      <div className="stext">K,kh</div>
                    </td>
                    <td>
                      <div className="btext">గ</div>
                      <div className="stext">g</div>
                    </td>
                    <td>
                      <div className="btext">ఘ</div>
                      <div className="stext">G,gh</div>
                    </td>
                    <td>
                      <div className="btext">ఙ</div>
                      <div className="stext">~m</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="btext">చ</div>
                      <div className="stext">c,ch</div>
                    </td>
                    <td>
                      <div className="btext">ౘ</div>
                      <div className="stext">~c</div>
                    </td>
                    <td>
                      <div className="btext">ఛ</div>
                      <div className="stext">C,Ch</div>
                    </td>
                    <td>
                      <div className="btext">జ</div>
                      <div className="stext">j</div>
                    </td>
                    <td>
                      <div className="btext">ౙ</div>
                      <div className="stext">~j</div>
                    </td>
                    <td>
                      <div className="btext">ఝ</div>
                      <div className="stext">J</div>
                    </td>
                    <td>
                      <div className="btext">ఞ</div>
                      <div className="stext">~n</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="btext">ట</div>
                      <div className="stext">T</div>
                    </td>
                    <td>
                      <div className="btext">ఠ</div>
                      <div className="stext">Th</div>
                    </td>
                    <td>
                      <div className="btext">డ</div>
                      <div className="stext">D</div>
                    </td>
                    <td>
                      <div className="btext">ఢ</div>
                      <div className="stext">Dh</div>
                    </td>
                    <td>
                      <div className="btext">ణ</div>
                      <div className="stext">N</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="btext">త</div>
                      <div className="stext">t</div>
                    </td>
                    <td>
                      <div className="btext">థ</div>
                      <div className="stext">th</div>
                    </td>
                    <td>
                      <div className="btext">ద</div>
                      <div className="stext">d</div>
                    </td>
                    <td>
                      <div className="btext">ధ</div>
                      <div className="stext">dh</div>
                    </td>
                    <td>
                      <div className="btext">న</div>
                      <div className="stext">n</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="btext">ప</div>
                      <div className="stext">p</div>
                    </td>
                    <td>
                      <div className="btext">ఫ</div>
                      <div className="stext">P,f,ph</div>
                    </td>
                    <td>
                      <div className="btext">బ</div>
                      <div className="stext">b</div>
                    </td>
                    <td>
                      <div className="btext">భ</div>
                      <div className="stext">B,bh</div>
                    </td>
                    <td>
                      <div className="btext">మ</div>
                      <div className="stext">m</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="btext">య</div>
                      <div className="stext">y</div>
                    </td>
                    <td>
                      <div className="btext">ర</div>
                      <div className="stext">r</div>
                    </td>
                    <td>
                      <div className="btext">ల</div>
                      <div className="stext">l</div>
                    </td>
                    <td>
                      <div className="btext">వ</div>
                      <div className="stext">v,w</div>
                    </td>
                    <td>
                      <div className="btext">శ</div>
                      <div className="stext">S</div>
                    </td>
                    <td>
                      <div className="btext">ష</div>
                      <div className="stext">sh</div>
                    </td>
                    <td>
                      <div className="btext">స</div>
                      <div className="stext">s</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="btext">హ</div>
                      <div className="stext">H</div>
                    </td>
                    <td>
                      <div className="btext">ళ</div>
                      <div className="stext">L,lh</div>
                    </td>
                    <td>
                      <div className="btext">క్ష</div>
                      <div className="stext">ksh</div>
                    </td>
                    <td>
                      <div className="btext">ఱ</div>
                      <div className="stext">~r</div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="help-board">
                <tbody>
                  <tr>
                    <td>
                      <div className="btext">్</div>
                      <div className="stext">
                        పొల్లు
                        <br />^
                      </div>
                    </td>
                    <td>
                      <div className="btext">॒</div>
                      <div className="stext">
                        అనుదాత్తము
                        <br />q
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="help-board">
                <tbody>
                  <tr>
                    <td>
                      <div className="btext"> ॑</div>
                      <div className="stext">
                        స్వరితము
                        <br />Q
                      </div>
                    </td>
                    <td>
                      <div className="btext"> ᳚</div>
                      <div className="stext">
                        దీర్ఘస్వరితము
                        <br />V
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpPage;
