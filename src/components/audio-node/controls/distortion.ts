import * as Tone from "tone";
import { Knob } from "../../knob/knob";

export const createDistortionControls = (distortion: Tone.Distortion) => {
  const knob = Knob.create(distortion.distortion, 0, 1, 0.1, "Amount", "", 120);

  knob.onValueChange = value => {
    distortion.set({
      distortion: value
    });
  };

  return [knob];
};
