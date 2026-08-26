import './index.css';

import.meta.glob('./views/**/*.css', { eager: true });

import { NitroLogger } from '@nitrodevco/nitro-api';
import { createRoot } from 'react-dom/client';

import { DialogComponent } from './components';
import { SystemContextProvider, UserContextProvider, WebSocketContextProvider } from './context';
import { DialogContextProvider } from './context/dialog';
import { Nitro } from './Nitro';

NitroLogger.LOG_ERROR = import.meta.env.DEV;
NitroLogger.LOG_WARN = import.meta.env.DEV;
NitroLogger.LOG_PACKETS = import.meta.env.DEV;

declare global {
    interface Window {
        NitroConfig: {
            "nitro.config.url": string;
        };
        NitroParsedConfig: Record<string, unknown>;
    }
}

window.NitroConfig = window.NitroConfig || {};

const element = document.getElementById('root');

if (element)
    createRoot(element).render(
        <SystemContextProvider>
            <DialogContextProvider>
                <WebSocketContextProvider>
                    <UserContextProvider>
                        <Nitro />
                    </UserContextProvider>
                </WebSocketContextProvider>
                <DialogComponent />
            </DialogContextProvider>
        </SystemContextProvider>,
    );
