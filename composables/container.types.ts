export type TStatusContainer =
  | 'created'
  | 'restarting'
  | 'running'
  | 'removing'
  | 'paused'
  | 'exited';

export enum EStatus {
  created = 'Criado',
  restarting = 'Reiniciando',
  running = 'Executando',
  removing = 'Removendo',
  paused = 'Pausado',
  exited = 'Finalizado',
}

export type TContainer = {
  id: string;
  name: string;
  image: string;
  ports: {
    privatePort: number;
    publicPort: number;
    type: string;
  }[];
  state: TStatusContainer;
};
