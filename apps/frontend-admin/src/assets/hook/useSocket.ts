// import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';

// import { io } from 'socket.io-client';

// export const socket = io('ws://localhost:3000', {
//   transports: ['websocket'],
// });

// const useSocket = () => {
//   const [isConnected, setIsConnected] = useState<boolean>(false);

//   useEffect(() => {
//     if (!socket) return;
//     console.log('🚀 ~ useEffect ~ socket:', socket);
//     const connectSocket = () => {
//       socket.on('connect', () => {
//         console.log('Connected to socket.io server:', socket.id);
//         setIsConnected(true);
//       });

//       socket.on('connect_error', (error) => {
//         console.error('Connection error:', error);
//         toast.error('Erreur de connexion au serveur');
//       });

//       socket.on('disconnect', () => {
//         console.log('Disconnected from socket.io server');
//         setIsConnected(false);
//       });
//       console.log('🚀 ~ useSocket ~ isConnected:', isConnected);
//     };

//     connectSocket();

//     return () => {
//       socket.disconnect();
//     };
//   }, []);
//   return { isConnected };
// };

// export default useSocket;
