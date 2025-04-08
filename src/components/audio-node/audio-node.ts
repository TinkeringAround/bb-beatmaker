// @ts-ignore
import * as Tone from "tone";

import { WebComponent } from "../webcomponent";
import { createStyles } from "./audio-node.styles";
import { DomService } from "../../services/dom.service";
import { AudioType, INSTRUMENTS } from "./model";
import { createAudioNode } from "./nodes";
import { createControls } from "./controls";
import { IconButton } from "../icon-button/icon-button";
import { IconTypes } from "../icon/icons";
import { DeleteAudioNodeEvent } from "./events";

export class AudioNode extends WebComponent {
  static tag = "bb-audio-node";

  private audioNode: any;
  private audioConfig: any | undefined;

  private readonly name = DomService.createElement({ tag: "h1" });
  private readonly content = DomService.createElement({ part: "content" });

  get node() {
    switch (this.type) {
      case "synthesizer":
        return this.audioNode as Tone.Synth;
      case "volume":
        return this.audioNode as Tone.Volume;
      default:
        throw new Error("Type should never be empty");
    }
  }

  set type(type: AudioType) {
    this.setAttribute("type", type);
  }

  get type() {
    return this.getAttribute("type") as AudioType;
  }

  get isInstrument() {
    return INSTRUMENTS.includes(this.type);
  }

  get config() {
    return this.node.get();
  }

  set config(config: any) {
    this.audioConfig = config;
  }

  set draggable(draggable: boolean) {
    if (draggable) {
      this.setAttribute("draggable", "true");
      return;
    }

    this.removeAttribute("draggable");
  }

  get draggable() {
    return this.hasAttribute("draggable");
  }

  set deletable(deletable: boolean) {
    if (deletable) {
      this.setAttribute("deletable", "");
      return;
    }

    this.removeAttribute("deletable");
  }

  get deletable() {
    return this.hasAttribute("deletable");
  }

  static create(
    type: AudioType,
    deletable: boolean = false,
    draggable: boolean = false
  ) {
    const audioNode = document.createElement(AudioNode.tag) as AudioNode;
    audioNode.deletable = deletable;
    audioNode.type = type;
    audioNode.draggable = draggable;

    return audioNode;
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).append(
      createStyles(),
      this.name,
      this.content
    );
  }

  connectedCallback() {
    this.audioNode = createAudioNode(this.type);

    if (this.audioConfig) {
      this.audioNode.set(this.audioConfig);
    }

    if (this.deletable) {
      this.shadowRoot?.insertBefore(
        IconButton.create(IconTypes.trash, () => this.delete()),
        this.content
      );
    }

    this.name.textContent = this.type;
    this.content.append(...createControls(this.type, this.audioNode));
    this.handleDragEvents();
  }

  disconnectedCallback() {
    this.audioNode.dispose();
  }

  private handleDragEvents() {
    this.addEventListener("dragstart", (event) => {
      if (this.draggable && event.dataTransfer) {
        event.dataTransfer.setData("type", this.type);
        event.dataTransfer.setData("config", JSON.stringify(this.config));

        event.dataTransfer.setDragImage(this, 10, 10);
        event.dataTransfer.effectAllowed = "copy";
        event.dataTransfer.dropEffect = "copy";
      }
    });
  }

  private delete() {
    this.dispatchEvent(new DeleteAudioNodeEvent());
    this.remove();
  }
}
