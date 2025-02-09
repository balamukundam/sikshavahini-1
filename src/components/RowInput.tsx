import React, { useState } from "react";
import Button from "./Button";
import Pagination from "./Pagination";
import EditParaComponent from "./EditParaComponent";
import EditImageComponent from "./EditImageComponent";
import {
  BmkLanguage,
  BmkLanguages,
  DataRow,
  ComponentType,
} from "../services/dataTypes";

interface Props {
  rowData: any;
  rowIndex: number;
  onDataUpdate: (
    rowIndex: number,
    compIndex: number,
    updatedComponent: ComponentType
  ) => void;
}

const RowInput: React.FC<Props> = ({ rowData, rowIndex, onDataUpdate }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = rowData["components"].length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  let item = rowData["components"][currentPage - 1];

  return (
    <>
      {isPopupOpen && (
        <div>
          <div className="overlay" onClick={closePopup}></div>{" "}
          {/* Overlay that disables main window */}
          <div className="popup">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            ></Pagination>

            <div className={"card bg-light mb-4 me-1 "}>
              <div className="card-header text-center">
                Current Component {currentPage}
              </div>
              <div className="card-body">
                <>
                  {item["cType"] === "1" && (
                    <>
                      <EditImageComponent
                        rowIndex={rowIndex}
                        compIndex={currentPage - 1}
                        imageComponentData={item}
                        onDataUpdate={onDataUpdate}
                      ></EditImageComponent>
                    </>
                  )}
                  {item["cType"] === "2" && (
                    <EditParaComponent
                      rowIndex={rowIndex}
                      compIndex={currentPage - 1}
                      paraComponentData={item}
                      onDataUpdate={onDataUpdate}
                    ></EditParaComponent>
                  )}
                  {item["cType"] === "3" && (
                    <>
                      <p>Numbered List component in development</p>
                    </>
                  )}
                  {item["cType"] === "4" && (
                    <>
                      <p>Bulleted List component in development</p>
                    </>
                  )}
                  {item["cType"] === "5" && (
                    <>
                      <p>Tables component in development</p>
                    </>
                  )}

                  {item["cType"] === "6" && (
                    <>
                      <p>Indented Text in development</p>
                    </>
                  )}

                  {item["cType"] === "7" && (
                    <>
                      <p>For future</p>
                    </>
                  )}
                </>
              </div>
            </div>

            <Button color="danger" onClick={closePopup}>
              Close
            </Button>
          </div>
        </div>
      )}
      <div>
        <Button color="primary" onClick={openPopup}>
          Edit Row
        </Button>
      </div>
    </>
  );
};

export default RowInput;
