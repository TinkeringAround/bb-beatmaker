import * as Tone from "tone";

import { WebComponent } from "../webcomponent";
import { createStyles } from "./audio-chain.styles";
import { DomService } from "../../services/dom.service";
import { AudioNode } from "../audio-node/audio-node";
import { Input } from "../input/input";
import { InputEvents } from "../input/events";
import { AudioType, INSTRUMENTS } from "../audio-node/model";
import { AudioNodeEvents } from "../audio-node/events";

export class AudioChain extends WebComponent {
  static tag = "bb-audio-chain";

  private Sequence = new Tone.Sequence((_, __) => {}, ["F#1"], "8n").start();

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
    this.Sequence.events = notes;
    this.midiInput.value = notes.join(" ");
  }

  get nodes() {
    return [...this.content.children] as AudioNode[];
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
    this.content.append(AudioNode.create("synthesizer"));

    this.rewire();
    this.handleEvents();
  }

  disconnectedCallback() {
    this.Sequence.dispose();
  }

  private rewire() {
    const nodes = this.nodes;

    for (let i = 0; i < nodes.length; i += 1) {
      nodes[i].draggable = !nodes[i].isInstrument;
      nodes[i].node.disconnect();

      // first is always instrument -> no delete
      if (i >= 1) {
        nodes[i].addEventListener(AudioNodeEvents.delete, () => this.rewire());
      }

      // connect audio nodes in a chain
      if (i < nodes.length - 1) {
        nodes[i].node.connect(nodes[i + 1].node);
      }
    }

    // last audio node to destination
    nodes[nodes.length - 1].node.toDestination();

    console.log(nodes.map(node => ({
      type: node.type,
      config: node.node.get()
    })));
    this.sequence();
  }

  private handleEvents() {
    this.midiInput.addEventListener(InputEvents.input, () => {
      this.notes = this.midiInput.value.split(" ");
    });

    this.content.addEventListener("dragover", (event) => {
      this.content.style.background = "var(--drop)";
      event.preventDefault();
    });

    this.content.addEventListener("dragleave", () => {
      this.content.style.background = "var(--white)";
    });

    this.content.addEventListener("dragend", () => {
      this.content.style.background = "var(--white)";
    });

    this.content.addEventListener("drop", (event) => {
      if (event.dataTransfer) {
        const nodes = this.nodes;
        const type = event.dataTransfer.getData("type") as AudioType;
        const config = JSON.parse(event.dataTransfer.getData("config"));
        const isInstrument = INSTRUMENTS.includes(type);

        // Audio Node
        const audioNode = AudioNode.create(type, !isInstrument, !isInstrument);
        audioNode.config = config;

        // replace instrument, must always be one instrument
        if (isInstrument) {
          nodes[0].node.dispose();
          this.content.replaceChild(audioNode, nodes[0]);
        } else {
          this.content.append(audioNode);
        }

        this.rewire();
      }

      this.content.style.background = "var(--white)";
    });
  }

  private sequence() {
    this.Sequence.callback = (time, note) => {
      (this.nodes[0].node as any).triggerAttackRelease(note, "8n", time);
    };
  }
}
