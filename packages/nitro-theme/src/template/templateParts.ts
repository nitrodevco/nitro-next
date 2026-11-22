/**
 * Not Flash's: which template a window's part was built from, for the inspector and the preview host. A list's
 * clone of another template's root (`TemplateItem.from` a `Template`: the catalogue's `badgeGridItem` per badge)
 * is noted against the template (`noteTemplatePart`), and a library's templates against their ids
 * (`noteTemplateId`), so an element pressed inside the clone is named in the part's own template - its id and
 * the key a patch of it names the element by - not as the list holding it; a clone of one of the window's own
 * elements (a row) is noted against that element's key (`noteTemplatePrototype`). Weak maps only: nothing is kept
 * once the elements and templates go.
 */
import type { Template, TemplateElement } from './templateData';

const parts = new WeakMap<TemplateElement, Template>();
const prototypes = new WeakMap<TemplateElement, string>();
const ids = new WeakMap<Template, string>();

/** Notes that `element` is a clone of `template`'s root. */
export const noteTemplatePart = (element: TemplateElement, template: Template) => {
    parts.set(element, template);
};

/** The template `element` is a clone of the root of, if it is one. */
export const templatePartOf = (element: TemplateElement): Template | undefined => parts.get(element);

/**
 * Notes that `element` is a clone of the window's own element `key` names (`TemplateItem.from` a key: the
 * navigator's `navigator_entry_row_container` once per room), so a press on a row names the row's prototype.
 */
export const noteTemplatePrototype = (element: TemplateElement, key: string) => {
    prototypes.set(element, key);
};

/** The key of the window's element `element` is a clone of, if it is one. */
export const templatePrototypeOf = (element: TemplateElement): string | undefined => prototypes.get(element);

/** Notes a template's id (`<library>/<asset>`), as its library has it. */
export const noteTemplateId = (template: Template, id: string) => {
    ids.set(template, id);
};

/** A template's id, if its library noted it. */
export const templateIdOf = (template: Template): string | undefined => ids.get(template);
