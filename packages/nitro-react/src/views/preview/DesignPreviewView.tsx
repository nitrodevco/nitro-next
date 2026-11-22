/**
 * The preview host's design window (`window: 'design'`, `previewHost`): one of the game's windows - a
 * template by id, one window of it (`part`), or a frame Nitro draws itself by its frame id - drawn
 * with an appearance editor's draft before it is saved: its patch files, style values, variables and
 * texts in place of the hotel's, or Habbo's own (`base`). Not a Flash feature.
 *
 * What the window's patches did is said back (`report`: per owner the ops given and applied, those
 * that match nothing, those that change nothing drawn, conflicts, styles with no value); a press on
 * the window names the element under it (`select`: its key, as a patch names it, what it is drawn
 * with and where), and a `highlight` key outlines that element, saying where it is drawn (`rect`)
 * each time it moves, so a panel's handles can sit on it. The draft never leaves this page: nothing is saved and nothing is sent.
 */
import { ClientPointToStage, GetStagePixelScale, inspectAt, inspectElements, inspectFind, inspectPart, inspectTemplates, setTemplateInspecting, TemplateBindings } from '@nitrodevco/nitro-theme';
import { useApplication } from '@pixi/react';
import { Container, Graphics } from 'pixi.js';
import { ComponentType, useEffect, useMemo, useSyncExternalStore } from 'react';

import { systemStore } from '#base/context/system';
import { Frame, TemplateWindow } from '#base/theme';

import { DesignCatalogView } from './DesignCatalogView';
import { DesignFriendListView } from './DesignFriendListView';
import { DesignHudView } from './DesignHudView';
import { DesignInfostandView } from './DesignInfostandView';
import { DesignInventoryView } from './DesignInventoryView';
import { DesignMessengerView } from './DesignMessengerView';
import { DesignNavigatorView } from './DesignNavigatorView';
import { DesignBox, designBoxesOn, designHighlight, designHighlightIn, designShown, sayDesign, setDesignPicker, setDesignTemplatesReader, subscribeDesign } from './designPreview';
import { DesignPurseView } from './DesignPurseView';
import { CATALOG_WINDOW, FRIENDS_WINDOW, HUD_WINDOW, INFOSTAND_FURNI_WINDOW, INVENTORY_WINDOW, MESSENGER_WINDOW, NAVIGATOR_WINDOW, PURSE_WINDOW } from './designStates';
import type { DesignMessage } from './previewMessages';

/** The game's own view each window with states (`DESIGN_STATES`) is drawn by, with sample content. */
const DESIGN_VIEWS: Readonly<Record<string, ComponentType<{ state: string }>>> = {
    [CATALOG_WINDOW]: DesignCatalogView,
    [INVENTORY_WINDOW]: DesignInventoryView,
    [NAVIGATOR_WINDOW]: DesignNavigatorView,
    [PURSE_WINDOW]: DesignPurseView,
    [FRIENDS_WINDOW]: DesignFriendListView,
    [INFOSTAND_FURNI_WINDOW]: DesignInfostandView,
    [MESSENGER_WINDOW]: DesignMessengerView,
    [HUD_WINDOW]: DesignHudView,
};

/** A frame Nitro draws itself is drawn this size, with nothing in it. */
const FRAME_SIZE = { width: 320, height: 200 };

const HIGHLIGHT_COLOR = 0x1e90ff;

/** How often every element's boxes are measured while an editor asks for them: often enough to follow a drag. */
const BOXES_EVERY_MS = 120;

/** Where `containers` are drawn, in the page's CSS pixels. */
const boxesOf = (stage: Container, canvas: HTMLCanvasElement, containers: readonly Container[]): DesignBox[] => {
    const page = canvas.getBoundingClientRect();
    const scale = GetStagePixelScale();

    return containers.map((container) => {
        const bounds = container.getBounds();
        const from = stage.toLocal({ x: bounds.x, y: bounds.y });
        const to = stage.toLocal({ x: bounds.x + bounds.width, y: bounds.y + bounds.height });

        return { x: page.left + (from.x / scale), y: page.top + (from.y / scale), width: (to.x - from.x) / scale, height: (to.y - from.y) / scale };
    });
};

