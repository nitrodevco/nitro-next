import { NitroLogger } from '@nitrodevco/nitro-api';
import { useEffect, useState } from 'react';

import { useConfigActions, useConfigData } from '#base/context';

export const useConfigLoader = () => {
    const [ isReady, setIsReady ] = useState(false);
    const [ needsUpdate, setNeedsUpdate ] = useState(true);
    const config = useConfigData();
    const { setConfig } = useConfigActions();

    useEffect(() => {
        window.NitroParsedConfig = { ...config };
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsReady(true);
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

            if (urlParams.size > 0) urlParams.forEach((value, key) => dataToProcess[key] = value);

            window.NitroParsedConfig = { ...dataToProcess };

            setConfig(dataToProcess);
            setNeedsUpdate(false);
        };

        void load(urls);
    }, [ needsUpdate ]);

    return { isConfigReady: isReady };
};
