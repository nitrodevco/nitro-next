import { useConfigData, useTranslation } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { configReader, getCurrencyIconStyle } from '#base/utils';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { useCatalogWidgetView } from '../catalogWidgetView';

/**
 * The balance of the page's activity point currency, `activityPointDisplayWidget.xml` - Flash's
 * `ActivityPointDisplayCatalogWidget`: the currency's big icon and `catalog.purchase.youractivitypoints` (`%activitypoints%`,
 * `%currencyname%`) in small italic `u_small`, following the purse (`catalog_purse_update`).
 *
 * The currency is the first activity point type above 0 any of the page's offers is priced in
 * (`getActivityPointType`). `updateAmount` shows the widget only when `§_-u1R§.isVisible` says so,
 * and that reads `[1,2,4].indexOf(type) != 1` as "not visible" - so of all the currencies only
 * type 2 ever shows, exactly as in the client. The currency's name is the localization of
 * `activitypoint.name.<type>` (`getActivityPointName`), which the hotel does not set for type 2.
 */
export const CatalogActivityPointDisplayWidgetView = ({ page }: CatalogWidgetProps) => {
    const type = page.offers.find(offer => (offer.activityPointType > 0))?.activityPointType ?? 0;
    const amount = useUserStore(x => x.activityPoints[type] ?? 0);
    // `getActivityPointName`: `getProperty`, its `${...}` filled in.
    const config = useConfigData();
    const nameKey = configReader(config).configString(`activitypoint.name.${type}`);
    const t = useTranslation();

    // `§_-u1R§.isVisible`, read as written.
    const isVisible = ([ 1, 2, 4 ].indexOf(type) === 1);

    useCatalogWidgetView({
        template: 'activityPointDisplayWidget',
        bindings: ((type < 1) || !isVisible)
            ? { '': { visible: false } }
            : {
                    activity_points_txt: { caption: t('catalog.purchase.youractivitypoints', '', { activitypoints: String(amount), currencyname: t(nameKey, nameKey) }) },
                    activity_point_icon: { style: String(getCurrencyIconStyle(type, config, true)) },
                },
    });

    return null;
};
