import React from "react";
import DropDown from "./DropDown";
import { BmkLanguages } from "../services/dataTypes";

interface Props {
  preferences: any;
  onPreferencesUpdate: (updatedPreferences: any) => void;
}

const EditRowPreferences: React.FC<Props> = ({
  preferences,
  onPreferencesUpdate,
}) => {
  const onSelectLanguage = (value: string) => {
    switch (value) {
      case "Default":
        preferences.language = value;
        break;
      case "Transcription":
        preferences.language = BmkLanguages.transcription;
        break;
      case "Sanskrit":
        preferences.language = BmkLanguages.devanagari;
        break;
      default:
        preferences.language = BmkLanguages.telugu;
        break;
    }

    onPreferencesUpdate(preferences);
  };
  const handleTitleChange = (value: string) => {
    preferences.title = value;
    onPreferencesUpdate(preferences);
  };

  let selectedLanguageIndex = 0;
  if (preferences.language !== "Default") {
    selectedLanguageIndex =
      preferences.language == BmkLanguages.devanagari ? 2 : 1;
  }

  return (
    <>
      <div className="row">
        <div className="col-9">
          <div className="input-group mb-4">
            <span className="input-group-text" id="title-input">
              Title
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              aria-label="Title"
              aria-describedby="title-input"
              id="titleInputField"
              value={preferences.title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
          </div>
        </div>
        <div className="col-3">
          <div className="input-group mb-4">
            <DropDown
              items={["Default", "Telugu", "Sanskrit", "Transcript"]}
              heading="Language"
              preselectedIndex={selectedLanguageIndex}
              onSelectItem={onSelectLanguage}
            ></DropDown>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditRowPreferences;
