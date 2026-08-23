import { IEffectMapLibrary, IFigureMapLibrary, NitroLogger } from '@nitrodevco/nitro-api';
import { GetAvatarRenderManager } from '@nitrodevco/nitro-renderer';
import { useEffect } from 'react';

import { useConfigValue } from '#base/context';

export const useAvatarLoader = () => {
    const figureMapUrl = useConfigValue<string>('figuremap.url') ?? '';
    const effectMapUrl = useConfigValue<string>('effectmap.url') ?? '';
    const avatarAssetUrl = useConfigValue<string>('asset.urls.avatar') ?? '';
    const effectAssetUrl = useConfigValue<string>('asset.urls.effect') ?? '';
    const figureDataUrl = useConfigValue<string>('figuredata.url') ?? '';

    useEffect(() => {
        if (!figureMapUrl || !effectMapUrl || !figureDataUrl) return;

        const loadFigureMapAsync = async (url: string) => {
            if (!url || !url.length || !avatarAssetUrl) return;

            try {
                const response = await fetch(url);

                if (response.status !== 200) throw new Error('Invalid figuremap url');

                const reponse = await response.json() as { libraries: IFigureMapLibrary[] };

                GetAvatarRenderManager().processFigureMap(reponse.libraries, avatarAssetUrl);
            } catch (e) {
                NitroLogger.error(e);
            }
        };

        const loadEffectMapAsync = async (url: string) => {
            if (!url || !url.length || !effectAssetUrl) return;

            try {
                const response = await fetch(url);

                if (response.status !== 200) throw new Error('Invalid effectmap url');

                const reponse = await response.json() as { effects: IEffectMapLibrary[] };

                GetAvatarRenderManager().processEffectMap(reponse.effects, effectAssetUrl);
            } catch (e) {
                NitroLogger.error(e);
            }
        };

        const loadFigureDataAsync = async (url: string) => {
            if (!url || !url.length || !avatarAssetUrl) return;

            try {
                const response = await fetch(url);

                if (response.status !== 200) throw new Error('Invalid figuredata url');

                GetAvatarRenderManager().structure.injectFigureData(await response.json());
            } catch (e) {
                NitroLogger.error(e);
            }
        };

        GetAvatarRenderManager().init();

        void loadFigureMapAsync(figureMapUrl);
        void loadEffectMapAsync(effectMapUrl);
        void loadFigureDataAsync(figureDataUrl);
    }, [ figureMapUrl, effectMapUrl ]);
};
