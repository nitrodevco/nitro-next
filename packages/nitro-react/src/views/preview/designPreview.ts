/**
 * The preview host's design window, as data (`DesignPreviewView` draws it): the window shown and the
 * key outlined, and applying a `design` message's draft over the hotel's own - its patch files, style
 * values, variables and texts - each draft put back before the next. The variables the client reads
 * only as it starts are applied again here: `asset.overlays` (`applyDesignOverlays`), `text.fonts` and
 * the text style and face overrides, so new art and a new font are drawn before they are saved. Not a
 * Flash feature.
 */
import { ASSET_OVERLAYS_KEY, setFontFaceOverrides, setTextStyleOverrides, templatePatchMatches } from '@nitrodevco/nitro-theme';

import { systemStore } from '#base/context/system';
import { pluginFilesBase, setDataWindowDrafts } from '#base/theme/dataWindows';
import { previewTemplatePatchFiles, templatePatchList, templatePatchOwnerCounts, templatePatchReport } from '#base/theme/templatePatches';
import { parseObject } from '#base/theme/templateStyles';
import { loadTextFonts, TEXT_FONTS_KEY } from '#base/theme/textFonts';

import { applyDesignOverlays } from './designOverlays';
import { designState } from './designStates';
import type { DesignMessage } from './previewMessages';

/** What the window's patches did, once drawn. */
export interface DesignReport {
    event: 'report';
    template: string;
    base: boolean;
    /** Per owner, the ops its patches gave the window and how many change what it draws. */
    owners: { owner: string; count: number; applied: number }[];
    unmatched: { owner: string; element: string }[];
    ineffective: { owner: string; element: string; property: string }[];
    conflicts: { element: string; property: string; owners: string[] }[];
    errors: { owner: string; message: string }[];
    /** The `${style:name}`s the draft's files name that have no value. */
    missingStyles: string[];
    /** Every template drawn while the window shows: its own, the template windows in it and the parts built inside them (a grid item). */
    parts: string[];
}

/**
 * The element a press picked: the template its key names it in - inside a part built from another template
 * (a catalogue grid item) that part's, so a patch made from it changes the part - and its key, null for one no
 * key reaches.
 */
export interface DesignSelect {
    event: 'select';
    /** The window shown (the message's `template`). */
    window: string;
    /** The part the element belongs to: a template built or drawn inside the window; null for the window's own. */
    part: string | null;
    /** Inside a list row cloned from one of the window's own elements: that element's key (the key is scoped under it, so a patch changes every row). */
    row?: string;
    /** From the window's root down to the element, each step's template and key: a breadcrumb. */
    path: { template: string; key: string | null; tag: string; name: string | null }[];
    template: string;
    key: string | null;
    tag: string;
    name: string | null;
    style: string | null;
    caption: string | null;
    /** Each `${key}` its caption and variables show, with the text the client shows for it now. */
    texts?: Record<string, string>;
    /** What the element is drawn with, its patches applied: what a visual editor starts from. */
    element?: DesignElement;
    /** Where it is drawn, in the page's CSS pixels: what a visual editor puts its handles on. */
    rects?: DesignBox[];
}

/** A box in the page's CSS pixels. */
export interface DesignBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

/** A picked element's own values, as a patch's `set` names them. */
export interface DesignElement {
    x: number;
    y: number;
    width: number;
    height: number;
    color: number | string | null;
    hidden: boolean;
    vars: Record<string, unknown>;
    params: Record<string, unknown>;
}

/**
 * Where the outlined element is drawn now, said each time it moves: `scale` is stage pixels (a
 * patch's units) per CSS pixel, so a drag of the page's pixels becomes a patch's.
 */
export interface DesignRects {
    event: 'rect';
    template: string;
    key: string;
    rects: DesignBox[];
    scale: number;
}

/** One element of the window as drawn, for an editor's outlines: where a patch names it and where each drawing of it is. */
export interface DesignBoxedElement {
    template: string;
    key: string;
    tag: string;
    name: string | null;
    tags: string[];
    rects: DesignBox[];
}

/**
 * Every element a key reaches drawn in the window (`inspectElements`), said each time one moves while
 * an editor asks for them (`boxes: true`): its multi-select outlines, a marquee, guides to siblings,
 * debug rects and names. `scale` as `rect`'s.
 */
