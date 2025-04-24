import * as Tone from "tone";
import { Knob } from "../../knob/knob";

export const createReverbControls = (reverb: Tone.Reverb) => {
  const knob = Knob.create(reverb.decay, 0, 20, 0.01, "Decay", "s", 120);

  knob.onValueChange = value => {
    reverb.set({
      decay: value
    });
  };

  return [knob];
};
