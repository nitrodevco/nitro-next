/**
 * The Flash `HabboFreeFlowChatCom` chat style catalogue, as `ChatStyleLibrary` reads it:
 * `chatstyles_xml` (every style id, its asset id and flags) merged with each style's
 * `style_<assetId>_regpoints` text (where the nine-slice grid, pointer, face, emblem, text
 * margins and colours sit inside the style's bitmaps). `regPoints` carries exactly the keys the
 * style's file has, so an absent key is absent in Flash too and `ChatStyle` applies the
 * library's defaults. The bitmaps live under `public/assets/chat/styles/<assetId>/`, copied
 * straight out of the SWF: `chat_bubble_base`, `chat_bubble_pointer` and `selector_preview`
 * for every style, plus whatever `bitmaps` lists.
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

const rect = (x: number, y: number, width: number, height: number): ChatStyleRect => ({ x, y, width, height });
const point = (x: number, y: number): ChatStylePoint => ({ x, y });

/** The regpoints every `normal_*` colour variant shares; only the text colour differs. */
const normalRegPoints = (textColorRGB: number): ChatStyleRegPoints => ({ scale9: rect(29, 17, 1, 1), pointerY: 23, faceXY: point(13, 12), textFieldMargins: rect(28, 4, 12, 7), textColorRGB, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 0) });

/** `notification` and every `notification_*` style. */
const NOTIFICATION_REG_POINTS: ChatStyleRegPoints = { scale9: rect(38, 7, 1, 1), faceXY: point(19, 13), anonymous: true, textFieldMargins: rect(38, 2, 12, 6), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 17, overlapRect: rect(0, -2, 0, -4) };

/** The four `wired_team_*` styles. */
const WIRED_TEAM_REG_POINTS: ChatStyleRegPoints = { scale9: rect(42, 20, 1, 1), pointerY: 26, pointerXMargins: [ 36, 15 ], faceXY: point(21, 15), textFieldMargins: rect(36, 7, 12, 7), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(2, 1, 0, 0) };

const define = (id: number, assetId: string, flags: ChatStyleFlags, regPoints: ChatStyleRegPoints, bitmaps: ChatStyleOptionalBitmap[] = []): ChatStyleDefinition => ({ id, assetId, flags, regPoints, bitmaps });

