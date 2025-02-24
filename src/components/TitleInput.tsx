import React, { useState } from "react";
import Button from "./Button";

interface Props {
  onTitleChange: (item: string) => void;
  onSubTitleChange: (item: string) => void;
  titleText: string;
  subTitleText: string;
}

const TitleInput = ({
  titleText,
  subTitleText,
  onTitleChange,
  onSubTitleChange,
}: Props) => {
  const handleHeaderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChange(event.target.value);
  };

  const handleSubHeaderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onSubTitleChange(event.target.value);
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      {isPopupOpen && (
        <div>
          <div className="overlay" onClick={closePopup}></div>{" "}
          {/* Overlay that disables main window */}
          <div className="popup">
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
                id="inputField"
                value={titleText}
                onChange={handleHeaderChange}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="subtitle-input">
                Subtitle
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                aria-label="Title"
                aria-describedby="subtitle-input"
                id="inputField"
                value={subTitleText}
                onChange={handleSubHeaderChange}
              />
            </div>
            <Button color="danger" symbol="❌" onClick={closePopup}>
              Close
            </Button>
          </div>
        </div>
      )}
      <div>
        <Button color="primary" symbol="🏷️" onClick={openPopup}>
          Edit Title
        </Button>
      </div>
    </>
  );
};

export default TitleInput;
