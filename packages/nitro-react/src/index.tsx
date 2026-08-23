import './index.css';
import '@pixi/layout';

import { extend } from '@pixi/react';
import { Container, Graphics, NineSliceSprite, Sprite, Text, TilingSprite } from 'pixi.js';
import { createRoot } from 'react-dom/client';

import { SystemContextProvider, UserContextProvider, WebSocketContextProvider } from './context';
import { Nitro } from './Nitro';
import { setRenderMode } from './theme-core';

// NitroLogger.LOG_ERROR = import.meta.env.DEV;
// NitroLogger.LOG_WARN = import.meta.env.DEV;
// NitroLogger.LOG_PACKETS = import.meta.env.DEV;

// The render target is a boot-time choice, not a live toggle - a Pixi canvas tree and a plain
// react-dom tree are different reconciler roots that can't mix within one mounted app (see
// theme-core/renderMode.ts). Reloading the page with `?renderer=dom` is how you switch.
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

void document.fonts.ready.then(() => {
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
