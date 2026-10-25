/**
 * The page in `layoutContainer` - Flash's `CatalogViewer` showing its `CatalogPage`.
 *
 * `CatalogPage.createWindow` builds the page's layout from the `habbo-catalog-com` library:
 * `layout_<code>` (`frontpage4` is `frontpage_featured`, a few codes are the manifest's aliases -
 * `resolveCatalogLayout`), or `old_layout_<code>` when the library has no `layout_` asset for it,
 * as the ubuntu windows (tagged `UBUNTU`) ask. A code with no layout draws nothing, as Flash builds
 * no window.
 *
 * `createWidgetsRecursion` then gives every container named after a widget its widget
 * (`CATALOG_WIDGET_VIEWS`); each says what it does to its container (`useCatalogWidgetView`) and the
 * page draws its template with all of it applied. `LocalizationCatalogWidget`, which every page gets,
 * fills the page's texts and images from the page's localization (`PageLocalization`) and makes the
 * layout's links clickable. Once every widget has mounted, `initializeWidgets` closes with
 * `WIDGETS_INITIALIZED` and the viewer selects the page's offer - the one it was opened for, or on
 * reopening the catalogue the one last selected (`CatalogPage.selectedOfferId`).
 *
 * `CatalogViewer.showCatalogPage` gives the page the container's height (`window.height =
 * container.height`); the window's own width stands, and the container follows it.
 */
import { Template, TemplateBindings, TemplateElement, TemplateWindows } from '@nitrodevco/nitro-theme';
import { ReactNode, useEffect, useMemo, useState, useSyncExternalStore } from 'react';

import { onCatalogPageLink } from '#base/commands';
import { CatalogPage, CatalogWidgetEnum, CatalogWidgetId, getCatalogPageLinks, getImageElementName, getTextElementName, useCatalogStore } from '#base/context/catalog';
import { useConfigValue } from '#base/context/system';
import { findTemplateChild, TemplateWindow, useTemplateLibrary } from '#base/theme';

import { CATALOG_WIDGET_VIEWS } from './CatalogPageRegistry';
import { CATALOG_LIBRARY, catalogTemplateId, resolveCatalogPageTemplate } from './catalogTemplates';
import { CatalogWidgetSlotContext, CatalogWidgetView, CatalogWidgetViewStore } from './catalogWidgetView';

const WIDGET_IDS = new Set<string>(Object.values(CatalogWidgetEnum));

/** A widget's container: the widget, the path that finds the container, and its tags. */
interface WidgetContainer {
    id: CatalogWidgetId;
    path: string;
    tags: readonly string[];
}

/**
 * `createWidgetsRecursion`: every container named after a widget, depth first. A container inside
 * another widget's is found through it (`petsWidget/colourGridWidget`), as a layout may use one
 * widget's name in two places.
 */
const findWidgetContainers = (elements: readonly TemplateElement[], prefix = '', found: WidgetContainer[] = []) => {
    for (const element of elements) {
        let path = prefix;

        if (element.name && WIDGET_IDS.has(element.name)) {
            path = prefix ? `${prefix}/${element.name}` : element.name;
            found.push({ id: element.name as CatalogWidgetId, path, tags: element.tags ?? [] });
        }

        findWidgetContainers(element.children, path, found);
    }

    return found;
};

/** One binding for a key, merged over what it has. */
const mergeBinding = (bindings: TemplateBindings, key: string, binding: TemplateBindings[string]) => {
    bindings[key] = { ...bindings[key], ...binding };
};

interface CatalogPageTemplateProps {
    page: CatalogPage;
    templateId: string;
    template: Template;
    templates: Record<string, Template>;
    containers: readonly WidgetContainer[];
    store: CatalogWidgetViewStore;
    height?: number;
}

