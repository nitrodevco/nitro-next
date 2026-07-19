import { IEffectMapLibrary, NitroLogger } from "@nitrodevco/nitro-api";
import { GetAvatarRenderManager } from "@nitrodevco/nitro-renderer";

export const EffectMapLoader = async (url: string) => {
    if (!url || !url.length) return;

    try {
        const response = await fetch(url);

        if (response.status !== 200) throw new Error('Invalid effectmap url');

        const reponse = await response.json() as { effects: IEffectMapLibrary[] };

        GetAvatarRenderManager().processEffectMap(reponse.effects, `${process.env.EFFECT_ASSET_URL}`);

        NitroLogger.log(`Effect Map Loaded`);
    } catch (e) {
        NitroLogger.error(e);
    }
}