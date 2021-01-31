export interface IPromiseResponse {
  isSuccess: boolean,
  message?: string
}

export interface IMediaStreamConstraints {
    audio?: boolean;
    peerIdentity?: string;
    video?: boolean;
}