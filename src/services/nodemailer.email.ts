import nodemailer from "nodemailer";
import { sendEmailType } from "../@types/type.email";
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3f21d235c010e2",
    pass: "fa61306f2ec074",
  },
});

export function sendEmail({ from, to, subject, text, html }: sendEmailType) {
  transport
    .sendMail({
      from: from || "Empresa CodeBy <3f21d235c010e2>",
      to: to || "raulinacio233@gmail.com",
      subject: subject || "oi, tas bom",
      text: text || "Texto de exemplo caso nao foi inserido nenhum texto",
      html: html || "<h1>Empresa codeBy Informa/h1>",
    })
    .then((messe) => console.log(messe, "enviada com sucesso"))
    .catch((err) => {
      console.log("error ao enviar email", err);
    });
}
