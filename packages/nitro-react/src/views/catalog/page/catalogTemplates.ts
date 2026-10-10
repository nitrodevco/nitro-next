/** The catalogue's window templates: Flash's `habbo-catalog-com` library, and the page layouts in it. */
import { Template, TemplateElement } from '@nitrodevco/nitro-theme';

import { CatalogPage, resolveCatalogLayout } from '#base/context/catalog';
import { findTemplateChild } from '#base/theme';

export const CATALOG_LIBRARY = 'habbo-catalog-com';

/** A `habbo-catalog-com` asset's template id. */
export const catalogTemplateId = (name: string) => `${CATALOG_LIBRARY}/${name}`;

/** `CatalogPage.createWindow`: the page's layout's id - `layout_<name>`, or the `old_` one the library has instead. */
export const resolveCatalogPageTemplate = (templates: Record<string, Template> | undefined, layoutCode: string): string | undefined => {
    const name = resolveCatalogLayout(layoutCode);

    if (!templates || !name) return undefined;

    return [ catalogTemplateId(`layout_${name}`), catalogTemplateId(`old_layout_${name}`) ].find(id => templates[id]);
};

/**
 * `removeListItemAt(0)`: the row the page's layout holds as the first item of its list, the
 * prototype every offer's row is cloned from (`BuilderAddonsCatalogWidget`,
 * `BuilderLoyaltyCatalogWidget`).
 */
export const findCatalogListPrototype = (templates: Record<string, Template> | undefined, page: CatalogPage, list: string): TemplateElement | undefined => {
    const templateId = resolveCatalogPageTemplate(templates, page.layoutCode);
    const template = (templates && templateId) ? templates[templateId] : undefined;

    return template ? findTemplateChild(template.elements, list)?.children[0] : undefined;
};
