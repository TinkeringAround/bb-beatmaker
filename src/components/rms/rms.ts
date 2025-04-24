import * as Tone from "tone";

import { WebComponent } from "../webcomponent";
import { createStyles } from "./rms.style";
import { DomService } from "../../services/dom.service";

export class RMS extends WebComponent {
  static readonly tag = "bb-rms";

  private readonly meter = new Tone.Meter(); // renamed for clarity
  private readonly canvas = DomService.createElement<HTMLCanvasElement>({
    tag: "canvas",
  });
  private readonly rms = DomService.createElement({ tag: "span" });

  static create() {
    return document.createElement(RMS.tag) as RMS;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "closed" }).append(
      createStyles(),
      this.rms,
      this.canvas
    );
  }

  connectedCallback() {
    this.meter.normalRange = false;
    Tone.getDestination().connect(this.meter);

    const meter = this.meter;
    const canvas = this.canvas;
    const context = canvas.getContext("2d");
    const value = this.rms;

    function draw() {
      requestAnimationFrame(draw);

      if (context) {
        const rms = meter.getValue() as number;
        value.textContent = `${rms.toFixed(2)} dB`;

        // Normalize RMS value (assumed range: ~0.0 to 1.0)
        const height = canvas.height;
        const width = canvas.width;

        const normalized = Math.max(0, 1 + rms / 60);
        context.clearRect(0, 0, width, height);

        const barHeight = normalized * height;

        context!.fillStyle = normalized > 0.8 ? "#e82f3b" : "#52b788";
        context!.fillRect(0, height - barHeight, width, barHeight);
      }
    }

    draw();
  }
}
