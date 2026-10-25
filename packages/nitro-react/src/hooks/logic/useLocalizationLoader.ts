/**
 * Loads the texts into the system store once the config is in, in Flash's order: first the
 * client's embedded localizations - the `habbo-localization-com` library's bundle, which carries
 * every language's and of which only `localization.default.language`'s is parsed (Flash
 * `HabboLocalizationManager.loadDefaultEmbedLocalizations`; `initializeLocalizations`) - then the
 * external texts (`gamedata.urls.externalTexts`), which override them. The external texts key is
 * one URL or several, merged in order. Each body is read the way
 * `CoreLocalizationManager.parseLocalizationData` reads Flash's `external_texts` - see
 * `utils/localizationData.ts` - then `${key}` references between texts are resolved. A URL that
 * does not answer 2xx is logged and skipped. `:lang` swaps the default localizations later.
 */
import { NitroLogger } from '@nitrodevco/nitro-api';
import { useEffect, useState } from 'react';

import { initializeLocalizations } from '#base/commands';
import { useConfigValue } from '#base/context/system';
import { parseLocalizationData } from '#base/utils';

export const useLocalizationLoader = () => {
    const [ needsUpdate, setNeedsUpdate ] = useState<boolean>(true);
    const localizationUrl = useConfigValue<string | string[]>('gamedata.urls.externalTexts') ?? '';

    const isLocalizationReady = () => !needsUpdate;

    useEffect(() => {
        if (!needsUpdate || !localizationUrl || !localizationUrl.length) return;

        const urls = Array.isArray(localizationUrl) ? localizationUrl : [ localizationUrl ];

        const load = async (urls: string[]) => {
            const data: Record<string, string> = {};

            for (const url of urls) {
                try {
                    const response = await fetch(url);

                    if (!response.ok) {
                        NitroLogger.error(`Localization ${url} answered ${response.status}`);

                        continue;
                    }

                    const responseData = parseLocalizationData(await response.text());

                    // Later files override earlier keys; merged in place, not copied per file.
                    Object.assign(data, responseData);
                } catch (err) {
                    NitroLogger.error(err);
                }
            }

            await initializeLocalizations(data);
            setNeedsUpdate(false);
        };

        void load(urls);
    }, [ needsUpdate, localizationUrl ]);

    return { isLocalizationReady };
};
