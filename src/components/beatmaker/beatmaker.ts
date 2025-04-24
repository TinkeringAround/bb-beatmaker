import { WebComponent } from "../webcomponent";
import { createStyles } from "./beatmaker.styles";
import { DomService } from "../../services/dom.service";
import { Controls } from "../controls/controls";
import { BeatmakerService } from "../../services/beatmaker.service";
import { AudioWave } from "../audiowave/audiowave";
import { FrequencySpectrum } from "../frequency-spectrum/frequency-spectrum";
import { EventService } from "../../services/event.service";
import { RightSidebarUpdateEvent } from "../right-sidebar/events";
import { UpdateScriptEvent } from "../../events";
import { Store } from "../../store";
import { AudioNodeTypes } from "../../models/model";
import { createAudioNode } from "../../models/nodes";
import { RMS } from "../rms/rms";

export class Beatmaker extends WebComponent {
  static tag = "bb-beatmaker";

  private readonly content: HTMLTextAreaElement = DomService.createElement({
    tag: "textarea",
    part: "content",
  });

  private readonly nodes: HTMLDivElement = DomService.createElement({
    part: "nodes",
  });

  constructor() {
    super();

    this.attachShadow({ mode: "closed" }).append(
      createStyles(),
      Controls.create(),
      this.content,
      this.nodes
    );
  }

  connectedCallback() {
    this.content.tabIndex = 0;

    this.nodes.replaceChildren(
      RMS.create(),
      AudioWave.create(),
      FrequencySpectrum.create()
    );

    [...this.nodes.children].forEach((child) => {
      (child as HTMLElement).style.width = `${
        this.nodes.getBoundingClientRect().width - 25
      }px`;

      (child as HTMLElement).style.height = `${
        (this.nodes.getBoundingClientRect().height - 50 - 32) / 3
      }px`;
    });

    const script = Store.select((state) => state.script);
    this.content.value =
      script ??
      `
bpm: 80
keys: F#1 F#2 G1 G0

instrument.synth: synth
instrument.oscillator.type: sawtooth
instrument.envelope.attack: 0.01
instrument.envelope.decay: 0.2
instrument.envelope.sustain: 0.8
instrument.envelope.release: 1.0`;

    this.renderContent();
    this.handleEvents();
  }

  private renderContent() {
    BeatmakerService.wire(this.content.value ?? "");
    EventService.dispatch(new RightSidebarUpdateEvent());
    EventService.dispatch(new UpdateScriptEvent(this.content.value));
  }

  private handleEvents() {
    this.content.addEventListener("input", () => {
      this.renderContent();
    });

    this.content.addEventListener("dragover", (event) => {
      if (event.dataTransfer?.effectAllowed == "copy") {
        this.content.style.background = "var(--drop)";
      }
      event.preventDefault();
    });

    this.content.addEventListener("dragleave", () => {
      this.content.style.background = "";
    });

    this.content.addEventListener("dragend", () => {
      this.content.style.background = "";
    });

    this.content.addEventListener("drop", (event) => {
      if (event.dataTransfer) {
        const type = event.dataTransfer.getData("type") as AudioNodeTypes;

        this.content.value +=
          "\n\n" +
          `# ${type.toUpperCase()}\n` +
          BeatmakerService.format(
            createAudioNode(type).get(),
            false,
            `${type}.`
          );

        this.renderContent();
      }

      this.content.style.background = "";
    });
  }
}
