import { promisify } from 'node:util';
import { ContainerInfo } from 'dockerode';
import { TContainer, TStatusContainer } from '~/composables/container.types';
import { docker } from '~/server/docker.instance';
import { formatPorts } from '~/server/composables/format-ports';

export type ListContainersFilters = {
  // Filtra os contêineres com base em seu status.
  // Os valores comuns incluem "created", "restarting", "running", "removing", "paused" e "exited".
  status?: string[];

  // Filtra os contêineres com base em suas etiquetas.
  labels?: string[];

  // Filtra os contêineres com base em seus nomes.
  names?: string[];

  // Filtra os contêineres com base em seu ID.
  ids?: string[];

  // Filtra os contêineres com base na imagem da qual foram criados.
  ancestor?: string[];

  // Filtra os contêineres que foram criados antes de um determinado contêiner.
  before?: string;

  // Filtra os contêineres que foram criados após um determinado contêiner.
  since?: string;

  // Filtra os contêineres que saíram com um determinado código de saída.
  exited?: number[];
};

type ListContainersOptions = {
  // Traz todos os containers
  all?: boolean;
  filters: ListContainersFilters;
};

export default defineEventHandler(async (event) => {
  const queries = getQuery(event) as ListContainersOptions;

  const listContainers = promisify<ListContainersOptions, ContainerInfo[]>(
    docker.listContainers.bind(docker),
  );

  try {
    const containers = await listContainers(queries);

    const mappedContainers: TContainer[] = containers.map(
      ({ Id, Names, Image, State, Ports }) => {
        const ports = formatPorts(Ports);

        return {
          id: Id,
          name: Names[0].replace('/', ''),
          image: Image,
          state: State as TStatusContainer,
          ports,
        };
      },
    );
    return mappedContainers;
  } catch (err: any) {
    setResponseStatus(event, 500);
    sendError(event, err.message);
  }
});
