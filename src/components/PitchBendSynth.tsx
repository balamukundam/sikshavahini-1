// PitchBendSynth.tsx
import React, { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import {
  InstrumentFactory,
  InstrumentType,
  SynthInstrument,
} from "../services/InstrumentFactory";

const PitchBendSynth = () => {
  const synthRef = useRef<SynthInstrument | null>(null); // Use SynthInstrument type
  const pitchShiftRef = useRef<Tone.PitchShift | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pitch, setPitch] = useState(0);
  const [instrument, setInstrument] = useState<InstrumentType>("Flute");

  useEffect(() => {
    pitchShiftRef.current = new Tone.PitchShift().toDestination();

    const instrumentInstance = InstrumentFactory.createInstrument(instrument);
    instrumentInstance.connect(pitchShiftRef.current);
    synthRef.current = instrumentInstance;

    return () => {
      synthRef.current?.dispose();
      pitchShiftRef.current?.dispose();
    };
  }, [instrument]);

  const handlePlay = async () => {
    await Tone.start();
    (synthRef.current as any)?.triggerAttack?.("C4");
    setIsPlaying(true);
  };

  const handleStop = () => {
    (synthRef.current as any)?.triggerRelease?.();
    setIsPlaying(false);
  };

  const handlePitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPitch = parseFloat(e.target.value);
    setPitch(newPitch);
    if (pitchShiftRef.current) {
      pitchShiftRef.current.pitch = newPitch;
    }
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h2>🎼 Instrument Player with Pitch Bend</h2>

      <label>
        Choose Instrument:
        <select
          value={instrument}
          onChange={(e) => setInstrument(e.target.value as InstrumentType)}
          style={{ marginLeft: "1rem" }}
        >
          <option value="Flute">Flute</option>
          <option value="Pluck">Pluck</option>
          <option value="fm">FM Synth</option>
          <option value="mono">Mono Synth</option>
          <option value="Basic">Basic Synth</option>
          <option value="veena">Veena</option>
        </select>
      </label>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={handlePlay} disabled={isPlaying}>
          ▶️ Play Note
        </button>
        <button onClick={handleStop} disabled={!isPlaying}>
          ⏹️ Stop
        </button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label>
          Pitch Shift: {pitch} semitones
          <input
            type="range"
            min="-12"
            max="12"
            step="0.1"
            value={pitch}
            onChange={handlePitchChange}
            style={{ width: "300px", display: "block", marginTop: "0.5rem" }}
          />
        </label>
      </div>
    </div>
  );
};

export default PitchBendSynth;
