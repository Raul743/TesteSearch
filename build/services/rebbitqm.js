"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const amqplib_1 = require("amqplib");
class RabbitmqServer {
    constructor(uri) {
        this.uri = uri;
    }
    async start() {
        this.conn = await amqplib_1.connect(this.uri);
        this.channel = await this.conn.createChannel();
    }
    async publishInQueue(queue, messege) {
        return this.channel.sendToQueue(queue, Buffer.from(messege));
        setTimeout(function () {
            this.channel.close();
            this.conn.close();
        }, 500);
        process.exit(0);
    }
    async publishInExChange(exChange, routingKey, messege) {
        return this.channel.publish(exChange, routingKey, Buffer.from(messege));
    }
    async consume(queue, callback) {
        return this.channel.consume(queue, (messege) => {
            callback(messege);
            this.channel.ack(messege);
            this.channel.cancel("testes");
        }, { noAck: false, consumerTag: "testes" });
        setTimeout(function () {
            this.channel.close();
            this.conn.close();
        }, 500);
        process.exit(0);
    }
}
exports.server = new RabbitmqServer("amqps://thjwltfw:9ZGZZDlv0UbdA6PITRi7L_XgVGfQXUd8@cattle.rmq2.cloudamqp.com/thjwltfw");
//# sourceMappingURL=rebbitqm.js.map