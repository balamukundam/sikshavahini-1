import React from "react";

interface Props {
  dataToExport: any;
}

const ExportJson = ({ dataToExport }: Props) => {
  const handleExport = () => {
    // Convert data to JSON string
    const jsonString = JSON.stringify(dataToExport, null, 2);

    const blob = new Blob([jsonString], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json"; // Set the file name

    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  return (
    <div>
      <button onClick={handleExport} className="btn btn-primary">
        Export Data as JSON
      </button>
    </div>
  );
};

export default ExportJson;
