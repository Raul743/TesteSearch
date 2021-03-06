import { Request, Response } from "express";
import { query } from "../services/api.vtx";
import { sendEmail } from "../services/nodemailer.email";
import { server } from "../services/rebbitqm";

export default class GetController {
  async handle(req: Request, res: Response) {
    try {
      // retorno dos dados obtidos na pesquisa
      var dataSearch = await query(req.body.search);

      //configuracao do RibbitQm
      await server.start();
      await server.publishInQueue(
        "testes",
        JSON.stringify({
          qtd: dataSearch.length,
          email: req.body.email,
          productSearch: req.body.search,
        })
      );

      //retorno da requisicao
      return res.status(200).json({
        success: true,
        data: {
          messege: `Was sent in this email ${req.body.email} an messege about information searched. please check your email inbox. Thanks.`,
        },
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error in server",
        err,
      });
    }
  }
}