/** The page's window, drawn with its widgets' views and `LocalizationCatalogWidget`'s texts, images and links. */
const CatalogPageTemplate = ({ page, templateId, template, templates, containers, store, height }: CatalogPageTemplateProps) => {
    const views = useSyncExternalStore(store.subscribe, store.getSnapshot);
    const catalogImageUrl = useConfigValue<string>('asset.urls.catalog') ?? '';
    const has = (name: string) => !!findTemplateChild(template.elements, name);
    const bindings: TemplateBindings = {};

    // `LocalizationCatalogWidget.initLocalizables`: the page's texts and images into the elements
    // its layout code names (the window's own header takes `catalog.header.*`).
    page.localization.textDatas.forEach((text, index) => {
        const name = getTextElementName(index, page.layoutCode);

        if (name && has(name)) mergeBinding(bindings, name, { caption: text.replace(/\r\n/g, '\n') });
    });

    page.localization.imageDatas.forEach((image, index) => {
        const name = getImageElementName(index, page.layoutCode);

        if (name && image.length && has(name)) mergeBinding(bindings, name, { asset: catalogImageUrl.replace('%name%', image) });
    });

    // `initLinks`.
    for (const name of getCatalogPageLinks(page.layoutCode)) {
        if (has(name)) mergeBinding(bindings, name, { onPointerTap: () => onCatalogPageLink(page, name) });
    }

    const embeddedArranges: { path: string; arrange: NonNullable<CatalogWidgetView['arrange']> }[] = [];

    for (const container of containers) {
        const view = views.get(container.path);

        if (!view) continue;

        for (const [ key, binding ] of Object.entries(view.page ?? {})) mergeBinding(bindings, key, binding);

        if (view.removed) {
            mergeBinding(bindings, container.path, { visible: false });
            continue;
        }

        const widgetTemplate = (view.template && !container.tags.includes('EMBEDDED')) ? templates[catalogTemplateId(view.template)] : undefined;

        if (widgetTemplate) {
            // `attachWidgetView`: the widget's view replaces what the container holds.
            mergeBinding(bindings, container.path, { items: [ { key: view.template ?? '', from: widgetTemplate, bindings: view.bindings, arrange: view.arrange } ] });
            continue;
        }

        for (const [ key, binding ] of Object.entries(view.bindings)) mergeBinding(bindings, key ? `${container.path}/${key}` : container.path, binding);

        if (view.arrange) embeddedArranges.push({ path: container.path, arrange: view.arrange });
    }

    const arrange = embeddedArranges.length
        ? ({ find }: TemplateWindows) => {
                for (const { path, arrange: arrangeWidget } of embeddedArranges) {
                    arrangeWidget({ find: key => find(key ? `${path}/${key}` : path), root: () => find(path) });
                }
            }
        : undefined;

    return (
        <TemplateWindow
            id={templateId}
            bindings={bindings}
            arrange={arrange}
            height={height}
        />
    );
};

interface CatalogPageLayoutProps {
    page: CatalogPage;
    templateId: string;
    template: Template;
    templates: Record<string, Template>;
    height?: number;
}

/** One built page: its widgets, then its window; a new page mounts both anew, as Flash disposes the old page. */
const CatalogPageLayout = ({ page, templateId, template, templates, height }: CatalogPageLayoutProps) => {
    const [ store ] = useState(() => new CatalogWidgetViewStore());
    const containers = useMemo(() => findWidgetContainers(template.elements), [ template ]);
    // The widgets inside a container whose widget's `init()` failed are removed with it. Only that set
    // redraws the widgets: each publishes its view on every render of its own.
    const removedPaths = useSyncExternalStore(store.subscribe, store.getRemoved);
    const removed = removedPaths ? removedPaths.split('\n').map(path => `${path}/`) : [];

    // Children's effects run first: every widget has mounted and subscribed by now.
    useEffect(() => page.initializeWidgets(), [ page ]);

    const widgets: ReactNode[] = containers.map((container) => {
        const Widget = removed.some(prefix => container.path.startsWith(prefix)) ? undefined : CATALOG_WIDGET_VIEWS[container.id];

        return Widget
            ? (
                    <CatalogWidgetSlotContext.Provider
                        key={container.path}
                        value={{ store, container: container.path }}
                    >
                        <Widget
                            page={page}
                            tags={container.tags}
                        />
                    </CatalogWidgetSlotContext.Provider>
                )
            : null;
    });

    return (
        <>
            {widgets}
            <CatalogPageTemplate
                page={page}
                templateId={templateId}
                template={template}
                templates={templates}
                containers={containers}
                store={store}
                height={height}
            />
        </>
    );
};

export interface CatalogPageViewProps {
    /** `layoutContainer`'s height, which the page takes. */
    height?: number;
}

export const CatalogPageView = ({ height }: CatalogPageViewProps) => {
    const page = useCatalogStore(x => x.activePage);
    const pageSerial = useCatalogStore(x => x.pageSerial);
    const templates = useTemplateLibrary(CATALOG_LIBRARY);

    if (!page || !templates) return null;

    const templateId = resolveCatalogPageTemplate(templates, page.layoutCode);

    if (!templateId) return null;

    return (
        <CatalogPageLayout
            key={pageSerial}
            page={page}
            templateId={templateId}
            template={templates[templateId]}
            templates={templates}
            height={height}
        />
    );
};