/** Where the containers drawing the element `key` names are, in the page's CSS pixels. */
const drawnBoxes = (stage: Container, canvas: HTMLCanvasElement, template: string, key: string): DesignBox[] => boxesOf(stage, canvas, inspectFind(stage, template, key));

/** Each `${key}` a caption or a variable shows, with the text the client shows for it now (the key itself when it has none). */
const shownTexts = (values: readonly unknown[]): Record<string, string> => {
    const { localizations } = systemStore.getState();
    const texts: Record<string, string> = {};

    for (const value of values) {
        if (typeof value !== 'string') continue;

        for (const match of value.matchAll(/\$\{([^${}]+)\}/g)) texts[match[1]] = localizations[match[1]] ?? match[1];
    }

    return texts;
};

/** A list's sample rows as the bindings its code would give it. */
const sampleBindings = (items: DesignMessage['items']): TemplateBindings => Object.fromEntries(Object.entries(items).map(([ name, rows ]) => [ name, {
    items: rows.map((row, index) => ({
        key: `${index}`,
        from: row.from,
        context: row.context,
        ...((row.caption !== undefined) ? { bindings: { '': { caption: row.caption } } } : {}),
    })),
} ]));

export const DesignPreviewView = () => {
    const design = useSyncExternalStore(subscribeDesign, designShown);
    const highlight = useSyncExternalStore(subscribeDesign, designHighlight);
    const boxes = useSyncExternalStore(subscribeDesign, designBoxesOn);
    const highlightIn = useSyncExternalStore(subscribeDesign, designHighlightIn);
    const { app } = useApplication();
    // The room screen (`hud`) is no frame though its id has no library: it is drawn by its own view.
    const isFrame = !!design && !design.template.includes('/') && !DESIGN_VIEWS[design.template];
    const bindings = useMemo(() => (design ? sampleBindings(design.items) : undefined), [ design ]);
    // The frame id its code gives it, so the hotel's `frame.overrides` entry for it applies as in the game.
    const frameId = design?.frame;
    const frame = useMemo(() => (frameId ? { id: frameId } : undefined), [ frameId ]);

    // Every element notes what it draws, so a press finds it and a key outlines it.
    useEffect(() => {
        setTemplateInspecting(!!design);
    }, [ design ]);

    useEffect(() => () => setTemplateInspecting(false), []);

    // A press selects rather than presses: the preview has no connection for a button to talk to.
    useEffect(() => {
        if (!design || !app?.canvas) return;

        const canvas = app.canvas;

        const pick = (clientX: number, clientY: number) => {
            const hit = inspectAt(app.stage, ClientPointToStage(canvas, clientX, clientY));

            if (!hit) {
                // A frame of Nitro's own has no template: what a patch reaches of it is its root.
                if (isFrame) sayDesign({ event: 'select', window: design.template, part: null, path: [ { template: design.template, key: '', tag: 'frame', name: null } ], template: design.template, key: '', tag: 'frame', name: null, style: null, caption: null });

                return;
            }

            // Inside a part built from another template (a grid item) the element is named in that template; a clone
            // the window's code made has no key of its own: the nearest element that has one is named.
            let node: typeof hit.node | undefined = hit.node;
            let named = inspectPart(node, hit.window);

            while ((named.key === undefined) && node?.parent) {
                node = node.parent;
                named = inspectPart(node, hit.window);
            }

            const { key } = named;
            const element = (node ?? hit.node).element;
            // The part the element belongs to: a template built inside the window, or a template window drawn in it (a catalogue page).
            const part = named.part ? named.template : (hit.window.id !== design.template) ? hit.window.id : null;
            const { path } = inspectPart(hit.node, hit.window);

            sayDesign({
                event: 'select',
                window: design.template,
                part,
                ...((named.row !== undefined) ? { row: named.row } : {}),
                // A template window drawn inside (a catalogue page) starts its own chain: the window shown heads the path.
                path: (path[0]?.template === design.template) ? path : [ { template: design.template, key: '', tag: 'frame', name: null }, ...path ],
                template: named.template,
                key: key ?? null,
                tag: element.tag,
                name: element.name ?? null,
                style: (element.style !== undefined) ? String(element.style) : null,
                caption: element.caption ?? null,
                texts: shownTexts([ element.caption, ...Object.values(element.vars ?? {}) ]),
                element: { x: element.x, y: element.y, width: element.width, height: element.height, color: element.color ?? null, hidden: !!element.hidden, vars: { ...element.vars }, params: { ...element.params } },
                rects: (key === undefined) ? [] : drawnBoxes(app.stage, canvas, named.template, key),
            });
        };

        const onPointerDown = (event: PointerEvent) => {
            if (event.target !== canvas) return;

            event.preventDefault();
            event.stopImmediatePropagation();
            pick(event.clientX, event.clientY);
        };

        setDesignPicker(pick);
        setDesignTemplatesReader(() => inspectTemplates(app.stage));
        window.addEventListener('pointerdown', onPointerDown, true);

        return () => {
            setDesignPicker(undefined);
            setDesignTemplatesReader(undefined);
            window.removeEventListener('pointerdown', onPointerDown, true);
        };
    }, [ design, app, isFrame ]);

    // The outline: over everything, redrawn each frame as the window lays itself out.
    useEffect(() => {
        if (!design || (highlight === null) || !app?.stage) return;

        // A window of the room screen names its elements in its own template.
        const template = highlightIn ?? design.template;
        const outline = new Graphics();

        outline.eventMode = 'none';
        outline.zIndex = Number.MAX_SAFE_INTEGER;
        app.stage.addChild(outline);

        let said = '';

        const draw = () => {
            outline.clear();

            for (const container of inspectFind(app.stage, template, highlight)) {
                const bounds = container.getBounds();
                const from = app.stage.toLocal({ x: bounds.x, y: bounds.y });
                const to = app.stage.toLocal({ x: bounds.x + bounds.width, y: bounds.y + bounds.height });

                outline.rect(from.x, from.y, to.x - from.x, to.y - from.y).fill({ color: HIGHLIGHT_COLOR, alpha: 0.15 }).stroke({ width: 2, color: HIGHLIGHT_COLOR });
            }

            // Said when it moves, not each frame: a panel's handles follow the element as a patch moves it.
            const rects = drawnBoxes(app.stage, app.canvas, template, highlight);
            const now = JSON.stringify(rects);

            if (now !== said) {
                said = now;
                sayDesign({ event: 'rect', template, key: highlight, rects, scale: GetStagePixelScale() });
            }
        };

        app.ticker.add(draw);

        return () => {
            app.ticker.remove(draw);
            outline.destroy();
        };
    }, [ design, highlight, highlightIn, app ]);

    // Every element's boxes, for an editor drawing its own outlines: said when one moves, not each frame.
    useEffect(() => {
        if (!design || !boxes || !app?.stage) return;

        let said = '';
        let waited = BOXES_EVERY_MS;

        const measure = () => {
            waited += app.ticker.deltaMS;

            if (waited < BOXES_EVERY_MS) return;

            waited = 0;

            // The room screen is many windows: the elements of each.
            const elements = inspectElements(app.stage, (design.template === HUD_WINDOW) ? undefined : design.template).map(({ template, key, element, containers }) => ({
                template,
                key,
                tag: element.tag,
                name: element.name ?? null,
                tags: element.tags ?? [],
                rects: boxesOf(app.stage, app.canvas, containers),
            }));
            const now = JSON.stringify(elements);

            if (now === said) return;

            said = now;
            sayDesign({ event: 'boxes', template: design.template, elements, scale: GetStagePixelScale() });
        };

        app.ticker.add(measure);

        return () => {
            app.ticker.remove(measure);
        };
    }, [ design, boxes, app ]);

    if (!design) return null;

    if (isFrame) return (
        <Frame
            key={design.art}
            id={design.template}
            caption={design.template}
            centered
            layout={{ width: FRAME_SIZE.width, height: FRAME_SIZE.height }}
        />
    );

    // A window with named states is drawn by the game's own view, with sample content in it.
    const StateView = design.state ? DESIGN_VIEWS[design.template] : undefined;

    if (StateView && design.state) return (
        <StateView
            key={design.art}
            state={design.state}
        />
    );

    return (
        <TemplateWindow
            key={design.art}
            id={design.template}
            part={design.part}
            frame={frame}
            bindings={bindings}
            context={design.context}
        />
    );
};
