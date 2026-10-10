/**
 * `GenericWidget`: a reception promo built from two hotel variables into `generic_widget`.
 *
 * `configureContentColumn`: `conf` is the column's elements, one `type,args...` per `;`, each built
 * from its layout (`element_<type>`, or the one its handler names) and wired by its
 * `LandingViewElementType` handler, then added to `content_container` - or, for a floating one, to
 * the widget itself at its own position:
 *
 * - `caption`, `subcaption`, `bodytext` (`TextElementHandler`): the text `${arg}`, optionally a
 *   width. The optional `border` argument draws the layout editor's debug outline and is ignored.
 * - `spacing` (`SpacingElementHandler`): an empty row `arg` pixels tall.
 * - `catalogbutton` (`CatalogButtonElementHandler`, `element_button`): opens the catalogue at the
 *   page named, or where it was left.
 * - `internallinkbutton` (`InternalLinkButtonElementHandler`, `element_button`): follows an
 *   in-client link.
 * - `link` (`LinkElementHandler`): the "leaving the hotel" alert, and the page.
 * - `customtimer` (`CustomTimerElementHandler`, `element_timer`): a countdown to a hotel time,
 *   captioned with its running or expired text (no caption before the first answer), floating at
 *   its own position when its first argument says so.
 *
 * `configureLayout` then applies `layout`'s entries in order: the content column at 230 in a wide
 * slot, the widget its pane's width, the `bitmap` and the column placed and sized, and the widget at
 * least `container.height` tall. The widget takes its children's size (`resize_to_accommodate_children`).
 *
 * The remaining element types (`title`, `image`, the room, badge, habblet, VIP, community goal,
 * daily quest and concurrent-user elements) are not drawn: their handlers need windows and managers
 * the port has not got, so the column leaves them out. The tracking calls the handlers make
 * (`trackGoogle`, `trackEventLog`) have no receiver here. `WidgetContainerLayout.applyCommonWidgetSettings`
 * colours the `COLORABLE` texts.
 */
import { openCatalogExternalLink, openClientLink } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import {
    hotelViewColorableBindings, hotelViewColorableFormat, HotelViewCommonSettings, hotelViewGenericConf, HotelViewGenericElement, hotelViewPaneWidths, hotelViewTimerTimeStr, isWideHotelViewSlot, parseHotelViewGenericConf, parseHotelViewGenericLayout, useConfigData,
    useSystemActions, useSystemStore,
} from '#base/context/system';
import { useSecondsClock } from '#base/hooks';
import { CountdownWidget, TemplateBindings, TemplateItem, TemplateWindow, TemplateWindows, useTemplateLibrary } from '#base/theme';

import { HOTEL_VIEW_LIBRARY, hotelViewTemplate, hotelViewTemplateId } from './hotelViewTemplate';

/** Each drawn element type's layout (`ILayoutNameProvider.layoutName`, else `element_<type>`). */
const ELEMENT_LAYOUTS: Readonly<Record<string, string>> = {
    caption: 'element_caption',
    subcaption: 'element_subcaption',
    bodytext: 'element_bodytext',
    spacing: 'element_spacing',
    catalogbutton: 'element_button',
    internallinkbutton: 'element_button',
    link: 'element_link',
    customtimer: 'element_timer',
};

/** `AbstractTimerElementHandler.isFloating`: placed on the widget at its own x/y rather than in the column. */
const isFloating = (element: HotelViewGenericElement) => (element.type === 'customtimer') && (element.args[0] === 'true');

const int = (value: string | undefined) => parseInt(value ?? '', 10) | 0;

export interface HotelViewGenericWidgetProps {
    slot: number;
    /** The configuration code a `WidgetContainerWidget` chose, or null for a slot's own generic widget. */
    code: string | null;
    settings: HotelViewCommonSettings;
}

