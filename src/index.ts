import BrowserMedia from "./browserMedia";
import Analyser from "./analyser";
import Visualizer from "./visualizer";
import { IMediaStreamConstraints } from "./interfaces";

const constraints: IMediaStreamConstraints = { audio: true, video: false };
const media: BrowserMedia = new BrowserMedia(constraints);

const minDecibels: number = -90;
const maxDecibels: number = -30;
const smoothTimeConstant: number = 0.5;

const init: Function = async () => {
  if (await media.initialize()) {
    const canvas = document.getElementById("eq") as HTMLCanvasElement;
    const analyser: Analyser = new Analyser(
      minDecibels,
      maxDecibels,
      smoothTimeConstant,
      media.getMediaStream()
    );
    const visualizer: Visualizer = new Visualizer(canvas);
    

    const loop = () => {
      visualizer.draw(analyser);
      window.requestAnimationFrame(() => loop());
    }

    loop();
    
  }
};


init()
  .then(() => {
    console.log("App Started");
  })
  .catch((error: Error) => {
    console.log(error);
  });
