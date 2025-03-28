export class Pattern {
  private pattern: (string | null)[] = [];
  // ["D1", "E1", "F#1", "G1", "A1", "B1"],
  // ["A#1", null, "D1", null, "C1", "C1", "A#1", null],
  // ["C1", null, "E1", "G1", null, "E1", "C1", null],
  // ["E1", "G1", "A1", null, "A1", "G1", "E1"],

  constructor() {
    this.pattern = this.generateBass();
  }

  public get() {
    return this.pattern;
  }

  private generate(): (string | null)[] {
    const patternLength = 32; // 16 Bars = 32 8tel Noten
    let pattern: (string | null)[] = [];

    for (let i = 0; i < patternLength; i++) {
      let noteChoice = Math.random();

      if (noteChoice > 0.75) {
        // 🎶 Hauptnoten (starke, tragende Töne)
        const strongNotes = ["A1", "C2", "D2", "E2", "G2"];
        pattern.push(
          strongNotes[Math.floor(Math.random() * strongNotes.length)]
        );
      } else if (noteChoice > 0.55) {
        // 🎵 Ghost Notes (kürzere, leisere Töne für Groove)
        const ghostNotes = ["A0", "C1", "D1", "F1"];
        pattern.push(ghostNotes[Math.floor(Math.random() * ghostNotes.length)]);
      } else if (noteChoice > 0.3) {
        // 🔀 Chromatische Noten für "unexpected" Vibes
        const chromatic = ["A#1", "C#2", "D#2", "F#2", "G#2"];
        pattern.push(chromatic[Math.floor(Math.random() * chromatic.length)]);
      } else {
        // 🛑 Anstatt einer Pause -> Chance für Glide oder Pitch Shift
        pattern.push(Math.random() > 0.5 ? "Glide" : null);
      }
    }

    return pattern;
  }

  private generateBass(): (string | null)[] {
    const root = "C1";
    const fifth = "G1";
    const octave = "C2";
    const lowNote = "A#0";
    const altNote1 = "D#1"; // Hook-Charakter durch Chromatik
    const altNote2 = "F#1"; // Leichte Spannung für Variation

    const patternLength = 16;
    let pattern: (string | null)[] = [];

    for (let i = 0; i < patternLength; i++) {
      if (i % 8 === 0) {
        // Starker Einstieg jeder 8er Bar
        pattern.push(root);
      } else if (i % 4 === 2) {
        // Spannung in der Mitte jeder 4er Phrase
        pattern.push(Math.random() > 0.5 ? altNote1 : lowNote);
      } else if (i % 8 === 6) {
        // Kleine Hook-Variation gegen Ende der 8er Phrase
        pattern.push(Math.random() > 0.7 ? octave : fifth);
      } else {
        // 50% Wahrscheinlichkeit für Ghost-Notes/Pausen
        pattern.push(Math.random() > 0.5 ? null : root);
      }
    }

    return pattern;
  }
}
