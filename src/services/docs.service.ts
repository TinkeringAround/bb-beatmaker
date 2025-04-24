import { AudioNodeTypes } from "../models/model";

export class DocsService {
  static getDocs(audioType: AudioNodeTypes) {
    return (
      {
        autofilter:
          "AutoFilter is a Tone.Filter with a Tone.LFO connected to the filter cutoff frequency. Setting the LFO rate and depth allows for control over the filter modulation rate and depth.",
        autopanner:
          "AutoPanner is a Panner with an LFO connected to the pan amount",
        autowah:
          "AutoWah connects a Follower to a Filter. The frequency of the filter, follows the input amplitude curve.",
        bitcrusher:
          "BitCrusher down-samples the incoming signal to a different bit depth. Lowering the bit depth of the signal creates distortion.",
        chebyshev:
          "Chebyshev is a waveshaper which is good for making different types of distortion sounds. Note that odd orders sound very different from even ones, and order = 1 is no change.",
        chorus:
          "Chorus is a stereo chorus effect composed of a left and right delay with an LFO applied to the delayTime of each channel. When feedback is set to a value larger than 0, you also get Flanger-type effects.",
        delay: "Wrapper around Web Audio's native DelayNode.",
        distortion: "A simple distortion effect using Tone.WaveShaper",
        feeverb: "Freeverb is a reverb based on Freeverb.",
        frequencyshifter:
          "FrequencyShifter can be used to shift all frequencies of a signal by a fixed amount. The amount can be changed at audio rate and the effect is applied in real time. The frequency shifting is implemented with a technique called single side band modulation using a ring modulator. Note: Contrary to pitch shifting, all frequencies are shifted by the same amount, destroying the harmonic relationship between them. This leads to the classic ring modulator timbre distortion. The algorithm will produces some aliasing towards the high end, especially if your source material contains a lot of high frequencies. Unfortunatelly the webaudio API does not support resampling buffers in real time, so it is not possible to fix it properly. Depending on the use case it might be an option to low pass filter your input before frequency shifting it to get ride of the aliasing.",
        phaser:
          "Phaser is a phaser effect. Phasers work by changing the phase of different frequency components of an incoming signal.",
        pingpongdelay:
          "PingPongDelay is a feedback delay effect where the echo is heard first in one channel and next in the opposite channel. In a stereo system these are the right and left channels. PingPongDelay in more simplified terms is two Tone.FeedbackDelays with independent delay values. Each delay is routed to one channel (left or right), and the channel triggered second will always trigger at the same interval after the first.",
        pitchshift:
          "PitchShift does near-realtime pitch shifting to the incoming signal. The effect is achieved by speeding up or slowing down the delayTime of a DelayNode using a sawtooth wave.",
        reverb:
          "Simple convolution created with decaying noise. Generates an Impulse Response Buffer with Tone.Offline then feeds the IR into ConvolverNode. The impulse response generation is async, so you have to wait until ready resolves before it will make a sound.",
        stereowidener:
          "Applies a width factor to the mid/side seperation. 0 is all mid and 1 is all side.",
        trembolo:
          "Tremolo modulates the amplitude of an incoming signal using an LFO. The effect is a stereo effect where the modulation phase is inverted in each channel.",
        vibrato:
          "A Vibrato effect composed of a Tone.Delay and a Tone.LFO. The LFO modulates the delayTime of the delay, causing the pitch to rise and fall.",

        compressor:
          "Compressor is a thin wrapper around the Web Audio DynamicsCompressorNode. Compression reduces the volume of loud sounds or amplifies quiet sounds by narrowing or 'compressing' an audio signal's dynamic range.",
        eq: "EQ3 provides 3 equalizer bins: Low/Mid/High.",
        highpass:
          "Tone.Filter is a filter which allows for all of the same native methods as the BiquadFilterNode. Tone.Filter has the added ability to set the filter rolloff at -12 (default), -24 and -48.",
        lowpass:
          "Tone.Filter is a filter which allows for all of the same native methods as the BiquadFilterNode. Tone.Filter has the added ability to set the filter rolloff at -12 (default), -24 and -48.",
        gate: "Gate only passes a signal through when the incoming signal exceeds a specified threshold. It uses Follower to follow the ampltiude of the incoming signal and compares it to the threshold value using GreaterThan.",
        limiter:
          "Limiter will limit the loudness of an incoming signal. Under the hood it's composed of a Compressor with a fast attack and release and max compression ratio.",
        midsidecompressor:
          "MidSideCompressor applies two different compressors to the mid and side signal components of the input.",
        multibandcompressor:
          "A compressor with separate controls over low/mid/high dynamics.",
        gain: "A thin wrapper around the Native Web Audio GainNode. The GainNode is a basic building block of the Web Audio API and is useful for routing audio and adjusting gains.",
        panner:
          "Panner is an equal power Left/Right Panner. It is a wrapper around the StereoPannerNode",
        volume:
          "Volume is a simple volume node, useful for creating a volume fader.",
      } as Record<AudioNodeTypes, string>
    )[audioType];
  }
}
