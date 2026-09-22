import { CatalogPricingModelEnum, IPurchasableOffer } from '@nitrodevco/nitro-api';
import { GetProductOfferComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useRef, useState } from 'react';

import { CatalogWidgetEventEnum } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { useCatalogWidgetEvent } from '#base/hooks';
import { LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';
import { getOfferProduct } from '#base/utils';

import { CatalogWidgetProps } from '../CatalogPageRegistry';

/** `UniqueLimitedItemWidget.SUPPLY_REFRESH_PERIOD_MS`. */
const SUPPLY_REFRESH_PERIOD_MS = 20000;

/** A limited edition offer - `update`'s test: a single-product offer whose product is a unique limited item. */
const isLimitedOffer = (offer: IPurchasableOffer) => ((Number(offer.pricingModel) === Number(CatalogPricingModelEnum.Single)) && !!getOfferProduct(offer)?.isUnique);

/**
 * The supply of a limited edition offer, the `limitedItemWidget` container of the page layout -
 * Flash's `UniqueLimitedItemWidget` driving the container's `unique_item_overlay_container`, a
 * `limited_item_overlay_supply` window widget (`LimitedItemSupplyLeftOverlayWidget` on
 * `unique_item_overlay_supply.xml`): the wide plaque with `unique.items.left` and the items left
 * in bold 12px, `unique.items.number.sold` and the series size under it, in Ubuntu over the
 * `regular` style. The sold-out label of that layout is hidden by the widget whatever the count.
 *
 * Shown while a limited offer is selected (`SELECT_PRODUCT`, or its `CWE_PRODUCT_OFFER_UPDATED`),
 * and then the supply is refreshed: `sendGetProductOffer` right away and every 20 seconds while
 * the widget shows. The answer, through `HabboCatalog.onProductOffer`, updates the page's count
 * and selects the refreshed offer again.
 *
 * One difference from the client, on purpose: Flash also asks again on that re-selection, so each
 * answer brings the next request and the refresh runs as fast as the server answers. Here a
 * selection of the offer the widget already shows (the refreshed copy the answer brings) does not
 * send, which leaves the 20-second refresh as the only repeat.
 */
export const CatalogLimitedItemWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ offer, setOffer ] = useState<IPurchasableOffer | undefined>(undefined);
    const offerRef = useRef<IPurchasableOffer | undefined>(undefined);
    const { send } = useWebSocketContext();
    const t = useTranslation();

    /** `update(offer, refresh)`. */
    const update = (next: IPurchasableOffer, refresh: boolean) => {
        const previous = offerRef.current;

        offerRef.current = next;
        setOffer(next);

        if (!isLimitedOffer(next)) return;

        if (refresh && (previous?.offerId !== next.offerId)) send(new GetProductOfferComposer({ offerId: next.offerId }));
    };

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SELECT_PRODUCT, event => update(event.offer, true));
    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.PRODUCT_OFFER_UPDATED, event => update(event.offer, false));

    const visible = !!offer && isLimitedOffer(offer);
    const offerId = visible ? offer.offerId : -1;

    // `onSupplyLeftTimer`: the timer runs while a limited offer shows.
    useEffect(() => {
        if (offerId < 0) return;

        const timer = setInterval(() => send(new GetProductOfferComposer({ offerId })), SUPPLY_REFRESH_PERIOD_MS);

        return () => clearInterval(timer);
    }, [ offerId, send ]);

    if (!visible) return null;

    const product = getOfferProduct(offer);

    return (
        <Region
            name="unique_item_overlay_container"
            layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 40 }}
        >
            <ThemeImage
                name="plaque"
                src={LayoutImage('window-manager/unique_item_large_background_wide.png')}
                bitmap={{ stretchedX: false, stretchedY: false }}
                layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 29 }}
            />
            <ThemeText
                name="items_left"
                text={t('unique.items.left')}
                textStyle="regular"
                textOptions={{ fontFamily: 'Ubuntu' }}
                flashFormat={{ antiAliasType: 'advanced' }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 40, top: 2 }}
            />
            <ThemeText
                name="items_left_count"
                text={String(product?.uniqueLeft ?? 0)}
                textStyle="regular"
                textOptions={{ fontFamily: 'Ubuntu', fontSize: 12, align: 'right' }}
                flashFormat={{ bold: true, antiAliasType: 'advanced' }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 108, width: 35, top: 0 }}
            />
            <ThemeText
                name="items_total"
                text={t('unique.items.number.sold')}
                textStyle="regular"
                textOptions={{ fontFamily: 'Ubuntu' }}
                flashFormat={{ antiAliasType: 'advanced' }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 40, top: 15 }}
            />
            <ThemeText
                name="items_total_count"
                text={String(product?.uniqueSize ?? 0)}
                textStyle="regular"
                textOptions={{ fontFamily: 'Ubuntu', align: 'right' }}
                flashFormat={{ antiAliasType: 'advanced' }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 120, width: 23, top: 15 }}
            />
        </Region>
    );
};
