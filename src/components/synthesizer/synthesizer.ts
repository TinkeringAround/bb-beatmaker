// @ts-ignore
import * as Tone from "tone";

import { WebComponent } from "../webcomponent";
import { createStyles } from "./synthesizer.styles";
import { DomService } from "../../services/dom.service";

export class Synthesizer extends WebComponent {
  static tag = "bb-synthesizer";

  readonly Synth: Tone.Synth = new Tone.Synth({
    oscillator: {
      type: "sine"
    },
    envelope: {
      attack: 0.5,
      decay: 0.9,
      sustain: 0.95,
      release: 1.0
    }
  }).toDestination();

  private readonly content = DomService.createElement({ part: "content" });

  get node() {
    return this.Synth;
  }

  static create() {
    return document.createElement(Synthesizer.tag) as Synthesizer;
  }

  constructor() {
    super();

    this.attachShadow({ mode: "closed" }).append(
      createStyles(),
      DomService.createElement({ tag: "h1", textContent: "Synthesizer" }),
      this.content
    );
  }

  connectedCallback() {
    this.content.innerHTML = `${this.Synth.oscillator.type}`;
  }

  disconnectedCallback() {
    this.Synth.dispose();
  }
}
