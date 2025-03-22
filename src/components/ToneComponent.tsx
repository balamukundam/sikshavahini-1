import { useState } from "react";
import * as Tone from "tone";

interface Props {
  notes: { note: number; duration: number }[]; // Use MIDI numbers
}

function ToneComponent({ notes }: Props) {
  const [synth, setSynth] = useState<Tone.Synth | null>(null);

  let startTime = 0;

  const handleStart = async () => {
    if (!synth) {
      await Tone.start(); // Ensure audio context is started
      const newSynth = new Tone.Synth().toDestination();
      setSynth(newSynth);

      // Play notes in sequence using MIDI numbers
      notes.forEach(({ note, duration }, index) => {
        startTime = startTime + duration;
        const time = startTime;
        const noteName = Tone.Frequency(note, "midi").toNote(); // Convert MIDI to note name
        newSynth.triggerAttackRelease(noteName, "2n", `+${time}`);
      });
    } else {
      notes.forEach(({ note, duration }, index) => {
        startTime = startTime + duration;
        const time = startTime;
        const noteName = Tone.Frequency(note, "midi").toNote();
        synth.triggerAttackRelease(noteName, "4n", `+${time}`);
      });
    }
  };

  return <button onClick={handleStart}>Play Sequence</button>;
}

export default ToneComponent;
