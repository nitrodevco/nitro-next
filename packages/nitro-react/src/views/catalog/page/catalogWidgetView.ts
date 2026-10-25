/**
 * How a catalogue widget draws: Flash's `CatalogWidget` owns a container of the page's window
 * (`_window`) - the element `CatalogPage.createWidget` found by name - and either builds its own view
 * into it (`attachWidgetView(widgetId)`: `buildFromXML(getAssetByName(widgetId))` added as the
 * container's child) or, when the container is tagged `EMBEDDED`, binds the page layout's own
 * elements inside it.
 *
 * A widget component here renders nothing. It says what it does to its container - a
 * `CatalogWidgetView` - with `useCatalogWidgetView`, and `CatalogPageView` draws the page's template
 * with every widget's view applied in its container. `template` is the asset `attachWidgetView`
 * loads; its bindings and `arrange` then resolve inside it. Without one, or in an `EMBEDDED`
 * container, they resolve inside the container.
 */
import { TemplateBindings, TemplateWindows } from '@nitrodevco/nitro-theme';
import { createContext, useContext, useLayoutEffect } from 'react';

export interface CatalogWidgetView {
    /** The widget's own view asset (`attachWidgetView`), when it builds one. */
    template?: string;
    /** What the widget sets, by names inside its view (or its container); `''` is the view's root (the container). */
    bindings: TemplateBindings;
    /** What the widget sizes and moves once its view is laid out, found the same way. */
    arrange?: (windows: TemplateWindows) => void;
    /**
     * What the widget sets outside its container, found from the page's window
     * (`window.parent.findChildByName`) - another widget's container it hides.
     */
    page?: TemplateBindings;
    /**
     * `init()` failed: `CatalogPage.removeWidgets` takes the container off the page with the widgets
     * inside it, which are disposed and hear nothing more.
     */
    removed?: boolean;
}

/**
 * The views of one page's widgets, by container path - what `CatalogPageView` draws the page with.
 * Each change makes a new map, so a render reading the snapshot sees it change.
 */
export class CatalogWidgetViewStore {
    private _views: ReadonlyMap<string, CatalogWidgetView> = new Map();
    private _listeners = new Set<() => void>();

    public readonly subscribe = (listener: () => void) => {
        this._listeners.add(listener);

        return () => {
            this._listeners.delete(listener);
        };
    };

    public readonly getSnapshot = (): ReadonlyMap<string, CatalogWidgetView> => this._views;

    /** The containers whose widget was removed, as one string: unchanged while the set is, however often views change. */
    public readonly getRemoved = (): string => this._removed;

    private _removed = '';

    public set(container: string, view: CatalogWidgetView | undefined): void {
        if (!view && !this._views.has(container)) return;

        const views = new Map(this._views);

        if (view) views.set(container, view);
        else views.delete(container);

        this._views = views;
        this._removed = [ ...views ].filter(([ , entry ]) => entry.removed).map(([ path ]) => path).join('\n');

        for (const listener of this._listeners) listener();
    }
}

/** The page's store and the container path a widget component draws into. */
export interface CatalogWidgetSlotContext {
    store: CatalogWidgetViewStore;
    container: string;
}

export const CatalogWidgetSlotContext = createContext<CatalogWidgetSlotContext | undefined>(undefined);

/**
 * What the calling widget does to its container, for the page to draw. Published on every render of
 * the widget - a widget is no child of the page's template, so the template redrawing does not
 * render the widget again - and withdrawn when the widget unmounts (`init()` failed, or the page
 * closed), which leaves the container as the layout has it.
 */
export const useCatalogWidgetView = (view: CatalogWidgetView | undefined) => {
    const slot = useContext(CatalogWidgetSlotContext);

    useLayoutEffect(() => {
        slot?.store.set(slot.container, view);
    });

    useLayoutEffect(() => () => slot?.store.set(slot.container, undefined), [ slot ]);
};

/**
 * `ItemGridCatalogWidget` / `ProductViewCatalogWidget`: the attached view sized to its container
 * (`getChildAt(0).width/height = window.width/height`), unless the container is tagged `FIXED`.
 */
export const fitWidgetView = ({ root }: TemplateWindows) => {
    const view = root();
    const container = view?.parent;

    if (view && container) view.setRectangle(0, 0, container.width, container.height);
};
