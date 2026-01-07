const amqp = require('amqplib');

const QUEUE_NAME = 'TASK_QUEUE';

// Massage broker (RabbitMQ) 
let channel, connection;
const rabbitMQConnectionWithRetry = async (retries = 5, delay = 5000) => {
  while (retries) {
    try {
      connection = await amqp.connect('amqp://rabbit_mq');
      channel = await connection.createChannel();
      await channel.assertQueue(QUEUE_NAME);
      console.log('Connected to RabbitMQ successfully');
      break;
    } catch (error) {
      console.log(`RabbitMQ connection failed. Retrying in ${delay / 1000} seconds...`);
      await new Promise(res => setTimeout(res, delay));
      retries--;
    }
  }
};


// Publish message to the queue
const publishMessage = async (message) => {
  if (!channel) {
    throw new Error('Channel not initialized');
  }

  channel.sendToQueue(
    QUEUE_NAME,
    Buffer.from(JSON.stringify(message)),
    { persistent: true } // Keep messages if RabbitMQ restarts
  );

  console.log('Message published to queue');
};


const taskMassageBroker = {
  rabbitMQConnectionWithRetry,
  publishMessage
};

module.exports = taskMassageBroker;