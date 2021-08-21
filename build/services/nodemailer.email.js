"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transport = nodemailer_1.default.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "3f21d235c010e2",
        pass: "fa61306f2ec074",
    },
});
function sendEmail({ from, to, subject, text, html }) {
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
exports.sendEmail = sendEmail;
//# sourceMappingURL=nodemailer.email.js.map