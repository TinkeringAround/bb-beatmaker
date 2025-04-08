export const AUDIO_TYPES = ["synthesizer", "volume"] as const;
export type AudioType = typeof AUDIO_TYPES[number];

export const INSTRUMENTS: AudioType[] = ["synthesizer"];
export const UTILS: AudioType[] = ["volume"];