import type { HotelViewGenericLayoutEntry } from '#base/context/system';
import { Template, TemplateWindows } from '#base/theme';

/** The library the reception's layouts are in (`HabboLandingView.getXmlWindow`). */
export const HOTEL_VIEW_LIBRARY = 'habbo-friend-bar-com';

/** A reception layout's template id: `getXmlWindow(name)` reads the `<name>_xml` asset. */
export const hotelViewTemplateId = (name: string) => `${HOTEL_VIEW_LIBRARY}/${name}_xml`;

/** A reception layout out of its library's templates, once they are loaded. */
export const hotelViewTemplate = (templates: Readonly<Record<string, Template>> | undefined, name: string): Template | undefined => templates?.[hotelViewTemplateId(name)];

/** `HabboLandingView.positionAfterAndStretch`'s gap between the two windows. */
const GAP = 5;

/**
 * `HabboLandingView.positionAfterAndStretch(container, a, b)`: `b` starts just past `a` - an
 * auto-sized title, so past its text - and keeps its right edge, growing by what it moved left.
 */
export const positionAfterAndStretch = ({ find }: TemplateWindows, first: string, second: string) => {
    const a = find(first);
    const b = find(second);

    if (!a || !b) return;

    const x = a.x + a.width + GAP;

    b.setRectangle(x, b.y, b.width + (b.x - x), b.height);
};

/** `parseInt` as `configureLayout` uses it, as a whole number. */
const layoutInt = (value: string) => parseInt(value, 10) | 0;

/** `GenericWidget.configureLayout`'s `bitmap.uri`: the last one the layout names, if any. */
export const hotelViewLayoutBitmap = (layout: readonly HotelViewGenericLayoutEntry[]) => layout.reduce((uri, entry) => ((entry.key === 'bitmap.uri') ? entry.value : uri), '');

/**
 * `GenericWidget.configureLayout`, which `DailyQuestWidget` also calls on its own window: the
 * content column at 230 in a wide slot, the widget its pane's width, then `layout`'s entries in
 * order - the `bitmap` and the column placed and sized, and the widget at least `container.height`
 * tall. The `bitmap.uri` is the `bitmap`'s binding (`hotelViewLayoutBitmap`).
 */
export const configureHotelViewLayout = ({ find, root }: TemplateWindows, layout: readonly HotelViewGenericLayoutEntry[], wide: boolean, paneWidth: number) => {
    const widget = root();
    const bitmap = find('bitmap');
    const content = find('content_container');

    content?.setX(wide ? 230 : 0);
    widget?.setWidth(paneWidth);

    for (const { key, value } of layout) {
        switch (key) {
            case 'bitmap.width': bitmap?.setWidth(layoutInt(value)); break;
            case 'bitmap.height': bitmap?.setHeight(layoutInt(value)); break;
            case 'bitmap.x': bitmap?.setX(layoutInt(value)); break;
            case 'bitmap.y': bitmap?.setY(layoutInt(value)); break;
            case 'content.x': content?.setX(layoutInt(value)); break;
            case 'content.y': content?.setY(layoutInt(value)); break;
            case 'content.width': content?.setWidth(layoutInt(value)); break;
            case 'container.height': if (widget) widget.setHeight(Math.max(layoutInt(value), widget.height)); break;
        }
    }
};