export interface DesignBoxes {
    event: 'boxes';
    template: string;
    elements: DesignBoxedElement[];
    scale: number;
}

/** What the host says back about the design window. */
export type DesignReply = DesignReport | DesignSelect | DesignRects | DesignBoxes;

type Say = (reply: DesignReply) => void;

/** The window drawn, with the sample rows its lists show. */
export interface DesignShown {
    template: string;
    part?: string;
    frame?: string;
    /** The named state drawn with the game's own view (`DESIGN_STATES`), if the window has states. */
    state?: string;
    items: DesignMessage['items'];
    context: DesignMessage['context'];
    /** Counts each draft that changed a bitmap, a font or a text style: the window is drawn anew for it. */
    art: number;
}

/**
 * How long after a draft the report is read: the window has been drawn by then (its ops that change
 * nothing are known once it is), and again once a bound bitmap has had time to load.
 */
const REPORT_DELAYS_MS = [ 250, 1500 ];

let shown: DesignShown | undefined;
let art = 0;
/** The text variables the last draft drew with, to know when one changes. */
let drawnText = '';
let highlightKey: string | null = null;
let boxesOn = false;
/** The template the outlined key is in, when it is not the window's own (a window of the room screen). */
let highlightIn: string | undefined;
let say: Say | undefined;
const listeners = new Set<() => void>();

export const subscribeDesign = (listener: () => void) => {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
};

const notify = () => listeners.forEach(listener => listener());

/** The hotel's own value of each variable and text a draft changed, to put back when the next leaves it. */
const ownVariables = new Map<string, unknown>();
const ownTexts = new Map<string, string | undefined>();

/** `value` with `path` set to `to`, the objects on the way copied (a variable may be its object as JSON text). */
const withPath = (value: unknown, path: readonly string[], to: unknown): unknown => {
    if (!path.length) return to;

    const object = { ...parseObject(value) };

    object[path[0]] = withPath(object[path[0]], path.slice(1), to);

    return object;
};

const applyVariables = (variables: DesignMessage['variables']) => {
    const { config, setConfig } = systemStore.getState();
    const next: Record<string, unknown> = { ...config };

    for (const [ key, own ] of ownVariables) next[key] = own;

    ownVariables.clear();

    // The hotel's own is what was put back above, not the config still holding the last draft's.
    for (const { path, value } of variables) {
        if (!ownVariables.has(path[0])) ownVariables.set(path[0], next[path[0]]);

        next[path[0]] = withPath(next[path[0]], path.slice(1), value);
    }

    setConfig(next);
};

const applyTexts = (texts: Record<string, string>) => {
    const { localizations, setLocalization } = systemStore.getState();
    const next: Record<string, string> = {};

    for (const [ key, own ] of ownTexts) next[key] = own ?? key;

    ownTexts.clear();

    for (const [ key, text ] of Object.entries(texts)) {
        if (!ownTexts.has(key)) ownTexts.set(key, (key in next) ? next[key] : localizations[key]);

        next[key] = text;
    }

    if (Object.keys(next).length) setLocalization(next);
};

const report = (message: DesignMessage, missingStyles: string[]) => {
    const id = message.template;
    const read = templatePatchReport(id);
    // The last application's report outlives the patches it was of: only the owners patching the window now are said.
    const live = new Set(templatePatchList().filter(patch => templatePatchMatches(patch.template, id)).map(patch => patch.owner));
    const now = <T extends { owner: string }>(list: readonly T[] | undefined) => (list ?? []).filter(entry => live.has(entry.owner));

    say?.({
        event: 'report',
        template: id,
        base: message.base,
        owners: now(templatePatchOwnerCounts(id)),
        unmatched: now(read?.unmatched).map(({ owner, element }) => ({ owner, element })),
        ineffective: now(read?.ineffective).map(({ owner, element, property }) => ({ owner, element, property })),
        conflicts: (read?.conflicts ?? []).filter(conflict => conflict.owners.some(owner => live.has(owner))).map(({ element, property, owners }) => ({ element, property, owners })),
        errors: now(read?.errors).map(({ owner, message: text }) => ({ owner, message: text })),
        missingStyles,
        parts: drawnTemplates?.() ?? [],
    });
};

