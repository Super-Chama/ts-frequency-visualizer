export default class Analyser {
  private context: AudioContext;
  private analyser: AnalyserNode;

  constructor(
    minDecibels: number,
    maxDecibels: number,
    smoothTimeConstant: number,
    stream: MediaStream
  ) {
    this.context = new AudioContext();
    this.analyser = this.context.createAnalyser();
    this.analyser.minDecibels = minDecibels;
    this.analyser.maxDecibels = maxDecibels;
    this.analyser.smoothingTimeConstant = smoothTimeConstant;
    this.analyser.fftSize = 256;
    this.context.createMediaStreamSource(stream).connect(this.analyser);
  }

  public getFrequencyBinCount(): number {
    return this.analyser.frequencyBinCount;
  }

  public getByteFrequencyData(): Uint8Array {
    const byteDataArray = new Uint8Array(this.getFrequencyBinCount());
    this.analyser.getByteFrequencyData(byteDataArray);
    return byteDataArray;
  }
}
