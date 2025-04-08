export class ConverterService {
  static async convertWebMToWAV(webmBuffer: ArrayBuffer): Promise<ArrayBuffer> {
    const audioContext = new AudioContext();

    // 1️⃣ WebM in AudioBuffer umwandeln
    const audioBuffer = await audioContext.decodeAudioData(webmBuffer);

    // 2️⃣ WAV-Header erstellen
    const numChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const format = 1; // PCM

    let interleaved;
    if (numChannels === 2) {
      const left = audioBuffer.getChannelData(0);
      const right = audioBuffer.getChannelData(1);
      interleaved = new Float32Array(left.length + right.length);
      for (let i = 0, j = 0; i < left.length; i++, j += 2) {
        interleaved[j] = left[i];
        interleaved[j + 1] = right[i];
      }
    } else {
      interleaved = audioBuffer.getChannelData(0);
    }

    const bitDepth = 16;
    const byteRate = sampleRate * numChannels * (bitDepth / 8);
    const blockAlign = numChannels * (bitDepth / 8);
    const wavBuffer = new ArrayBuffer(44 + interleaved.length * 2);
    const view = new DataView(wavBuffer);

    // WAV Header
    let offset = 0;
    function writeString(str: string) {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset++, str.charCodeAt(i));
      }
    }
    function writeUint32(val: number) {
      view.setUint32(offset, val, true);
      offset += 4;
    }
    function writeUint16(val: number) {
      view.setUint16(offset, val, true);
      offset += 2;
    }

    writeString("RIFF");
    writeUint32(36 + interleaved.length * 2);
    writeString("WAVE");
    writeString("fmt ");
    writeUint32(16);
    writeUint16(format);
    writeUint16(numChannels);
    writeUint32(sampleRate);
    writeUint32(byteRate);
    writeUint16(blockAlign);
    writeUint16(bitDepth);
    writeString("data");
    writeUint32(interleaved.length * 2);

    // PCM Samples in 16-bit umwandeln
    for (let i = 0; i < interleaved.length; i++, offset += 2) {
      let sample = Math.max(-1, Math.min(1, interleaved[i]));
      sample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
      view.setInt16(offset, sample, true);
    }

    return wavBuffer;
  }
}
