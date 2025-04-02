// @ts-ignore
import * as Tone from "tone";

export class Synthesizer {
  static TYPES = ["custom", "sine", "square", "sawtooth", "triangle", "pulse"];

  private Volume = new Tone.Volume();

  private Oscillator = new Tone.Oscillator().toDestination();
  private Synth = new Tone.Synth({
    oscillator: {
      type: "custom",
      partials: [1, 0, 0, 1, 0.5, 1, 1, 0, 1, 1, 1]
    },
    envelope: {
      attack: 0.5,
      decay: 0.9,
      sustain: 0.95,
      release: 1.0
    },
    volume: 0
  })

  // WAVETABLES
  private Wavetable_index = 0;
  private Wavetables = [
    new Tone.Waveform(128), // Sinuswelle
    new Tone.Waveform(256), // Rechteckwelle
    new Tone.Waveform(512), // Sägezahnwelle,
    new Tone.Waveform(1024) // Komplexe Waveform
  ];

  // EFFECTS
  private Distortion = new Tone.Distortion(0.5).toDestination(); // Distortion-Effekt für fette Bässe
  private Bitcrusher = new Tone.BitCrusher(4).toDestination(); // Bitcrusher-Effekt für mehr Aggression
  private Chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination(); // Chorus für breiteren Klang
  private Reverb = new Tone.Reverb(10).toDestination(); // Reverb für mehr Tiefe

  // FILTER
  private Highpass = new Tone.Filter(40, "highpass").toDestination();
  private Lowpass = new Tone.Filter(300, "lowpass").toDestination();

  // LFOs
  private FmLfo = new Tone.LFO("4n", 5, 10).connect(this.Oscillator.frequency);

  private DistortionLfo = new Tone.LFO({
    frequency: "8n", // Modulation alle 8n (achteln)
    amplitude: 0.5 // LFO-Stärke
  }).connect(this.Distortion);

  private FilterLfo = new Tone.LFO("4n", 300, 1500).connect(
    this.Lowpass.frequency
  );

  // EQ
  private Eq = new Tone.EQ3({
    low: -12, // 60-150Hz Bereich
    mid: 0,
    high: -6 // 1kHz+ Bereich
  }).toDestination();

  set bpm(bpm: number) {
    Tone.getTransport().bpm.value = bpm;
  }

  set volume(volume: number) {
    this.Volume.volume.volume = volume;
  }

  get oscillator() {
    return this.Synth.get().oscillator;
  }

  constructor() {
    setInterval(() => {
      this.Wavetable_index =
        (this.Wavetable_index + 1) % this.Wavetables.length;

      this.Oscillator.type = "custom";
      this.Oscillator.partials = Array.from(
        this.Wavetables[this.Wavetable_index].getValue()
      );
    }, 1000);

    setInterval(() => {
      // Zufällige Filterfrequenz (Lowpass)
      this.Lowpass.frequency.setValueAtTime(
        Math.random() * 1000 + 200, // Zufällige Frequenz für mehr Bewegung
        Tone.now()
      );

      // Zufällige Verzerrung (Distortion) für noch mehr Aggression
      this.Distortion.set({
        distortion: Math.random() * 0.9
      });

      // Zufällige LFO-Modulationen für den FM-Effekt
      const randomLfoFrequency = Math.random() * 10 + 5; // Zufällige LFO-Frequenz für FM
      this.FilterLfo.frequency.setValueAtTime(randomLfoFrequency, Tone.now());

      // Zufällige Bitcrusher-Modulation für zusätzliche "Glitchiness"
      this.Bitcrusher.bits.setValueAtTime(Math.random() * 10 + 4, Tone.now());
    }, 400);

    this.Synth.connect(this.Bitcrusher)
      .connect(this.Chorus)
      .connect(this.Reverb)
      .connect(this.Distortion)
      .connect(this.Lowpass)
      .connect(this.Highpass)
      .connect(this.Eq)
      .connect(this.Volume)
      .toDestination();

    this.FmLfo.start();
    this.DistortionLfo.start();
    this.FilterLfo.start();
  }

  public ramdomize(): Synthesizer {
    this.Synth.set({
      oscillator: {
        type:
          Synthesizer.TYPES[
            Math.floor(Math.random() * Synthesizer.TYPES.length)
          ],
        partials: Array.from({ length: 6 }, () => Math.random())
      },
      envelope: {
        attack: Math.random() * 0.2,
        decay: Math.random() * 0.5 + 0.1,
        sustain: Math.random() * 0.8 + 0.2,
        release: Math.random() * 1.5 + 0.2
      }
    });

    this.Lowpass.set({ frequency: Math.random() * 700 + 100 });
    this.Highpass.set({ frequency: Math.random() * 40 + 20 });
    this.Distortion.set({ distortion: Math.random() * 0.8 + 0.1 });
    this.FilterLfo.set({
      frequency: Math.random() * 4 + 1,
      min: Math.random() * 200 + 50,
      max: Math.random() * 1500 + 500
    });
    this.Eq.set({
      low: Math.random() * -10,
      mid: Math.random() * -5,
      high: Math.random() * -8
    });

    return this;
  }

