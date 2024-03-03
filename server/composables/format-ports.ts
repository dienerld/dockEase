import { Port } from 'dockerode';

export const formatPorts = (ports: Port[]) =>
  ports
    .filter(({ IP }) => IP !== '::')
    .map(({ PrivatePort, PublicPort, Type }) => ({
      privatePort: PrivatePort,
      publicPort: PublicPort,
      type: Type,
    }));
