import * as Tone from "tone";

export class DrumKit {
  private readonly kick = new Tone.MembraneSynth({
    pitchDecay: 0.05,
    octaves: 8,
    oscillator: { type: "amsawtooth12" },
    envelope: { attack: 0.001, decay: 0.8, sustain: 0.2, release: 0.2 },
    volume: 0,
  }).toDestination();

  private readonly snare = new Tone.NoiseSynth({
    noise: { type: "white" },
    envelope: { attack: 0.1, decay: 0.1, sustain: 0.5, release: 0.5 },
    volume: -18,
  }).toDestination();

  private readonly hiHat = new Tone.MetalSynth({
    harmonicity: 10,
    envelope: { attack: 0.001, decay: 0.1, sustain: 0.3, release: 0.2 },
    volume: -12,
  }).toDestination();

  private readonly pattern = new Tone.Sequence(
    (time, note) => {
      const notes = note.split(",");

      if (notes.includes("kick")) {
        this.kick.triggerAttackRelease("C1", "8n", time);
      }

      if (notes.includes("ghostKick")) {
        this.kick.triggerAttackRelease("C1", "32n", time); // Leise Ghost Kicks
      }

      if (notes.includes("snare")) {
        this.snare.triggerAttackRelease("8n", time);
      }

      if (notes.includes("hiHat")) {
        this.hiHat.triggerAttackRelease("16n", time);
      }
    },
    // [null, null, "kick", "ghostkick", null, null, "kick", "kick"],
    // ["kick", "ghostkick", "snare", null, "kick", null, "snare", "ghostkick"],
    [
      "kick",
      "hiHat",
      "ghostKick",
      "hiHat",
      "kick",
      "hiHat",
      "kick",
      "kick,hiHat",
    ],
    "8n"
  );

  constructor() {
    const distortion = new Tone.Distortion(0.1).toDestination(); // Starker Distortion für den aggressiven Klang
    this.kick.connect(distortion); // Verbindung der Bassline zum Distortion-Effekt

    // Bitcrusher für zusätzliche Aggression
    const bitcrusher = new Tone.BitCrusher(4).toDestination();
    bitcrusher.connect(distortion); // Effektkette für den Klang

    this.pattern.start();
  }
}
