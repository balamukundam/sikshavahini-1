import { useState, useRef, useEffect } from "react";
import * as Tone from "tone";

interface Props {
  nusicNotesComp: any;
}

const PreviewMusicNotesComponent = ({ nusicNotesComp }: Props) => {
  const [count, setCount] = useState(1);
  const [currentNote, setCurrentNote] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [synth, setSynth] = useState<Tone.PolySynth | null>(null);
  const [talamSynth, setTalamSynth] = useState<Tone.PolySynth | null>(null);
  const [drone, setDrone] = useState<Tone.PolySynth | null>(null);
  const [image, setImage] = useState("/images/Sunaadam.jpg");
  const [noteText, setNoteText] = useState("Start");
  const [timeInterval, setTimeInterval] = useState(1000);

  // ✅ Image paths for each count
  const images = [
    "/images/img0.jpeg",
    "/images/img1.jpeg",
    "/images/img2.jpeg",
    "/images/img3.jpeg",
    "/images/img0.jpeg",
    "/images/img6.jpeg",
    "/images/img0.jpeg",
    "/images/img6.jpeg",
  ];

  let notesPerBeatForTable: number[] = [1, 2, 3, 4];

  const basicSpeed = 800;
  // setTimeInterval(basicSpeed);

  const getNotes = (): any[] => {
    let eventNotes: any[] = [];
    let baseNbr = 60;
    let previousNoteNbr = -1;
    let noteText = "";

    nusicNotesComp["musicNotes"].split("").forEach((char: string) => {
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
      switch (char) {
        case "S":
          previousNoteNbr = baseNbr;
          noteText = char;
          break;
        case "R":
          previousNoteNbr = baseNbr + 1;
          noteText = char;
          break;
        case "G":
          previousNoteNbr = baseNbr + 4;
          noteText = char;
          break;
        case "M":
          previousNoteNbr = baseNbr + 5;
          noteText = char;
          break;
        case "P":
          previousNoteNbr = baseNbr + 7;
          noteText = char;
          break;
        case "D":
          previousNoteNbr = baseNbr + 8;
          noteText = char;
          break;
        case "N":
          previousNoteNbr = baseNbr + 11;
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
          if (beatCount == 8) {
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

  // const rows: string[][][] = eventsAndRwows.rows;

  // ✅ Get note and image based on count

  // ✅ Start Timer and Audio Context
  const startTimer = async () => {
    console.log("Starting Timer...");

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
        Tone.Frequency(55, "midi").toNote(), // C4
        Tone.Frequency(60, "midi").toNote(), // E4
        Tone.Frequency(48, "midi").toNote(), // G4
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
          console.log("started:...");
          if (prevCount === totalEvents) {
            prevCount = 0;
          }

          let getTableEventNbrs = getTableAndEventNumber(prevCount);
          let currentTable = getTableEventNbrs.tableNbr;
          let currentEvent = getTableEventNbrs.eventNbr;
          setTimeInterval(basicSpeed / notesPerBeatForTable[currentTable]);

          let thisEvent = events[currentTable][currentEvent];
          const nextNote = thisEvent.note;
          setImage(images[thisEvent.talam]);
          setNoteText(thisEvent.noteText);

          if (nextNote !== 0) {
            const noteName = Tone.Frequency(nextNote, "midi").toNote();
            // ✅ Trigger the note
            synth.triggerAttackRelease(noteName, "4n");
          }

          if (
            thisEvent.beatRequired &&
            (thisEvent.talam == 0 ||
              thisEvent.talam == 4 ||
              thisEvent.talam == 6)
          ) {
            const notesToPlay = [
              Tone.Frequency(60, "midi").toNote(), // C4
              Tone.Frequency(67, "midi").toNote(), // G4
              Tone.Frequency(72, "midi").toNote(), // C5
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
    setCurrentNote(1);
    setImage("/images/Sunaadam.jpg");
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

  return (
    <>
      <>
        {tables.map((rows, tableIndex) => (
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
                              rowIndex * 8 * notesPerBeatForTable[tableIndex] +
                              columnIndex * notesPerBeatForTable[tableIndex];
                            const globalIndex =
                              startEventForTable(tableIndex) +
                              rowIndex * 8 * notesPerBeatForTable[tableIndex] +
                              columnIndex * notesPerBeatForTable[tableIndex] +
                              noteIndex;
                            return (
                              <span
                                key={globalIndex}
                                style={{
                                  padding: "10px",
                                  textAlign: "center",
                                  backgroundColor:
                                    globalIndex <= currentNote - 1 &&
                                    globalIndexStart >=
                                      Math.floor(
                                        (currentNote - 1) /
                                          notesPerBeatForTable[tableIndex]
                                      ) *
                                        notesPerBeatForTable[tableIndex]
                                      ? "yellow"
                                      : "transparent",
                                  color:
                                    globalIndex <= currentNote - 1 &&
                                    globalIndexStart >=
                                      Math.floor(
                                        (currentNote - 1) /
                                          notesPerBeatForTable[tableIndex]
                                      ) *
                                        notesPerBeatForTable[tableIndex]
                                      ? "red"
                                      : "black",
                                }}
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
        ))}
      </>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>{noteText}</h1>
        <img
          src={image}
          alt={`Count ${count}`}
          style={{
            width: 150,
            height: 150,
            objectFit: "cover",
            borderRadius: 8,
            border: "2px solid #ccc",
          }}
        />
        <div style={{ marginTop: 20 }}>
          <button
            onClick={startTimer}
            style={{
              padding: "10px 20px",
              margin: "5px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
            }}
          >
            Start
          </button>
          <button
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
          </button>
        </div>
      </div>
    </>
  );
};

export default PreviewMusicNotesComponent;
