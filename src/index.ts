import express from "express";
import cors from "cors";
import dotenv from "dotenv-safe";
import { server } from "./services/rebbitqm";
import { sendEmail } from "./services/nodemailer.email";
// Routes
import routes from "./routes";

// Environment variables
dotenv.config({
  allowEmptyValues: true,
});
//comsumindo os dados do Rebbit(fila) e envio de email.
(async () => {
  await server.start();
  await server.consume("testes", (messege) => {
    //  envio de email
    sendEmail({
      to: JSON.parse(messege.content.toString()).email,
      subject: "Email informativo da empresa codeby",
      html: `<h1> A loja informa que do produto pesquisado que foi o / a ${
        JSON.parse(messege.content.toString()).productSearch
      }  agente tem no stock ${
        JSON.parse(messege.content.toString()).qtd
      }  item desse produto</h1>`,
    });
    console.log(messege.content.toString());
  });
})();
// App
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(routes);

// Port
const port = process.env.PORT || 5000;

// Listen

app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});

export default app;
