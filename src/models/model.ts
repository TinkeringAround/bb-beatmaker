import * as Tone from "tone";

export const KEYS = ["bpm", "keys", "instrument"];

export const AUDIO_TYPES = [
  "autofilter",
  "autopanner",
  "autowah",
  "bitcrusher",
  "chebyshev",
  "chorus",
  "delay",
  "distortion",
  "feeverb",
  "frequencyshifter",
  "phaser",
  "pingpongdelay",
  "pitchshift",
  "reverb",
  "stereowidener",
  "trembolo",
  "vibrato",

  // Control - Dynamics
  "compressor",
  "eq",
  "highpass",
  "lowpass",
  "gate",
  "limiter",
  "midsidecompressor",
  "multibandcompressor",

  // Util
  "gain",
  "panner",
  "volume",
] as const;
export type AudioNodeTypes = (typeof AUDIO_TYPES)[number];
export type Allowed = AudioNodeTypes | (typeof KEYS)[number];

export enum InstrumentTypes {
  amSynth = "am",
  duoSynth = "duo",
  fmSynth = "fm",
  membraneSynth = "membrane",
  metalSynth = "metal",
  monoSynth = "mono",
  noiseSynth = "noise",
  pluckSynth = "pluck",
  polySynth = "poly",
  synth = "synth",
}

export type Triggerable =
  | Tone.AMSynth
  | Tone.DuoSynth
  | Tone.FMSynth
  | Tone.MembraneSynth
  | Tone.MetalSynth
  | Tone.MonoSynth
  | Tone.NoiseSynth
  | Tone.PluckSynth
  | Tone.PolySynth
  | Tone.Synth;
