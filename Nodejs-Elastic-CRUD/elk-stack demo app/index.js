const express = require('express');
const winston = require('winston');
const { LogstashTransport } = require('winston-logstash-transport');

// Create an Express app
const app = express();
app.use(express.json());

// Configure the Winston logger with Logstash transport
const logger = winston.createLogger({
  transports: [
    new LogstashTransport({
      host: 'localhost',
      port: 9600,
    }),
  ],
});

// Define an endpoint to receive data and log it
app.post('/log', (req, res) => {
  const { index, data } = req.body;

  // Log the data using the Winston logger
  logger.log({
    level: 'info',
    message: JSON.stringify({ index, data }),
  });

  res.status(200).send('Data logged successfully!');
});

// Start the Express server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
