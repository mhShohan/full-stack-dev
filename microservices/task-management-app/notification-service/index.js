const amqp = require('amqplib');

const QUEUE_NAME = 'TASK_QUEUE';

let channel, connection;
const start = async () => {
  try {
    connection = await amqp.connect('amqp://rabbit_mq');
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME);
    console.log('Notification Service connected to RabbitMQ successfully');

    channel.consume(QUEUE_NAME, (msg) => {
      if (msg !== null) {
        const messageContent = JSON.parse(msg.content.toString());
        console.log('--------------------------------------------');
        console.log('Received message:', messageContent);
        console.log('--------------------------------------------');
        // Here you can add logic to process the message, e.g., send email notification

        channel.ack(msg);
      }
    });

  } catch (error) {
    console.log(`RabbitMQ connection failed. Retrying`);
  }
};

start();