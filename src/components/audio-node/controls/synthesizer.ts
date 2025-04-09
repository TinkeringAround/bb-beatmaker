import * as Tone from "tone";
import { Knob } from "../../knob/knob";
import { Selection } from "../../selection/selection";
import {
  SelectionEvents,
  SelectionValueChangeEvent
} from "../../selection/events";

export const createSynthesizerControls = (synth: Tone.Synth) => {
  const typeSelection = Selection.create([
    "sine",
    "square",
    "triangle",
    "sawtooth",
    "custom"
  ]);
  typeSelection.value = synth.oscillator.type;

  const attackKnob = Knob.create(
    synth.envelope.attack.value,
    0,
    2,
    0.01,
    "Attack",
    "s",
    60
  );
  const decayKnob = Knob.create(
    synth.envelope.decay.value,
    0,
    2,
    0.01,
    "Decay",
    "s",
    60
  );
  const sustainKnob = Knob.create(
    synth.envelope.sustain.value,
    0,
    1,
    0.01,
    "Sustain",
    "s",
    60
  );
  const releaseKnob = Knob.create(
    synth.envelope.release.value,
    0.01,
    5,
    0.01,
    "Release",
    "s",
    60
  );

  typeSelection.addEventListener(SelectionEvents.valueChange, event => {
    const type = (event as SelectionValueChangeEvent).detail;
    const isCustom = type == "custom";

    if (isCustom) {
      synth.set({
        oscillator: {
          type: "custom",
          partials: [...Array(6)].map(_ => Math.random())
        }
      });
      return;
    }

    synth.set({
      oscillator: {
        type
      }
    });
  });

  attackKnob.onValueChange = value => {
    synth.set({
      envelope: {
        attack: value
      }
    });
  };

  decayKnob.onValueChange = value => {
    synth.set({
      envelope: {
        decay: value
      }
    });
  };

  sustainKnob.onValueChange = value => {
    synth.set({
      envelope: {
        sustain: value
      }
    });
  };

  releaseKnob.onValueChange = value => {
    synth.set({
      envelope: {
        release: value
      }
    });
  };

  return [typeSelection, attackKnob, decayKnob, sustainKnob, releaseKnob];
};
