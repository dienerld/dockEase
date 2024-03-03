import { promisify } from 'node:util';
import { ContainerInspectInfo } from 'dockerode';

import { docker } from '~/server/docker.instance';

export default defineEventHandler(async (event) => {
  try {
    const slug = event.context.params!.slug;
    const container = docker.getContainer(slug);
    const inspect = promisify<ContainerInspectInfo>(
      container.inspect.bind(container),
    );

    const containerInfo = await inspect();

    return {
      created: containerInfo.Created,
      envs: containerInfo.Config.Env,
      image: containerInfo.Config.Image,
      name: containerInfo.Name.replace('/', ''),
      status: containerInfo.State.Status,
      ports: containerInfo.NetworkSettings.Ports,
    };
  } catch (error: any) {
    setResponseStatus(event, 500);
    sendError(event, error.message);
  }
});
