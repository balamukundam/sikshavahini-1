import React from "react";
import Button from "./Button";
import { useState } from "react";

interface Props {
  initialDataRows: any[]; // Initial data passed to the component
}

const RowsDesign: React.FC<Props> = ({ initialDataRows }) => {
  // Initialize state with the dataRows
  const [dataRows, setDataRows] = useState<any[]>(initialDataRows);

  // Function to add data to the rows
  const addRowData = () => {
    setDataRows((prevRows) => [...prevRows, "1"]); // Add new row without mutating the state
    console.log("Data rows after adding:", dataRows);
  };

  return (
    <div>
      <p>Data Rows</p>
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
              Title
            </span>
            <p> {item}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RowsDesign;
