import * as Tone from "tone";
import { Knob } from "../../knob/knob";

export const createVolumeControls = (volume: Tone.Volume) => {
  const knob = Knob.create(volume.volume.value, -48, 48, 1, "Volume", "db", 120);

  knob.onValueChange = value => {
    volume.set({
      volume: value
    });
  };

  return [knob];
};
