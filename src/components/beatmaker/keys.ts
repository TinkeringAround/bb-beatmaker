import * as Tone from "tone";

import { Triggerable } from "./model";

export class Keys {
  private sequence: Tone.Sequence = new Tone.Sequence(
    (_, __) => {},
    [] as string[],
    "8n"
  );

  set keys(keys: any[]) {
    this.sequence.events = keys;
  }

  get keys() {
    return this.sequence.events;
  }

  connect(instrument: Triggerable) {
    this.sequence.callback = (time, note) => {
      if (note != "break") {
        instrument.triggerAttackRelease(note, "8n", time);
      }
    };
  }

  start() {
    if (this.sequence.state == "stopped") {
      this.sequence.start();
    }
  }

  get() {
    return this.sequence;
  }
}
