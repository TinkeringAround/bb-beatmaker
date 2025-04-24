import * as Tone from "tone";

import { InstrumentTypes, Triggerable } from "../../models/model";

export class Instrument {
  // @ts-ignore
  private _instrument: Triggerable;

  set type(type: InstrumentTypes) {
    if (this._instrument) {
      this.dispose();
    }

    switch (type) {
      case InstrumentTypes.amSynth:
        this._instrument = new Tone.AMSynth();
        break;
      case InstrumentTypes.duoSynth:
        this._instrument = new Tone.DuoSynth();
        break;
      case InstrumentTypes.fmSynth:
        this._instrument = new Tone.FMSynth();
        break;
      case InstrumentTypes.membraneSynth:
        this._instrument = new Tone.MembraneSynth();
        break;
      case InstrumentTypes.metalSynth:
        this._instrument = new Tone.MetalSynth();
        break;
      case InstrumentTypes.monoSynth:
        this._instrument = new Tone.MonoSynth();
        break;
      case InstrumentTypes.noiseSynth:
        this._instrument = new Tone.NoiseSynth();
        break;
      case InstrumentTypes.pluckSynth:
        this._instrument = new Tone.PluckSynth();
        break;
      case InstrumentTypes.polySynth:
        this._instrument = new Tone.PolySynth();
        break;
      case InstrumentTypes.synth:
        this._instrument = new Tone.Synth();
        break;
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
