/**
 * The Flash `HabboFreeFlowChatCom` chat style catalogue: `chatstyles.xml` (the style ids and
 * their flags) merged with every `style_<assetId>_regpoints.txt` (where the nine-slice grid,
 * pointer, face, text margins and colours sit inside each style's bitmaps). The bitmaps
 * themselves live under `public/assets/chat/styles/<assetId>/` (`chat_bubble_base.png`,
 * `chat_bubble_pointer.png`, `selector_preview.png`, plus `chat_bubble_color.png` / `icon.png`
 * where the SWF shipped them) - copied straight out of the client so the pixels match.
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

export interface ChatStyleRegPoints {
    /** `9sliceXY` + `9sliceWH` - the one stretchable pixel of the base bitmap. */
    scale9: ChatStyleRect;
    /** `pointerY` - the row of the base bitmap the pointer's top sits on (absent for anonymous styles). */
    pointerY?: number;
    /** `faceXY` - where the speaker's head (or the style's own icon) is centred. */
    faceXY?: ChatStylePoint;
    /** `colorXY` - where `chat_bubble_color.png` is darkened onto the base with the speaker's chest colour. */
    colorXY?: ChatStylePoint;
    /** `anonymous = true` - no name prefix, no pointer, bubble can't be clicked. */
    anonymous?: boolean;
    /** `textFieldMargins` - left, top, right, bottom padding around the text field. */
    textFieldMargins: ChatStyleRect;
    textColorRGB: number;
    fontFace: string;
    fontSize: number;
    /** `overlapRect` - how far neighbouring bubbles may overlap this one's art (left, top, right, bottom). */
    overlapRect: ChatStyleRect;
    linkColorRGB?: number;
    linkHoverColorRGB?: number;
    linkActiveColorRGB?: number;
}

export interface ChatStyleDefinition {
    id: number;
    assetId: string;
    systemStyle: boolean;
    hcOnly: boolean;
    staffOverrideable: boolean;
    allowHTML: boolean;
    ambassadorOnly: boolean;
    minRankRequired: number;
    hasColorLayer: boolean;
    hasIcon: boolean;
    regPoints: ChatStyleRegPoints;
}

const rect = (x: number, y: number, width: number, height: number): ChatStyleRect => ({ x, y, width, height });
const point = (x: number, y: number): ChatStylePoint => ({ x, y });

/** The regpoints shared by every `normal_*` colour variant. */
const normalRegPoints = (textColorRGB: number): ChatStyleRegPoints => ({
    scale9: rect(29, 17, 1, 1),
    pointerY: 23,
    faceXY: point(13, 12),
    textFieldMargins: rect(28, 4, 12, 7),
    textColorRGB,
    fontFace: 'Ubuntu',
    fontSize: 12,
    overlapRect: rect(0, -2, 0, 0),
});

const botRegPoints = (textColorRGB: number): ChatStyleRegPoints => ({
    scale9: rect(29, 17, 1, 1),
    pointerY: 22,
    textFieldMargins: rect(28, 4, 12, 7),
    textColorRGB,
    fontFace: 'Ubuntu',
    fontSize: 12,
    overlapRect: rect(0, -2, 0, 0),
});

type DefinitionFlags = 'systemStyle' | 'hcOnly' | 'staffOverrideable' | 'allowHTML' | 'ambassadorOnly' | 'minRankRequired' | 'hasColorLayer' | 'hasIcon';

type DefinitionInput = Omit<ChatStyleDefinition, DefinitionFlags> & Partial<Pick<ChatStyleDefinition, DefinitionFlags>>;

const define = (input: DefinitionInput): ChatStyleDefinition => ({
    systemStyle: false,
    hcOnly: false,
    staffOverrideable: true,
    allowHTML: false,
    ambassadorOnly: false,
    minRankRequired: 0,
    hasColorLayer: false,
    hasIcon: false,
    ...input,
});

