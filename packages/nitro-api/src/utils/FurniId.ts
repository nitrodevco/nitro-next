export class FurniId {
    private static BUILDER_CLUB_FURNI_ID_BASE: number = 0x7FFF0000;

    /** Temporary furni (a trial or loaner) are numbered in the band just below the builders club ids. */
    private static TEMP_FURNI_ID_BASE: number = 0x7FFEC000;

    public static isBuilderClubId(k: number): boolean {
        return (k >= FurniId.BUILDER_CLUB_FURNI_ID_BASE);
    }

    public static isTempId(k: number): boolean {
        return (k >= FurniId.TEMP_FURNI_ID_BASE) && (k < FurniId.BUILDER_CLUB_FURNI_ID_BASE);
    }
}
