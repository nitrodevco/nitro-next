import { NitroLogger } from '@nitrodevco/nitro-api';
import { useEffect, useState } from 'react';

import { useConfigurationStore, useLocalizationStore } from '#base/stores';

export const useLocalizationLoader = () => {
    const [needsUpdate, setNeedsUpdate] = useState<boolean>(true);
    const setLocalization = useLocalizationStore(x => x.setLocalization);
    //const setBadgePointLimits = useLocalizationStore(state => state.setBadgePointLimits);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const localizationUrl = useConfigurationStore(state => state.config['gamedata.urls.externalTexts']) as string | undefined;

    const isLocalizationReady = () => !needsUpdate;

    const processJson = (data: Record<string, string>) => {
        const resolveReferences = (data: Record<string, string>) => {
            const resolvedConfig = { ...data };

            const getValue = (key: string) => resolvedConfig[key] ?? `\${${key}}`;

            for (const key in resolvedConfig) {
                if (key === '') {
                    delete resolvedConfig[key];

                    continue;
                }

                if (typeof resolvedConfig[key] === 'string')
                    resolvedConfig[key] = resolvedConfig[key].replace(/\$\{([^}]+)\}/g, (_, refKey) =>
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        getValue(refKey),);
            }

            return resolvedConfig;
        };

        return resolveReferences(data);
    };

    /* useMessageEvent<BadgePointLimitsEvent>(BadgePointLimitsEvent, event => {
        const parser = event.getParser();

        const data: Record<string, number> = {};

        for (const data of parser.data) {
            data[data.badgeId] = data.limit;
        }

        setBadgePointLimits(data);
    }); */

    useEffect(() => {
        if (!needsUpdate || !localizationUrl || !localizationUrl.length) return;

        const urls: string[] = [];

        if (localizationUrl) {
            if (Array.isArray(localizationUrl)) {
                localizationUrl.forEach((url: string) => urls.push(url));
            } else {
                urls.push(localizationUrl);
            }
        }

        const load = async (urls: string[]) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let data: Record<string, any> = {};

            for (const url of urls) {
                try {
                    const response = await fetch(url);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const responseData = (await response.json()) as Record<string, any>;

                    data = { ...data, ...responseData };
                } catch (err) {
                    NitroLogger.error(err);
                }
            }

            setLocalization(processJson({ ...data }));
            setNeedsUpdate(false);
        };

        void load(urls);
    }, [needsUpdate, localizationUrl]);

    return { isLocalizationReady };
};
