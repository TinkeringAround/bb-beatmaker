import * as Tone from "tone";
import { Knob } from "../../knob/knob";

export const createFilterControls = (filter: Tone.Filter) => {
  const frequencyKnob = Knob.create(
    filter.frequency.value,
    0.1,
    20000,
    1,
    "Frequenz",
    "Hz",
    120
  );

  frequencyKnob.onValueChange = value => {
    filter.set({
      frequency: value
    });
  };

  return [frequencyKnob];
};
