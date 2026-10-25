/**
 * `CatalogPromoWidget` (`catalog_promo`) and `CatalogPromoWidgetSmall` (`catalog_promo_small`): a
 * catalogue page the hotel promotes, `landing.view.catalog.promo.target`, with its picture
 * `landing.view.catalog.promo.image.uri`. The widget is hidden when both are empty.
 *
 * `initialize` gives each named text the page's own localization where the page has one
 * (`setCustomLocalization`): `catalog_promo_caption`, `catalog_promo_info` and `open_page_button`
 * read `landing.view.catalog.promo.caption.<page>`, `.info.<page>` and
 * `landing.view.catalog.open.page.<page>` instead of the layout's defaults. Flash also maps
 * `catalog_promo_picture_text` and `catalog_promo_title`, which neither layout has, so they change
 * nothing. The button opens the catalogue at the page (`HabboCatalog.openCatalogPage`).
 *
 * The large layout's texts are tagged `COLORABLE` and take the hotel's widget colours (`settings`);
 * the small one has no tagged text.
 */
import { hotelViewColorableBindings, HotelViewCommonSettings, hotelViewProperty, useConfigData, useSystemStore, useWindowActions } from '#base/context/system';
import { Box, TemplateBindings, TemplateWindow } from '#base/theme';

import { hotelViewTemplateId } from './hotelViewTemplate';

/** The large layout's `COLORABLE` texts. */
const COLORABLE = [ 'catalog_promo_caption', 'catalog_promo_info', 'catalog_promo_status' ] as const;

/**
 * `initialize`'s map: each element and the localization its page's text is under - the entries
 * whose element both layouts have (`catalog_promo_picture_text` and `catalog_promo_title` are not).
 */
const CUSTOM_LOCALIZATIONS = [
    [ 'catalog_promo_caption', 'landing.view.catalog.promo.caption' ],
    [ 'catalog_promo_info', 'landing.view.catalog.promo.info' ],
    [ 'open_page_button', 'landing.view.catalog.open.page' ],
] as const;

export interface HotelViewCatalogPromoWidgetProps {
    small: boolean;
    settings: HotelViewCommonSettings;
}

export const HotelViewCatalogPromoWidget = ({ small, settings }: HotelViewCatalogPromoWidgetProps) => {
    const config = useConfigData();
    const localizations = useSystemStore(x => x.localizations);
    const { hideWindow, showWindow } = useWindowActions();
    const pageName = hotelViewProperty(config, 'landing.view.catalog.promo.target');
    const picture = hotelViewProperty(config, 'landing.view.catalog.promo.image.uri');

    const bindings: TemplateBindings = {
        '': { visible: (pageName !== '') || (picture !== '') },
        picture: { asset: picture },
        open_page_button: {
            onPointerTap: () => {
                // `HabboCatalog.openCatalogPage`: the normal catalogue replaces the Builders Club one.
                hideWindow('builders_catalog');
                showWindow('catalog', { pageName });
            },
        },
    };

    // `setCustomLocalization`: only where the page's localization exists.
    for (const [ name, prefix ] of CUSTOM_LOCALIZATIONS) {
        const key = `${prefix}.${pageName}`;

        if (localizations[key] === undefined) continue;

        bindings[name] = { ...bindings[name], caption: `\${${key}}` };
    }

    return (
        <Box layout={{ flexShrink: 0 }}>
            <TemplateWindow
                id={hotelViewTemplateId(small ? 'catalog_promo_small' : 'catalog_promo')}
                bindings={small ? bindings : hotelViewColorableBindings(settings, COLORABLE, bindings)}
            />
        </Box>
    );
};
