// @ts-ignore
import * as Tone from "tone";

import { WebComponent } from "../webcomponent";
import { createStyles } from "./volume.styles";
import { DomService } from "../../services/dom.service";

export class Volume extends WebComponent {
  static tag = "bb-volume";

  private readonly Volume = new Tone.Volume(0);

  private readonly content = DomService.createElement({ part: "content" });

  set volume(volume: number) {
    this.Volume.volume = volume;
  }

  get volume() {
    return this.Volume.volume.value;
  }

  set mute(mute: boolean) {
    this.Volume.mute = mute;
  }

  get mute() {
    return this.Volume.mute;
  }

  get node() {
    return this.Volume;
  }

  static create() {
    return document.createElement(Volume.tag) as Volume;
  }

  constructor() {
    super();

    this.attachShadow({ mode: "closed" }).append(
      createStyles(),
      DomService.createElement({ tag: "h1", textContent: "Volume" }),
      this.content
    );
  }

  connectedCallback() {
    this.content.innerHTML = `${this.volume}db`;
  }

  disconnectedCallback() {
    this.Volume.dispose();
  }
}
