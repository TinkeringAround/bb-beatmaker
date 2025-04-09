import { AudioType } from "../model";
import { createBitcrusherControls } from "./bitcrusher";
import { createDistortionControls } from "./distortion";
import { createReverbControls } from "./reverb";
import { createVolumeControls } from "./volume";
import { createChorusControls } from "./chorus";
import { createFilterControls } from "./filter";
import { createSynthesizerControls } from "./synthesizer";

export const createControls = (type: AudioType, node: any) => {
  switch (type) {
    case "bitcrusher":
      return createBitcrusherControls(node);
    case "chorus":
      return createChorusControls(node);
    case "distortion":
      return createDistortionControls(node);
    case "highpass":
    case "lowpass":
      return createFilterControls(node);
    case "reverb":
      return createReverbControls(node);
    case "synthesizer":
      return createSynthesizerControls(node);
    case "volume":
      return createVolumeControls(node);
  }
};
