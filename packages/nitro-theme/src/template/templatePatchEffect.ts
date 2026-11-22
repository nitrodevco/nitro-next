/**
 * Not Flash's: which of a template's patch `set` ops change nothing its window draws. A `set` writes
 * the layout's value; a field the window's code binds on that element is drawn from the code instead
 * (`TemplateView` reads `binding ?? element`), so the patch matched and did nothing - reported as
 * `ineffective`, not `applied` (`TemplatePatchReport.ineffective`). The window's own frame is the
 * exception: its root `style`, `color` and `position` go over the code's (`rootFrameOverride`).
 */
import { ROOT_FRAME_FIELDS, TemplatePatchSet } from '../utils/frameOverrides';
import { resolveTemplateNames, TemplateBinding, TemplateBindings } from './templateBindings';
import type { Template } from './templateData';
import type { TemplateElementChanges, TemplatePatchIneffective } from './templatePatch';

/** The binding fields that are drawn instead of a `set` field of the same element. */
const SHADOWED_BY: Partial<Record<keyof TemplateElementChanges, readonly (keyof TemplateBinding)[]>> = {
    caption: [ 'caption', 'htmlText' ],
    color: [ 'color' ],
    style: [ 'style' ],
    hidden: [ 'visible' ],
    background: [ 'background' ],
    blend: [ 'blend' ],
};

/** Whether the template's window is a frame: its one root is one. */
export const templateRootIsFrame = (template: Template) => template.elements.length === 1 && template.elements[0].tag === 'frame';

/**
 * The `sets` of `template` (patched, as drawn) that its window's code `bindings` shadow, and any
 * `position` on what is not the window's own frame - nothing draws that.
 */
export const ineffectiveTemplateSets = (templateId: string, template: Template, sets: readonly TemplatePatchSet[], bindings: TemplateBindings | undefined): TemplatePatchIneffective[] => {
    const rootFrame = templateRootIsFrame(template);
    const keys = [ ...new Set([ ...sets.map(set => set.element), ...Object.keys(bindings ?? {}) ]) ];
    const { targets } = resolveTemplateNames(template.elements, keys);
    const bound = new Map<unknown, TemplateBinding>();

    for (const [ key, binding ] of Object.entries(bindings ?? {})) {
        const element = targets.get(key);

        if (element && binding) bound.set(element, { ...bound.get(element), ...binding });
    }

    const ineffective: TemplatePatchIneffective[] = [];

    for (const { owner, element: key, set } of sets) {
        const root = key === '';
        const binding = bound.get(targets.get(key));

        for (const property of Object.keys(set) as (keyof TemplateElementChanges)[]) {
            if (set[property] === undefined) continue;

            if (root && rootFrame && ROOT_FRAME_FIELDS.includes(property)) continue;

            const shadowed = (property === 'position')
                ? true
                : !!binding && (SHADOWED_BY[property] ?? []).some(field => binding[field] !== undefined);

            if (shadowed) ineffective.push({ template: templateId, owner, element: key, property });
        }
    }

    return ineffective;
};
