require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const ouvriersRoutes = require('./routes/express/ouvriers.routes');
const adminRoutes = require('./routes/express/admin.routes');

const app = express();

app.use(helmet());

app
  .use(morgan('dev'))
  .use(express.json({ limit: '50mb' }))
  .use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'token'],
    credentials: true,
  })
);
app.options(
  '*',
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'token'],
    credentials: true,
  })
);
// app.use(express.static(path.join(__dirname, 'images')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use('/queue', require('./routes/express/queue.routes'));
app.use('/ouvriers', ouvriersRoutes);
app.use('/admin', adminRoutes);
app.use('/document', require('./routes/express/document.routes'));
app.use('/order', require('./routes/express/order.routes'));
app.use('/customer', require('./routes/express/customer.routes'));
app.use('/insight', require('./routes/express/insight.routes'));
app.use('/file', require('./routes/express/file.routes'));
app.use('/imagesDownload', require('./routes/express/image.routes'));
app.use('/evaluation', require('./routes/express/evaluation.routes'));
app.use('/notifications', require('./routes/express/notification.routes'));

module.exports = app;