  public get() {
    return this.Synth;
  }

  public getFilter() {
    return {
      Lowpass: this.Lowpass,
      Highpass: this.Highpass
    };
  }

  public getLFO() {
    return this.FmLfo;
  }

  public getEQ() {
    return this.Eq;
  }

  public getEffects() {
    return {
      Distortion: this.Distortion,
      Bitcrusher: this.Bitcrusher,
      Chorus: this.Chorus,
      Reverb: this.Reverb
    };
  }

  public setSynth({
    oscillator = this.Synth.get().oscillator,
    envelope = this.Synth.envelope,
    portamento = this.Synth.portamento
  }) {
    this.Synth.portamento = portamento;
    this.Synth.set({
      oscillator,
      envelope: {
        attack: envelope.attack,
        decay: envelope.decay,
        sustain: envelope.sustain,
        release: envelope.release
      }
    });

    return this;
  }

  public setDistortion({
    distortion = this.Distortion.get().distortion,
    mute = false
  }) {
    this.Distortion.distortion = distortion;

    if (mute) {
      this.Distortion.disconnect();
      return this;
    }

    this.Distortion.toDestination();
    return this;
  }

  public setBitcrusher({ bits = this.Bitcrusher.get().bits, mute = false }) {
    this.Bitcrusher.set({
      bits
    });

    if (mute) {
      this.Bitcrusher.disconnect();
      return this;
    }

    this.Bitcrusher.toDestination();
    return this;
  }

  public setChorus({
    spread = this.Chorus.spread,
    depth = this.Chorus.depth,
    mute = false
  }) {
    this.Chorus.set({
      spread,
      depth
    });

    if (mute) {
      this.Chorus.disconnect();
      return this;
    }

    this.Chorus.toDestination();
    return this;
  }

  public setReverb({ decay = this.Reverb.get().decay, mute = false }) {
    this.Reverb.decay = decay;

    if (mute) {
      this.Reverb.disconnect();
      return this;
    }

    this.Reverb.toDestination();
    return this;
  }

  public setHighPass({
    frequency = this.Highpass.get().frequency,
    mute = false
  }) {
    this.Highpass.set({
      frequency
    });

    if (mute) {
      this.Highpass.disconnect();
      return this;
    }

    this.Highpass.toDestination();
    return this;
  }

  public setLowPass({
    frequency = this.Lowpass.get().frequency,
    mute = false
  }) {
    this.Lowpass.set({
      frequency
    });

    if (mute) {
      this.Lowpass.disconnect();
      return this;
    }

    this.Lowpass.toDestination();
    return this;
  }

  public setFmLfo({
    frequency = this.FmLfo.get().frequency,
    min = this.FmLfo.get().min,
    max = this.FmLfo.get().max,
    mute = false
  }) {
    this.FmLfo.set({
      frequency,
      min,
      max
    });

    if (mute) {
      this.FmLfo.disconnect();
      return this;
    }

    this.FmLfo.toDestination();
    return this;
  }

  public setDistortionLfo({
    frequency = this.DistortionLfo.get().frequency,
    amplitude = this.DistortionLfo.get().amplitude,
    mute = false
  }) {
    this.DistortionLfo.set({
      frequency,
      amplitude
    });

    if (mute) {
      this.DistortionLfo.disconnect();
      return this;
    }

    this.DistortionLfo.toDestination();
    return this;
  }

  public setFilterLfo({
    frequency = this.FilterLfo.get().frequency,
    min = this.FilterLfo.get().min,
    max = this.FilterLfo.get().max,
    mute = false
  }) {
    this.FilterLfo.set({
      frequency,
      min,
      max
    });

    if (mute) {
      this.FilterLfo.disconnect();
      return this;
    }

    this.FilterLfo.toDestination();
    return this;
  }

  public setEq({
    low = this.Eq.get().low,
    lowFrequency = this.Eq.get().lowFrequency,
    mid = this.Eq.get().mid,
    high = this.Eq.get().high,
    highFrequency = this.Eq.get().highFrequency,
    mute = false
  }) {
    this.Eq.set({
      low,
      lowFrequency,
      mid,
      high,
      highFrequency
    });

    if (mute) {
      this.Eq.disconnect();
      return this;
    }

    this.Eq.toDestination();
    return this;
  }

  public mute(mute: boolean) {
    if (mute) {
      this.Volume.volume.mute = true;
      return;
    }

    this.Volume.volume.mute = false;
    return this;
  }

  public destroy() {
    this.Volume.dispose();
    this.Oscillator.dispose();
    this.Synth.dispose();
    this.Distortion.dispose();
    this.Bitcrusher.dispose();
    this.Chorus.dispose();
    this.Reverb.dispose();
    this.Highpass.dispose();
    this.Lowpass.dispose();
    this.FmLfo.dispose();
    this.Eq.dispose();
  }
}
