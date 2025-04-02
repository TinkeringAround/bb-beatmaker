// @ts-ignore
import * as Tone from "tone";

import { WebComponent } from "../webcomponent";
import { createStyles } from "./sequencer.styles";
import { DomService } from "../../services/dom.service";

export class Sequencer extends WebComponent {
  static tag = "bb-sequencer";

  private Sequence = new Tone.Sequence(
    // @ts-ignore
    (time, note) => {},
    ["F#1"],
    "8n"
  ).start();

  private notes = ["F#1"];

  private readonly content = DomService.createElement({ part: "content" });

  get node() {
    return this.Sequence;
  }

  static create() {
    return document.createElement(Sequencer.tag) as Sequencer;
  }

  constructor() {
    super();

    this.attachShadow({ mode: "closed" }).append(
      createStyles(),
      DomService.createElement({ tag: "h1", textContent: "MIDI" }),
      this.content
    );
  }

  connectedCallback() {}

  disconnectedCallback() {
    this.Sequence.dispose();
  }

  public connect(node: any, notes: string[] = this.notes) {
    this.Sequence = new Tone.Sequence(
      // @ts-ignore
      (time, note) => {
        node.triggerAttackRelease(note, "8n", time);
      },
      notes,
      "8n"
    ).start();

    this.content.innerHTML = this.notes.join(" ");
  }
}
