// @ts-ignore
import * as Tone from "tone";

import { AudioType } from "./model";
import { DomService } from "../../services/dom.service";

export const createControls = (type: AudioType, node: any) => {
  switch (type) {
    case "synthesizer":
      const synth = node as Tone.Synth;
      return [
        DomService.createElement({
          tag: "span",
          textContent: `${synth.oscillator.type}`,
        }),
      ];
    case "volume":
      const volume = node as Tone.Volume;
      return [
        DomService.createElement({
          tag: "span",
          textContent: `${volume.volume.value}db`,
        }),
      ];
  }
};
