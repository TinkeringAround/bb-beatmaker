// @ts-ignore
import * as Tone from "tone";
import { ConverterService } from "./converter.service";
import { EventService } from "./event.service";
import { onDownloadStateChangeEvent } from "../events";

export class AudioService {
  private static Recorder = new Tone.Recorder();

  private static blob: Blob | undefined = undefined;

  static set bpm(bpm: number) {
    Tone.Transport.bpm.value = bpm;
  }

  static get hasAudio() {
    return !!AudioService.blob;
  }

  static prepareRecorder() {
    Tone.getDestination().connect(AudioService.Recorder);
  }

  static async start() {
    if (AudioService.Recorder.state != "stopped") {
      AudioService.stop();
    }

    AudioService.Recorder.start();
    Tone.getTransport().setLoopPoints(0, "16");
    Tone.getTransport().start();
  }

  static async stop() {
    Tone.getTransport().stop();

    if (AudioService.Recorder.state == "started") {
      AudioService.blob = await AudioService.Recorder.stop();
      EventService.dispatch(new onDownloadStateChangeEvent());
      console.log("✅ Aufnahme abgeschlossen");
    }
  }

  static async download() {
    if (AudioService.blob) {
      const webmBuffer = await AudioService.blob.arrayBuffer();

      // 2️⃣ WebM → WAV umwandeln
      const wavBuffer = await ConverterService.convertWebMToWAV(webmBuffer);

      // 3️⃣ Als Datei speichern oder weiterverarbeiten
      const wavBlob = new Blob([wavBuffer], { type: "audio/wav" });
      const url = URL.createObjectURL(wavBlob);

      // Download-Button triggern
      const a = document.createElement("a");
      a.href = url;
      a.download = "aufnahme.wav";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }
}
