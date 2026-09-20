// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
/** Flash `InputSourcesConf.FURNI_SOURCE_FURNI_PICKS_1`: the furni picked for the first selection (`stuffIds`). */
export const FURNI_SOURCE_FURNI_PICKS_1 = 100;
/** Flash `InputSourcesConf.FURNI_SOURCE_FURNI_PICKS_2`: the furni picked for the second selection (`stuffIds2`). */
export const FURNI_SOURCE_FURNI_PICKS_2 = 101;
/**
 * Flash `InputSourcesConf._-ux` - the name is obfuscated. A second source id that picks into `stuffIds`:
 * `WiredInputSourcePicker`, `allowFurniSelection` and `isDualFurniPickingMode` all treat it like `FURNI_SOURCE_FURNI_PICKS_1`.
 */
export const FURNI_SOURCE_FURNI_PICKS_1_ALTERNATE = 110;

/** Flash `InputSourcesConf`: which sources each furni and user selection of a wired box may take, and which it starts with. */
export interface IInputSourcesConf {
    /** One list of source ids per furni selection; its length is Flash's `amountFurniSelections`. */
    allowedFurniSources: number[][];
    /** One list of source ids per user selection. */
    allowedUserSources: number[][];
    /** The default source of each furni selection - what `furniSourceTypes` is compared with to tell custom sources. */
    defaultFurniSources: number[];
    /** The same for the user selections. */
    defaultUserSources: number[];
}
