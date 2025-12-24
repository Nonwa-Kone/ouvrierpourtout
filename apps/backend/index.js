require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app.js');
const { connect } = require('./config/service');

const port = 4000;

const server = http.createServer(app);
const io = new Server(server, {
  // Initialise Socket.IO avec le serveur HTTP
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Main socket handler
io.on('connection', (socket) => {
  console.log("Un utilisateur s'est connecté :", socket.id);

  require('./routes/socket/order.routes.js').orderRoutes(socket);

  socket.on('disconnect', () => {
    console.log('Utilisateur déconnecté :', socket.id);
  });
});

server.listen(port, () => {
  connect();
  console.log(`Server running on port ${port}`);
});
