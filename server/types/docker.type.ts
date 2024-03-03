export type ContainerDetail = {
  image: string;
  envs: string[];
  name: string;
  status: string;
  created: string;
  ports: Record<string, any>;
};
