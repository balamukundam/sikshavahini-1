import React from "react";
import { BmkLanguage, BmkLanguages } from "../services/dataTypes";

interface Props {
  lang: BmkLanguage;
}

const languageHeaderData: Record<
  BmkLanguage,
  {
    titleName: string;
    subTitleName: string;
    leftImage: string;
    rightImage: string;
  }
> = {
  telugu: {
    titleName: "బాల ముకుందము",
    subTitleName: "శిక్షావాహిని",
    leftImage: "Bpic-2.png",
    rightImage: "BalamukundamKids.png",
  },
  devanagari: {
    titleName: "बालमुकुन्दम्‌",
    subTitleName: "शिक्षावाहिनी",
    leftImage: "Bpic-san.png",
    rightImage: "BalamukundamKids.png",
  },
};

const getLanguageHeaderData = (lang: BmkLanguage) => {
  return languageHeaderData[lang];
};

const Navbar = (props: Props) => {
  return (
    <div>
      <div className="row">
        <div className="col-3 m3 l2">
          <img
            alt="Alps"
            style={{ width: "150px", height: "auto" }}
            src={
              "./src/static/images/" +
              getLanguageHeaderData(props.lang).leftImage
            }
          />
        </div>

        <div
          className="col-6 m6 l8 text-center"
          style={{ placeItems: "center" }}
        >
          <div>
            <div className={"div-" + props.lang + "gen fontup3"}>
              {getLanguageHeaderData(props.lang).titleName}
            </div>
            <div className={"div-" + props.lang + "gen fontup2"}>
              {getLanguageHeaderData(props.lang).subTitleName}
            </div>
          </div>
        </div>

        <div className="col-3 m3 l2">
          <img
            alt="Alps"
            style={{ width: "auto", height: "150px", float: "right" }}
            src={
              "./src/static/images/" +
              getLanguageHeaderData(props.lang).rightImage
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
