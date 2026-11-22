/**
 * What the preview host takes in a message: plain JSON from another page, read field by field into
 * the shape the packet's parser gives the client, so a draft can never hand a view what the
 * server could not have sent. Not a Flash port.
 */
import type { IRewardTrackData, IRewardTrackPrizeData, IRewardTrackTaskData, IRewardTrackTaskLevelData, RewardTracksMessageType } from '@nitrodevco/nitro-packets';

type Json = Record<string, unknown>;

const isObject = (value: unknown): value is Json => (typeof value === 'object') && (value !== null) && !Array.isArray(value);

const str = (value: unknown) => ((typeof value === 'string') ? value : (typeof value === 'number') ? String(value) : '');

/** A whole number, as the packet's `readInt` gives it. */
const int = (value: unknown) => ((typeof value === 'number') && Number.isFinite(value) ? Math.trunc(value) : 0);

const num = (value: unknown) => ((typeof value === 'number') && Number.isFinite(value) ? value : 0);

const bool = (value: unknown) => (value === true);

const list = <T>(value: unknown, read: (item: Json) => T): T[] => (Array.isArray(value) ? value.filter(isObject).map(read) : []);

const toLevel = (level: Json): IRewardTrackTaskLevelData => ({ requiredCount: int(level.requiredCount), pointsReward: int(level.pointsReward), premium: bool(level.premium) });

const toTask = (task: Json): IRewardTrackTaskData => ({
    id: str(task.id),
    actionType: str(task.actionType),
    parameter: str(task.parameter),
    progressCount: int(task.progressCount),
    premium: bool(task.premium),
    levels: list(task.levels, toLevel),
});

const toPrize = (prize: Json): IRewardTrackPrizeData => ({
    id: str(prize.id),
    requiredPoints: int(prize.requiredPoints),
    productItemTypeId: int(prize.productItemTypeId),
    rewardTypeId: str(prize.rewardTypeId),
    extraParams: str(prize.extraParams),
    rewardAmount: int(prize.rewardAmount),
    premium: bool(prize.premium),
    available: bool(prize.available),
    claimed: bool(prize.claimed),
});

const toTrack = (track: Json): IRewardTrackData => {
    const hasPremiumConfig = bool(track.hasPremiumConfig);

    return {
        id: str(track.id),
        theme: str(track.theme),
        points: int(track.points),
        hasPremiumConfig,
        // `RewardTrackDataParser`: the premium configuration only comes with the flag.
        taskPointsBoost: hasPremiumConfig ? num(track.taskPointsBoost) : 0,
        instantPoints: hasPremiumConfig ? int(track.instantPoints) : 0,
        costDiamonds: hasPremiumConfig ? int(track.costDiamonds) : 0,
        costCredits: hasPremiumConfig ? int(track.costCredits) : 0,
        premium: bool(track.premium),
        complete: bool(track.complete),
        premiumComplete: bool(track.premiumComplete),
        tasks: list(track.tasks, toTask),
        prizes: list(track.prizes, toPrize),
    };
};

/** A `RewardTracksMessage` as JSON, or undefined when it is not one. */
export const toRewardTracksMessage = (value: unknown): RewardTracksMessageType | undefined => {
    if (!isObject(value) || !Array.isArray(value.tracks)) return undefined;

    return { disabled: bool(value.disabled), tracks: list(value.tracks, toTrack), reload: bool(value.reload) };
};

/** A sample row of a list the window's code fills (a catalogue tab per top-level page): what is cloned, its caption, its context. */
export interface DesignSampleRow {
    from: string;
    caption?: string;
    context: Record<string, string | number | boolean>;
}

/** A `design` message: the window to draw and the editor's draft to draw it with (`DesignPreviewView`). */
export interface DesignMessage {
    /** A template's id (`<library>/<asset>`), or the id of a frame Nitro draws itself (no `/`). */
    template: string;
    /** One window of the template, drawn alone. */
    part?: string;
    /** The id the window's code gives its frame (`CatalogView`'s `catalog`): what `frame.overrides` names it by. */
    frame?: string;
    /**
     * A named state of a window the host draws with the game's own view and sample content (`DESIGN_STATES`:
     * the catalogue's `page:badge_display`); absent, a window with states shows its first.
     */
    state?: string;
    /** Habbo's own: no patch file, no frame override, nothing of the draft. */
    base: boolean;
    /** Per owner, the patch file standing in for its own (`{ "patches": [ ... ] }`); an owner not named keeps its file. */
    patches: Record<string, unknown>;
    /**
     * Unsaved windows defined as data, by `<plugin key>/<name>`, each over the saved one (`dataWindows.ts`):
     * the window drawn as `<plugin key>/windows/<name>`.
     */
    windows: Record<string, unknown>;
    /** Over `templates.styles`, by `<plugin key>:<name>`. */
    styles: Record<string, unknown>;
    /** Over the hotel's variables: each a path into one (`[ 'frame.overrides', 'catalog', 'color' ]`) and its value. */
    variables: { path: string[]; value: unknown }[];
    /** Over the hotel's texts, by key. */
    texts: Record<string, string>;
    /** Sample rows for the lists the window's code fills, by the list's element name. */
    items: Record<string, DesignSampleRow[]>;
    /** What the window tells patches about what it shows. */
    context: Record<string, string | number | boolean>;
}