export const HotelViewGenericWidget = ({ slot, code, settings }: HotelViewGenericWidgetProps) => {
    const config = useConfigData();
    const { send } = useWebSocketContext();
    const { showWindow, hideWindow } = useSystemActions();
    const templates = useTemplateLibrary(HOTEL_VIEW_LIBRARY);
    const secondsUntil = useSystemStore(x => x.hotelViewSecondsUntil);
    const now = useSecondsClock();
    const panes = hotelViewPaneWidths(config);
    const wide = isWideHotelViewSlot(slot);
    const elements = parseHotelViewGenericConf(hotelViewGenericConf(config, slot, code, 'conf'));
    const layout = parseHotelViewGenericLayout(hotelViewGenericConf(config, slot, code, 'layout'));
    const colorable = (bindings: TemplateBindings, names: readonly string[]) => hotelViewColorableBindings(settings, names, bindings);

    /** `AbstractTimerElementHandler.setTimer` / `setCaption`. */
    const timerBindings = (args: string[]): TemplateBindings => {
        const received = secondsUntil[hotelViewTimerTimeStr({ type: 'customtimer', args })];
        const seconds = received ? Math.max(0, received.seconds - ((now - received.receivedAt) / 1000)) : 0;
        const caption = received ? ((received.seconds > 0) ? args[3] : args[4]) : '';

        return colorable({
            timer_caption_txt: { visible: !!caption, caption: caption ? `\${${caption}}` : '' },
            countdown_widget: {
                visible: !!received && (received.seconds > 0),
                children: (
                    <CountdownWidget
                        seconds={seconds}
                        colorableFormat={hotelViewColorableFormat(settings)}
                        layout={{ position: 'absolute', left: 0, top: 0 }}
                    />
                ),
            },
        }, [ 'timer_caption_txt' ]);
    };

    /** The element's handler `initialize`: what it sets on its window, and where it puts it. */
    const elementItem = (element: HotelViewGenericElement, index: number): TemplateItem | undefined => {
        const from = hotelViewTemplate(templates, ELEMENT_LAYOUTS[element.type] ?? '');
        const { type, args } = element;
        const key = `${index}_${type}`;

        if (!from) return undefined;

        switch (type) {
            case 'caption':
            case 'subcaption':
            case 'bodytext':
                return {
                    key,
                    from,
                    bindings: colorable({ '': { caption: `\${${args[0]}}` } }, [ '' ]),
                    arrange: ({ root }) => {
                        if (args.length > 1) root()?.setWidth(int(args[1]));
                    },
                };
            case 'spacing':
                return { key, from, arrange: ({ root }) => root()?.setHeight(int(args[0])) };
            case 'catalogbutton':
            case 'internallinkbutton':
                return {
                    key,
                    from,
                    bindings: {
                        '': {
                            caption: `\${${args[0]}}`,
                            onPointerTap: () => {
                                if (type === 'internallinkbutton') {
                                    openClientLink(send, args[1] ?? '');

                                    return;
                                }

                                // `HabboCatalog.openCatalogPage` / `openCatalog`: the normal catalogue replaces the Builders Club one.
                                hideWindow('builders_catalog');

                                if (args[1]) showWindow('catalog', { pageName: args[1] });
                                else showWindow('catalog');
                            },
                        },
                    },
                };
            case 'link':
                return {
                    key,
                    from,
                    bindings: colorable({
                        '': { onPointerTap: () => openCatalogExternalLink(args[1] ?? '') },
                        link_txt: { caption: `\${${args[0]}}` },
                    }, [ 'link_txt' ]),
                };
            case 'customtimer':
                return {
                    key,
                    from,
                    bindings: timerBindings(args),
                    arrange: ({ root }) => {
                        if (!isFloating(element)) return;

                        root()?.setX(int(args[1]));
                        root()?.setY(int(args[2]));
                    },
                };
            default:
                return undefined;
        }
    };

    const items = elements.flatMap((element, index) => {
        const item = elementItem(element, index);

        return item ? [ { item, floating: isFloating(element) } ] : [];
    });
    const bitmapUri = layout.reduce((uri, entry) => ((entry.key === 'bitmap.uri') ? entry.value : uri), '');

    /** `configureLayout`, once the column is built. */
    const arrange = ({ find, root }: TemplateWindows) => {
        const widget = root();
        const bitmap = find('bitmap');
        const content = find('content_container');

        content?.setX(wide ? 230 : 0);
        widget?.setWidth(wide ? panes.left : panes.right);

        for (const { key, value } of layout) {
            switch (key) {
                case 'bitmap.width': bitmap?.setWidth(int(value)); break;
                case 'bitmap.height': bitmap?.setHeight(int(value)); break;
                case 'bitmap.x': bitmap?.setX(int(value)); break;
                case 'bitmap.y': bitmap?.setY(int(value)); break;
                case 'content.x': content?.setX(int(value)); break;
                case 'content.y': content?.setY(int(value)); break;
                case 'content.width': content?.setWidth(int(value)); break;
                case 'container.height': if (widget) widget.setHeight(Math.max(int(value), widget.height)); break;
            }
        }
    };

    return (
        <TemplateWindow
            id={hotelViewTemplateId('generic_widget')}
            bindings={{
                '': { added: items.filter(entry => entry.floating).map(entry => entry.item) },
                bitmap: { asset: bitmapUri },
                // `addListItem`: each element after the last, the column only lengthened.
                content_container: { items: items.filter(entry => !entry.floating).map(entry => ({ ...entry.item, append: true })) },
            }}
            arrange={arrange}
        />
    );
};
