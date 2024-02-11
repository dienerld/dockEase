import { Resend } from 'resend';
import { useCompileTemplate } from './compile-template';

const config = useRuntimeConfig();
const resend = new Resend(config.resendKey);

type EmailBody = {
  to: string[];
  subject: string;
  data: {
    name: string;
    email: string;
  };
};

export async function sendEmail(data: EmailBody) {
  const template = await useCompileTemplate(data.data);
  const response = await resend.emails.send({
    subject: data.subject,
    to: data.to,
    from: 'Diener Dornelas <diener.ld@resend.dev>',
    html: template.html,
  });

  console.log(response);
  return response;
}
