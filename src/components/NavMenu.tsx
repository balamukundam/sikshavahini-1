import React, { useState } from "react";
import DropDown from "./DropDown";
import JsonFilePicker from "./JsonFilePicker";

interface Props {
  onSelectLanguage: (item: string) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDownload: () => void;
  handleCacheLoad: () => void;
  handleSaveToCache: () => void;
  loadJsonFromGoogleDrive: () => void;
  onSelectScreen: (item: string) => void;
  selectedScreen: string;
}

const NavMenu = ({
  onSelectLanguage,
  handleFileChange,
  handleDownload,
  handleCacheLoad,
  handleSaveToCache,
  loadJsonFromGoogleDrive,
  onSelectScreen,
  selectedScreen,
}: Props) => {
  const onDesignScreen = () => {
    onSelectScreen("Design");
  };
  const onPreviewScreen = () => {
    onSelectScreen("Preview");
  };
  const onLibraryScreen = () => {
    onSelectScreen("Library");
  };
  const onHelpScreen = () => {
    onSelectScreen("Help");
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-primary"
      data-bs-theme="dark"
      style={{ marginBottom: "5px" }}
    >
      <div className="container-fluid no-print">
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
                items={["Default", "Telugu", "Sanskrit", "Transcription"]}
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
                    <a className="dropdown-item" onClick={handleCacheLoad}>
                      Load Cache Data
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="dropdown-item" onClick={handleSaveToCache}>
                      Save to Cache
                    </a>
                  </li>
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
                  <li className="nav-item">
                    <a
                      className="dropdown-item"
                      onClick={loadJsonFromGoogleDrive}
                    >
                      Google Drive
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
                  (selectedScreen == "Library" ? "danger" : "secondary")
                }
                onClick={onLibraryScreen}
              >
                Library
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
