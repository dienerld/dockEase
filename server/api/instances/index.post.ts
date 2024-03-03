import { promisify } from 'node:util';
import { Container, ContainerCreateOptions } from 'dockerode';
import { docker } from '~/server/docker.instance';

export type CreateContainerDto = {
  Image: string;
  Env: `${Uppercase<string>}=${string}`;
  name: string;
};

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const createContainer = promisify<ContainerCreateOptions, Container>(
      docker.createContainer.bind(docker),
    );

    const containerCreated = await createContainer({
      ...body,
      Tty: true,
      AttachStdin: true,
    });
    await containerCreated.start();

    return containerCreated;
  } catch (error: any) {
    setResponseStatus(event, 500);
    sendError(event, error.message);
  }
});
