import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import 'primeicons/primeicons.css';

import App from './App.tsx';
import './styles/main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
