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
import DropDown from "./DropDown";

interface Props {
  rowData: any;
  rowIndex: number;
  rowsCount: number;
  onDataUpdate: (
    rowIndex: number,
    compIndex: number,
    updatedComponent: ComponentType
  ) => void;
  deleteRow: (rowIndex: number) => void;
  addComponent: (rowIndex: number, newComponentType: string) => void;
  insertComponent: (
    rowIndex: number,
    compIndex: number,
    newComponentType: string
  ) => void;
  moveComponent: (rowIndex: number, compIndex: number) => void;
  deleteComponent: (rowIndex: number, compIndex: number) => void;
}

const RowInput: React.FC<Props> = ({
  rowData,
  rowIndex,
  rowsCount,
  onDataUpdate,
  deleteRow,
  addComponent,
  insertComponent,
  moveComponent,
  deleteComponent,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => {
    setNewComponentType("");
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setNewComponentType("");
    setIsPopupOpen(false);
  };

  const onDeleteRow = () => {
    setIsPopupOpen(false);
    setNewComponentType("");
    deleteRow(rowIndex);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [newComponentType, setNewComponentType] = useState("");
  const totalPages = rowData["components"].length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onComponentSelection = (typeString: string) => {
    setNewComponentType(typeString);
  };

  const onAddComponent = () => {
    if (newComponentType != "") {
      addComponent(rowIndex, newComponentType);
    }
    setNewComponentType("");
    setCurrentPage(1);
  };

  const onInsertComponentLeft = () => {
    if (newComponentType != "") {
      insertComponent(rowIndex, currentPage - 1, newComponentType);
    }
    setNewComponentType("");
    setCurrentPage(1);
  };
  const onInsertComponentRight = () => {
    if (newComponentType != "") {
      insertComponent(rowIndex, currentPage, newComponentType);
    }
    setNewComponentType("");
    setCurrentPage(1);
  };

  const onMoveComponentLeft = () => {
    moveComponent(rowIndex, currentPage);
    setCurrentPage(1);
  };

  const onMoveComponentRight = () => {
    moveComponent(rowIndex, currentPage + 1);
    setCurrentPage(1);
  };
  const onDeleteComponent = () => {
    deleteComponent(rowIndex, currentPage);
    setCurrentPage(1);
  };

  let item = rowData["components"][currentPage - 1];

  return (
    <>
      {isPopupOpen && (
        <div>
          <div className="overlay" onClick={closePopup}></div>{" "}
          {/* Overlay that disables main window */}
          <div className="popup">
            <div className="row">
              <div className="col-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                ></Pagination>
              </div>
              <div className="col-6">
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "flex-end",
                  }}
                >
                  {rowIndex > 0 && (
                    <div>
                      <Button onClick={onAddComponent}>Move Up</Button>
                    </div>
                  )}
                  {rowIndex < rowsCount - 1 && (
                    <div>
                      <Button onClick={onAddComponent}>Move Down</Button>
                    </div>
                  )}

                  <Button color="danger" onClick={closePopup}>
                    X
                  </Button>
                </div>
              </div>
            </div>

            {totalPages == 0 && (
              <>
                <div className={"card bg-light mb-4 me-1 "}>
                  <div className="card-header text-center">
                    No components added yet. Add a component -{" "}
                    {newComponentType}.
                  </div>
                  <div
                    className="card-body"
                    style={{ display: "flex", gap: "10px" }}
                  >
                    <DropDown
                      items={[
                        "Image component",
                        "Para component",
                        "Numbered comp",
                        "Bullet comp",
                      ]}
                      heading="Choose component"
                      onSelectItem={onComponentSelection}
                    ></DropDown>

                    {newComponentType != "" && (
                      <div>
                        <Button onClick={onAddComponent}>Add Component</Button>
                      </div>
                    )}

                    <div>
                      <Button color="danger" onClick={onDeleteRow}>
                        Delete Row
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {totalPages > 0 && (
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
                    {(item["cType"] === "2" ||
                      item["cType"] === "3" ||
                      item["cType"] === "4") && (
                      <EditParaComponent
                        rowIndex={rowIndex}
                        compIndex={currentPage - 1}
                        paraComponentData={item}
                        onDataUpdate={onDataUpdate}
                      ></EditParaComponent>
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
            )}
            <div style={{ display: "flex", gap: "10px" }}>
              {totalPages > 0 && (
                <>
                  <DropDown
                    items={[
                      "Image component",
                      "Para component",
                      "Numbered comp",
                      "Bullet comp",
                    ]}
                    heading="Choose component"
                    onSelectItem={onComponentSelection}
                  ></DropDown>
                  {newComponentType != "" && (
                    <>
                      <div>
                        <Button onClick={onInsertComponentLeft}>
                          Add To Left
                        </Button>
                      </div>
                      <div>
                        <Button onClick={onInsertComponentRight}>
                          Add To Right
                        </Button>
                      </div>
                    </>
                  )}

                  {newComponentType == "" && (
                    <>
                      {currentPage > 1 && (
                        <div>
                          <Button onClick={onMoveComponentLeft}>
                            Move To Left
                          </Button>
                        </div>
                      )}
                      {totalPages > currentPage && (
                        <div>
                          <Button onClick={onMoveComponentRight}>
                            Move To Right
                          </Button>
                        </div>
                      )}
                    </>
                  )}

                  <div>
                    <Button color="danger" onClick={onDeleteComponent}>
                      Delete Component
                    </Button>
                  </div>
                </>
              )}
            </div>
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
