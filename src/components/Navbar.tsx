import React from "react";

interface Props {
  leftImage: string;
  rightImage: string;
  titleName: string;
  subTitleName: string;
  lang: string;
}

const Navbar = (props: Props) => {
  return (
    <div>
      <div className="row">
        <div className="col-3 m3 l2">
          <img
            alt="Alps"
            style={{ width: "150px", height: "auto" }}
            src={"./src/static/images/" + props.leftImage}
          />
        </div>

        <div
          className="col-6 m6 l8 text-center"
          style={{ placeItems: "center" }}
        >
          <div>
            <div className={"div-" + props.lang + "gen fontup3"}>
              {props.titleName}
            </div>
            <div className={"div-" + props.lang + "gen fontup2"}>
              {props.subTitleName}
            </div>
          </div>
        </div>

        <div className="col-3 m3 l2">
          <img
            alt="Alps"
            style={{ width: "auto", height: "150px", float: "right" }}
            src={"./src/static/images/" + props.rightImage}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
