import React from "react";
import DropDown from "./DropDown";
import JsonFilePicker from "./JsonFilePicker";

interface Props {
  onSelectLanguage: (item: string) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDownload: () => void;
}

const NavMenu = ({
  onSelectLanguage,
  handleFileChange,
  handleDownload,
}: Props) => {
  return (
    <nav
      className="navbar navbar-expand-lg bg-primary"
      data-bs-theme="dark"
      style={{ marginBottom: "25px" }}
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item dropdown" style={{ paddingLeft: "10px" }}>
              <DropDown
                items={["Telugu", "Sanskrit"]}
                heading="Language"
                onSelectItem={onSelectLanguage}
              ></DropDown>
            </li>

            <li className="nav-item" style={{ paddingLeft: "10px" }}>
              <JsonFilePicker
                handleFileChange={handleFileChange}
              ></JsonFilePicker>
            </li>
            <li className="nav-item" style={{ paddingLeft: "10px" }}>
              <label className="btn btn-secondary" onClick={handleDownload}>
                Download
              </label>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
