import * as Tone from "tone";
import { Knob } from "../../knob/knob";

export const createChorusControls = (chorus: Tone.Chrous) => {
  const frequencyKnob = Knob.create(
    chorus.frequency.value,
    0.1,
    10,
    0.1,
    "Frequenz",
    "Hz",
    75
  );
  const delayTimeKnob = Knob.create(
    chorus.delayTime,
    0.1,
    1000,
    0.1,
    "Delay",
    "ms",
    75
  );
  const depthKnob = Knob.create(chorus.depth, 0.1, 100, 0.1, "Depth", "", 75);

  frequencyKnob.onValueChange = value => {
    chorus.set({
      bits: value
    });
  };

  delayTimeKnob.onValueChange = value => {
    chorus.set({
      delayTime: value
    });
  };

  depthKnob.onValueChange = value => {
    chorus.set({
      depth: value
    });
  };

  return [frequencyKnob, delayTimeKnob, depthKnob];
};
