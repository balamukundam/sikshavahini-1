import React, { useState } from "react";
import DropDown from "./DropDown";
import JsonFilePicker from "./JsonFilePicker";

interface Props {
  onSelectLanguage: (item: string) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDownload: () => void;
  onSelectScreen: (item: string) => void;
}

const NavMenu = ({
  onSelectLanguage,
  handleFileChange,
  handleDownload,
  onSelectScreen,
}: Props) => {
  const [selectedScreen, setSelectedScreen] = useState("Design");
  const onDesignScreen = () => {
    onSelectScreen("Design");
    setSelectedScreen("Design");
  };
  const onPreviewScreen = () => {
    onSelectScreen("Preview");
    setSelectedScreen("Preview");
  };
  const onHelpScreen = () => {
    onSelectScreen("Help");
    setSelectedScreen("Help");
  };

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
                items={["Default", "Telugu", "Sanskrit"]}
                heading="Language"
                preselectedIndex={-1}
                onSelectItem={onSelectLanguage}
              ></DropDown>
            </li>

            <li className="nav-item dropdown" style={{ paddingLeft: "10px" }}>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Data
                </button>

                <ul className="dropdown-menu">
                  <li className="nav-item">
                    <a className="dropdown-item">
                      <label htmlFor="filePicker">Load JSON File</label>
                      <input
                        className="form-control d-none"
                        type="file"
                        id="filePicker"
                        accept=".json"
                        onChange={handleFileChange}
                      />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="dropdown-item" onClick={handleDownload}>
                      Download
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li className="nav-item" style={{ paddingLeft: "10px" }}>
              <label
                className={
                  "btn btn-" +
                  (selectedScreen == "Design" ? "danger" : "secondary")
                }
                onClick={onDesignScreen}
              >
                Design
              </label>
            </li>
            <li className="nav-item" style={{ paddingLeft: "10px" }}>
              <label
                className={
                  "btn btn-" +
                  (selectedScreen == "Preview" ? "danger" : "secondary")
                }
                onClick={onPreviewScreen}
              >
                Preview
              </label>
            </li>
            <li className="nav-item" style={{ paddingLeft: "10px" }}>
              <label
                className={
                  "btn btn-" +
                  (selectedScreen == "Help" ? "danger" : "secondary")
                }
                onClick={onHelpScreen}
              >
                Help
              </label>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
