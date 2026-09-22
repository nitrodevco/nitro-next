import { useConfigValue, useTranslation } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { Border, ThemeText } from '#base/theme';

import { CatalogCurrencyIcon } from '../../CatalogCurrencyIcon';
import { CatalogWidgetProps } from '../CatalogPageRegistry';

/**
 * The balance of the page's activity point currency, `activityPointDisplayWidget.xml` - Flash's
 * `ActivityPointDisplayCatalogWidget`: a half-grey style 3 border (`#e0e0e0` at 0.8) with the
 * currency's big icon and `catalog.purchase.youractivitypoints` (`%activitypoints%`,
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
    const nameKey = useConfigValue<string>(`activitypoint.name.${type}`) ?? '';
    const t = useTranslation();

    // `§_-u1R§.isVisible`, read as written.
    const isVisible = ([ 1, 2, 4 ].indexOf(type) === 1);

    if ((type < 1) || !isVisible) return null;

    return (
        <Border
            variant="3"
            name="activityPointDisplayWidget"
            tintColor="#e0e0e0"
            blend={0.8}
            layout={{ position: 'absolute', left: 0, width: 175, top: 0, height: 25, overflow: 'hidden' }}
        >
            <CatalogCurrencyIcon
                type={type}
                big
                layout={{ position: 'absolute', left: 6, width: 23, bottom: -1, height: 23 }}
            />
            <ThemeText
                name="activity_points_txt"
                text={t('catalog.purchase.youractivitypoints', '', { activitypoints: String(amount), currencyname: t(nameKey, nameKey) })}
                textStyle="u_small"
                flashFormat={{ italic: true }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 26, top: 4 }}
            />
        </Border>
    );
};
