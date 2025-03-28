import * as Tone from "tone";
import { ConverterService } from "./converter.service";

export class AudioService {
  private static Recorder = new Tone.Recorder();
  
  set bpm(bpm: number) {
    Tone.Transport.bpm = bpm;
  }

  static start() {
    AudioService.stop();
    Tone.getTransport().start();

    AudioService.Recorder.start();
    setTimeout(async () => {
      AudioService.stop();

      setTimeout(async () => {
        console.log("✅ Aufnahme abgeschlossen");

        // 1️⃣ WebM als ArrayBuffer erhalten
        const webmBuffer = await (await AudioService.Recorder.stop()).arrayBuffer();

        // 2️⃣ WebM → WAV umwandeln
        await ConverterService.convertWebMToWAV(webmBuffer);

        // 3️⃣ Als Datei speichern oder weiterverarbeiten
        // const wavBlob = new Blob([wavBuffer], { type: "audio/wav" });
        // const url = URL.createObjectURL(wavBlob);

        // Download-Button triggern
        // const a = document.createElement("a");
        // a.href = url;
        // a.download = "aufnahme.wav";
        // document.body.appendChild(a);
        // a.click();
        // document.body.removeChild(a);
        // URL.revokeObjectURL(url);
      }, 1000);
    }, 12000);
  }

  static stop() {
    Tone.getTransport().stop();
  }
}