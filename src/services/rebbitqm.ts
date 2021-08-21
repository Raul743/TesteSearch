import { Connection, Channel, connect, Message } from "amqplib";

class RabbitmqServer {
  private conn: Connection;
  private channel: Channel;

  constructor(private uri: string) {}
  async start(): Promise<void> {
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
  }

  async publishInQueue(queue: string, messege) {
    return this.channel.sendToQueue(queue, Buffer.from(messege));
    setTimeout(function () {
      this.channel.close();
      this.conn.close();
    }, 500);
    process.exit(0);
  }

  async publishInExChange(
    exChange: string,
    routingKey: string,
    messege
  ): Promise<boolean> {
    return this.channel.publish(exChange, routingKey, Buffer.from(messege));
  }

  async consume(queue: string, callback: (messege: Message) => void) {
    return this.channel.consume(
      queue,
      (messege) => {
        callback(messege);
        this.channel.ack(messege);
        this.channel.cancel("testes");
      },
      { noAck: false, consumerTag: "testes" }
    );
    setTimeout(function () {
      this.channel.close();
      this.conn.close();
    }, 500);
    process.exit(0);
  }
}
export const server = new RabbitmqServer(
  "amqps://thjwltfw:9ZGZZDlv0UbdA6PITRi7L_XgVGfQXUd8@cattle.rmq2.cloudamqp.com/thjwltfw"
);
