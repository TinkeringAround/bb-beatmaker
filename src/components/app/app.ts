import * as Tone from "tone";

import { WebComponent } from "../webcomponent";
import { createStyles } from "./app.styles";
import { AudioService } from "../../services/audio.service";
import { Synthesizer } from "../../models/synth";
import { Pattern } from "../../models/pattern";

export class App extends WebComponent {
  static tag = "wc-app";

  private readonly pattern = document.createElement("span");

  constructor() {
    super();


    this.attachShadow({ mode: "closed" }).append(createStyles(), this.pattern);
  }

  connectedCallback() {
    this.addEventListener("click", () => {
      AudioService.bpm = 160;
      const synthesizer = new Synthesizer().ramdomize().setSynth({
        portamento: 0.05, // Geringes Glide für knackige Noten
        oscillator: { type: "square" }, // FM oder Square für mehr Aggression
        envelope: { attack: 0.01, decay: 0.2, sustain: 0.9, release: 0.3 },
        volume: -8
      });
      const pattern = new Pattern();
      this.pattern.textContent = pattern.get().join(" ");

      new Tone.Sequence(
        (time, note) => {
          synthesizer.get().triggerAttackRelease(note, "8n", time);
        },
        pattern.get(),
        "4n"
      ).start();

      AudioService.start();
    });
  }

  disconnectedCallback() {
    AudioService.stop();
  }
}
