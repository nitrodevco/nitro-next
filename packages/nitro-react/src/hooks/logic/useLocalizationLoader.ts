/**
 * Loads the texts into the system store once the config is in, in Flash's order: first the
 * client's embedded localizations (`gamedata.urls.defaultLocalizations` - Flash
 * `HabboLocalizationManager.loadDefaultEmbedLocalizations`, `default_localizations` with the
 * language's file over it, extracted by nitro-tools), then the external texts
 * (`gamedata.urls.externalTexts`), which override them. Either key is one URL or several, merged in
 * order. Each body is read the way `CoreLocalizationManager.parseLocalizationData` reads Flash's
 * `external_texts` - see `utils/localizationData.ts` - then `${key}` references between texts are
 * resolved. A URL that does not answer 2xx is logged and skipped.
 */
import { NitroLogger } from '@nitrodevco/nitro-api';
import { useEffect, useState } from 'react';

import { useConfigValue, useSystemActions } from '#base/context/system';
import { parseLocalizationData } from '#base/utils';

export const useLocalizationLoader = () => {
    const [ needsUpdate, setNeedsUpdate ] = useState<boolean>(true);
    const { setLocalization } = useSystemActions();
    const localizationUrl = useConfigValue<string | string[]>('gamedata.urls.externalTexts') ?? '';
    const defaultLocalizationUrl = useConfigValue<string | string[]>('gamedata.urls.defaultLocalizations') ?? '';

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

        for (const value of [ defaultLocalizationUrl, localizationUrl ]) {
            if (Array.isArray(value)) urls.push(...value);
            else if (value) urls.push(value);
        }

        const load = async (urls: string[]) => {
            let data: Record<string, string> = {};

            for (const url of urls) {
                try {
                    const response = await fetch(url);

                    if (!response.ok) {
                        NitroLogger.error(`Localization ${url} answered ${response.status}`);

                        continue;
                    }

                    const responseData = parseLocalizationData(await response.text());

                    data = { ...data, ...responseData };
                } catch (err) {
                    NitroLogger.error(err);
                }
            }

            setLocalization(processJson({ ...data }));
            setNeedsUpdate(false);
        };

        void load(urls);
    }, [ needsUpdate, localizationUrl, defaultLocalizationUrl ]);

    return { isLocalizationReady };
};
