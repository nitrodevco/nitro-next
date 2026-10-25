/**
 * What a WIRED Set Visibility box last told an object (furni, user, pet or bot) -
 * `com.sulake.habbo.room.object.data.WiredFurnitureTransparencyData` (WIN63-202610201032).
 * Kept on the object's model (`furniture_wired_transparency_data`) so a re-created object gets it back.
 */
export class WiredFurnitureTransparencyData {
    constructor(
        /** 0 (opaque) to 100 (invisible). */
        public readonly transparency: number,
        public readonly allowClickThrough: boolean,
        /** `FurniTransparencyEasingMode`: 0 instant, 1 linear, 2 ease in, 3 ease out, 4 ease in-out. */
        public readonly easingMode: number,
    ) { }
}

/**
 * What a WIRED Set Highlight box last told an object - `com.sulake.habbo.room.object.data.WiredFurnitureHighlightData`
 * (WIN63-202610201032). Kept on the object's model (`furniture_wired_highlight_data`) so a re-created object gets it back.
 */
export class WiredFurnitureHighlightData {
    /** `wiredfurni.params.set_furni_highlight.type.0` to `.5`: Outline, Soft glow, Darken, Color tint, Brighten, Neon aura. */
    public static TYPE_OUTLINE = 0;
    public static TYPE_GLOW = 1;
    public static TYPE_DARKEN = 2;
    public static TYPE_TINT = 3;
    public static TYPE_BRIGHTEN = 4;
    public static TYPE_AURA = 5;

    constructor(
        public readonly highlightType: number,
        /** 0 (off) to 100. */
        public readonly strength: number,
        /** 0xRRGGBB. */
        public readonly color: number,
        /** 0 Steady, 1 Pulse (a one second cycle). */
        public readonly animationMode: number,
        /** As the transparency's; only used when `animationMode` is 0. */
        public readonly easingMode: number,
    ) { }
}

/**
 * One entry of `WiredFurniVisualizationState` / `WiredUserVisualizationState` (Flash `FurniTransparencyData`,
 * `FurniHighlightData`, `UserTransparencyData`, `UserHighlightData`): `id` is the furni id (negative for a wall
 * item) or the user's room index.
 */
export interface IWiredVisualizationStateEntry<T> {
    id: number;
    data: T;
}
