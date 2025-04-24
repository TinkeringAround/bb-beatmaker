import * as Tone from "tone";

import { WebComponent } from "../webcomponent";
import { createStyles } from "./frequency-spectrum.style";
import { DomService } from "../../services/dom.service";

export class FrequencySpectrum extends WebComponent {
  static readonly tag = "bb-frequency-spectrum";

  private readonly analyzer = new Tone.Analyser("fft", 64);
  private readonly canvas = DomService.createElement<HTMLCanvasElement>({
    tag: "canvas",
  });

  static create() {
    return document.createElement(FrequencySpectrum.tag) as FrequencySpectrum;
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
        const fftValues = analyzer.getValue();
        context.clearRect(0, 0, canvas.width, canvas.height);
        const barWidth = canvas.width / fftValues.length;

        for (let i = 0; i < fftValues.length; i++) {
          const magnitude = fftValues[i];
          const scaled = (1 + Number(magnitude) / 100) * canvas.height;
          const x = i * barWidth;
          const y = canvas.height - scaled;

          context.fillStyle = "#52b788";
          context.fillRect(x, y, barWidth - 1, scaled);
        }
      }
    }

    draw();
  }
}
