import { NitroLogger } from '@nitrodevco/nitro-api';
import { useEffect, useState } from 'react';

import { useConfigValue, useSystemActions } from '#base/context/system';

export const useLocalizationLoader = () => {
    const [ needsUpdate, setNeedsUpdate ] = useState<boolean>(true);
    const { setLocalization } = useSystemActions();
    const localizationUrl = useConfigValue<string>('gamedata.urls.externalTexts') ?? '';

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

                        getValue(refKey));
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
            let data: Record<string, string> = {};

            for (const url of urls) {
                try {
                    const response = await fetch(url);
                    const responseData = (await response.json()) as Record<string, string>;

                    data = { ...data, ...responseData };
                } catch (err) {
                    NitroLogger.error(err);
                }
            }

            setLocalization(processJson({ ...data }));
            setNeedsUpdate(false);
        };

        void load(urls);
    }, [ needsUpdate, localizationUrl ]);

    return { isLocalizationReady };
};
