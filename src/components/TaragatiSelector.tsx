import React, { useState } from "react";
import { EngToTelService } from "../services/engToTelugu";

interface Props {
  loadFileWithId: (fileId: string) => Promise<void>;
}

type Document = {
  id: number;
  name: string;
  url: string;
  lang: string;
  title2: string;
};

type Book = {
  id: number;
  name: string;
  documents: Document[];
};

type Subject = {
  id: number;
  name: string;
  books: Book[];
};

type Taragati = {
  id: number;
  name: string;
  subjects: Subject[];
};

// Sample Data
const data: Taragati[] = [
  {
    id: 1,
    name: "Telugu Classes",
    subjects: [
      {
        id: 1,
        name: "Level-1",
        books: [
          {
            id: 1,
            name: "Acchulu",
            documents: [
              {
                id: 1,
                name: "Letter-a",
                lang: "te",
                title2: "SrIrAma",
                url: "/docs/algebra1.pdf",
              },
              {
                id: 2,
                name: "Letter-aa",
                lang: "te",
                title2: "SrIrAma",
                url: "/docs/algebra2.pdf",
              },
            ],
          },
          {
            id: 2,
            name: "Hallulu",
            documents: [
              {
                id: 3,
                name: "Letter-ka",
                lang: "te",
                title2: "SrIrAma",
                url: "/docs/geometry1.pdf",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        name: "Level-2",
        books: [
          {
            id: 3,
            name: "Gunintaalu",
            documents: [
              {
                id: 4,
                name: "Motion",
                lang: "te",
                title2: "SrIrAma",
                url: "/docs/physics1.pdf",
              },
            ],
          },
        ],
      },
      {
        id: 3,
        name: "Level-3",
        books: [
          {
            id: 3,
            name: "Gunintaalu",
            documents: [
              {
                id: 4,
                name: "Motion",
                lang: "te",
                title2: "SrIrAma",
                url: "/docs/physics1.pdf",
              },
            ],
          },
        ],
      },
      {
        id: 4,
        name: "Level-4",
        books: [
          {
            id: 3,
            name: "Gunintaalu",
            documents: [
              {
                id: 4,
                name: "Motion",
                lang: "te",
                title2: "SrIrAma",
                url: "/docs/physics1.pdf",
              },
            ],
          },
        ],
      },
      {
        id: 5,
        name: "Level-5",
        books: [
          {
            id: 5,
            name: "Gunintaalu",
            documents: [
              {
                id: 4,
                name: "Motion",
                lang: "te",
                title2: "SrIrAma",
                url: "/docs/physics1.pdf",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Sanskrit Classes",
    subjects: [
      {
        id: 3,
        name: "IGCSE",
        books: [
          {
            id: 1,
            name: "Rama Stories",
            documents: [
              {
                id: 1,
                lang: "sa",
                title2: "rAjA daSaratha@h bAlakaM bhrAntyA hanti",
                name: "King Dasaratha Kills a Boy by Mistake",
                url: "1SWaBuzqbjJH8HkVFqpNVZUswnNtN7nf7",
              },
              {
                id: 2,
                lang: "sa",
                title2: "taaTakaayaa@h vadhaa",
                name: "Rama and Lakshmana Kill the Demoness Tataka",
                url: "1GkB1ab-eKvARz4IZbqhaTIgHgaTBS7et",
              },
              {
                id: 3,
                lang: "te",
                title2: "sItaaraamayO@h vivaaha@h",
                name: "Rama Wins Sita as His Wife",
                url: "1_dIDVeOBEiCkYaiY0UUCN0EJL_LPnGmv",
              },
              {
                id: 4,
                lang: "sa",
                title2: "",
                name: "The Cruel Kaikeyi Demands Her Two Wishes",
                url: "",
              },
            ],
          },
          {
            id: 2,
            name: "Krishna Stories",
            documents: [
              {
                id: 5,
                name: "Story-1",
                lang: "te",
                title2: "SrIrAma",
                url: "",
              },
            ],
          },
          {
            id: 3,
            name: "Mahabharata Stories",
            documents: [
              {
                id: 5,
                name: "Story-1",
                lang: "te",
                title2: "SrIrAma",
                url: "",
              },
            ],
          },
          {
            id: 4,
            name: "Hitopadesha Stories",
            documents: [
              {
                id: 5,
                name: "Story-1",
                lang: "te",
                title2: "SrIrAma",
                url: "",
              },
            ],
          },
          {
            id: 5,
            name: "Epic Civilization",
            documents: [
              {
                id: 5,
                name: "Story-1",
                lang: "te",
                title2: "SrIrAma",
                url: "",
              },
            ],
          },
          {
            id: 6,
            name: "Bhagavadgita",
            documents: [
              {
                id: 5,
                name: "Story-1",
                lang: "te",
                title2: "SrIrAma",
                url: "",
              },
            ],
          },
          {
            id: 7,
            name: "Workbook Part-1",
            documents: [
              {
                id: 5,
                name: "Story-1",
                lang: "te",
                title2: "SrIrAma",
                url: "",
              },
            ],
          },
          {
            id: 8,
            name: "Workbook Part-2",
            documents: [
              {
                id: 5,
                name: "Story-1",
                lang: "te",
                title2: "SrIrAma",
                url: "",
              },
            ],
          },
          {
            id: 9,
            name: "Nama Rupani (Nouns)",
            documents: [
              {
                id: 5,
                name: "Story-1",
                lang: "te",
                title2: "SrIrAma",
                url: "",
              },
            ],
          },
          {
            id: 10,
            name: "Kriya Rupani (Verbs)",
            documents: [
              {
                id: 5,
                name: "Story-1",
                lang: "te",
                title2: "SrIrAma",
                url: "",
              },
            ],
          },
          {
            id: 11,
            name: "Previous Exam Papers",
            documents: [
              {
                id: 5,
                name: "Story-1",
                lang: "te",
                title2: "SrIrAma",
                url: "",
              },
            ],
          },
          {
            id: 12,
            name: "Learn Sanskrit 30 days",
            documents: [
              {
                id: 5,
                name: "Story-1",
                lang: "te",
                title2: "SrIrAma",
                url: "",
              },
            ],
          },
        ],
      },
      {
        id: 4,
        name: "Basics",
        books: [
          {
            id: 4,
            name: "Alphabets",
            documents: [
              {
                id: 5,
                name: "Egypt",
                lang: "te",
                title2: "SrIrAma",
                url: "/docs/egypt.pdf",
              },
            ],
          },
        ],
      },
      {
        id: 5,
        name: "Raghuvamsam",
        books: [
          {
            id: 4,
            name: "12th Sarga",
            documents: [
              {
                id: 5,
                name: "12th Sarga 72-90",
                lang: "sa",
                title2: "dvAdaSa@h sarga@h 72-90",
                url: "1ppStJL_V4-I2WQ_b0td1CJyHg-3Kabw8",
              },
            ],
          },
        ],
      },
    ],
  },
];

const TaragatiSelector = ({ loadFileWithId }: Props) => {
  const [selectedTaragati, setSelectedTaragati] = useState<Taragati | null>(
    null
  );
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  let ett: EngToTelService = new EngToTelService();

  return (
    <>
      <div className="m3">
        {/* Taragati Selection */}
        <div className="btn-group mb-3">
          <button
            key={0}
            className={`btn ${
              selectedTaragati?.id === 0
                ? "btn-success"
                : "btn-outline-secondary"
            }`}
            onClick={() => {
              setSelectedTaragati(null);
              setSelectedSubject(null);
              setSelectedBook(null);
            }}
          >
            {" "}
            Clear{" "}
          </button>
          {data.map((taragati) => (
            <button
              key={taragati.id}
              className={`btn ${
                selectedTaragati?.id === taragati.id
                  ? "btn-success"
                  : "btn-outline-secondary"
              }`}
              onClick={() => {
                setSelectedTaragati(taragati);
                setSelectedSubject(null);
                setSelectedBook(null);
              }}
            >
              {taragati.name}
            </button>
          ))}
        </div>
        {/* Subject Selection */}
        {selectedTaragati && (
          <>
            <br></br>
            <div className="btn-group mb-3">
              {selectedTaragati.subjects.map((subject) => (
                <button
                  key={subject.id}
                  className={`btn ${
                    selectedSubject?.id === subject.id
                      ? "btn-primary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => {
                    setSelectedSubject(subject);
                    setSelectedBook(null);
                  }}
                >
                  {subject.name}
                </button>
              ))}
            </div>
          </>
        )}
        <div className="row" style={{ marginBottom: "5px" }}>
          <div className="col-4">
            <div className="mt-4">
              {/* Book Selection */}
              {selectedSubject && (
                <>
                  <h2>Select Book</h2>
                  <div className="d-flex flex-column gap-2">
                    {selectedSubject.books.map((book) => (
                      <button
                        key={book.id}
                        className={`btn ${
                          selectedBook?.id === book.id
                            ? "btn-warning"
                            : "btn-outline-secondary"
                        } w-100`}
                        onClick={() => setSelectedBook(book)}
                      >
                        {book.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="col-8">
            {/* Documents Table */}
            {selectedBook && (
              <>
                <h2>Documents</h2>
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedBook.documents.map((doc) => (
                      <tr key={doc.id}>
                        <td>{doc.id}</td>
                        <td>{doc.name}</td>
                        {doc.lang == "sa" && (
                          <td className="div-hindigen fontup1">
                            {ett.getStringInSanskrit(doc.title2)}
                          </td>
                        )}
                        {doc.lang != "sa" && (
                          <td className="div-telugugen fontup1">
                            {ett.getStringInTelugu(doc.title2)}
                          </td>
                        )}
                        <td>
                          {doc.url ? (
                            <a
                              href="#"
                              className="btn btn-sm btn-info"
                              onClick={(e) => {
                                e.preventDefault(); // Prevent default link behavior
                                loadFileWithId(doc.url);
                              }}
                            >
                              Load in Preview
                            </a>
                          ) : (
                            <span className="text-muted">No Data</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaragatiSelector;
