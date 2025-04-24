import { Keys } from "../components/beatmaker/keys";
import { Instrument } from "../components/beatmaker/instrument";
import { DomService } from "./dom.service";
import { AudioService } from "./audio.service";
import {
  InstrumentTypes,
  Allowed,
  AUDIO_TYPES,
  AudioNodeTypes,
} from "../models/model";
import { createAudioNode } from "../models/nodes";

export class BeatmakerService {
  static keys: Keys = new Keys();
  static instrument: Instrument = new Instrument(InstrumentTypes.synth);
  static chain: any[] = [];

  static wire(text: string) {
    const state = BeatmakerService.parse(text);

    // reset all chained nodes
    BeatmakerService.resetChain();

    ([...Object.keys(state)] as Allowed[]).forEach((key) => {
      if (key == "bpm") {
        AudioService.bpm = state[key];
      } else if (key == "keys") {
        BeatmakerService.keys.keys = state["keys"].split(" ") as string[];
      } else if (key == "instrument") {
        if (state[key].hasOwnProperty("synth")) {
          BeatmakerService.instrument.type = state[key].synth;
        }

        BeatmakerService.instrument.set(state[key]);
      } else if (AUDIO_TYPES.includes(key as AudioNodeTypes)) {
        BeatmakerService.chain.push(
          createAudioNode(key as AudioNodeTypes).set({
            ...state[key],
          })
        );
      }
    });

    BeatmakerService.keys.connect(BeatmakerService.instrument.get());

    if (BeatmakerService.chain.length > 0) {
      BeatmakerService.instrument.chain(BeatmakerService.chain);
      BeatmakerService.chain[BeatmakerService.chain.length - 1].toDestination();
    } else {
      BeatmakerService.instrument.get().toDestination();
    }

    BeatmakerService.keys.start();
  }

  static getNodes() {
    return [
      DomService.createElement({
        innerHTML: `<h1>Keys</h1>
        <span><b>${BeatmakerService.keys.keys.join(" ")}</b></span>`,
      }),
      DomService.createElement({
        innerHTML: `<h1>${
          BeatmakerService.instrument.get().name
        }</h1>${BeatmakerService.format(
          BeatmakerService.instrument.get().get(),
          true,
          "instrument."
        )}`,
      }),
      ...BeatmakerService.chain.map((node) =>
        DomService.createElement({
          innerHTML: `<h1>${node.name}</h1>${BeatmakerService.format(
            node.get()
          )}`,
        })
      ),
    ];
  }

  static format(item: any, asHTML = true, prefix = ""): string {
    return Object.entries(item)
      .map(([key, val]) => {
        if (typeof val === "object" && val !== null) {
          return BeatmakerService.format(val, asHTML, `${prefix}${key}.`);
        } else {
          return asHTML
            ? `<span>${prefix}${key}: ${val}</span>`
            : `${prefix}${key}: ${val}`;
        }
      })
      .flat()
      .join("\n");
  }

  private static resetChain() {
    BeatmakerService.chain.forEach((node) => {
      node.disconnect();
      node.dispose();
    });
    BeatmakerService.chain = [];
  }

  private static parse(text: string) {
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"));

    const state: Record<Allowed, any> = {} as Record<Allowed, any>;

    for (const line of lines) {
      const [key, rawValue] = line.split(":").map((s) => s.trim());
      const value = BeatmakerService.parseValue(rawValue);

      if (value) {
        BeatmakerService.setDeepValue(state, key.split("."), value);
      }
    }

    return state;
  }

  private static parseValue(val: string): any {
    try {
      if (val.startsWith("[") && val.endsWith("]")) {
        return JSON.parse(val);
      }

      const num = Number(val);
      return isNaN(num) ? val : num;
    } catch (_) {
      return undefined;
    }
  }

  private static setDeepValue(state: any, path: string[], value: any) {
    let updated = state;
    for (let i = 0; i < path.length - 1; i++) {
      if (!updated[path[i]]) {
        updated[path[i]] = {};
      }

      updated = updated[path[i]];
    }

    updated[path[path.length - 1]] = value;
  }
}
