/**
 * The `PerkAllowances` codes the client reads - `SessionDataManager.isPerkAllowed(code)`. A code
 * the server never sent is not allowed.
 */
export const PerkCodes = {
    /** The camera, and the `:camera` command. */
    Camera: 'CAMERA',
    /** Floor plans past `FloorPlanCache.MAX_AREA`. */
    BuilderAtWork: 'BUILDER_AT_WORK',
    /** Room thumbnails, and thumbnail view modes in the navigator. */
    NavigatorRoomThumbnailCamera: 'NAVIGATOR_ROOM_THUMBNAIL_CAMERA',
    /** The guide tool, and the me menu's guide button (`MeMenuNewController.toggleVisibility`). */
    UseGuideTool: 'USE_GUIDE_TOOL',
    /** Citizenship passed: the talent track offered is the helper one (`SessionDataManager.currentTalentTrack`). */
    Citizen: 'CITIZEN',
} as const;

export type PerkCode = typeof PerkCodes[keyof typeof PerkCodes];
