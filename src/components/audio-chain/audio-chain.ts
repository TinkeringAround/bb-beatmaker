// @ts-ignore
import * as Tone from "tone";

import { WebComponent } from "../webcomponent";
import { createStyles } from "./audio-chain.styles";
import { DomService } from "../../services/dom.service";
import { AudioNode } from "../audio-node/audio-node";
import { Input } from "../input/input.webcomponent";
import { InputEvents } from "../input/events";

export class AudioChain extends WebComponent {
  static tag = "bb-audio-chain";

  private nodes: any[] = [
    AudioNode.create("synthesizer"),
    AudioNode.create("volume")
  ];

  private Sequence = new Tone.Sequence(
    // @ts-ignore
    (time, note) => {},
    ["F#1"],
    "8n"
  ).start();

  private readonly name = Input.create("Untitled", "Chain", "Name");
  private readonly midi = DomService.createElement({ part: "midi" });
  private readonly content = DomService.createElement({ part: "content" });

  private readonly midiInput = Input.create(
    this.Sequence.events.join(""),
    "Notes",
    "Midi",
    "text"
  );

  static create() {
    return document.createElement(AudioChain.tag) as AudioChain;
  }

  set notes(notes: string[]) {
    if (this.nodes[0].node) {
      this.Sequence = new Tone.Sequence(
        // @ts-ignore
        (time, note) => {
          this.nodes[0].node.triggerAttackRelease(note, "8n", time);
        },
        notes,
        "8n"
      ).start();

      this.midiInput.value = notes.join(" ");
    }
  }

  constructor() {
    super();

    this.name.setAttribute("part", "name");
    this.midi.append(this.midiInput);

    this.attachShadow({ mode: "closed" }).append(
      createStyles(),
      this.name,
      this.midi,
      this.content
    );
  }

  connectedCallback() {
    this.content.append(...this.nodes);

    Promise.all([...this.nodes.map(_ => this.waitFor(AudioNode.tag))]).then(
      () => {
        this.connect();
        this.renderContent();
      }
    );

    this.handleEvents();
  }

  disconnectedCallback() {
    this.Sequence.dispose();
  }

  private renderContent() {
    this.midiInput.addEventListener(InputEvents.input, () => {
      this.notes = this.midiInput.value.split(" ");
    });
  }

  private connect() {
    for (let i = 0; i < this.nodes.length - 1; i += 1) {
      this.nodes[i].draggable = true;
      this.nodes[i].node.disconnect();
      this.nodes[i].node.connect(this.nodes[i + 1].node);
    }
    this.nodes[this.nodes.length - 1].node.toDestination();
    this.notes = ["F#1"];
  }

  private handleEvents() {
    this.content.addEventListener("dragover", () => {
      this.style.background = "var(--drop)";
    });

    this.content.addEventListener("dragleave", () => {
      this.style.backfaceVisibility = "var(--dark)";
    });

    this.content.addEventListener("dragend", () => {
      this.style.backfaceVisibility = "var(--dark)";
    });

    this.content.addEventListener("drop", () => {
      this.style.backfaceVisibility = "var(--dark)";
    });
  }
}
