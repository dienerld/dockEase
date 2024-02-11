export type TStatusContainer =
  | 'created'
  | 'restarting'
  | 'running'
  | 'removing'
  | 'paused'
  | 'exited';

export type TContainer = {
  id: string;
  name: string;
  image: string;
  ports: {
    PrivatePort: string;
    PublicPort: string;
    type: string;
  }[];
  status: TStatusContainer;
};
