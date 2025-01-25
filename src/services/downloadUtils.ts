// src/services/downloadUtils.ts
export const downloadData = (dataToExport : any) => {
    console.log("Download");

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
  


 /* const handleDownload = () => {
    console.log("Download");
    const dataToExport = {
      titleLesson: titleLesson,
    };
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
    URL.revokeObjectURL(url);*/
  