import * as Tone from "tone";

import { WebComponent } from "../webcomponent";
import { createStyles } from "./audiowave.style";
import { DomService } from "../../services/dom.service";

export class AudioWave extends WebComponent {
  static readonly tag = "bb-audiowave";

  private readonly analyzer = new Tone.Waveform(1024);
  private readonly canvas = DomService.createElement<HTMLCanvasElement>({
    tag: "canvas",
  });

  static create() {
    return document.createElement(AudioWave.tag) as AudioWave;
  }

  constructor() {
    super();

    this.attachShadow({ mode: "closed" }).append(createStyles(), this.canvas);
  }

  connectedCallback() {
    Tone.getDestination().connect(this.analyzer);

    const analyzer = this.analyzer;
    const canvas = this.canvas;
    const context = this.canvas.getContext("2d");

    function draw() {
      requestAnimationFrame(draw);

      if (context) {
        const waveValues = analyzer.getValue();
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.moveTo(0, canvas.height / 2);

        for (let i = 0; i < waveValues.length; i++) {
          const x = (i / waveValues.length) * canvas.width;
          const y = (0.5 - waveValues[i] / 2) * canvas.height;
          context.lineTo(x, y);
        }

        context.strokeStyle = "#007bff";
        context.lineWidth = 1;
        context.stroke();
      }
    }

    draw();
  }
}
