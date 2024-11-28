import amqplib from 'amqplib'
import { RABBITMQ_URL } from '../../config/dotenv'

export const publishToQueue = async (queue: string, message: object) => {
  const connection = await amqplib.connect(RABBITMQ_URL)
  const channel = await connection.createChannel()
  await channel.assertQueue(queue, { durable: true })
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  })
  console.log(`Message sent to queue "${queue}":`, message)
  await channel.close()
  await connection.close()
}
