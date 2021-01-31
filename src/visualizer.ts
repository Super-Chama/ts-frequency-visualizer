import Analyser from "./analyser";

export default class Visualizer {
  private context: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  constructor(htmlElement: HTMLCanvasElement) {
    this.context = htmlElement.getContext("2d") as CanvasRenderingContext2D;
    this.width = htmlElement.width;
    this.height = htmlElement.height;
  }

  public draw(analyser: Analyser, time?: number) {
    const audioData: Uint8Array = analyser.getByteFrequencyData();

    this.context.fillStyle = "rgb(0, 0, 0)";
    this.context.fillRect(0, 0, this.width, this.height);

    let barWidth = (this.width / audioData.length) * 2.5;
    let barHeight;
    let x = 0;

    let gradient = this.context.createLinearGradient(0, 0, 0, this.height);
    

    //       this.context.fillStyle = gradient;
    // this.context.fillRect(0, 0, this.width, this.height)

    for (let i = 0; i < audioData.length; i++) {
      barHeight = audioData[i];

      this.context.setLineDash([8, 10]); /*dashes are 5px and spaces are 1px*/
      this.context.beginPath();
      this.context.moveTo(x, this.height);
      this.context.lineTo(x, this.height - barHeight);
      this.context.lineWidth = barWidth;


      let alpha = barHeight/this.height;

      // set line color
      gradient.addColorStop(0, "rgb(255, 0, 0)");
      gradient.addColorStop(0.46, "rgb(255, 0, 0)");
      gradient.addColorStop(0.62, "rgba(95, 255, 0," + alpha*2 +")" );
      gradient.addColorStop(1, "rgba(95, 255, 1," + alpha +")" );
      this.context.strokeStyle = gradient;
      this.context.stroke();

      // this.context.fillStyle = "rgb(" + (barHeight + 50) + ",50,200)";
      // this.context.fillRect(
      //   x,
      //   this.height - barHeight / 2,
      //   barWidth,
      //   barHeight / 2
      // );

      x += barWidth + 10;
    }
  }
}
