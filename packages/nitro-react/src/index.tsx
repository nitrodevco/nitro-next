import './index.css';

import { createRoot } from 'react-dom/client';

import { WebSocketContextProvider } from './context';
import { Nitro } from './Nitro';

const element = document.getElementById('root');

if (element) createRoot(element).render(
    <WebSocketContextProvider>
        <Nitro />
    </WebSocketContextProvider>
);
