"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
const rebbitqm_1 = require("./services/rebbitqm");
const nodemailer_email_1 = require("./services/nodemailer.email");
// Routes
const routes_1 = __importDefault(require("./routes"));
// Environment variables
dotenv_safe_1.default.config({
    allowEmptyValues: true,
});
//comsumindo os dados do Rebbit(fila) e envio de email.
(async () => {
    await rebbitqm_1.server.start();
    await rebbitqm_1.server.consume("testes", (messege) => {
        //  envio de email
        nodemailer_email_1.sendEmail({
            to: JSON.parse(messege.content.toString()).email,
            subject: "Email informativo da empresa codeby",
            html: `<h1> A loja informa que do produto pesquisado que foi o / a ${JSON.parse(messege.content.toString()).productSearch}  agente tem no stock ${JSON.parse(messege.content.toString()).qtd}  item desse produto</h1>`,
        });
        console.log(messege.content.toString());
    });
})();
// App
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Routes
app.use(routes_1.default);
// Port
const port = process.env.PORT || 5000;
// Listen
app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map