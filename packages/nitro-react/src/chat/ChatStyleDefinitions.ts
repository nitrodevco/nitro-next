/**
 * The Flash `HabboFreeFlowChatCom` chat style catalogue, as `ChatStyleLibrary` reads it:
 * `chatstyles_xml` (every style id, its asset id and flags) merged with each style's
 * `style_<assetId>_regpoints` text (where the nine-slice grid, pointer, face, emblem, text
 * margins and colours sit inside the style's bitmaps). `regPoints` carries exactly the keys the
 * style's file has, so an absent key is absent in Flash too and `ChatStyle` applies the
 * library's defaults. The bitmaps live under `public/assets/chat-styles/<assetId>/`, copied
 * straight out of the SWF: `chat_bubble_base`, `chat_bubble_pointer` and `selector_preview`
 * for every style, plus whatever `bitmaps` lists.
 *
 * The catalogue itself is not here. Each style's row is a `chat_definition.json` in its own
 * folder, beside the bitmaps it describes - `{ id, flags, regPoints, bitmaps }`, with the folder
 * name as the `assetId`. `scripts/build-asset-bundles.ts` collects them into one
 * `chat-style-definitions.json` inside `chat-styles.nitro`, and `ChatStyleLibrary` reads that
 * back, so the catalogue arrives with the art it describes and is never compiled into the client.
 * This file is the types those JSON rows are read as, plus the two id predicates.
 *
 * Carried by hand; `scripts/drift/chat_styles.py` diffs every style, field and bitmap against
 * the client, so keep this in step with it after a revision bump.
 */

export interface ChatStylePoint {
    x: number;
    y: number;
}

export interface ChatStyleRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

/** One `style_<assetId>_regpoints` file. Optional keys are the ones `ChatStyleLibrary` guards with `hasConfig`. */
export interface ChatStyleRegPoints {
    /** `9sliceXY` + `9sliceWH` - the stretchable part of the base bitmap. */
    scale9: ChatStyleRect;
    /** `pointerY` - the row of the base bitmap the pointer's top sits on (read only for styles that are not anonymous). */
    pointerY?: number;
    /** `pointerXMargins` - how close to the bubble's left / right edge the pointer may go (Flash defaults: 28 and 15). */
    pointerXMargins?: number[];
    /** `faceXY` - where the speaker's head (or the style's own icon) is centred; no face without it. */
    faceXY?: ChatStylePoint;
    /** `colorXY` - where `chat_bubble_color` is darkened onto the base with the speaker's chest colour. */
    colorXY?: ChatStylePoint;
    /** `anonymous = true` - no name prefix, no pointer, bubble can't be clicked. */
    anonymous?: boolean;
    /** `textFieldMargins` - left, top, right, bottom padding around the text field. */
    textFieldMargins: ChatStyleRect;
    /** Flash default: `0`. */
    textColorRGB?: number;
    /** Flash default: `Volter`. */
    fontFace?: string;
    /** Flash default: `9`. */
    fontSize?: number;
    /** `overlapRect` - how far neighbouring bubbles may overlap this one's art (left, top, right, bottom). */
    overlapRect?: ChatStyleRect;
    /** The `a:link` / `a:hover` / `a:active` colours; each defaults to the text colour. */
    linkColorRGB?: number;
    linkHoverColorRGB?: number;
    linkActiveColorRGB?: number;
    /** Nine-slice by copying patches (`ManualNineSliceSprite`) instead of Flash's `scale9Grid`. */
    usePixelPerfectNineSlice?: boolean;
    /** `emblemXY` - where `chat_bubble_emblem` is drawn over the background. */
    emblemXY?: ChatStylePoint;
    /** `emblemMultilineXY` - where `chat_bubble_emblem_multiline` replaces it once the text wraps. */
    emblemMultilineXY?: ChatStylePoint;
}

/** The `<style>` attributes of `chatstyles_xml`; an absent attribute is `false`, as `== "true"` reads it. */
export interface ChatStyleFlags {
    systemStyle?: boolean;
    /** Only pickable once the account owns it (`UserPurchasableChatStylesMessage`). */
    purchasable?: boolean;
    hcOnly?: boolean;
    /** Staff (security level 4+) may pick it regardless of club or ambassador status. */
    staffOverrideable?: boolean;
    allowHTML?: boolean;
    ambassadorOnly?: boolean;
    /** A notification bubble: `[b]`/`[red]`... markup in the text and the icon centred vertically. */
    notification?: boolean;
}

/** The bitmaps only some styles have. */
export type ChatStyleOptionalBitmap = 'chat_bubble_color' | 'icon' | 'chat_bubble_emblem' | 'chat_bubble_emblem_multiline';

export type ChatStyleAssetFile = 'chat_bubble_base' | 'chat_bubble_pointer' | 'selector_preview' | ChatStyleOptionalBitmap;

export interface ChatStyleDefinition {
    id: number;
    assetId: string;
    flags: ChatStyleFlags;
    regPoints: ChatStyleRegPoints;
    bitmaps: ChatStyleOptionalBitmap[];
}

/** `ChatStyleLibrary.DEFAULT_STYLE` - the style every unknown id falls back to. */
export const CHAT_STYLE_DEFAULT_ID = 0;

/**
 * A style's bitmap by the name it has in `chat-styles.nitro` - the path under `public/assets`
 * with `/` turned into `-`, as `scripts/build-asset-bundles.ts` names every packed asset.
 */
export const chatStyleAssetName = (assetId: string, file: ChatStyleAssetFile): string => `chat-styles-${assetId}-${file}`;

/** `RoomChatInputView.isNftChatStyle` - ids 1000-9999 are NFT styles, pickable only when the account holds one. */
export const isNftChatStyle = (styleId: number): boolean => (styleId >= 1000) && (styleId <= 9999);

/** `RoomChatInputView.isStaticStyle` - everything under 1000 comes with the client. */
export const isStaticChatStyle = (styleId: number): boolean => (styleId < 1000);
