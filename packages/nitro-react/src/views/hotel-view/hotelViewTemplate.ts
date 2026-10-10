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
