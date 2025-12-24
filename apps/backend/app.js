require('dotenv').config();
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

// Création de l'instance Express
const app = express();
// Config Request Header
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'token'],
    credentials: true,
  })
);
app
  .use(helmet())
  .use(morgan('dev'))
  .use(express.json({ limit: '50mb' }))
  .use(express.urlencoded({ extended: true }));

app.use(
  `${process.env.API_VERSION}/images`,
  express.static(path.join(__dirname, 'images'))
);

// Les routes de l'application
app.get(`${process.env.API_VERSION}/`, (req, res) => res.send('Hello World!'));
app.use(
  `${process.env.API_VERSION}/queue`,
  require('./routes/express/queue.routes')
);
app.use(
  `${process.env.API_VERSION}/ouvriers`,
  require('./routes/express/ouvriers.routes')
);
app.use(
  `${process.env.API_VERSION}/admin`,
  require('./routes/express/admin.routes')
);
app.use(
  `${process.env.API_VERSION}/document`,
  require('./routes/express/document.routes')
);
app.use(
  `${process.env.API_VERSION}/order`,
  require('./routes/express/order.routes')
);
app.use(
  `${process.env.API_VERSION}/customer`,
  require('./routes/express/customer.routes')
);
app.use(
  `${process.env.API_VERSION}/insight`,
  require('./routes/express/insight.routes')
);
app.use(
  `${process.env.API_VERSION}/file`,
  require('./routes/express/file.routes')
);
app.use(
  `${process.env.API_VERSION}/imagesDownload`,
  require('./routes/express/image.routes')
);
app.use(
  `${process.env.API_VERSION}/evaluation`,
  require('./routes/express/evaluation.routes')
);
app.use(
  `${process.env.API_VERSION}/notifications`,
  require('./routes/express/notification.routes')
);

module.exports = app;
