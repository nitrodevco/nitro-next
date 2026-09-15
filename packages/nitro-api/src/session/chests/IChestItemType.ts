/** What kind of item a wired chest holds: a floor or wall furni type, plus the poster id for legacy posters. */
export interface IChestItemType {
    isWallItem: boolean;
    typeId: number;
    /** Empty for anything but a legacy poster. */
    legacyPosterId: string;
}
