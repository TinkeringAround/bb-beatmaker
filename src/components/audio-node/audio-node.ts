// @ts-ignore
import * as Tone from "tone";

import { WebComponent } from "../webcomponent";
import { createStyles } from "./audio-node.styles";
import { DomService } from "../../services/dom.service";
import { AudioType } from "./model";
import { createAudioNode } from "./instruments";
import { createControls } from "./controls";

export class AudioNode extends WebComponent {
  static tag = "bb-audio-node";

  private audioNode: any;

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

  set draggable(draggable: boolean) {
    if (draggable) {
      this.setAttribute("draggable", "true");
      return;
    }

    this.removeAttribute("draggable");
  }

  static create(type: AudioType, draggable: boolean = false) {
    const audioNode = document.createElement(AudioNode.tag) as AudioNode;
    audioNode.type = type;
    audioNode.draggable = draggable;

    return audioNode;
  }

  constructor() {
    super();

    this.attachShadow({ mode: "closed" }).append(
      createStyles(),
      this.name,
      this.content
    );
  }

  connectedCallback() {
    this.name.textContent = this.type;
    this.audioNode = createAudioNode(this.type);
    this.content.append(...createControls(this.type, this.audioNode));

    this.handleDragEvents();
  }

  disconnectedCallback() {
    this.audioNode.dispose();
  }

  private handleDragEvents() {
    // this.name.addEventListener("dragstart", event => {
    //   const dragPreview = this.cloneNode(true) as HTMLElement;
    //   dragPreview.style.position = "absolute";
    //   dragPreview.style.top = "-1000px"; // außerhalb des sichtbaren Bereichs
    //   dragPreview.style.left = "-1000px";
    //   document.body.appendChild(dragPreview);
    //   // Als Drag-Vorschau verwenden
    //   event.dataTransfer.setDragImage(dragPreview, 10, 10);
    //   // Optional: Entferne das Vorschaubild nach kurzem Timeout
    //   setTimeout(() => {
    //     document.body.removeChild(dragPreview);
    //   }, 0);
    //   event.preventDefault();
    // });
  }
}
