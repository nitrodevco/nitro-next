import './index.css';
import '@pixi/layout';

import { extend } from '@pixi/react';
import { Container, Graphics, NineSliceSprite, Sprite, Text, TilingSprite } from 'pixi.js';
import { createRoot } from 'react-dom/client';

import { SystemContextProvider, UserContextProvider, WebSocketContextProvider } from './context';
import { Nitro } from './Nitro';
import { loadThemeFonts, preloadNitroTruffle, setRenderMode, WIRED_HABBO_KEYS } from './theme';

// NitroLogger.LOG_ERROR = import.meta.env.DEV;
// NitroLogger.LOG_WARN = import.meta.env.DEV;
// NitroLogger.LOG_PACKETS = import.meta.env.DEV;

if (new URLSearchParams(window.location.search).get('renderer') === 'dom') setRenderMode('dom');
else {
    extend({
        Container,
        Graphics,
        NineSliceSprite,
        Sprite,
        Text,
        TilingSprite,
    });
}

declare global {
    interface Window {
        NitroConfig: {
            'nitro.config.url': string;
        };
        NitroParsedConfig: Record<string, unknown>;
    }
}

window.NitroConfig = window.NitroConfig || {};

const element = document.getElementById('root');

void Promise.all([
    document.fonts.ready,
    loadThemeFonts(),
    preloadNitroTruffle(WIRED_HABBO_KEYS),
]).then(() => {
    if (!element) return;

    createRoot(element).render(
        <SystemContextProvider>
            <WebSocketContextProvider>
                <UserContextProvider>
                    <Nitro />
                </UserContextProvider>
            </WebSocketContextProvider>
        </SystemContextProvider>,
    );
});