let applying: Promise<void> = Promise.resolve();
let reportTimers: ReturnType<typeof setTimeout>[] = [];

/**
 * Draws the design window with a message's draft; `reply` says what came of it, and later what a
 * press selects. Drafts are applied in the order they came, each over the hotel's own.
 */
export const showDesign = (message: DesignMessage, reply: Say) => {
    say = reply;

    applying = applying.then(async () => {
        const config = systemStore.getState().config;

        applyTexts(message.base ? {} : message.texts);
        applyVariables(message.base ? [] : message.variables);

        if (message.base) {
            // No frame override either: the frames as Habbo draws them.
            const { config: current, setConfig } = systemStore.getState();

            if (!ownVariables.has('frame.overrides')) ownVariables.set('frame.overrides', current['frame.overrides']);

            setConfig({ ...current, 'frame.overrides': {} });
        }

        // What the client read as it started, drawn with the draft's values (Habbo's own: the hotel's).
        const now = systemStore.getState().config;
        const hotelOverlays = ownVariables.has(ASSET_OVERLAYS_KEY) ? ownVariables.get(ASSET_OVERLAYS_KEY) : now[ASSET_OVERLAYS_KEY];
        const text = JSON.stringify([ now[TEXT_FONTS_KEY] ?? null, now['text.styles.overrides'] ?? null, now['text.faces.overrides'] ?? null ]);
        const [ overlaysChanged ] = await Promise.all([ applyDesignOverlays(hotelOverlays, now[ASSET_OVERLAYS_KEY]), loadTextFonts(now[TEXT_FONTS_KEY]) ]);

        if (text !== drawnText) {
            setTextStyleOverrides('hotel', now['text.styles.overrides']);
            setFontFaceOverrides('hotel', now['text.faces.overrides']);
        }

        if (overlaysChanged || (text !== drawnText)) art++;

        drawnText = text;

        // The draft's new windows, before the window is drawn: one of them may be it.
        setDataWindowDrafts(message.base ? {} : message.windows, owner => pluginFilesBase(owner, config['templates.windows'], config['templates.patches']));

        const styles = { ...parseObject(config['templates.styles']), ...message.styles };
        const missing = await previewTemplatePatchFiles(config['templates.patches'], styles, message.base ? null : message.patches);

        shown = { template: message.template, part: message.part, frame: message.frame, state: designState(message.template, message.state)?.id, items: message.items, context: message.context, art };
        notify();

        reportTimers.forEach(timer => clearTimeout(timer));
        reportTimers = REPORT_DELAYS_MS.map(delay => setTimeout(() => report(message, missing), delay));
    }).catch(() => undefined);
};

/** Outlines the element `key` names in the design window - in the template `of`, else the window's own; null outlines nothing. */
export const highlightDesign = (key: string | null, of?: string) => {
    highlightKey = key;
    highlightIn = of;
    notify();
};

/** Says every drawn element's boxes as they move (`DesignBoxes`), or stops. */
export const boxDesign = (on: boolean) => {
    boxesOn = on;
    notify();
};

/** Whether an editor asked for every element's boxes. */
export const designBoxesOn = () => boxesOn;

/** The design window drawn now, if any. */
export const designShown = () => shown;

/** The key outlined now, if any. */
export const designHighlight = () => highlightKey;

/** The template the outlined key is in, if not the window's own. */
export const designHighlightIn = () => highlightIn;

/** Says a press's pick to the panel that drew the window. */
export const sayDesign = (reply: DesignReply) => say?.(reply);

let drawnTemplates: (() => string[]) | undefined;

/** What lists the templates drawn on the page (`DesignPreviewView` while it draws): the report's `parts`. */
export const setDesignTemplatesReader = (read: typeof drawnTemplates) => {
    drawnTemplates = read;
};

let picker: ((clientX: number, clientY: number) => void) | undefined;

/** What picks the element at a point of the page (`DesignPreviewView` while it draws). */
export const setDesignPicker = (pick: typeof picker) => {
    picker = pick;
};

/** Picks the element at a point of the page, as a press there would: the panel's handles cover the window. */
export const pickDesign = (clientX: number, clientY: number) => picker?.(clientX, clientY);
