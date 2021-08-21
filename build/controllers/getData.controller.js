"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_vtx_1 = require("../services/api.vtx");
const rebbitqm_1 = require("../services/rebbitqm");
class GetController {
    async handle(req, res) {
        try {
            // retorno dos dados obtidos na pesquisa
            var dataSearch = await api_vtx_1.query(req.body.search);
            //configuracao do RibbitQm
            await rebbitqm_1.server.start();
            await rebbitqm_1.server.publishInQueue("testes", JSON.stringify({
                qtd: dataSearch.length,
                email: req.body.email,
                productSearch: req.body.search,
            }));
            //retorno da requisicao
            return res.status(200).json({
                success: true,
                data: {
                    messege: `Was sent in this email ${req.body.email} an messege about information searched. please check your email inbox. Thanks.`,
                },
            });
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in server",
                err,
            });
        }
    }
}
exports.default = GetController;
//# sourceMappingURL=getData.controller.js.map