import * as Tone from "tone";

// Define available instrument types
export type InstrumentType = "Flute" | "Violin" | "Pluck" | "fm" | "Mono" | "Basic" | "Veena";

// Union type to represent the possible instrument classes
export type SynthInstrument = 
  | Tone.Synth
  | Tone.MonoSynth
  | Tone.PluckSynth
  | Tone.FMSynth;

export class InstrumentFactory {
  // This method returns a specific type of synth based on the `type` parameter
  static createInstrument(type: InstrumentType): SynthInstrument {
    switch (type) {
      case "Flute":
        return new Tone.MonoSynth({
            oscillator: {
              type: "triangle", // Try triangle or sawtooth for a richer sound
            },
            envelope: {
              attack: 0.3, // Increase attack time for a smoother start
              decay: 0.1,
              sustain: 0.7, // Increase sustain for a fuller sound
              release: 1.2, // Keep release at a moderate level
            },
            filterEnvelope: {
              attack: 0.1,
              decay: 0.3,
              sustain: 0.5,
              release: 1.5,
              baseFrequency: 300,
              octaves: 4, // Increase octaves to make it brighter
            }
          });

          case "Violin": {
            const synth = new Tone.MonoSynth({
              oscillator: {
                type: "sawtooth", // rich harmonics for string-like tone
              },
              envelope: {
                attack: 0.5,
                decay: 0.2,
                sustain: 0.9,
                release: 1.8,
              },
              filterEnvelope: {
                attack: 0.2,
                decay: 0.4,
                sustain: 0.5,
                release: 2.0,
                baseFrequency: 200,
                octaves: 3,
              }
            });
          
            const vibrato = new Tone.Vibrato({
              frequency: 5,
              depth: 0.1,
            });
          
            const reverb = new Tone.Reverb({
              decay: 3,
              preDelay: 0.2,
            }).toDestination();
          
            // Chain the effects
            synth.connect(vibrato);
            vibrato.connect(reverb);
          
            return synth;
          }
          

      case "Pluck":
        return new Tone.PluckSynth();

      case "fm":
        return new Tone.FMSynth();

      case "Mono":
        return new Tone.MonoSynth({
          oscillator: { type: "square" }
        });
        case "Veena":
  return new Tone.MonoSynth({
    oscillator: {
      type: "triangle" // String instruments often have softer waveforms like sine or triangle
    },
    envelope: {
      attack: 0.1,  // Quick attack for a pluck-like sound
      decay: 0.2,   // A short decay, mimicking the pluck of a string
      sustain: 0.5, // Sustain to hold the string sound
      release: 1.5  // Smooth release after the note is finished
    },
    filter: {
      frequency: 1000,  // Low-pass filter to shape the tone
      Q: 5,             // Higher resonance for richness
      type: "lowpass"   // Low-pass to reduce high frequencies, creating a more string-like sound
    },
    filterEnvelope: {
      attack: 0.05,    // Filter attack to make the sound smoother at the start
      decay: 0.2,      // Similar decay to the overall sound
      sustain: 0.3,    // Sustain for the richness of the sound
      release: 1.5,    // Smooth release of the filter when the note is released
      baseFrequency: 1000, // Lower the base frequency for deeper tones
      octaves: 3       // Extend the frequency range for better tonal dynamics
    }
  });


      case "Basic":
      default:
        return new Tone.Synth();
    }
  }
}
