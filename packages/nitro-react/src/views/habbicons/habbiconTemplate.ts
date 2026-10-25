import { LayoutWindow } from '#base/theme';

/** `HabbiconView`'s layout: `getAssetByName("habbicon_view_xml")`. */
export const HABBICON_VIEW_TEMPLATE = 'habbo-catalog-com/habbicon_view_xml';

/** `HabbiconPurchaseConfirmationView`'s layout: `getAssetByName("habbicon_purchase_confirmation_xml")`. */
export const HABBICON_PURCHASE_CONFIRMATION_TEMPLATE = 'habbo-catalog-com/habbicon_purchase_confirmation_xml';

/** Every window under `window` (itself excluded) whose element has `name`, outermost first - clones included. */
export const findHabbiconWindows = (window: LayoutWindow | undefined, name: string): LayoutWindow[] => {
    const found: LayoutWindow[] = [];
    const walk = (parent: LayoutWindow) => {
        for (const child of parent.children) {
            if (child.element?.name === name) found.push(child);
            else walk(child);
        }
    };

    if (window) walk(window);

    return found;
};

/** The bindings that hide a progress bar window's own children, for `HabbiconProgressBarView` drawn over it. */
export const hideHabbiconProgressBar = (path: string) => ({
    [`${path}/background`]: { visible: false },
    [`${path}/progress`]: { visible: false },
});
