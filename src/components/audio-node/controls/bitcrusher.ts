import * as Tone from "tone";
import { Knob } from "../../knob/knob";

export const createBitcrusherControls = (bitcrusher: Tone.Bitcrusher) => {
  const knob = Knob.create(bitcrusher.bits.value, 1, 16, 1, "Bits", "",120);

  knob.onValueChange = value => {
    bitcrusher.set({
      bits: value
    });
  };

  return [knob];
};
