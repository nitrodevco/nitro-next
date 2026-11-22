/**
 * Not Flash's: a template patch's `font_face` that names a face the page cannot draw is said where an
 * author looks - a console warning and the server's extension inspector (`patch.unmatched`, reason
 * `font_face:<face>`) - instead of the text silently taking the browser's default face. A face is
 * drawable when it is one the client ships (`capturedFontFace`: `Ubuntu Bold` is `Ubuntu bold`, any
 * case or spacing) or one the page has, a device font or one a theme loaded with `document.fonts`;
 * the page's is asked once its fonts have loaded, so a face a theme is still loading is not reported.
 */
import { capturedFontFace, TemplateElementInput, TemplatePatch, TemplatePatchOp } from '@nitrodevco/nitro-theme';

import { reportClientExtension } from '#base/commands/client-modules/clientExtensionReports';

/** The faces the client ships, as a report names them. */
const SHIPPED_FACES = 'Ubuntu, Ubuntu bold, Ubuntu italic, Ubuntu bold italic, Ubuntu condensed, Volter, Volter Bold';

/** Per face: whether the page can draw it, once asked. */
const drawable = new Map<string, Promise<boolean>>();
/** Each owner, template and face reported once. */
const reported = new Set<string>();

/** A face the browser draws in a size of its own: the text measures differently from both generic fallbacks. */
const pageHasFace = (face: string): boolean => {
    const ctx = document.createElement('canvas').getContext('2d');

    if (!ctx) return true;

    const sample = 'mmmmmmmmmmlli1WQ@#';

    return [ 'monospace', 'serif' ].some((generic) => {
        ctx.font = `72px ${generic}`;

        const fallback = ctx.measureText(sample).width;

        ctx.font = `72px "${face.replace(/"/g, '')}", ${generic}`;

        return ctx.measureText(sample).width !== fallback;
    });
};

const canDraw = (face: string): Promise<boolean> => {
    if (capturedFontFace(face)) return Promise.resolve(true);

    let known = drawable.get(face);

    if (!known) drawable.set(face, (known = document.fonts.ready.then(() => pageHasFace(face), () => pageHasFace(face))));

    return known;
};

const facesOfElement = (element: TemplateElementInput, faces: Set<string>) => {
    const face = element.vars?.font_face;

    if ((typeof face === 'string') && face.length) faces.add(face);

    for (const child of element.children ?? []) facesOfElement(child, faces);
};

/** The `font_face` values a patch's ops set or add (a function of the window's context is not read here). */
export const templatePatchFontFaces = (ops: readonly TemplatePatchOp[]): string[] => {
    const faces = new Set<string>();

    for (const op of ops) {
        if ('set' in op) {
            const face = op.set.vars?.font_face;

            if ((typeof face === 'string') && face.length) faces.add(face);
        }

        if ('add' in op) facesOfElement(op.add, faces);
        if ('wrap' in op) facesOfElement(op.wrap, faces);
    }

    return [ ...faces ];
};

/** Reports each face `patch` names that the page cannot draw. */
export const checkTemplatePatchFontFaces = (patch: TemplatePatch): void => {
    if ((typeof patch.ops === 'function') || (typeof document === 'undefined')) return;

    for (const face of templatePatchFontFaces(patch.ops)) {
        void canDraw(face).then((ok) => {
            const key = `${patch.owner}|${patch.template}|${face}`;

            if (ok || reported.has(key)) return;

            reported.add(key);

            const message = `${patch.template}: ${patch.owner}'s patch sets font_face '${face}', which is no face the client ships or the page has loaded: drawn in the browser's default. The client ships ${SHIPPED_FACES}.`;

            console.warn(`[TemplatePatches] ${message}`);
            reportClientExtension({ owner: patch.owner, kind: 'patch.unmatched', subject: patch.template, reason: `font_face:${face}`, message });
        });
    }
};
