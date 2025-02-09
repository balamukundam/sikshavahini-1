import React from "react";
import Button from "./Button";
import { useState } from "react";

interface Props {
  initialDataRows: any[]; // Initial data passed to the component
  onDataUpdate: (rows: any[]) => void;
}

const RowsDesignBackup: React.FC<Props> = ({
  initialDataRows,
  onDataUpdate,
}) => {
  // Initialize state with the dataRows
  const [dataRows, setDataRows] = useState<any[]>(initialDataRows);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Function to add data to the rows
  const addRowData = () => {
    const rowComponent = {
      type: 1,
      data: {
        text: "Rama",
      },
    };
    setDataRows((prevRows) => [...prevRows, rowComponent]); // Add new row without mutating the state
    console.log("Data rows after adding:", dataRows);
    onDataUpdate(dataRows);
  };

  return (
    <div>
      {isPopupOpen && (
        <div>
          <div className="overlay" onClick={closePopup}></div>{" "}
          {/* Overlay that disables main window */}
          <div className="popup">
            <h2>Popup Window</h2>
            <p>This is a popup that disables the main content.</p>

            <Button
              color="danger"
              onClick={() => {
                closePopup();
              }}
            >
              Close
            </Button>
          </div>
        </div>
      )}

      <Button
        color="primary"
        onClick={() => {
          addRowData();
          console.log("Clicked");
        }}
      >
        Add
      </Button>

      {/* Render each item in the dataRows */}
      {dataRows.map((item: any, index: number) => (
        <div key={index}>
          <div className="input-group mb-3">
            <span className="input-group-text" id="title-input">
              Set Current
            </span>
            <button onClick={openPopup}>Open Popup</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RowsDesignBackup;