export const CHAT_STYLE_DEFINITIONS: ChatStyleDefinition[] = [
    define({ id: 0, assetId: 'normal', hasColorLayer: true, regPoints: { ...normalRegPoints(0x000000), colorXY: point(0, 0) } }),
    define({ id: 1, assetId: 'generic', systemStyle: true, staffOverrideable: false, regPoints: {
        scale9: rect(28, 18, 1, 1),
        anonymous: true,
        textFieldMargins: rect(28, 5, 12, 7),
        textColorRGB: 0x000000,
        fontFace: 'Ubuntu',
        fontSize: 12,
        overlapRect: rect(0, -1, 0, 0),
    } }),
    define({ id: 2, assetId: 'bot', systemStyle: true, staffOverrideable: false, allowHTML: true, regPoints: botRegPoints(0xffffff) }),
    define({ id: 3, assetId: 'normal_red', regPoints: normalRegPoints(0x000000) }),
    define({ id: 4, assetId: 'normal_blue', regPoints: normalRegPoints(0x000000) }),
    define({ id: 5, assetId: 'normal_yellow', regPoints: normalRegPoints(0x000000) }),
    define({ id: 6, assetId: 'normal_green', regPoints: normalRegPoints(0x000000) }),
    define({ id: 7, assetId: 'normal_grey', regPoints: normalRegPoints(0x000000) }),
    define({ id: 8, assetId: 'fortune_teller', systemStyle: true, staffOverrideable: false, regPoints: {
        scale9: rect(27, 20, 1, 1),
        pointerY: 26,
        faceXY: point(11, 12),
        textFieldMargins: rect(26, 7, 12, 7),
        textColorRGB: 0xffffff,
        fontFace: 'Ubuntu',
        fontSize: 12,
        overlapRect: rect(0, 2, 0, 0),
    } }),
    define({ id: 9, assetId: 'zombie_hand', hcOnly: true, regPoints: {
        scale9: rect(30, 17, 1, 1),
        pointerY: 26,
        faceXY: point(19, 18),
        textFieldMargins: rect(31, 10, 17, 7),
        textColorRGB: 0x000000,
        fontFace: 'Ubuntu',
        fontSize: 12,
        overlapRect: rect(6, 4, 5, 0),
    } }),
    define({ id: 10, assetId: 'skeleton', hcOnly: true, regPoints: {
        scale9: rect(34, 29, 1, 1),
        pointerY: 32,
        faceXY: point(19, 24),
        textFieldMargins: rect(32, 16, 15, 9),
        textColorRGB: 0xffffff,
        fontFace: 'Ubuntu',
        fontSize: 12,
        overlapRect: rect(2, 8, 3, 2),
    } }),
    define({ id: 11, assetId: 'normal_sky_blue', hcOnly: true, regPoints: normalRegPoints(0x000000) }),
    define({ id: 12, assetId: 'normal_pink', hcOnly: true, regPoints: normalRegPoints(0x000000) }),
    define({ id: 13, assetId: 'normal_purple', hcOnly: true, regPoints: normalRegPoints(0xffffff) }),
    define({ id: 14, assetId: 'normal_dark_yellow', hcOnly: true, regPoints: normalRegPoints(0xffffff) }),
    define({ id: 15, assetId: 'normal_dark_turquoise', hcOnly: true, regPoints: normalRegPoints(0xffffff) }),
    define({ id: 16, assetId: 'hearts', hcOnly: true, regPoints: {
        scale9: rect(31, 15, 1, 1),
        pointerY: 26,
        faceXY: point(14, 15),
        textFieldMargins: rect(29, 7, 12, 7),
        textColorRGB: 0x000000,
        fontFace: 'Ubuntu',
        fontSize: 12,
        overlapRect: rect(1, 1, 0, 0),
    } }),
    define({ id: 17, assetId: 'gothicrose', hcOnly: true, regPoints: {
        scale9: rect(36, 24, 1, 1),
        pointerY: 30,
        faceXY: point(19, 19),
        textFieldMargins: rect(35, 11, 10, 9),
        textColorRGB: 0x000000,
        fontFace: 'Ubuntu',
        fontSize: 12,
        overlapRect: rect(5, 5, 0, 2),
    } }),
    define({ id: 19, assetId: 'piglet', hcOnly: true, regPoints: {
        scale9: rect(30, 17, 1, 1),
        pointerY: 26,
        faceXY: point(20, 15),
        textFieldMargins: rect(29, 7, 12, 7),
        textColorRGB: 0x000000,
        fontFace: 'Ubuntu',
        fontSize: 12,
        overlapRect: rect(3, 1, 0, 0),
    } }),
    define({ id: 20, assetId: 'sausagedog', hcOnly: true, regPoints: {
        scale9: rect(30, 18, 1, 1),
        pointerY: 24,
        faceXY: point(20, 15),
        textFieldMargins: rect(29, 7, 12, 7),
        textColorRGB: 0x000000,
        fontFace: 'Ubuntu',
        fontSize: 12,
        overlapRect: rect(3, 1, 0, 0),
    } }),
    define({ id: 21, assetId: 'firingmylazer', hcOnly: true, regPoints: {
        scale9: rect(32, 22, 1, 1),
        pointerY: 34,
        faceXY: point(15, 23),
        textFieldMargins: rect(25, 15, 12, 9),
        textColorRGB: 0x000000,
        fontFace: 'Ubuntu',
        fontSize: 12,
        overlapRect: rect(0, 9, 0, 0),
    } }),
    define({ id: 22, assetId: 'dragon', hcOnly: true, regPoints: {
        scale9: rect(35, 18, 1, 1),
        pointerY: 29,
        faceXY: point(19, 18),
        textFieldMargins: rect(28, 9, 12, 9),
        textColorRGB: 0x330000,
        fontFace: 'Ubuntu',
        fontSize: 12,
        overlapRect: rect(5, 4, 0, 0),
    } }),
    define({ id: 23, assetId: 'staff', regPoints: {
        scale9: rect(32, 21, 1, 1),
        pointerY: 27,
        faceXY: point(17, 16),
        textFieldMargins: rect(31, 8, 12, 7),
        textColorRGB: 0x000000,
        fontFace: 'Ubuntu',
        fontSize: 12,
        overlapRect: rect(3, 2, 0, 0),
    } }),
    define({ id: 24, assetId: 'bats', hcOnly: true, regPoints: {
        scale9: rect(40, 22, 1, 1),
        pointerY: 28,
        faceXY: point(22, 17),
        textFieldMargins: rect(38, 9, 12, 8),
        textColorRGB: 0xffffff,
        fontFace: 'Ubuntu',
        fontSize: 12,
        overlapRect: rect(8, 3, 0, 0),
    } }),
    define({ id: 25, assetId: 'console', hcOnly: true, regPoints: {
        scale9: rect(28, 18, 1, 1),
        pointerY: 26,
        faceXY: point(15, 15),
        textFieldMargins: rect(28, 7, 12, 10),
        textColorRGB: 0xffffff,
        fontFace: 'Ubuntu',
        fontSize: 12,
        overlapRect: rect(0, -2, 0, 0),
    } }),
    define({ id: 26, assetId: 'steampunk_pipe', hcOnly: true, regPoints: {
        scale9: rect(30, 16, 1, 1),
        pointerY: 20,
        faceXY: point(13, 13),
        textFieldMargins: rect(28, 4, 12, 9),
        textColorRGB: 0xcc9933,
        fontFace: 'Ubuntu',
        fontSize: 12,
        overlapRect: rect(2, -1, 0, 0),
    } }),
    define({ id: 27, assetId: 'storm', hcOnly: true, regPoints: {
        scale9: rect(36, 24, 1, 1),
        pointerY: 30,
        faceXY: point(20, 19),
        textFieldMargins: rect(35, 11, 12, 7),
        textColorRGB: 0xffffff,
        fontFace: 'Ubuntu',
        fontSize: 12,
        overlapRect: rect(7, 5, 0, 0),
    } }),
    define({ id: 28, assetId: 'parrot', systemStyle: true, staffOverrideable: false, regPoints: {
        scale9: rect(29, 17, 1, 1),
        pointerY: 23,
        faceXY: point(11, 12),
        textFieldMargins: rect(25, 4, 15, 7),
        textColorRGB: 0x000000,
        fontFace: 'Ubuntu',
        fontSize: 12,
        overlapRect: rect(0, -2, 0, 0),
    } }),
    define({ id: 29, assetId: 'pirate', hcOnly: true, regPoints: {
        scale9: rect(32, 10, 1, 1),
        pointerY: 24,
        faceXY: point(15, 13),
        textFieldMargins: rect(32, 5, 10, 8),
        textColorRGB: 0x000000,
        fontFace: 'Ubuntu',
        fontSize: 12,
        overlapRect: rect(2, -1, 0, 0),
    } }),
    define({ id: 30, assetId: 'bot_guide', systemStyle: true, staffOverrideable: false, allowHTML: true, regPoints: botRegPoints(0x031a26) }),
    define({ id: 31, assetId: 'bot_rentable', systemStyle: true, staffOverrideable: false, regPoints: botRegPoints(0xffffff) }),
    define({ id: 32, assetId: 'skelestock', systemStyle: true, staffOverrideable: false, regPoints: {
        scale9: rect(29, 16, 1, 1),
        pointerY: 22,
        faceXY: point(11, 12),
        textFieldMargins: rect(28, 4, 12, 7),
        textColorRGB: 0x000000,
        fontFace: 'Ubuntu',
        fontSize: 12,
        overlapRect: rect(0, -2, 0, 0),
    } }),
    define({ id: 33, assetId: 'bot_frank_large', systemStyle: true, staffOverrideable: false, allowHTML: true, hasIcon: true, regPoints: {
        scale9: rect(38, 7, 1, 1),
        pointerY: 21,
        faceXY: point(19, 13),
        textFieldMargins: rect(38, 2, 12, 6),
        textColorRGB: 0x000000,
        fontFace: 'Ubuntu',
        fontSize: 17,
        overlapRect: rect(0, -2, 0, -4),
    } }),
    define({ id: 34, assetId: 'notification', systemStyle: true, staffOverrideable: false, hasIcon: true, regPoints: {
        scale9: rect(38, 7, 1, 1),
        faceXY: point(19, 13),
        anonymous: true,
        textFieldMargins: rect(38, 2, 12, 6),
        textColorRGB: 0x000000,
        fontFace: 'Ubuntu',
        fontSize: 17,
        overlapRect: rect(0, -2, 0, -4),
    } }),
    define({ id: 35, assetId: 'goat', systemStyle: true, staffOverrideable: false, regPoints: {
        scale9: rect(29, 19, 1, 1),
        pointerY: 25,
        faceXY: point(11, 12),
        textFieldMargins: rect(28, 6, 12, 7),
        textColorRGB: 0x000000,
        fontFace: 'Ubuntu',
        fontSize: 12,
        overlapRect: rect(0, 0, 0, 0),
    } }),
    define({ id: 36, assetId: 'santa', systemStyle: true, staffOverrideable: false, hasIcon: true, regPoints: {
        scale9: rect(29, 17, 1, 1),
        pointerY: 23,
        faceXY: point(11, 12),
        textFieldMargins: rect(28, 4, 12, 7),
        textColorRGB: 0x000000,
        fontFace: 'Ubuntu',
        fontSize: 12,
        overlapRect: rect(0, -2, 0, 0),
    } }),
    define({ id: 37, assetId: 'ambassador', ambassadorOnly: true, regPoints: {
        scale9: rect(32, 21, 1, 1),
        pointerY: 27,
        faceXY: point(17, 16),
        textFieldMargins: rect(31, 8, 12, 7),
        textColorRGB: 0x000000,
        fontFace: 'Ubuntu',
        fontSize: 12,
        overlapRect: rect(3, 2, 0, 0),
    } }),
    define({ id: 38, assetId: 'radio', systemStyle: true, staffOverrideable: false, hasIcon: true, regPoints: {
        scale9: rect(29, 17, 1, 1),
        pointerY: 23,
        faceXY: point(11, 12),
        textFieldMargins: rect(28, 4, 12, 7),
        textColorRGB: 0x000000,
        fontFace: 'Ubuntu',
        fontSize: 12,
        overlapRect: rect(0, -2, 0, 0),
    } }),
    define({ id: 120, assetId: 'snowstorm_red', systemStyle: true, staffOverrideable: false, regPoints: {
        scale9: rect(34, 29, 1, 1),
        pointerY: 34,
        faceXY: point(17, 24),
        textFieldMargins: rect(32, 16, 15, 9),
        textColorRGB: 0x000000,
        fontFace: 'Ubuntu',
        fontSize: 12,
        overlapRect: rect(2, 8, 3, 2),
    } }),
    define({ id: 121, assetId: 'snowstorm_blue', systemStyle: true, staffOverrideable: false, regPoints: {
        scale9: rect(34, 29, 1, 1),
        pointerY: 34,
        faceXY: point(17, 24),
        textFieldMargins: rect(32, 16, 15, 9),
        textColorRGB: 0x000000,
        fontFace: 'Ubuntu',
        fontSize: 12,
        overlapRect: rect(2, 8, 3, 2),
    } }),
];

/** The style every unknown id falls back to (the Flash library's `_Str_22819`). */
export const CHAT_STYLE_DEFAULT_ID = 0;

export const CHAT_STYLE_ASSET_BASE = '/assets/chat/styles';

export type ChatStyleAssetFile = 'chat_bubble_base' | 'chat_bubble_pointer' | 'chat_bubble_color' | 'selector_preview' | 'icon';

export const chatStyleAssetUrl = (assetId: string, file: ChatStyleAssetFile): string => `${CHAT_STYLE_ASSET_BASE}/${assetId}/${file}.png`;
