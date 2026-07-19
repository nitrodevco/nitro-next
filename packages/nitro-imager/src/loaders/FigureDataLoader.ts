import { IFigureData, NitroLogger } from "@nitrodevco/nitro-api";
import { GetAvatarRenderManager } from "@nitrodevco/nitro-renderer";

export const FigureDataLoader = async (url: string) => {
    if (!url || !url.length) return;

    try {
        const response = await fetch(url);

        if (response.status !== 200) throw new Error('Invalid figuredata url');

        GetAvatarRenderManager().structure.injectFigureData(await response.json() as IFigureData);

        NitroLogger.log(`Figuredata Loaded`);
    } catch (e) {
        NitroLogger.error(e);
    }
}