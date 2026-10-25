/**
 * A Flash `TextFormat` together with the `TextField` rendering properties the client set next
 * to it - everything that decides how a string rasterizes.
 */
import { AntiAliasType, ColorTransform, EtchingPosition, GridFitType, NormalPenLayout, StageQuality } from './air32/types';

export interface FlashTextFormat {
    /** `Volter`, `Volter Bold`, `Ubuntu` or `UbuntuCondensed` - see `FLASH_FONT_FACES`. */
    fontFamily: string;
    /** Whole pixels; the exact renderer has no fractional sizes. */
    fontSize: number;
    bold: boolean;
    italic: boolean;
    underline: boolean;
    /** `0xRRGGBB`. */
    color: number;
    /** Must stay 0 for the exact renderer. */
    letterSpacing: number;
    leading: number;
    antiAliasType: AntiAliasType;
    gridFitType: GridFitType;
    /** `TextField.thickness`, -200 to 200. */
    thickness: number;
    /** `TextField.sharpness`, -400 to 400. */
    sharpness: number;
    kerning: boolean;
    /** The stage quality the field is drawn at - see `DEFAULT_FLASH_TEXT_FORMAT`. Only normal anti-aliasing reads it. */
    stageQuality: StageQuality;
    /** Where a normal anti-aliased run puts its glyphs - see `DEFAULT_FLASH_TEXT_FORMAT`. */
    normalPenLayout: NormalPenLayout;
    colorTransform: ColorTransform | null;
    /** `0xAARRGGBB` - the skin's one pixel etching; advanced anti-aliasing only. */
    etchingColor: number | null;
    etchingPosition: EtchingPosition | null;
}

/**
 * The face part of a format - what a raw `fontFamily` override has to resolve to before it can
 * be folded into a named style's format (`utils/textStyles.ts`'s `flashFaceOverride`).
 */
export type FlashTextFace = Pick<FlashTextFormat, 'fontFamily' | 'bold' | 'italic'>;

/**
 * The `TextField` vars a Flash `<text>` layout declares over its style's format, by the names
 * `TextController.createPropertySetterTable` gives them: `bold`, `italic`, `underline`,
 * `spacing`, `leading`, `antialias_type`, `grid_fit_type`, `thickness`, `sharpness`, `kerning`,
 * `etching_color` and `etching_position`. `setTextFormatting` applies each var the element
 * declares on top of the named style and leaves the style's own value everywhere else, so they
 * are all optional. The three Pixi has its own vocabulary for - `font_face`, `font_size` and
 * `text_color` - travel in `textOptions` as `fontFamily`, `fontSize` and `fill` instead.
 */
export type FlashTextFieldOverrides = Partial<Pick<FlashTextFormat,
    'bold' | 'italic' | 'underline' | 'letterSpacing' | 'leading'
    | 'antiAliasType' | 'gridFitType' | 'thickness' | 'sharpness' | 'kerning'
    | 'etchingColor' | 'etchingPosition'>>;

/**
 * What a `TextField` renders with when its style names nothing else.
 *
 * `stageQuality` is `low` because the client runs its stage at low quality (`HabboAir` sets
 * `stage.quality = "low"` at start-up), and every window text is drawn at it: `TextSkinRenderer`
 * puts its field into the window's bitmap with `BitmapData.draw`, which renders at the stage's
 * quality. Advanced anti-aliasing (Ubuntu, Illumina) ignores the setting.
 *
 * `normalPenLayout` is `units`, not the `twips` of Sulake's JavaScript layout, which floors every
 * advance to whole twips on its own: Volter's 6 px advances (13653 of a 20480 em at 9 px) become
 * 5.95 px, so each glyph lands a twentieth of a pixel further left than AIR puts it. At high
 * quality that drew grey smeared columns; at low quality it snapped them crisp but a pixel short
 * ("di" of "discussion" touching in the room settings' category menu). AIR places every Volter
 * glyph at the exact sum of its advances - a screenshot of the Flash client's category menu
 * matches the `units` layout pixel for pixel at either quality and the `twips` one at neither.
 * The golden corpus pins Sulake's renderer, so it keeps `twips` as the renderer's own default.
 */
export const DEFAULT_FLASH_TEXT_FORMAT: Readonly<FlashTextFormat> = Object.freeze({
    fontFamily: 'Volter',
    fontSize: 9,
    bold: false,
    italic: false,
    underline: false,
    color: 0x000000,
    letterSpacing: 0,
    leading: 0,
    antiAliasType: 'advanced',
    gridFitType: 'pixel',
    thickness: 0,
    sharpness: 0,
    kerning: true,
    stageQuality: 'low',
    normalPenLayout: 'units',
    colorTransform: null,
    etchingColor: null,
    etchingPosition: null,
});

export const normalizeFlashTextFormat = (format?: Partial<FlashTextFormat> | null): FlashTextFormat => ({ ...DEFAULT_FLASH_TEXT_FORMAT, ...(format ?? {}) });

/**
 * A named style's format with an element's own overrides layered on, the way
 * `TextController.setTextFormatting` layers them: the style first, then the `TextField` vars it
 * declares, then `font_face` - a face alias adds its weight and slant, it does not clear them,
 * since Flash's `font_face` sets the family and leaves `bold` / `italic` to their own vars -
 * then `font_size` and `text_color`.
 *
 * The one place the rasterizer (`useFlashTextCanvas`) and the caret and selection geometry a
 * `TextInput` measures read, so what is drawn and what is measured cannot drift apart.
 */
export const resolveFlashTextFormat = ({ style, field, face, fontSize, color }: {
    style?: Partial<FlashTextFormat>;
    field?: FlashTextFieldOverrides;
    face?: FlashTextFace;
    fontSize?: number;
    /** `0xRRGGBB`. */
    color?: number;
}): FlashTextFormat => normalizeFlashTextFormat({
    ...style,
    ...(field ?? {}),
    ...(face ? { fontFamily: face.fontFamily, ...(face.bold ? { bold: true } : {}), ...(face.italic ? { italic: true } : {}) } : {}),
    ...((fontSize !== undefined) ? { fontSize } : {}),
    ...((color !== undefined) ? { color } : {}),
});
