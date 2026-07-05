import type { IEffectMapLibrary, IFigureMapLibrary } from '@nitrodevco/nitro-api';
import { NitroLogger } from '@nitrodevco/nitro-api';
import { GetAvatarRenderManager } from '@nitrodevco/nitro-renderer';
import { useEffect, useState } from 'react';

import { useConfigurationStore } from '#base/stores';

export const useAvatarLoader = () => {
    const [isAvatarReady, setIsAvatarReady] = useState(false);
    const figureMapUrl = useConfigurationStore(state => state.config['figuremap.url']) as string | undefined;
    const effectMapUrl = useConfigurationStore(state => state.config['effectmap.url']) as string | undefined;
    const avatarAssetUrl = useConfigurationStore(state => state.config['asset.urls.avatar']) as string | undefined;
    const effectAssetUrl = useConfigurationStore(state => state.config['asset.urls.effect']) as string | undefined;

    useEffect(() => {
        if (isAvatarReady || !figureMapUrl || !effectMapUrl) return;

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

        const prepare = async () => {
            GetAvatarRenderManager().init();
            await loadFigureMapAsync(figureMapUrl);
            await loadEffectMapAsync(effectMapUrl);

            setIsAvatarReady(true);
        }

        void prepare();
    }, [isAvatarReady, figureMapUrl, effectMapUrl]);

    return { isAvatarReady };
};
