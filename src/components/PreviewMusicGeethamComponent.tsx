import { useState, useRef, useEffect } from "react";
import * as Tone from "tone";
import { musicSets } from "../services/dataTypes";
import { musicService } from "../services/musicService";
import {
  InstrumentFactory,
  InstrumentType,
  SynthInstrument,
} from "../services/InstrumentFactory";
import { RagamName } from "../services/RagamFactory";

interface Props {
  musicGeethamComp: any;
  musicSettings: musicSets;
  talamShow: boolean;
  stopPlayClicked: boolean;
  rowg: number;
  colg: number;
  updateTalam: (image: string, note: string) => void;
  setRagam: (ragam: RagamName) => void;
}

// ✅ Image paths for each count
let images = [0, 1, 2, 3, 0, 6, 0, 6];
//   "/images/img0.jpeg",
//   "/images/img1.jpeg",
//   "/images/img2.jpeg",
//   "/images/img3.jpeg",
//   "/images/img0.jpeg",
//   "/images/img6.jpeg",
//   "/images/img0.jpeg",
//   "/images/img6.jpeg",
// ];

let ms: musicService = new musicService();
//let events: any[] = [];
//let tables: string[][][][] = [];
let totalEvents = 0;

const PreviewMusicGeethamComponent = ({
  musicGeethamComp,
  musicSettings,
  talamShow,
  stopPlayClicked,
  rowg,
  colg,
  updateTalam,
  setRagam,
}: Props) => {
  const [count, setCount] = useState(1);
  const [currentNote, setCurrentNote] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [synth, setSynth] = useState<
    Tone.Synth | Tone.MonoSynth | Tone.PluckSynth | Tone.FMSynth | null
  >(null);
  const [talamSynth, setTalamSynth] = useState<Tone.PolySynth | null>(null);
  const [drone, setDrone] = useState<Tone.PolySynth | null>(null);
  const [image, setImage] = useState("/images/Sunaadam.jpg");
  const [noteText, setNoteText] = useState("Start");
  const [timeInterval, setTimeInterval] = useState(1000);
  const [startEventNumber, setStartEventNumber] = useState(0);
  const [endEventNumber, setEndEventNumber] = useState(0);
  const [selectedEventNumber, setSelectedEventNumber] = useState(-1);
  const [tables, setTables] = useState<any[][][][]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [notesPerBeatForTable, setNotesPerBeatForTable] = useState<number[]>(
    []
  );
  const [tableHeaderrs, setTableHeaders] = useState<string[]>([]);

  const pitchShiftRef = useRef<Tone.PitchShift | null>(null);

  const initialize = () => {
    setRagam(musicGeethamComp["ragam"]);
    ms.setBaseNoteNbr(musicSettings.pitch);
    ms.setMelaNbr(musicSettings.melakarta);
    ms.getNotesRaw(musicGeethamComp["musicNotes"]);

    const eventstemp: any[] = [];
    const tablestemp: string[][][][] = [];
    const tempNotesPerBeatForTable: number[] = [];
    const tempTableHeaders: string[] = [];
    checkedTalamNumbers.forEach((nbp) => {
      musicGeethamComp["musicLyrics"].forEach(
        (charanamLine: string, index: number) => {
          let eventsAndRwows = getEvents(
            ms.getNoteNbrsArray(),
            ms.getNoteTextArray(),
            charanamLine.split(" "),
            nbp
          );
          tempTableHeaders.push(
            "Charanam-" + (index + 1) + " (  notes per beat = " + nbp + ")"
          );
          tempNotesPerBeatForTable.push(nbp);

          eventstemp.push(eventsAndRwows.events);
          tablestemp.push(eventsAndRwows.rows);

          totalEvents = totalEvents + eventsAndRwows.events.length;
        }
      );
    });
    setNotesPerBeatForTable(tempNotesPerBeatForTable);
    setTableHeaders(tempTableHeaders);

    console.log("eventstemp", eventstemp);
    setTables(tablestemp);
    setEvents(eventstemp);
  };

  useEffect(() => {
    initialize();
  }, [musicGeethamComp, musicSettings]);

  const checkValidTalamNumbers = (
    input: string,
    startN: number,
    endN: number
  ): boolean => {
    return input
      .split(",") // Split by comma
      .map((num) => num.trim()) // Remove extra spaces
      .map(Number) // Convert to number
      .every((n) => !isNaN(n) && n >= startN && n <= endN); // Check if within range
  };
  if (checkValidTalamNumbers(musicGeethamComp.talamSeq, 0, 6)) {
    images = musicGeethamComp.talamSeq
      .split(",") // Split by comma
      .map((num: string) => num.trim()) // Trim spaces
      .map((num: string) => Number(num)); // Format as "image-0x"
  }

  const showTalam = (image: string, noteText: string) => {
    setImage(image);
    setNoteText(noteText);
    updateTalam(image, noteText);
  };

  let checkedTalamNumbers: number[] = [1, 2];
  if (checkValidTalamNumbers(musicGeethamComp.speeds, 1, 4)) {
    checkedTalamNumbers = musicGeethamComp.speeds
      .split(",")
      .map((num: string) => num.trim());
  }

  useEffect(() => {
    if (stopPlayClicked) {
      stopTimer();
    }
  }, [stopPlayClicked]);

  let baseNbr = 60;
  if (musicSettings.pitch) {
    baseNbr = musicSettings.pitch;
  }

  let basicSpeed: number = 1000;
  if (musicSettings.bpm) {
    basicSpeed = 60000 / musicSettings.bpm;
  }

  const getEvents = (
    noteNbrs: number[],
    noteTexts: string[],
    charanamLine: string[],
    notesPerBeat: number
  ): any => {
    let thisEvents: any[] = [];
    let thisRows: any[][][] = [];
    let beatCount: number = 0;
    let noteCount: number = 0;
    let cellText: any[] = [];
    let row: string[][] = [];
    let bTalamStarted: Boolean = true;

    let noteLyrics: string[] = [];

    for (let i = 0; i < noteNbrs.length; i++) {
      if (i < charanamLine.length) {
        noteLyrics.push(charanamLine[i]);
      } else {
        noteLyrics.push(";");
      }
    }

    while (bTalamStarted) {
      for (let i = 0; i < noteNbrs.length; i++) {
        bTalamStarted = true;
        thisEvents.push({
          note: noteNbrs[i],
          noteText: noteTexts[i],
          beatRequired: noteCount == 0,
          talam: beatCount,
        });

        cellText.push({ note: noteTexts[i], lyric: noteLyrics[i] });

        noteCount = noteCount + 1;
        if (noteCount == notesPerBeat) {
          noteCount = 0;
          beatCount = beatCount + 1;
          row.push(cellText);
          cellText = [];
          if (beatCount == images.length) {
            beatCount = 0;
            thisRows.push(row);
            row = [];
            bTalamStarted = false;
          }
        }
      }
    }

    return { events: thisEvents, rows: thisRows };
  };

  const getEventsCount = (): number =>
    events.reduce((sum, items) => sum + items.length, 0);

  const startTimer = async () => {
    console.log("Starting Timer...");
    console.log(getEventsCount());
    totalEvents = getEventsCount();
    if (startEventNumber == 0 && endEventNumber == 0) {
      setEndEventNumber(getEventsCount() - 1);
    }

    if (Tone.context.state !== "running") {
      await Tone.start(); // Ensure audio context is running
      console.log("Audio Context Started");
    }

    // ✅ Start the drone with a chord (C4, E4, G4)
    if (!drone) {
      console.log("Starting Drone...");
      const newDrone = new Tone.PolySynth(Tone.Synth, {
        volume: -5, // Lower volume
      }).toDestination();

      const chord = [
        Tone.Frequency(baseNbr - 5, "midi").toNote(), // C4
        Tone.Frequency(baseNbr, "midi").toNote(), // E4
        Tone.Frequency(baseNbr - 12, "midi").toNote(), // G4
      ];

      newDrone.triggerAttack(chord); // Start chord
      setDrone(newDrone);
      console.log("Drone Started with Chord:", chord);
    }

    if (!pitchShiftRef.current) {
      pitchShiftRef.current = new Tone.PitchShift().toDestination();
    }

    // ✅ Initialize Synth for Playing Notes
    if (!synth) {
      console.log("Initializing Synth...", musicSettings.instrument);
      // const newSynth = new Tone.PolySynth(Tone.Synth).toDestination();
      const instrumentInstance = InstrumentFactory.createInstrument(
        musicSettings.instrument
      );
      instrumentInstance.connect(pitchShiftRef.current); // Connect to pitch shift
      setSynth(instrumentInstance);
    }
    if (!talamSynth) {
      console.log("Initializing TalamSynth...");
      const newSynth = new Tone.PolySynth(Tone.Synth, {
        volume: -10, // Lower volume
      }).toDestination();
      setTalamSynth(newSynth);
    }
  };

  const startEventForTable = (tableNbr: number) => {
    let thisEventsCount = 0;
    for (let tNumber = 0; tNumber < tableNbr; tNumber++) {
      thisEventsCount = thisEventsCount + events[tNumber].length;
    }
    return thisEventsCount;
  };

  const getTableAndEventNumber = (presentEventNbr: number) => {
    let thisEventsCount = 0;
    for (let tbleNumber = 0; tbleNumber < events.length; tbleNumber++) {
      let preCount = thisEventsCount;
      thisEventsCount = thisEventsCount + events[tbleNumber].length;
      if (presentEventNbr < thisEventsCount) {
        return { tableNbr: tbleNumber, eventNbr: presentEventNbr - preCount };
      }
    }
    return { tableNbr: 0, eventNbr: 0 };
  };

  // ✅ Set up the interval after synth is ready
  useEffect(() => {
    if (synth && talamSynth && !intervalRef.current) {
      console.log("Starting Interval...");

      intervalRef.current = setInterval(() => {
        setCurrentNote((prevCount) => {
          if (prevCount < startEventNumber) {
            prevCount = startEventNumber;
          }
          if (prevCount === endEventNumber + 1) {
            prevCount = startEventNumber;
          }

          let getTableEventNbrs = getTableAndEventNumber(prevCount);
          let currentTable = getTableEventNbrs.tableNbr;
          let currentEvent = getTableEventNbrs.eventNbr;
          setTimeInterval(basicSpeed / notesPerBeatForTable[currentTable]);

          let thisEvent = events[currentTable][currentEvent];
          const nextNote = thisEvent.note;
          showTalam(
            "/images/img" + images[thisEvent.talam] + ".jpeg",
            thisEvent.noteText
          );

          if (nextNote !== 0) {
            const noteName = Tone.Frequency(nextNote, "midi").toNote();
            const element = document.getElementById(
              `note-${rowg}-${colg}-${prevCount}`
            );
            if (element) {
              element.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center",
              });
            }
            // ✅ Trigger the note
            synth.triggerRelease();
            synth.triggerAttack(noteName);
            // if (timeInterval > 750) {

            //   synth.triggerAttackRelease(noteName, "2n");
            // } else {
            //   synth.triggerAttackRelease(noteName, "4n");
            // }
          }

          if (thisEvent.beatRequired && images[thisEvent.talam] === 0) {
            const notesToPlay = [
              Tone.Frequency(baseNbr, "midi").toNote(), // C4
              Tone.Frequency(baseNbr + 7, "midi").toNote(), // G4
              Tone.Frequency(baseNbr + 12, "midi").toNote(), // C5
            ];
            talamSynth?.triggerAttackRelease(notesToPlay, "2n", Tone.now());
          }

          return prevCount + 1;
        });
      }, timeInterval); // 30 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [synth, timeInterval]); // ✅ Interval starts only when synth is initialized

  // ✅ Stop Timer and Drone
  const stopTimer = () => {
    pauseTimer();
    setCurrentNote(0);
    showTalam("/images/Sunaadam.jpg", "Stop");
  };

  // ✅ Stop Timer and Drone
  const pauseTimer = () => {
    console.log("Stopping Timer...");

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      console.log("Timer Stopped");
    }

    if (drone) {
      drone.releaseAll(); // Stop sustained notes
      setDrone(null);
      console.log("Drone Stopped");
    }

    if (synth) {
      synth.triggerRelease(); // Stop playing notes
      setSynth(null);
      console.log("Synth Stopped");
    }
  };

  const handleClick = (index: number) => {
    setSelectedEventNumber(index);
  };

  const clickStartEvent = () => {
    setStartEventNumber(selectedEventNumber);
    setEndEventNumber(totalEvents - 1);
  };

  const clickEndEvent = () => {
    setEndEventNumber(selectedEventNumber);
  };

  const clearSelections = () => {
    setSelectedEventNumber(-1);
    setStartEventNumber(0);
    setEndEventNumber(totalEvents - 1);
  };

  const getNoteStyle = (
    globalIndex: number,
    globalIndexStart: number,
    tableIndex: number
  ): React.CSSProperties => {
    if (
      globalIndex <= currentNote - 1 &&
      globalIndexStart >=
        Math.floor((currentNote - 1) / notesPerBeatForTable[tableIndex]) *
          notesPerBeatForTable[tableIndex]
    ) {
      return {
        padding: "1px",
        textAlign: "center" as const, // ✅ Fix type issue
        backgroundColor: "yellow",
        color: "red",
        cursor: "pointer",
      };
    }

    if (!talamShow && globalIndex === selectedEventNumber) {
      return {
        padding: "1px",
        textAlign: "center" as const, // ✅ Fix type issue
        backgroundColor: "orange",
        color: "white",
        cursor: "pointer",
      };
    }

    if (
      !(startEventNumber == 0 && endEventNumber == totalEvents - 1) &&
      globalIndex >= startEventNumber &&
      globalIndex <= endEventNumber
    ) {
      return {
        padding: "1px",
        textAlign: "center" as const, // ✅ Fix type issue
        backgroundColor: "#87CEFA",
        color: "white",
        cursor: "pointer",
      };
    }

    return {
      padding: "1px",
      textAlign: "center" as const, // ✅ Fix type issue
      backgroundColor: "transparent",
      cursor: "pointer",
    };
  };

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <div style={{ marginTop: 20 }}>
          <button
            onClick={startTimer}
            disabled={talamShow}
            style={{
              padding: "10px 20px",
              margin: "5px",
              backgroundColor: talamShow ? "#ccc" : "#4CAF50", // ✅ Gray when disabled
              color: "white",
              border: "none",
              borderRadius: 5,
              cursor: talamShow ? "not-allowed" : "pointer", // ✅ Change cursor
              opacity: talamShow ? 0.7 : 1, // ✅ Reduce opacity for a disabled look
            }}
          >
            Play
          </button>

          {selectedEventNumber >= 0 && (
            <button
              onClick={clickStartEvent}
              disabled={talamShow}
              style={{
                padding: "10px 20px",
                margin: "5px",
                backgroundColor: talamShow ? "#ccc" : "#87CEFA", // ✅ Gray when disabled
                color: "white",
                border: "none",
                borderRadius: 5,
                cursor: talamShow ? "not-allowed" : "pointer", // ✅ Change cursor
                opacity: talamShow ? 0.7 : 1, // ✅ Reduce opacity for a disabled look
              }}
            >
              Set Start
            </button>
          )}

          {selectedEventNumber >= 0 && (
            <button
              onClick={clickEndEvent}
              disabled={talamShow}
              style={{
                padding: "10px 20px",
                margin: "5px",
                backgroundColor: talamShow ? "#ccc" : "#87CEFA", // ✅ Gray when disabled
                color: "white",
                border: "none",
                borderRadius: 5,
                cursor: talamShow ? "not-allowed" : "pointer", // ✅ Change cursor
                opacity: talamShow ? 0.7 : 1, // ✅ Reduce opacity for a disabled look
              }}
            >
              Set End
            </button>
          )}

          {selectedEventNumber >= 0 && (
            <button
              onClick={clearSelections}
              disabled={talamShow}
              style={{
                padding: "10px 20px",
                margin: "5px",
                backgroundColor: talamShow ? "#ccc" : "#87CEFA", // ✅ Gray when disabled
                color: "white",
                border: "none",
                borderRadius: 5,
                cursor: talamShow ? "not-allowed" : "pointer", // ✅ Change cursor
                opacity: talamShow ? 0.7 : 1, // ✅ Reduce opacity for a disabled look
              }}
            >
              Clear Selection
            </button>
          )}

          {/* <button
            onClick={pauseTimer}
            style={{
              padding: "10px 20px",
              margin: "5px",
              backgroundColor: "#ff5722",
              color: "white",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
            }}
          >
            Pause
          </button>
          <button
            onClick={stopTimer}
            style={{
              padding: "10px 20px",
              margin: "5px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
            }}
          >
            Stop
          </button> */}
        </div>
      </div>
      <>
        {tables.map((rows, tableIndex) => (
          <>
            <h3>{tableHeaderrs[tableIndex]}</h3>
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                border: "2px solid black",
              }}
            >
              <tbody>
                {rows.map((row, rowIndex) => {
                  return (
                    <>
                      <tr key={rowIndex + "s"}>
                        {row.map((item, columnIndex) => {
                          // Calculate the global index based on row and column
                          const globalIndexStart =
                            startEventForTable(tableIndex) +
                            rowIndex *
                              images.length *
                              notesPerBeatForTable[tableIndex] +
                            columnIndex * notesPerBeatForTable[tableIndex];

                          return (
                            <td
                              key={columnIndex}
                              style={{
                                border: "1px solid black", // Border for each cell
                                padding: "10px",
                                textAlign: "center",
                                backgroundColor:
                                  images[columnIndex] === 0
                                    ? "lightgrey"
                                    : "transparent",
                                color: "blue",
                              }}
                            >
                              {item.map((note, noteIndex) => {
                                const globalIndex =
                                  startEventForTable(tableIndex) +
                                  rowIndex *
                                    images.length *
                                    notesPerBeatForTable[tableIndex] +
                                  columnIndex *
                                    notesPerBeatForTable[tableIndex] +
                                  noteIndex;
                                return (
                                  <span
                                    key={globalIndex}
                                    id={`note-${rowg}-${colg}-${globalIndex}`}
                                    onClick={() => handleClick(globalIndex)}
                                    style={getNoteStyle(
                                      globalIndex,
                                      globalIndexStart,
                                      tableIndex
                                    )}
                                  >
                                    {note.note}
                                  </span>
                                );
                              })}
                            </td>
                          );
                        })}
                      </tr>
                      <tr key={rowIndex}>
                        {row.map((item, columnIndex) => {
                          // Calculate the global index based on row and column
                          const globalIndexStart =
                            startEventForTable(tableIndex) +
                            rowIndex *
                              images.length *
                              notesPerBeatForTable[tableIndex] +
                            columnIndex * notesPerBeatForTable[tableIndex];

                          return (
                            <td
                              key={columnIndex}
                              style={{
                                border: "1px solid black", // Border for each cell
                                padding: "10px",
                                textAlign: "center",
                                backgroundColor:
                                  images[columnIndex] === 0
                                    ? "lightgrey"
                                    : "transparent",
                                color: "red",
                              }}
                            >
                              {item.map((note, noteIndex) => {
                                const globalIndex =
                                  startEventForTable(tableIndex) +
                                  rowIndex *
                                    images.length *
                                    notesPerBeatForTable[tableIndex] +
                                  columnIndex *
                                    notesPerBeatForTable[tableIndex] +
                                  noteIndex;
                                return (
                                  <span
                                    key={globalIndex}
                                    id={`note-${rowg}-${colg}-${globalIndex}`}
                                    onClick={() => handleClick(globalIndex)}
                                    style={getNoteStyle(
                                      globalIndex,
                                      globalIndexStart,
                                      tableIndex
                                    )}
                                  >
                                    {note.lyric === "" ? ";" : note.lyric}
                                  </span>
                                );
                              })}
                            </td>
                          );
                        })}
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
            <hr></hr>
          </>
        ))}
      </>
    </>
  );
};

export default PreviewMusicGeethamComponent;
