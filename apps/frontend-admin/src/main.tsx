import React from 'react';
import ReactDOM from 'react-dom/client';

// ** import components react
import App from './App.tsx';

// ** import librarie style file
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'react-phone-number-input/style.css';
import 'react-toastify/dist/ReactToastify.css';

// ** import style file
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
