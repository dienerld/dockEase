import Dockerode from 'dockerode';

class Docker {
  private static instance: Dockerode;
  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Dockerode();
    }
    return this.instance;
  }
}

export const docker = Docker.getInstance();
