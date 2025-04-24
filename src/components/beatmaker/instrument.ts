import * as Tone from "tone";

import { InstrumentTypes, Triggerable } from "./model";

export class Instrument {
  private _instrument: Triggerable;

  set type(type: InstrumentTypes) {
    if (this._instrument) {
      this.dispose();
    }

    switch (type) {
      case InstrumentTypes.synth:
        this._instrument = new Tone.Synth({
          oscillator: {
            type: "sine",
          },
          envelope: {
            attack: 0.5,
            decay: 0.9,
            sustain: 0.95,
            release: 1.0,
          },
        });
    }
  }

  constructor(type: InstrumentTypes) {
    this.type = type;
  }

  set(options: any) {
    this._instrument.set(options);
  }

  get() {
    return this._instrument;
  }

  chain(nodes: any[]) {
    this._instrument.disconnect();
    this._instrument.chain(...nodes);
  }

  private dispose() {
    this._instrument.disconnect();
    this._instrument.dispose();
  }
}
