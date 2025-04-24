export const AUDIO_TYPES = [
  "bitcrusher",
  "chorus",
  "distortion",
  "highpass",
  "lowpass",
  "reverb",
  "synthesizer",
  "volume"
] as const;
export type AudioType = typeof AUDIO_TYPES[number];

export const INSTRUMENTS: AudioType[] = ["synthesizer"];
export const UTILS: AudioType[] = ["volume"];
export const EFFECTS: AudioType[] = [
  "bitcrusher",
  "chorus",
  "distortion",
  "reverb"
];
export const FILTERS: AudioType[] = ["highpass", "lowpass"];
