import { IMediaStreamConstraints, IPromiseResponse } from "./interfaces";

export default class BrowserMedia {
  private constraints: IMediaStreamConstraints;
  private stream: MediaStream | null;

  constructor(constraints: IMediaStreamConstraints) {
    this.constraints = constraints;
    this.stream = null;
  }

  public initialize(): Promise<IPromiseResponse> {
    let self: BrowserMedia = this;
    return new Promise((resolve: Function, reject: Function) => {
      let navigator: any = window.navigator;
      if (self.stream) {
        return resolve({
          isSuccess: true
        });
      }
      if (navigator) {
        // Older browsers might not implement mediaDevices at all. fail here
        if (navigator.mediaDevices.getUserMedia === undefined) {
          return reject({
            isSuccess: false,
            message: "getUserMedia is not implemented in this browser"
          });
        }

        navigator.mediaDevices
          .getUserMedia(self.constraints)
          .then((mediaStream: MediaStream) => {
            self.stream = mediaStream;
            return resolve({
              isSuccess: true
            });
          })
          .catch((err: Error) => {
            return reject({
              isSuccess: false,
              message: err.message
            });
          });
      } else {
        return reject({
          isSuccess: false,
          message: "Couldn't get navigator"
        });
      }
    });
  }

  public getMediaStream(): MediaStream {
    return this.stream as MediaStream;
  }
}
