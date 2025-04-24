import * as Tone from "tone";

import { AudioType } from "./model";
export const createAudioNode = (type: AudioType) => {
  switch (type) {
    case "bitcrusher":
      return new Tone.BitCrusher(4);
    case "chorus":
      return new Tone.Chorus(4, 2.5, 0.5);
    case "distortion":
      return new Tone.Distortion(0.5);
    case "highpass":
      return new Tone.Filter(40, "highpass", -12);
    case "lowpass":
      return new Tone.Filter(40, "lowpass", -12);
    case "reverb":
      return new Tone.Reverb(10);
    case "synthesizer":
      const sounds = ["sine", "square", "triangle", "sawtooth"];
      return new Tone.Synth({
        oscillator: {
          type: sounds[Math.floor(Math.random() * sounds.length)] as any
        },
        envelope: {
          attack: 0.5,
          decay: 0.9,
          sustain: 0.95,
          release: 1.0
        }
      });
    case "volume":
      return new Tone.Volume(-12);
  }
};
