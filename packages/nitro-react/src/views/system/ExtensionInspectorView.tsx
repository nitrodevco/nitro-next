import { ClientPointToStage, EMPTY_TEMPLATE_CONTEXT, inspectAt, inspectChain, inspectKey, resolveTemplateNames, setTemplateInspecting, TemplateElement, TemplateInspectHit, TemplatePatch, TemplatePatchOp } from '@nitrodevco/nitro-theme';
import { useApplication } from '@pixi/react';
import { useEffect, useState } from 'react';

import { clientModuleLinkConflicts } from '#base/commands';
import { clientModulesStore } from '#base/context/client-modules';
import { ClientGates, useClientGate } from '#base/context/user';
import { templatePatchList } from '#base/theme/templatePatches';

import { MotdNotificationView } from '../notifications/MotdNotificationView';

/**
 * Not Flash's: the extension inspector (Turbo's `docs/extensions.md`, roadmap step 5), for staff
 * holding `client.inspector`, and in development builds once turned on (`useDevInspector`). Alt-click any window element: it shows the
 * window's template id, the element's key - what a patch's `element` or a binding names it by - its
 * type and rect, the plugins' patches on it, and puts a patch for it on the clipboard (logged too),
 * so a theme author never reads `templates.json`. Drawn in the message-of-the-day window.
 */
export const ExtensionInspectorView = () => {
    const devInspector = useDevInspector();
    const allowed = useClientGate(ClientGates.ExtensionInspector) || devInspector;
    const { app } = useApplication();
    const [ lines, setLines ] = useState<string[] | null>(null);

    // The windows note their elements only while it is allowed (`inspect`): for everyone else they cost nothing.
    useEffect(() => {
        setTemplateInspecting(allowed);

        return () => setTemplateInspecting(false);
    }, [ allowed ]);

    useEffect(() => {
        if (!allowed) return;

        // Before the canvas sees it: an inspecting click presses nothing.
        const onPointerDown = (event: PointerEvent) => {
            if (!event.altKey || !app?.canvas || (event.target !== app.canvas)) return;

            const hit = inspectAt(app.stage, ClientPointToStage(app.canvas, event.clientX, event.clientY));

            if (!hit) return;

            event.preventDefault();
            event.stopImmediatePropagation();

            const report = describe(hit);

            console.info('[Inspector]', report.summary);
            void navigator.clipboard?.writeText(report.patch).catch(() => undefined);
            setLines(report.lines);
        };

        window.addEventListener('pointerdown', onPointerDown, true);

        return () => window.removeEventListener('pointerdown', onPointerDown, true);
    }, [ allowed, app ]);

    if (!allowed || !lines) return null;

    return (
        <MotdNotificationView
            // Clear of the server's messages of the day, which count from 0.
            id={-1}
            messages={lines}
            onClose={() => setLines(null)}
        />
    );
};

declare global {
    var NitroInspector: ((on?: boolean) => void) | undefined;
}

const DEV_INSPECTOR_KEY = 'nitro.inspector';

/**
 * Development builds: off until `NitroInspector()` in the console (`NitroInspector(false)` turns it
 * off), remembered in this browser's localStorage. Off by default, so an alt-click (alt-drag, a test's
 * alt-click) presses what it always did and the windows note nothing.
 */
const useDevInspector = () => {
    const [ on, setOn ] = useState(() => import.meta.env.DEV && (window.localStorage.getItem(DEV_INSPECTOR_KEY) === '1'));

    useEffect(() => {
        if (!import.meta.env.DEV) return;

        globalThis.NitroInspector = (value = true) => {
            if (value) window.localStorage.setItem(DEV_INSPECTOR_KEY, '1');
            else window.localStorage.removeItem(DEV_INSPECTOR_KEY);

            setOn(value);
        };

        return () => {
            globalThis.NitroInspector = undefined;
        };
    }, []);

    return on;
};

/** What a patch may set, as the element has it now: the starting point of the copied patch. */
const editable = (element: TemplateElement) => ({
    x: element.x,
    y: element.y,
    width: element.width,
    height: element.height,
    ...(element.caption ? { caption: element.caption } : {}),
    ...(element.color !== undefined ? { color: element.color } : {}),
    ...(element.hidden ? { hidden: true } : {}),
});

/** A patch's ops as the window shows them: a function of the window's context is called with it (a throw lists none). */
const opsShown = (patch: TemplatePatch, hit: TemplateInspectHit): readonly TemplatePatchOp[] => {
    if (typeof patch.ops !== 'function') return patch.ops;

    try {
        return patch.ops(hit.window.context ?? EMPTY_TEMPLATE_CONTEXT);
    } catch {
        return [];
    }
};

/** One op, as a line of the inspector. */
const describeOp = (op: TemplatePatchOp) => ('set' in op ? `set ${JSON.stringify(op.set)}` : 'remove' in op ? 'remove' : 'move' in op ? `move ${op.move} '${op.to}'` : 'wrap' in op ? `wrap in ${op.wrap.tag ?? op.wrap.like ?? ''} ${op.wrap.name}` : `insert ${op.insert} ${op.add.name}`);

/** Link prefixes and paths more than one module handles: each of them gets all their links. */
const linkConflictLines = () => clientModuleLinkConflicts(clientModulesStore.getState().linkHandlers)
    .map(conflict => `Link ${conflict.prefix}/${conflict.path || '...'} is handled by ${conflict.modules.join(', ')}: each gets its links.`);

/** The template id the patches name: one window of a template drawn alone is still that template's. */
const describe = (hit: TemplateInspectHit) => {
    const { id, part } = hit.window;
    const chain = inspectChain(hit.node);
    const element = hit.node.element;
    const own = inspectKey(hit.node);
    const key = (own === undefined) ? undefined : part ? (own ? `${part}/${own}` : part) : own;
    const owner = element.name?.includes(':') ? element.name.slice(0, element.name.indexOf(':')) : undefined;

    // The ops that name this element or one it is drawn in: by the key as given, or by an owner's own name for what it added.
    const named = (target: TemplateElement) => templatePatchList()
        .filter(patch => patch.template === id)
        .flatMap(patch => opsShown(patch, hit)
            .filter((op) => {
                const keys = [ op.element, op.element.split('/').map(name => `${patch.owner}:${name}`).join('/') ];

                return keys.some(candidate => resolveTemplateNames([ chain[0] ], [ candidate ]).targets.get(candidate) === target);
            })
            .map(op => `${patch.owner} on '${op.element}': ${describeOp(op)}`));
    const patches = [ ...chain ].reverse().flatMap(named);
    const path = chain.slice(1).map(each => each.name ?? `<${each.tag}>`).join(' > ');
    const patch = JSON.stringify({ patches: [ { template: id, ops: [ { element: key ?? '', set: editable(element) } ] } ] }, null, 2);
    const lines = [
        id,
        (key === undefined) ? 'An element the window\'s code made (a list\'s item): patch the template it is cloned from.' : `Element key: '${key}'`,
        `<${element.tag}>${element.name ? ` name="${element.name}"` : ''} at ${element.x},${element.y} size ${element.width}x${element.height}`,
        ...(path ? [ `In: ${path}` ] : []),
        ...(owner ? [ `Added by ${owner}'s patch.` ] : []),
        ...(patches.length ? patches.map(line => `Patched by ${line}`) : [ 'No plugin patches it or what it is in.' ]),
        ...linkConflictLines(),
        `Copied to the clipboard:\n${patch}`,
    ];

    return { lines, patch, summary: { template: id, element: key, tag: element.tag, name: element.name, patches, patch } };
};
