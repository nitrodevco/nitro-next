import { IEffectMapLibrary, IFigureMapLibrary, NitroLogger } from '@nitrodevco/nitro-api';
import { GetAvatarRenderManager, LoadAvatarData } from '@nitrodevco/nitro-renderer';
import { useEffect } from 'react';

import { useConfigValue } from '#base/context/system';

export const useAvatarLoader = () => {
    const figureMapUrl = useConfigValue<string>('figuremap.url') ?? '';
    const effectMapUrl = useConfigValue<string>('effectmap.url') ?? '';
    const avatarAssetUrl = useConfigValue<string>('asset.bundles.avatar') ?? '';
    const effectAssetUrl = useConfigValue<string>('asset.bundles.effects') ?? '';
    const figureDataUrl = useConfigValue<string>('figuredata.url') ?? '';
    const templatesUrl = useConfigValue<string>('asset.bundles.templates') ?? '';

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

        /**
         * The avatar render library's bundle first: the geometry, part sets, placeholder figure, built-in animations,
         * action offsets, actions and animations the manager starts from. The figure data is laid over
         * its placeholder figure, so it waits for it; the maps only need it for what they render.
         */
        const startAsync = async () => {
            try {
                GetAvatarRenderManager().init(await LoadAvatarData(templatesUrl));
            } catch (e) {
                NitroLogger.error(e);

                return;
            }

            void loadFigureMapAsync(figureMapUrl);
            void loadEffectMapAsync(effectMapUrl);
            void loadFigureDataAsync(figureDataUrl);
        };

        void startAsync();
    }, [ figureMapUrl, effectMapUrl ]);
};
