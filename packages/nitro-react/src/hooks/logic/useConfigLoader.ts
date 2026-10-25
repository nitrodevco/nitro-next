import { NitroLogger } from '@nitrodevco/nitro-api';
import { useEffect, useState } from 'react';

import { CLIENT_MODULES_HOSTS_KEY } from '#base/context/client-modules';
import { useConfigActions, useConfigData } from '#base/context/system';
import { PREVIEW_ALLOWED_ORIGINS_KEY } from '#base/utils';

/**
 * Loads the client configuration once, and mirrors every change into the globals and logger flags
 * that read it. `isConfigReady` says when it is in - everything else the client loads is named by it.
 */
export const useConfigLoader = () => {
    const [ needsUpdate, setNeedsUpdate ] = useState(true);
    const config = useConfigData();
    const { setConfig } = useConfigActions();

    useEffect(() => {
        window.NitroParsedConfig = { ...config };

        NitroLogger.LOG_DEBUG = config['log.debug'] as boolean ?? false;
        NitroLogger.LOG_WARN = config['log.warn'] as boolean ?? false;
        NitroLogger.LOG_ERROR = config['log.error'] as boolean ?? false;
        NitroLogger.LOG_EVENTS = config['log.events'] as boolean ?? false;
        NitroLogger.LOG_PACKETS = config['log.packets'] as boolean ?? false;
    }, [ config ]);

    useEffect(() => {
        if (!needsUpdate) return;

        if (!window.NitroConfig) throw new Error('NitroConfig is not defined!');

        const urls: string[] = [];

        if (Array.isArray(window.NitroConfig['nitro.config.url'])) window.NitroConfig['nitro.config.url'].forEach((url: string) => urls.push(url));
        else urls.push(window.NitroConfig['nitro.config.url']);

        const load = async (urls: string[]) => {
            let data: Record<string, object> = {};

            for (const url of urls) {
                try {
                    const response = await fetch(url);
                    const responseData = await response.json() as Record<string, object>;

                    data = { ...data, ...responseData };
                } catch (err) {
                    NitroLogger.error(`Trouble loading the configuration using: ${url}`, err.message);
                }
            }

            const dataToProcess = { ...data, ...window.NitroConfig };
            const urlParams = new URLSearchParams(window.location.search);

            // The query never names who may drive the preview host (whoever frames the page writes its URL), nor where client
            // modules may come from (with its own `socket.url`, a link would let any server run code in the hotel's page).
            if (urlParams.size > 0) urlParams.forEach((value, key) => {
                if ((key !== PREVIEW_ALLOWED_ORIGINS_KEY) && (key !== CLIENT_MODULES_HOSTS_KEY)) dataToProcess[key] = value;
            });

            window.NitroParsedConfig = { ...dataToProcess };

            setConfig(dataToProcess);
            setNeedsUpdate(false);
        };

        void load(urls);
    }, [ needsUpdate ]);

    return { isConfigReady: () => !needsUpdate };
};
