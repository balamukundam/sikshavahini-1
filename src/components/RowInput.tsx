import React, { useState } from "react";
import Button from "./Button";
import Pagination from "./Pagination";
import EditParaComponent from "./EditParaComponent";
import EditImageComponent from "./EditImageComponent";
import EditSeperatorComponent from "./EditSeperatorComponent";
import {
  BmkLanguage,
  BmkLanguages,
  DataRow,
  ComponentType,
} from "../services/dataTypes";
import DropDown from "./DropDown";
import EditRowPreferences from "./EditRowPreferences";
import EditPoemComponent from "./EditPoemComponent";
import EditMultiQuestComponent from "./EditMultiQuestComponent";
import EditTableComponent from "./EditTableComponent";

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
  moveRow: (rowIndex: number) => void;
  insertRowBelow: (rowIndex: number) => void;
  preferencesUpdate: (rowIndex: number, updatedPreferences: any) => void;
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
  moveRow,
  preferencesUpdate,
  insertRowBelow,
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
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this row ?"
    );
    if (isConfirmed) {
      setIsPopupOpen(false);
      setNewComponentType("");
      deleteRow(rowIndex);
    }
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
  };
  const onInsertComponentRight = () => {
    if (newComponentType != "") {
      insertComponent(rowIndex, currentPage, newComponentType);
    }
    setNewComponentType("");
    setCurrentPage(currentPage + 1);
  };

  const onMoveComponentLeft = () => {
    moveComponent(rowIndex, currentPage);
    setCurrentPage(currentPage - 1);
  };

  const onMoveComponentRight = () => {
    moveComponent(rowIndex, currentPage + 1);
    setCurrentPage(currentPage + 1);
  };

  const onMoveUpRow = () => {
    moveRow(rowIndex);
    closePopup();
  };

  const onMoveDownRow = () => {
    moveRow(rowIndex + 1);
    closePopup();
  };
  const onDeleteComponent = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this component ?"
    );
    if (isConfirmed) {
      deleteComponent(rowIndex, currentPage);
      setCurrentPage(1);
    }
  };

  const onPreferencesUpdate = (updatedPreferences: any) => {
    preferencesUpdate(rowIndex, updatedPreferences);
  };

  const onInsertRowBelow = () => {
    insertRowBelow(rowIndex);
  };

  let item = currentPage > 0 ? rowData["components"][currentPage - 1] : null;

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
                      <Button symbol="📤" onClick={onMoveUpRow}>
                        Move Up
                      </Button>
                    </div>
                  )}
                  {rowIndex < rowsCount - 1 && (
                    <div>
                      <Button symbol="📥" onClick={onMoveDownRow}>
                        Move Down
                      </Button>
                    </div>
                  )}

                  <Button symbol="❌" color="danger" onClick={closePopup}>
                    Close
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
                        "Table comp",
                        "Poem comp",
                        "Multiple Choice Question",
                        "Seperator comp",
                      ]}
                      heading="Choose component"
                      preselectedIndex={-1}
                      onSelectItem={onComponentSelection}
                    ></DropDown>

                    {newComponentType != "" && (
                      <div>
                        <Button symbol="🧩➕" onClick={onAddComponent}>
                          Add Component
                        </Button>
                      </div>
                    )}

                    <div>
                      <Button symbol="🗑️" color="danger" onClick={onDeleteRow}>
                        Delete Row
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {currentPage == 0 && (
              <div className={"card bg-light mb-4 me-1 "}>
                <div className="card-header text-center">
                  Row Preferecnes - Edit
                </div>
                <div className="card-body">
                  <EditRowPreferences
                    preferences={rowData["preferences"]}
                    onPreferencesUpdate={onPreferencesUpdate}
                    onInsertRowBelow={onInsertRowBelow}
                  ></EditRowPreferences>
                </div>
              </div>
            )}

            {totalPages > 0 && currentPage > 0 && (
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
                        <EditTableComponent
                          rowIndex={rowIndex}
                          compIndex={currentPage - 1}
                          tableComponentData={item}
                          onDataUpdate={onDataUpdate}
                        ></EditTableComponent>
                      </>
                    )}

                    {item["cType"] === "6" && (
                      <>
                        <EditPoemComponent
                          rowIndex={rowIndex}
                          compIndex={currentPage - 1}
                          poemComponentData={item}
                          onDataUpdate={onDataUpdate}
                        ></EditPoemComponent>
                      </>
                    )}

                    {item["cType"] === "7" && (
                      <>
                        <p>For future</p>
                      </>
                    )}

                    {item["cType"] === "11" && (
                      <EditMultiQuestComponent
                        rowIndex={rowIndex}
                        compIndex={currentPage - 1}
                        multiQuestComponentData={item}
                        onDataUpdate={onDataUpdate}
                      ></EditMultiQuestComponent>
                    )}

                    {item["cType"] === "99" && (
                      <>
                        <EditSeperatorComponent
                          rowIndex={rowIndex}
                          compIndex={currentPage - 1}
                          sepComponentData={item}
                          onDataUpdate={onDataUpdate}
                        ></EditSeperatorComponent>
                      </>
                    )}
                  </>
                </div>
              </div>
            )}
            <div style={{ display: "flex", gap: "10px" }}>
              {totalPages > 0 && currentPage > 0 && (
                <>
                  <DropDown
                    items={[
                      "Image component",
                      "Para component",
                      "Numbered comp",
                      "Bullet comp",
                      "Table comp",
                      "Poem comp",
                      "Multiple Choice Question",
                      "Seperator comp",
                    ]}
                    heading="Choose component"
                    preselectedIndex={-1}
                    onSelectItem={onComponentSelection}
                  ></DropDown>
                  {newComponentType != "" && (
                    <>
                      <div>
                        <Button symbol="⬅️➕" onClick={onInsertComponentLeft}>
                          Add To Left
                        </Button>
                      </div>
                      <div>
                        <Button symbol="➕➡️" onClick={onInsertComponentRight}>
                          Add To Right
                        </Button>
                      </div>
                    </>
                  )}

                  {newComponentType == "" && (
                    <>
                      {currentPage > 1 && (
                        <div>
                          <Button symbol="↩️" onClick={onMoveComponentLeft}>
                            Move To Left
                          </Button>
                        </div>
                      )}
                      {totalPages > currentPage && (
                        <div>
                          <Button symbol="↪️" onClick={onMoveComponentRight}>
                            Move To Right
                          </Button>
                        </div>
                      )}
                    </>
                  )}

                  <div>
                    <Button
                      symbol="🚫"
                      color="danger"
                      onClick={onDeleteComponent}
                    >
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
        <Button
          symbol={rowIndex + 1 + "📝"}
          color="primary"
          onClick={openPopup}
        >
          Edit Row
        </Button>
      </div>
    </>
  );
};

export default RowInput;
