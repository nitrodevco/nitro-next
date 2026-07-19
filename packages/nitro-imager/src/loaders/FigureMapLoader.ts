import { IFigureMapLibrary, NitroLogger } from "@nitrodevco/nitro-api";
import { GetAvatarRenderManager } from "@nitrodevco/nitro-renderer";

export const FigureMapLoader = async (url: string) => {
    if (!url || !url.length) return;

    try {
        const response = await fetch(url);

        if (response.status !== 200) throw new Error('Invalid figuremap url');

        const reponse = await response.json() as { libraries: IFigureMapLibrary[] };

        GetAvatarRenderManager().processFigureMap(reponse.libraries, `${process.env.AVATAR_ASSET_URL}`);

        NitroLogger.log(`Figure Map Loaded`);
    } catch (e) {
        NitroLogger.error(e);
    }
}