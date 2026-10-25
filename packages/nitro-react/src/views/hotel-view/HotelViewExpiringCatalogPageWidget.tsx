/**
 * `ExpiringCatalogPageWidget` (`expiring_catalog_page`) and `ExpiringCatalogPageSmallWidget`
 * (`expiring_catalog_page_small`): the catalogue page that expires first, as the server names it
 * (`CatalogPageWithEarliestExpiryMessage`, asked for by `registerHotelViewHandlers`).
 *
 * The widget is hidden until a page is named, and again whenever the server names none. Its header
 * and description are the page's own texts (`landing.view.pageexpiry.page.<page>.header` / `.desc`),
 * its picture `reception/catalog_teaser_<page>.png` from the image library, and the countdown runs
 * down to the expiry. The button opens the catalogue at that page; once the page has expired the
 * catalogue finds it hidden, opens its front page instead and raises `CATALOG_INVISIBLE_PAGE_VISITED`,
 * on which `HabboLandingView.onExpiredLinkClick` activates the reception again - so this widget asks
 * again which page expires first (`refresh`, still at most once in thirty seconds;
 * `registerHotelViewHandlers`). The packet's image name is read
 * but, as in Flash, never drawn. The large layout's title line stretches up to its title
 * (`positionAfterAndStretch`).
 */
import { hotelViewColorableBindings, hotelViewColorableFormat, HotelViewCommonSettings, hotelViewProperty, useConfigData, useSystemStore, useWindowActions } from '#base/context/system';
import { useSecondsClock } from '#base/hooks';
import { Box, CountdownWidget, TemplateBindings, TemplateWindow, TemplateWindows } from '#base/theme';

import { positionAfterAndStretch } from './hotelViewTemplate';

/** The texts the layouts tag `COLORABLE`. */
const COLORABLE = [ 'page_expiry_title', 'page_header_txt', 'page_desc_txt', 'timer_caption_txt' ] as const;

/** The large layout's `initialize`: its title line runs on from its title. */
const arrangeLarge = (windows: TemplateWindows) => positionAfterAndStretch(windows, 'page_expiry_title', 'hdr_line');

export interface HotelViewExpiringCatalogPageWidgetProps {
    small: boolean;
    settings: HotelViewCommonSettings;
}

export const HotelViewExpiringCatalogPageWidget = ({ small, settings }: HotelViewExpiringCatalogPageWidgetProps) => {
    const page = useSystemStore(x => x.hotelViewExpiringPage);
    const config = useConfigData();
    const now = useSecondsClock();
    const { hideWindow, showWindow } = useWindowActions();
    const pageName = page?.pageName ?? '';
    const seconds = page ? Math.max(0, page.secondsToExpiry - ((now - page.receivedAt) / 1000)) : 0;

    const bindings: TemplateBindings = hotelViewColorableBindings(settings, COLORABLE, {
        // `initialize` hides the widget until the first answer; an empty page name hides it again.
        '': { visible: !!pageName },
        page_header_txt: { caption: `\${landing.view.pageexpiry.page.${pageName}.header}` },
        page_desc_txt: { caption: `\${landing.view.pageexpiry.page.${pageName}.desc}` },
        promo_bitmap: { asset: pageName ? `${hotelViewProperty(config, 'image.library.url')}reception/catalog_teaser_${pageName}.png` : '' },
        countdown_widget: {
            children: (
                <CountdownWidget
                    seconds={seconds}
                    colorableFormat={hotelViewColorableFormat(settings)}
                    layout={{ position: 'absolute', left: 0, top: 0 }}
                />
            ),
        },
        open_catalog_button: {
            onPointerTap: () => {
                // `HabboCatalog.openCatalogPage`: the normal catalogue replaces the Builders Club one.
                hideWindow('builders_catalog');
                showWindow('catalog', { pageName });
            },
        },
    });

    return (
        <Box layout={{ flexShrink: 0 }}>
            <TemplateWindow
                id={small ? 'habbo-friend-bar-com/expiring_catalog_page_small_xml' : 'habbo-friend-bar-com/expiring_catalog_page_xml'}
                bindings={bindings}
                arrange={small ? undefined : arrangeLarge}
            />
        </Box>
    );
};
