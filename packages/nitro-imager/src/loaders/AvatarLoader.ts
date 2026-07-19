import 'dotenv/config';
import '@pixi/node';

import { NitroLogger } from '@nitrodevco/nitro-api';
import { GetAvatarRenderManager } from '@nitrodevco/nitro-renderer';

import { EffectMapLoader } from './EffectMapLoader';
import { FigureDataLoader } from './FigureDataLoader';
import { FigureMapLoader } from './FigureMapLoader';

export const AvatarLoader = async () => {
    const figureMapUrl = process.env.FIGUREMAP_URL;
    const effectMapUrl = process.env.EFFECTMAP_URL;
    const figureDataUrl = process.env.FIGUREDATA_URL;

    try {
        GetAvatarRenderManager().init();

        if (figureMapUrl) await FigureMapLoader(figureMapUrl);
        if (effectMapUrl) await EffectMapLoader(effectMapUrl);
        if (figureDataUrl) await FigureDataLoader(figureDataUrl);
    } catch (err) {
        NitroLogger.error(err);
    }
}
