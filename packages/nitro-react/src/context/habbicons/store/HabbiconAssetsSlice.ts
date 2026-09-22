/**
 * What `habbicons/assets/HabbiconAssetManager` has loaded: the asset root it loaded from
 * (`§_-K1F§`), whether it is loading (`§_-YA§`) or gave up (`§_-P1k§`), each habbicon's name key
 * (`§_-X1h§`) and preview (`§_-nR§`), and each set's collection icon (`§_-S1n§`).
 *
 * Flash cut a preview out of the sheet the first time it was asked for; here every preview is
 * cut once the sheet is in, and so is the dimmed copy `HabbiconTileView.refresh` draws for a
 * habbicon the user has neither owned nor can claim (`_colorTransform` applied to a clone of the
 * preview). `commands/habbiconCommands.loadHabbiconAssets` does the loading.
 *
 * Not held: the half-size previews (`_previewBitmapsSmall`), the outlined collection icons, the
 * animation definitions (`§_-GE§`) and the runtime assets built from `animation/<id>.png`. Their
 * only readers are the room's `HabbiconBubble`, the chat input's habbicon selector and button,
 * the messenger's habbicon picker, the chat bubble widget and the catalogue's product icons - none
 * of which the port has.
 */
import type { Texture } from 'pixi.js';
import { StateCreator } from 'zustand';

export type HabbiconAssetsLoadState = 'idle' | 'loading' | 'loaded' | 'failed';

export interface HabbiconAssets {
    nameKeys: Record<number, string>;
    previews: Record<number, Texture>;
    lockedPreviews: Record<number, Texture>;
    collectionIcons: Record<number, Texture>;
}

type State = HabbiconAssets & {
    assetRoot: string;
    assetsLoadState: HabbiconAssetsLoadState;
};

type Actions = {
    /** `refreshAssetRoot`: a new root drops what was loaded from the old one (`resetLoadedAssets`). */
    startHabbiconAssetsLoad: (assetRoot: string) => void;
    /** `checkLoadCompletion`. */
    setHabbiconAssets: (assetRoot: string, assets: HabbiconAssets) => void;
    /** `markLoadFailed`. */
    failHabbiconAssetsLoad: (assetRoot: string) => void;
};

export const HabbiconAssetsSliceInitialState: State = {
    assetRoot: '',
    assetsLoadState: 'idle',
    nameKeys: {},
    previews: {},
    lockedPreviews: {},
    collectionIcons: {},
};

export type HabbiconAssetsSlice = State & Actions;

export const createHabbiconAssetsSlice: StateCreator<HabbiconAssetsSlice, [], [], HabbiconAssetsSlice> = set => ({
    ...HabbiconAssetsSliceInitialState,
    startHabbiconAssetsLoad: assetRoot => set({ ...HabbiconAssetsSliceInitialState, assetRoot, assetsLoadState: 'loading' }),
    // A load for a root that has been replaced since is dropped.
    setHabbiconAssets: (assetRoot, assets) => set(x => ((x.assetRoot === assetRoot) ? { ...assets, assetsLoadState: 'loaded' } : x)),
    failHabbiconAssetsLoad: assetRoot => set(x => ((x.assetRoot === assetRoot) ? { assetsLoadState: 'failed' } : x)),
});
