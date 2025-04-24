import * as Tone from "tone";

import { AudioNodeTypes } from "./model";

export const createAudioNode = (type: AudioNodeTypes) => {
  switch (type) {
    // EFFECTS
    case "autofilter":
      return new Tone.AutoFilter("4n");
    case "autopanner":
      return new Tone.AutoPanner("4n");
    case "autowah":
      return new Tone.AutoWah(50, 6, -30);
    case "bitcrusher":
      return new Tone.BitCrusher(4);
    case "chebyshev":
      return new Tone.Chebyshev(50);
    case "chorus":
      return new Tone.Chorus(4, 2.5, 0.5);
    case "delay":
      return new Tone.Delay();
    case "distortion":
      return new Tone.Distortion(0.5);
    case "feeverb":
      return new Tone.Freeverb();
    case "frequencyshifter":
      return new Tone.FrequencyShifter(42);
    case "phaser":
      return new Tone.Phaser({
        frequency: 15,
        octaves: 5,
        baseFrequency: 1000,
      });
    case "pingpongdelay":
      return new Tone.PingPongDelay("4n", 0.2);
    case "pitchshift":
      return new Tone.PitchShift();
    case "reverb":
      return new Tone.Reverb(10);
    case "stereowidener":
      return new Tone.StereoWidener(0.5);
    case "trembolo":
      return new Tone.Tremolo(9, 0.75);
    case "vibrato":
      return new Tone.Vibrato(50, 0.2);

    // Control - Dynamics
    case "compressor":
      return new Tone.Compressor(-30, 3);
    case "eq":
      return new Tone.EQ3();
    case "highpass":
      return new Tone.Filter(40, "highpass", -12);
    case "lowpass":
      return new Tone.Filter(40, "lowpass", -12);
    case "gate":
      return new Tone.Gate(-30, 0.2);
    case "limiter":
      return new Tone.Limiter(-20);
    case "midsidecompressor":
      return new Tone.MidSideCompressor();
    case "multibandcompressor":
      return new Tone.MultibandCompressor();

    // Utils
    case "gain":
      return new Tone.Gain();
    case "panner":
      return new Tone.Panner(1);
    case "volume":
      return new Tone.Volume(-12);
  }
};
