import { IAssetAvatarActionData, IAssetAvatarAnimation, IEffectMapLibrary, IFigureMapLibrary, NitroLogger } from '@nitrodevco/nitro-api';
import { GetAvatarRenderManager } from '@nitrodevco/nitro-renderer';
import { useEffect } from 'react';

import { useConfigValue } from '#base/context/system';

export const useAvatarLoader = () => {
    const figureMapUrl = useConfigValue<string>('figuremap.url') ?? '';
    const effectMapUrl = useConfigValue<string>('effectmap.url') ?? '';
    const avatarAssetUrl = useConfigValue<string>('asset.urls.avatar') ?? '';
    const effectAssetUrl = useConfigValue<string>('asset.urls.effect') ?? '';
    const figureDataUrl = useConfigValue<string>('figuredata.url') ?? '';
    const avatarActionsUrl = useConfigValue<string>('avatar.actions.url') ?? '';
    const avatarAnimationsUrl = useConfigValue<string>('avatar.animations.url') ?? '';

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
         * `HabboAvatarActions.xml` and `HabboAvatarAnimation.xml`, which the client used to carry
         * as ~105 KB of compiled-in table. Flash downloaded the actions too, so fetching them is
         * the client's own shape; `init()` has already applied the baked-in action set, and this
         * goes over it exactly as Flash's `initActions` then `updateActions` did.
         */
        const loadAvatarActionsAsync = async (url: string) => {
            if (!url || !url.length) return;

            try {
                const response = await fetch(url);

                if (response.status !== 200) throw new Error('Invalid avatar actions url');

                GetAvatarRenderManager().processAvatarActions(await response.json() as IAssetAvatarActionData);
            } catch (e) {
                NitroLogger.error(e);
            }
        };

        const loadAvatarAnimationsAsync = async (url: string) => {
            if (!url || !url.length) return;

            try {
                const response = await fetch(url);

                if (response.status !== 200) throw new Error('Invalid avatar animations url');

                GetAvatarRenderManager().processAvatarAnimations(await response.json() as IAssetAvatarAnimation[]);
            } catch (e) {
                NitroLogger.error(e);
            }
        };

        GetAvatarRenderManager().init();

        void loadAvatarActionsAsync(avatarActionsUrl);
        void loadAvatarAnimationsAsync(avatarAnimationsUrl);
        void loadFigureMapAsync(figureMapUrl);
        void loadEffectMapAsync(effectMapUrl);
        void loadFigureDataAsync(figureDataUrl);
    }, [ figureMapUrl, effectMapUrl ]);
};
