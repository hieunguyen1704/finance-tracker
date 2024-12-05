import amqplib from 'amqplib'

import { RABBITMQ_URL } from './config/dotenv'
import { processSendConfirmationEmail } from './handlers/sendEmailConfirmation.handler'
import queueNames from './constants/queue'

const startWorker = async () => {
  const connection = await amqplib.connect(RABBITMQ_URL)
  const channel = await connection.createChannel()

  const queues = [
    {
      name: queueNames.sendConfirmationEmail,
      handler: processSendConfirmationEmail,
    },
  ]

  for (const queue of queues) {
    await channel.assertQueue(queue.name, { durable: true })

    channel.consume(queue.name, async (msg: any) => {
      if (msg) {
        const message = JSON.parse(msg.content.toString())
        try {
          await queue.handler(message) // Call the specific handler
          channel.ack(msg) // Acknowledge message after successful processing
        } catch (error) {
          console.error(`Error processing message from ${queue.name}:`, error)
          channel.nack(msg) // Negative acknowledgment for failed processing
        }
      }
    })

    console.log(`Listening for messages in queue: ${queue.name}`)
  }
}

startWorker().catch(console.error)
