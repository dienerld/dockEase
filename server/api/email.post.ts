import { sendEmail } from '../lib/email/resend';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);

  const mail = await sendEmail({
    to: body.email,
    subject: 'Bem Vindo',
    data: body
  });
  return {
    data: mail,
    success: true,
    message: 'Email enviado com sucesso',
  };
});
