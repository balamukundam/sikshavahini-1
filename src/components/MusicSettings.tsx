import React, { useState } from "react";
import { noteOptions, melakartaDataList } from "../services/dataTypes";
import Button from "./Button";

interface Props {
  onMusicSettingsChange: (item: any) => void;
  musicSettings: any;
}

const MusicSettings = ({ musicSettings, onMusicSettingsChange }: Props) => {
  const handleBpmChange = (value: string) => {
    onMusicSettingsChange({ ...musicSettings, bpm: Number(value) });
  };

  const handlePitchSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onMusicSettingsChange({
      ...musicSettings,
      pitch: Number(event.target.value),
    });
  };

  const [selectedItem, setSelectedItem] = useState("");

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedItem(event.target.value);
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
            <div className="row">
              <div className="col-3">
                <div className="input-group mb-4">
                  <span className="input-group-text" id="width-input">
                    Pitch
                  </span>
                  <select
                    className="form-select"
                    value={musicSettings.pitch}
                    onChange={handlePitchSelectionChange}
                    style={{ maxWidth: "150px" }} // Optional: Adjust width as needed
                  >
                    {noteOptions.map((note) => (
                      <option key={note.value} value={note.value}>
                        {note.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-3">
                <div className="input-group mb-4">
                  <span className="input-group-text" id="width-input">
                    BPM
                  </span>

                  <input
                    type="number"
                    className="form-control"
                    min="45"
                    max="100"
                    id="widthInputField"
                    aria-describedby="width-input"
                    value={musicSettings.bpm}
                    onChange={(e) => handleBpmChange(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-6">
                <div>
                  <label>Select an Item: </label>
                  <select
                    value={selectedItem}
                    onChange={handleSelectionChange}
                    style={{ padding: "5px", width: "200px" }}
                  >
                    <option value="" disabled>
                      Select an item...
                    </option>
                    {melakartaDataList.map((group) => (
                      <optgroup key={group.subtype} label={group.subtype}>
                        {group.items.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.value} {item.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <p>Selected Item: {selectedItem}</p>
                </div>
              </div>
            </div>
            <Button color="danger" symbol="❌" onClick={closePopup}>
              Close
            </Button>
          </div>
        </div>
      )}
      <div>
        <Button color="primary" symbol="🎵🎶" onClick={openPopup}>
          Edit Music Settings
        </Button>
      </div>
    </>
  );
};

export default MusicSettings;
