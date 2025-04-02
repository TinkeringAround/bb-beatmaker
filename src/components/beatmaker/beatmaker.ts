// @ts-ignore
import * as Tone from "tone";

import { WebComponent } from "../webcomponent";
import { createStyles } from "./beatmaker.styles";
import { AudioService } from "../../services/audio.service";
import { DomService } from "../../services/dom.service";
import { Button } from "../button/button";
import { Input } from "../input/input.webcomponent";
import { InputEvents } from "../input/events";
import { Chain } from "../chain/chain";

export class Beatmaker extends WebComponent {
  static tag = "bb-beatmaker";

  private readonly controls: HTMLDivElement = DomService.createElement({
    part: "controls"
  });
  private readonly content: HTMLDivElement = DomService.createElement({
    part: "content"
  });

  constructor() {
    super();

    this.attachShadow({ mode: "closed" }).append(
      createStyles(),
      this.controls,
      this.content
    );
  }

  connectedCallback() {
    AudioService.bpm = 160;
    AudioService.prepareRecorder();

    this.renderContent();
  }

  disconnectedCallback() {
    AudioService.stop();
  }

  private renderContent() {
    // Controls
    const startButton = Button.create("Start", () => {
      AudioService.start();
    });
    const stopButton = Button.create("Stopp", () => {
      AudioService.stop();
      downloadButton.disabled = AudioService.hasAudio;
    });

    const bpm = Input.create("160", "BPM", "BPM", "number");
    bpm.addEventListener(InputEvents.input, () => {
      try {
        AudioService.bpm = Number(bpm.value);
      } catch (_) {}
    });

    const downloadButton = Button.create("Download", () =>
      AudioService.download()
    );
    downloadButton.disabled = true;

    // @ts-ignore
    this.controls.replaceChildren(startButton, stopButton, bpm, downloadButton);

    // Instruments
    this.content.append(Chain.create());
  }
}
