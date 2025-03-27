import { useState, useRef, useEffect } from "react";
import * as Tone from "tone";
import { musicSets } from "../services/dataTypes";

interface Props {
  musicNotesComp: any;
  musicSettings: musicSets;
  talamShow: boolean;
  stopPlayClicked: boolean;
  rowg: number;
  colg: number;
  updateTalam: (image: string, note: string) => void;
}

const PreviewMusicNotesComponent = ({
  musicNotesComp,
  musicSettings,
  talamShow,
  stopPlayClicked,
  rowg,
  colg,
  updateTalam,
}: Props) => {
  const [count, setCount] = useState(1);
  const [currentNote, setCurrentNote] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [synth, setSynth] = useState<Tone.PolySynth | null>(null);
  const [talamSynth, setTalamSynth] = useState<Tone.PolySynth | null>(null);
  const [drone, setDrone] = useState<Tone.PolySynth | null>(null);
  const [image, setImage] = useState("/images/Sunaadam.jpg");
  const [noteText, setNoteText] = useState("Start");
  const [timeInterval, setTimeInterval] = useState(1000);
  const [startEventNumber, setStartEventNumber] = useState(0);
  const [endEventNumber, setEndEventNumber] = useState(0);
  const [selectedEventNumber, setSelectedEventNumber] = useState(-1);

  // ✅ Image paths for each count
  let images = [
    "/images/img0.jpeg",
    "/images/img1.jpeg",
    "/images/img2.jpeg",
    "/images/img3.jpeg",
    "/images/img0.jpeg",
    "/images/img6.jpeg",
    "/images/img0.jpeg",
    "/images/img6.jpeg",
  ];

  useEffect(() => {
    console.log("musicNotesComp changed! Recalculating...");
    // Add your recalculation logic here
  }, [musicNotesComp]);

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
  if (checkValidTalamNumbers(musicNotesComp.talamSeq, 0, 6)) {
    images = musicNotesComp.talamSeq
      .split(",") // Split by comma
      .map((num: string) => num.trim()) // Trim spaces
      .map((num: string) => `/images/img${num}.jpeg`); // Format as "image-0x"
  }

  const showTalam = (image: string, noteText: string) => {
    setImage(image);
    setNoteText(noteText);
    updateTalam(image, noteText);
  };

  let notesPerBeatForTable: number[] = [1, 2];
  if (checkValidTalamNumbers(musicNotesComp.speeds, 1, 4)) {
    notesPerBeatForTable = musicNotesComp.speeds
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

  const getNotes = (): any[] => {
    let eventNotes: any[] = [];
    let previousNoteNbr = -1;
    let noteText = "";

    musicNotesComp["musicNotes"].split("").forEach((char: string) => {
      if (
        char == "S" ||
        char == "R" ||
        char == "G" ||
        char == "M" ||
        char == "P" ||
        char == "D" ||
        char == "N" ||
        char == ";"
      ) {
        if (previousNoteNbr != -1) {
          eventNotes.push({
            note: previousNoteNbr,
            noteText: noteText,
          });
        }
        previousNoteNbr = -1;
      }
      let Radd = 0;
      let Gadd = 0;
      let Madd = 5;
      let Dadd = 0;
      let Nadd = 0;
      let melanumber36: number = musicSettings.melakarta;
      if (melanumber36 > 36) {
        melanumber36 = melanumber36 - 36;
        Madd = 6;
      }
      let melaBy6 = Math.ceil(melanumber36 / 6);
      let melaRem6 = melanumber36 % 6;

      switch (melaBy6) {
        case 1:
          Radd = 1;
          Gadd = 2;
          break;
        case 2:
          Radd = 1;
          Gadd = 3;
          break;
        case 3:
          Radd = 1;
          Gadd = 4;
          break;
        case 4:
          Radd = 2;
          Gadd = 3;
          break;
        case 5:
          Radd = 2;
          Gadd = 4;
          break;
        case 6:
          Radd = 3;
          Gadd = 4;
          break;
      }
      switch (melaRem6) {
        case 1:
          Dadd = 8;
          Nadd = 9;
          break;
        case 2:
          Dadd = 8;
          Nadd = 10;
          break;
        case 3:
          Dadd = 8;
          Nadd = 11;
          break;
        case 4:
          Dadd = 9;
          Nadd = 10;
          break;
        case 5:
          Dadd = 9;
          Nadd = 11;
          break;
        case 0:
          Dadd = 10;
          Nadd = 11;
          break;
      }

      switch (char) {
        case "S":
          previousNoteNbr = baseNbr;
          noteText = char;
          break;
        case "R":
          previousNoteNbr = baseNbr + Radd;
          noteText = char;
          break;
        case "G":
          previousNoteNbr = baseNbr + Gadd;
          noteText = char;
          break;
        case "M":
          previousNoteNbr = baseNbr + Madd;
          noteText = char;
          break;
        case "P":
          previousNoteNbr = baseNbr + 7;
          noteText = char;
          break;
        case "D":
          previousNoteNbr = baseNbr + Dadd;
          noteText = char;
          break;
        case "N":
          previousNoteNbr = baseNbr + Nadd;
          noteText = char;
          break;
        case ";":
          previousNoteNbr = 0;
          noteText = char;
          break;

        case "-":
          previousNoteNbr = previousNoteNbr - 12;
          noteText = noteText + "\u0323";
          break;
        case "+":
          previousNoteNbr = previousNoteNbr + 12;
          noteText = noteText + "\u0307";
          break;
      }
    });
    if (previousNoteNbr != -1) {
      eventNotes.push({
        note: previousNoteNbr,
        noteText: noteText,
      });
    }
    return eventNotes;
  };
  const getEvents = (notes: any[], notesPerBeat: number): any => {
    let thisEvents: any[] = [];
    let thisRows: string[][][] = [];
    let beatCount: number = 0;
    let noteCount: number = 0;
    let cellText: string[] = [];
    let row: string[][] = [];
    let bTalamStarted: Boolean = true;
    while (bTalamStarted) {
      for (let i = 0; i < notes.length; i++) {
        bTalamStarted = true;
        thisEvents.push({
          note: notes[i].note,
          noteText: notes[i].noteText,
          beatRequired: noteCount == 0,
          talam: beatCount,
        });
        cellText.push(notes[i].noteText);

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

  // ✅ MIDI note values (C4, C#4, E4, F4, G4, G#4, B4, C5)
  const notes = getNotes();

  const events: any[] = [];
  const tables: string[][][][] = [];
  let totalEvents = 0;

  notesPerBeatForTable.forEach((nbp) => {
    let eventsAndRwows = getEvents(notes, nbp);

    events.push(eventsAndRwows.events);
    tables.push(eventsAndRwows.rows);
    totalEvents = totalEvents + eventsAndRwows.events.length;
  });

  const getEventsCount = (): number => {
    totalEvents = 0;
    events.forEach((items) => {
      totalEvents = totalEvents + items.length;
    });
    return totalEvents;
  };

  // const rows: string[][][] = eventsAndRwows.rows;

  // ✅ Get note and image based on count

  // ✅ Start Timer and Audio Context
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

    // ✅ Initialize Synth for Playing Notes
    if (!synth) {
      console.log("Initializing Synth...");
      const newSynth = new Tone.PolySynth(Tone.Synth).toDestination();
      setSynth(newSynth);
    }
    if (!talamSynth) {
      console.log("Initializing Synth...");
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
          console.log("start:...", startEventNumber);
          console.log("end:...", endEventNumber);

          console.log("started:...");
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
          showTalam(images[thisEvent.talam], thisEvent.noteText);

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
            synth.triggerAttackRelease(noteName, "4n");
          }

          if (
            thisEvent.beatRequired &&
            images[thisEvent.talam] === "/images/img0.jpeg"
          ) {
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
      synth.releaseAll(); // Stop playing notes
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
      color: "black",
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
            <h3>Notes per beat = {notesPerBeatForTable[tableIndex]} </h3>
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
                    <tr key={rowIndex}>
                      {row.map((item, columnIndex) => {
                        // Calculate the global index based on row and column
                        return (
                          <td
                            key={columnIndex}
                            style={{
                              border: "1px solid black", // Border for each cell
                              padding: "10px",
                              textAlign: "center",
                            }}
                          >
                            {item.map((note, noteIndex) => {
                              const globalIndexStart =
                                startEventForTable(tableIndex) +
                                rowIndex *
                                  images.length *
                                  notesPerBeatForTable[tableIndex] +
                                columnIndex * notesPerBeatForTable[tableIndex];
                              const globalIndex =
                                startEventForTable(tableIndex) +
                                rowIndex *
                                  images.length *
                                  notesPerBeatForTable[tableIndex] +
                                columnIndex * notesPerBeatForTable[tableIndex] +
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
                                  {note}
                                </span>
                              );
                            })}
                          </td>
                        );
                      })}
                    </tr>
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

export default PreviewMusicNotesComponent;