/** In `chatstyles_xml` order. */
export const CHAT_STYLE_DEFINITIONS: ChatStyleDefinition[] = [
    define(0, 'normal', { staffOverrideable: true }, { ...normalRegPoints(0x000000), colorXY: point(0, 0) }, [ 'chat_bubble_color' ]),
    define(1, 'generic', { systemStyle: true }, { scale9: rect(28, 18, 1, 1), anonymous: true, textFieldMargins: rect(28, 5, 12, 7), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -1, 0, 0) }),
    define(2, 'bot', { systemStyle: true, allowHTML: true }, { scale9: rect(29, 17, 1, 1), pointerY: 22, textFieldMargins: rect(28, 4, 12, 7), textColorRGB: 0xffffff, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 0) }),
    define(3, 'normal_red', { staffOverrideable: true }, normalRegPoints(0x000000)),
    define(4, 'normal_blue', { staffOverrideable: true }, normalRegPoints(0x000000)),
    define(5, 'normal_yellow', { staffOverrideable: true }, normalRegPoints(0x000000)),
    define(6, 'normal_green', { staffOverrideable: true }, normalRegPoints(0x000000)),
    define(7, 'normal_grey', { staffOverrideable: true }, normalRegPoints(0x000000)),
    define(8, 'fortune_teller', { systemStyle: true }, { scale9: rect(27, 20, 1, 1), pointerY: 26, textFieldMargins: rect(26, 7, 12, 7), textColorRGB: 0xffffff, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, 2, 0, 0) }),
    define(9, 'zombie_hand', { hcOnly: true, staffOverrideable: true }, { scale9: rect(30, 17, 1, 1), pointerY: 26, faceXY: point(19, 18), textFieldMargins: rect(31, 10, 17, 7), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(6, 4, 5, 0) }),
    define(10, 'skeleton', { hcOnly: true, staffOverrideable: true }, { scale9: rect(34, 29, 1, 1), pointerY: 32, faceXY: point(19, 24), textFieldMargins: rect(32, 16, 15, 9), textColorRGB: 0xffffff, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(2, 8, 3, 2) }),
    define(11, 'normal_sky_blue', { hcOnly: true, staffOverrideable: true }, normalRegPoints(0x000000)),
    define(12, 'normal_pink', { hcOnly: true, staffOverrideable: true }, normalRegPoints(0x000000)),
    define(13, 'normal_purple', { hcOnly: true, staffOverrideable: true }, normalRegPoints(0xffffff)),
    define(14, 'normal_dark_yellow', { hcOnly: true, staffOverrideable: true }, normalRegPoints(0xffffff)),
    define(15, 'normal_dark_turquoise', { hcOnly: true, staffOverrideable: true }, normalRegPoints(0xffffff)),
    define(16, 'hearts', { hcOnly: true, staffOverrideable: true }, { scale9: rect(31, 15, 1, 1), pointerY: 26, faceXY: point(14, 15), textFieldMargins: rect(29, 7, 12, 7), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(1, 1, 0, 0) }),
    define(17, 'gothicrose', { hcOnly: true, staffOverrideable: true }, { scale9: rect(36, 24, 1, 1), pointerY: 30, faceXY: point(19, 19), textFieldMargins: rect(35, 11, 10, 9), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(5, 5, 0, 2) }),
    define(19, 'piglet', { hcOnly: true, staffOverrideable: true }, { scale9: rect(30, 17, 1, 1), pointerY: 26, faceXY: point(20, 15), textFieldMargins: rect(29, 7, 12, 7), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(3, 1, 0, 0) }),
    define(20, 'sausagedog', { hcOnly: true, staffOverrideable: true }, { scale9: rect(30, 18, 1, 1), pointerY: 24, faceXY: point(20, 15), textFieldMargins: rect(29, 7, 12, 7), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(3, 1, 0, 0) }),
    define(21, 'firingmylazer', { hcOnly: true, staffOverrideable: true }, { scale9: rect(32, 22, 1, 1), pointerY: 34, faceXY: point(15, 23), textFieldMargins: rect(25, 15, 12, 9), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, 9, 0, 0) }),
    define(22, 'dragon', { hcOnly: true, staffOverrideable: true }, { scale9: rect(35, 18, 1, 1), pointerY: 29, faceXY: point(19, 18), textFieldMargins: rect(28, 9, 12, 9), textColorRGB: 0x330000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(5, 4, 0, 0) }),
    define(23, 'staff', { staffOverrideable: true }, { scale9: rect(39, 15, 1, 1), pointerY: 25, faceXY: point(16, 15), textFieldMargins: rect(33, 7, 17, 11), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(3, 2, 0, 0), usePixelPerfectNineSlice: true, emblemXY: point(0, 0), emblemMultilineXY: point(0, 0) }, [ 'chat_bubble_emblem', 'chat_bubble_emblem_multiline' ]),
    define(24, 'bats', { hcOnly: true, staffOverrideable: true }, { scale9: rect(40, 22, 1, 1), pointerY: 28, faceXY: point(22, 17), textFieldMargins: rect(38, 9, 12, 8), textColorRGB: 0xffffff, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(8, 3, 0, 0) }),
    define(25, 'console', { hcOnly: true, staffOverrideable: true }, { scale9: rect(28, 18, 1, 1), pointerY: 26, faceXY: point(15, 15), textFieldMargins: rect(28, 7, 12, 10), textColorRGB: 0xffffff, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 0) }),
    define(26, 'steampunk_pipe', { hcOnly: true, staffOverrideable: true }, { scale9: rect(30, 16, 1, 1), pointerY: 20, faceXY: point(13, 13), textFieldMargins: rect(28, 4, 12, 9), textColorRGB: 0xcc9933, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(2, -1, 0, 0) }),
    define(27, 'storm', { hcOnly: true, staffOverrideable: true }, { scale9: rect(36, 24, 1, 1), pointerY: 30, faceXY: point(20, 19), textFieldMargins: rect(35, 11, 12, 7), textColorRGB: 0xffffff, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(7, 5, 0, 0) }),
    define(28, 'parrot', { systemStyle: true }, { scale9: rect(29, 17, 1, 1), pointerY: 23, textFieldMargins: rect(25, 4, 15, 7), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 0) }),
    define(29, 'pirate', { hcOnly: true, staffOverrideable: true }, { scale9: rect(32, 10, 1, 1), pointerY: 24, faceXY: point(15, 13), textFieldMargins: rect(32, 5, 10, 8), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(2, -1, 0, 0) }),
    define(30, 'bot_guide', { systemStyle: true, allowHTML: true }, { scale9: rect(29, 17, 1, 1), pointerY: 22, textFieldMargins: rect(28, 4, 12, 7), textColorRGB: 0x031a26, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 0) }),
    define(31, 'bot_rentable', { systemStyle: true, notification: true }, { scale9: rect(29, 17, 1, 1), pointerY: 22, faceXY: point(16, 10), textFieldMargins: rect(28, 4, 12, 7), textColorRGB: 0xffffff, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 0) }, [ 'icon' ]),
    define(32, 'skelestock', { systemStyle: true }, { scale9: rect(29, 16, 1, 1), pointerY: 22, textFieldMargins: rect(28, 4, 12, 7), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 0) }),
    define(33, 'bot_frank_large', { systemStyle: true, allowHTML: true }, { scale9: rect(38, 7, 1, 1), pointerY: 21, faceXY: point(19, 13), textFieldMargins: rect(38, 2, 12, 6), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 17, overlapRect: rect(0, -2, 0, -4) }, [ 'icon' ]),
    define(34, 'notification', { systemStyle: true, notification: true }, NOTIFICATION_REG_POINTS, [ 'icon' ]),
    define(35, 'goat', { systemStyle: true }, { scale9: rect(29, 19, 1, 1), pointerY: 25, textFieldMargins: rect(28, 6, 12, 7), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, 0, 0, 0) }),
    define(36, 'santa', { systemStyle: true }, { scale9: rect(29, 17, 1, 1), pointerY: 23, faceXY: point(11, 12), textFieldMargins: rect(28, 4, 12, 7), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 0) }, [ 'icon' ]),
    define(37, 'ambassador', { staffOverrideable: true, ambassadorOnly: true }, { scale9: rect(32, 21, 1, 1), pointerY: 27, faceXY: point(17, 16), textFieldMargins: rect(31, 8, 12, 7), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(3, 2, 0, 0) }),
    define(38, 'radio', { systemStyle: true }, { scale9: rect(29, 17, 1, 1), pointerY: 23, faceXY: point(11, 12), textFieldMargins: rect(28, 4, 12, 7), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 0) }, [ 'icon' ]),
    define(120, 'snowstorm_red', { systemStyle: true }, { scale9: rect(34, 29, 1, 1), pointerY: 34, faceXY: point(17, 24), textFieldMargins: rect(32, 16, 15, 9), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(2, 8, 3, 2) }),
    define(121, 'snowstorm_blue', { systemStyle: true }, { scale9: rect(34, 29, 1, 1), pointerY: 34, faceXY: point(17, 24), textFieldMargins: rect(32, 16, 15, 9), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(2, 8, 3, 2) }),
    define(130, 'wired_team_red', { systemStyle: true }, WIRED_TEAM_REG_POINTS),
    define(131, 'wired_team_blue', { systemStyle: true }, WIRED_TEAM_REG_POINTS),
    define(132, 'wired_team_yellow', { systemStyle: true }, WIRED_TEAM_REG_POINTS),
    define(133, 'wired_team_green', { systemStyle: true }, WIRED_TEAM_REG_POINTS),
    // Notification styles
    define(200, 'notification_red', { systemStyle: true, notification: true }, NOTIFICATION_REG_POINTS, [ 'icon' ]),
    define(201, 'notification_green', { systemStyle: true, notification: true }, NOTIFICATION_REG_POINTS, [ 'icon' ]),
    define(202, 'notification_blue', { systemStyle: true, notification: true }, NOTIFICATION_REG_POINTS, [ 'icon' ]),
    define(210, 'notification_alert', { systemStyle: true, notification: true }, NOTIFICATION_REG_POINTS, [ 'icon' ]),
    define(211, 'notification_info', { systemStyle: true, notification: true }, NOTIFICATION_REG_POINTS, [ 'icon' ]),
    define(212, 'notification_warning', { systemStyle: true, notification: true }, NOTIFICATION_REG_POINTS, [ 'icon' ]),
    define(220, 'notification_wrong', { systemStyle: true, notification: true }, NOTIFICATION_REG_POINTS, [ 'icon' ]),
    define(221, 'notification_wrong_circle', { systemStyle: true, notification: true }, NOTIFICATION_REG_POINTS, [ 'icon' ]),
    define(222, 'notification_correct', { systemStyle: true, notification: true }, NOTIFICATION_REG_POINTS, [ 'icon' ]),
    define(223, 'notification_correct_circle', { systemStyle: true, notification: true }, NOTIFICATION_REG_POINTS, [ 'icon' ]),
    define(224, 'notification_question_mark', { systemStyle: true, notification: true }, NOTIFICATION_REG_POINTS, [ 'icon' ]),
    define(225, 'notification_question_mark_circle', { systemStyle: true, notification: true }, NOTIFICATION_REG_POINTS, [ 'icon' ]),
    define(226, 'notification_arrow_up', { systemStyle: true, notification: true }, NOTIFICATION_REG_POINTS, [ 'icon' ]),
    define(227, 'notification_arrow_up_circle', { systemStyle: true, notification: true }, NOTIFICATION_REG_POINTS, [ 'icon' ]),
    define(228, 'notification_arrow_down', { systemStyle: true, notification: true }, NOTIFICATION_REG_POINTS, [ 'icon' ]),
    define(229, 'notification_arrow_down_circle', { systemStyle: true, notification: true }, NOTIFICATION_REG_POINTS, [ 'icon' ]),
    define(250, 'notification_skull', { systemStyle: true, notification: true }, NOTIFICATION_REG_POINTS, [ 'icon' ]),
    define(251, 'notification_skull_2', { systemStyle: true, notification: true }, NOTIFICATION_REG_POINTS, [ 'icon' ]),
    define(252, 'notification_magnifier', { systemStyle: true, notification: true }, NOTIFICATION_REG_POINTS, [ 'icon' ]),
    // NFT styles - pickable once the account owns them
    define(1000, 'nft_habbo_avatar_bronze', {}, { scale9: rect(35, 13, 1, 1), pointerY: 28, faceXY: point(16, 16), colorXY: point(0, 0), textFieldMargins: rect(29, 9, 12, 7), textColorRGB: 0x330000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 0) }),
    define(1001, 'nft_habbo_avatar_gold', {}, { scale9: rect(35, 15, 1, 1), pointerY: 28, faceXY: point(16, 16), colorXY: point(0, 0), textFieldMargins: rect(29, 9, 12, 7), textColorRGB: 0x330000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 0) }),
    define(1002, 'nft_habbo_avatar_diamond', {}, { scale9: rect(35, 15, 1, 1), pointerY: 28, faceXY: point(16, 16), colorXY: point(0, 0), textFieldMargins: rect(29, 9, 12, 7), textColorRGB: 0x330000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 0) }),
    define(1003, 'nft_habbo_avatar_rainbow', {}, { scale9: rect(35, 15, 1, 1), pointerY: 28, faceXY: point(16, 16), colorXY: point(0, 0), textFieldMargins: rect(29, 9, 12, 7), textColorRGB: 0x330000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 0) }),
    define(1004, 'nft_habbo_avatar_trippy', {}, { scale9: rect(37, 15, 1, 1), pointerY: 31, faceXY: point(20, 16), colorXY: point(0, 0), textFieldMargins: rect(33, 12, 12, 7), textColorRGB: 0x330000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 0) }),
    define(1005, 'nft_habbo_avatar_ultra_trippy', {}, { scale9: rect(37, 15, 1, 1), pointerY: 31, faceXY: point(20, 16), colorXY: point(0, 0), textFieldMargins: rect(33, 12, 12, 7), textColorRGB: 0x330000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 0) }),
    define(1006, 'nft_mvhq', {}, { scale9: rect(37, 15, 1, 1), pointerY: 31, faceXY: point(20, 16), colorXY: point(0, 0), textFieldMargins: rect(33, 12, 12, 7), textColorRGB: 0xffffff, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 0) }),
    define(1007, 'nft_metakey', {}, { scale9: rect(37, 15, 1, 1), pointerY: 30, faceXY: point(20, 16), colorXY: point(0, 0), textFieldMargins: rect(33, 11, 12, 9), textColorRGB: 0xffffff, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 0) }),
    define(1010, 'nft_crafted_habbo_avatar', {}, { scale9: rect(47, 17, 1, 1), pointerY: 32, faceXY: point(20, 18), colorXY: point(0, 0), textFieldMargins: rect(40, 13, 12, 9), textColorRGB: 0xffffff, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 0) }),
    define(1011, 'nft_balloon_orange', {}, { scale9: rect(42, 19, 1, 1), pointerY: 29, faceXY: point(16, 18), colorXY: point(0, 0), textFieldMargins: rect(39, 10, 12, 7), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, 5, 3, 0) }),
    define(1012, 'nft_balloon_blue', {}, { scale9: rect(42, 19, 1, 1), pointerY: 29, faceXY: point(16, 18), colorXY: point(0, 0), textFieldMargins: rect(39, 10, 12, 7), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, 5, 3, 0) }),
    define(1013, 'nft_origami_orange', {}, { scale9: rect(33, 14, 1, 1), pointerY: 26, faceXY: point(11, 15), colorXY: point(0, 0), textFieldMargins: rect(34, 7, 19, 11), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(-1, 2, 1, 0) }),
    define(1014, 'nft_origami_blue', {}, { scale9: rect(33, 14, 1, 1), pointerY: 26, faceXY: point(11, 15), colorXY: point(0, 0), textFieldMargins: rect(34, 7, 19, 11), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(-1, 2, 1, 0) }),
    define(1015, 'nft_chocolate_dark', {}, { scale9: rect(30, 13, 1, 1), pointerY: 23, faceXY: point(13, 12), colorXY: point(0, 0), textFieldMargins: rect(31, 5, 9, 6), textColorRGB: 0xfad79b, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 0) }),
    define(1016, 'nft_chocolate_white', {}, { scale9: rect(30, 13, 1, 1), pointerY: 23, faceXY: point(13, 12), colorXY: point(0, 0), textFieldMargins: rect(31, 5, 9, 6), textColorRGB: 0x5a3620, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 0) }),
    define(1017, 'nft_clay', {}, { scale9: rect(35, 11, 1, 1), pointerY: 23, faceXY: point(17, 12), colorXY: point(0, 0), textFieldMargins: rect(35, 4, 15, 6), textColorRGB: 0x4b270c, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 0) }),
    define(1018, 'nft_scroll', {}, { scale9: rect(32, 11, 1, 1), pointerY: 23, faceXY: point(15, 12), colorXY: point(0, 0), textFieldMargins: rect(31, 4, 12, 11), textColorRGB: 0x842717, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 3) }),
    define(1019, 'nft_pillow', {}, { scale9: rect(34, 9, 1, 1), pointerY: 23, faceXY: point(17, 10), colorXY: point(0, 0), textFieldMargins: rect(33, 2, 16, 10), textColorRGB: 0xffd99c, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 2) }),
    define(1020, 'nft_bobba', {}, { scale9: rect(27, 13, 1, 1), pointerY: 27, faceXY: point(17, 16), colorXY: point(0, 0), textFieldMargins: rect(28, 9, 23, 9), textColorRGB: 0xffffff, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(3, 2, 5, 0) }),
    define(1021, 'nft_pinktube', {}, { scale9: rect(29, 14, 1, 1), pointerY: 24, faceXY: point(16, 13), colorXY: point(0, 0), textFieldMargins: rect(32, 5, 13, 8), textColorRGB: 0xffffff, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -3, 0, 0) }),
    define(1022, 'nft_keycaps', {}, { scale9: rect(29, 10, 1, 1), pointerY: 23, faceXY: point(13, 12), colorXY: point(0, 0), textFieldMargins: rect(28, 2, 12, 9), textColorRGB: 0x3a342e, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 0) }),
    define(1023, 'nft_xmas22', {}, { scale9: rect(36, 12, 1, 1), pointerY: 19, faceXY: point(13, 12), colorXY: point(0, 0), textFieldMargins: rect(28, 3, 14, 12), textColorRGB: 0xffffff, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 0) }),
    define(1024, 'nft_rocky', {}, { scale9: rect(32, 18, 1, 1), pointerY: 27, pointerXMargins: [ 28, 23 ], faceXY: point(16, 18), colorXY: point(0, 0), textFieldMargins: rect(27, 11, 15, 9), textColorRGB: 0xedefef, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(2, 2, 3, 0) }),
    define(1025, 'nft_ice', {}, { scale9: rect(32, 18, 1, 1), pointerY: 27, pointerXMargins: [ 28, 23 ], faceXY: point(16, 18), colorXY: point(0, 0), textFieldMargins: rect(27, 11, 15, 9), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(2, 2, 3, 0) }),
    define(1026, 'nft_aurora', {}, { scale9: rect(30, 14, 1, 1), pointerY: 31, faceXY: point(16, 16), colorXY: point(0, 0), textFieldMargins: rect(28, 6, 12, 12), textColorRGB: 0xffbb00, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -4, 0, 0) }),
    define(1027, 'nft_money', {}, { scale9: rect(34, 19, 1, 1), pointerY: 31, faceXY: point(22, 16), colorXY: point(0, 0), textFieldMargins: rect(34, 6, 24, 8), textColorRGB: 0x062100, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 0) }),
    // Purchasable styles
    define(10000, 'recycled', { purchasable: true }, { scale9: rect(30, 19, 1, 1), pointerY: 29, faceXY: point(16, 15), textFieldMargins: rect(30, 7, 14, 9), textColorRGB: 0x000000, fontFace: 'Ubuntu', fontSize: 12, overlapRect: rect(0, -2, 0, 0) }),
];

/** `ChatStyleLibrary.DEFAULT_STYLE` - the style every unknown id falls back to. */
export const CHAT_STYLE_DEFAULT_ID = 0;

export const CHAT_STYLE_ASSET_BASE = '/assets/chat/styles';

export const chatStyleAssetUrl = (assetId: string, file: ChatStyleAssetFile): string => `${CHAT_STYLE_ASSET_BASE}/${assetId}/${file}.png`;

/** `RoomChatInputView.isNftChatStyle` - ids 1000-9999 are NFT styles, pickable only when the account holds one. */
export const isNftChatStyle = (styleId: number): boolean => (styleId >= 1000) && (styleId <= 9999);

/** `RoomChatInputView.isStaticStyle` - everything under 1000 comes with the client. */
export const isStaticChatStyle = (styleId: number): boolean => (styleId < 1000);
