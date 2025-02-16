import React from "react";
import { BmkLanguage, BmkLanguages } from "../services/dataTypes";
import logokids from "/images/BalamukundamKids.png";
import logotelugu from "/images/Bpic-2.png";
import logosanskrit from "/images/Bpic-san.png";

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
    leftImage: logotelugu,
    rightImage: logokids,
  },
  devanagari: {
    titleName: "बालमुकुन्दम्‌",
    subTitleName: "शिक्षावाहिनी",
    leftImage: logosanskrit,
    rightImage: logokids,
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
            data-testid="webpage-left-image"
            alt="Alps"
            style={{ width: "150px", height: "auto" }}
            src={getLanguageHeaderData(props.lang).leftImage}
          />
        </div>

        <div
          className="col-6 m6 l8 text-center"
          style={{ placeItems: "center" }}
        >
          <div>
            <div
              data-testid="webpage-heading"
              className={"div-" + props.lang + "gen fontup3"}
            >
              {getLanguageHeaderData(props.lang).titleName}
            </div>
            <div
              data-testid="webpage-subheading"
              className={"div-" + props.lang + "gen fontup2"}
            >
              {getLanguageHeaderData(props.lang).subTitleName}
            </div>
          </div>
        </div>

        <div className="col-3 m3 l2">
          <img
            data-testid="webpage-right-image"
            alt="Alps"
            style={{ width: "auto", height: "150px", float: "right" }}
            src={getLanguageHeaderData(props.lang).rightImage}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