const flatValues = (value: unknown): Record<string, string | number | boolean> => (isObject(value)
    ? Object.fromEntries(Object.entries(value).filter((entry): entry is [ string, string | number | boolean ] => [ 'string', 'number', 'boolean' ].includes(typeof entry[1])))
    : {});

/** A `design` message read field by field; undefined without a window to draw. */
export const toDesignMessage = (value: Json): DesignMessage | undefined => {
    if ((typeof value.template !== 'string') || !value.template.length) return undefined;

    const draft = isObject(value.draft) ? value.draft : {};

    return {
        template: value.template,
        ...((typeof value.part === 'string') && value.part.length ? { part: value.part } : {}),
        ...((typeof value.frame === 'string') && value.frame.length ? { frame: value.frame } : {}),
        ...((typeof value.state === 'string') && value.state.length ? { state: value.state } : {}),
        base: bool(value.base),
        patches: isObject(draft.patches) ? Object.fromEntries(Object.entries(draft.patches).filter(entry => isObject(entry[1]))) : {},
        windows: isObject(draft.windows) ? Object.fromEntries(Object.entries(draft.windows).filter(entry => isObject(entry[1]))) : {},
        styles: isObject(draft.styles) ? draft.styles : {},
        variables: list(draft.variables, entry => ({ path: Array.isArray(entry.path) ? entry.path.map(str).filter(part => part.length) : [], value: entry.value })).filter(entry => entry.path.length > 0),
        texts: Object.fromEntries(Object.entries(isObject(draft.texts) ? draft.texts : {}).filter((entry): entry is [ string, string ] => typeof entry[1] === 'string')),
        items: Object.fromEntries(Object.entries(isObject(value.items) ? value.items : {}).map(([ name, rows ]) => [ name, list(rows, row => ({ from: str(row.from), ...((typeof row.caption === 'string') ? { caption: row.caption } : {}), context: flatValues(row.context) })).filter(row => row.from.length) ])),
        context: flatValues(value.context),
    };
};

/** The bitmaps a chat style may have, as the bundle names them. */
const CHAT_BUBBLE_FILES = [ 'chat_bubble_base', 'chat_bubble_pointer', 'selector_preview', 'chat_bubble_color', 'icon', 'chat_bubble_emblem', 'chat_bubble_emblem_multiline' ] as const;

export type ChatBubbleFile = typeof CHAT_BUBBLE_FILES[number];

/** A `chatbubble` message: a chat style's draft and a line said in it (`ChatBubblePreviewView`). */
export interface ChatBubbleMessage {
    /** Its asset id, as the bundle has it. */
    assetId: string;
    /** Its reg points, as `chat-style-definitions.json` has them. */
    regPoints: Json;
    /** Who may speak with it, as the style's flags. */
    flags: { hcOnly: boolean; ambassadorOnly: boolean; purchasable: boolean; staffOverrideable: boolean; allowHTML: boolean; notification: boolean; systemStyle: boolean };
    /** Its bitmaps by file, each an address (a `data:` url for one not saved yet). */
    files: Partial<Record<ChatBubbleFile, string>>;
    /** The line, the speaker's name and look, and the colour a colour layer takes (their shirt's). */
    text: string;
    name: string;
    figure: string;
    color: number | undefined;
    /** The room's bubble width the text wraps at. */
    width: number;
}

/** A `chatbubble` message read field by field; undefined without reg points or a base bitmap. */
export const toChatBubbleMessage = (value: Json): ChatBubbleMessage | undefined => {
    const style = isObject(value.style) ? value.style : {};
    const files = isObject(value.files) ? value.files : {};

    if (!isObject(style.regPoints) || !isObject(style.regPoints.scale9) || !isObject(style.regPoints.textFieldMargins) || (typeof files.chat_bubble_base !== 'string')) return undefined;

    return {
        assetId: str(style.assetId) || 'preview',
        regPoints: style.regPoints,
        flags: { hcOnly: bool(style.clubOnly), ambassadorOnly: bool(style.ambassadorOnly), purchasable: bool(style.purchasable), staffOverrideable: bool(style.staffOverrideable), allowHTML: bool(style.allowHtml), notification: bool(style.notification), systemStyle: bool(style.system) },
        files: Object.fromEntries(CHAT_BUBBLE_FILES.filter(file => (typeof files[file] === 'string') && (files[file]).length).map(file => [ file, files[file] as string ])),
        text: str(value.text),
        name: str(value.name),
        figure: str(value.figure),
        color: ((typeof value.color === 'number') && Number.isFinite(value.color)) ? int(value.color) : undefined,
        width: (num(value.width) > 0) ? int(value.width) : 350,
    };
};
