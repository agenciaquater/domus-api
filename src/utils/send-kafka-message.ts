import { Kafka } from 'kafkajs';

interface MailMessage {
  toEmail: string;
  fromEmail: string;
  subject: string;
  html: string;
  producerId: string
}

const kafka = new Kafka({
  clientId: 'mails',
  brokers: ['certain-chipmunk-6211-us1-kafka.upstash.io:9092'],
  sasl: {
    mechanism: 'scram-sha-256',
    username: 'Y2VydGFpbi1jaGlwbXVuay02MjExJFPbR3i5RCCUsgQZVNdcwqmCFdxKEhfxcCI',
    password: 'b61913383e1e4e9c9db5b810342cf4eb',
  },
  ssl: true,
})

export async function sendKafkaMessage({ 
  toEmail,
  fromEmail,
  subject,
  html,
  producerId,
 }: MailMessage) {
  const producer = kafka.producer()
  await producer.connect()
  await producer.send({
    topic: 'mails.send-mail',
    messages: [
      {
        value: JSON.stringify({
          toEmail,
          fromEmail,
          subject,
          html,
          producerId
        })
      }
    ],
  })

  await producer.disconnect()

}