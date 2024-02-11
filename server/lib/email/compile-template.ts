import { useCompiler } from '#vue-email';

type EmailProps = {
  name: string;
  email: string;
};

export async function useCompileTemplate(props: EmailProps) {
  const template = await useCompiler('template-email.vue', { props });
  return template;
}
