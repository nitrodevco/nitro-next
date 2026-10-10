import { IAssetAnimation } from '../animation/IAssetAnimation';
import { IAssetAvatarActionData } from './actions/IAssetAvatarActionData';
import { IAssetAvatarActionOffset } from './actions/IAssetAvatarActionOffset';
import { IAssetAvatarAnimation } from './animations/IAssetAvatarAnimation';
import { IFigureData } from './figuredata/IFigureData';
import { IAssetAvatarGeometryConfig } from './geometry/IAssetAvatarGeometryConfig';
import { IAssetAvatarPartSets } from './partsets/IAssetAvatarPartSets';

/**
 * Everything the avatar render manager starts from (`IAvatarRenderManager.init`), as the hotel's
 * The `habbo-avatar-render-lib` bundle carries it (`asset.bundles.templates`) - built by Nitro Studio from the client release's
 * `habbo-avatar-render-lib` and the hotel's `HabboAvatarActions`, so a new release changes it without
 * the renderer changing.
 */
export interface IAvatarRenderData {
    /** `HabboAvatarGeometry`: the canvases, avatar sets and each geometry type's body parts. */
    geometry: IAssetAvatarGeometryConfig;
    /** `HabboAvatarPartSets`: which parts flip, which a swimmer hides, and the active part sets. */
    partSets: IAssetAvatarPartSets;
    /** `HabboAvatarFigure`: the placeholder figure (`hd-99999`) and the swim suits the downloaded figure data is laid over. */
    figureData: IFigureData;
    /** The animations the client carries rather than an effect library (`dance.sixseven`). */
    builtInAnimations: IAssetAnimation[];
    /** `action_offset_lay` / `action_offset_swim`: where a lying or swimming figure is drawn from. */
    actionOffsets: IAssetAvatarActionOffset[];
    /** `HabboAvatarActions`: applied over the built-in action set, as Flash's `updateActions`. */
    actions?: IAssetAvatarActionData;
    /** `HabboAvatarAnimation`: the frames every figure part steps through per action. */
    animations?: IAssetAvatarAnimation[];
}
