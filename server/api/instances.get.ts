import { promisify } from 'node:util';
import Docker from 'dockerode';

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

const docker = new Docker();

export default defineEventHandler(async (event) => {
  const queries = getQuery(event) as ListContainersOptions;

  const listContainers = promisify(docker.listContainers.bind(docker)) as (
    options?: ListContainersOptions,
  ) => Promise<Docker.ContainerInfo[]>;

  try {
    const containers = await listContainers(queries);
    const mappedContainers = containers.map(
      ({ Id, Names, Image, State, Ports }) => ({
        id: Id,
        name: Names[0],
        image: Image,
        state: State,
        ports: Ports,
      }),
    );
    return mappedContainers;
  } catch (err) {
    throw sendError(event, {
      message: 'Error to get containers',
      fatal: false,
      name: 'Error',
      statusCode: 400,
      unhandled: false,
    });
  }
});
