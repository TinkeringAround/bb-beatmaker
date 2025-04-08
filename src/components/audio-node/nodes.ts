// @ts-ignore
import * as Tone from "tone";

import { AudioType } from "./model";
export const createAudioNode = (type: AudioType) => {
  switch (type) {
    case "synthesizer":
      const sounds = ["sine", "square", "triangle", "sawtooth"];
      return new Tone.Synth({
        oscillator: {
          type: sounds[Math.floor(Math.random() * sounds.length)] as any,
        },
        envelope: {
          attack: 0.5,
          decay: 0.9,
          sustain: 0.95,
          release: 1.0,
        },
      }).toDestination();
    case "volume":
      return new Tone.Volume(-12);
  }
};
