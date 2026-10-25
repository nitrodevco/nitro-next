/**
 * The club gifts, the `clubGiftWidget` of `layout_club_gifts.xml` - Flash's `ClubGiftWidget` with
 * its `ClubGiftController`. `init` attaches `clubGiftWidget` (the layout's container is tagged
 * `EMBEDDED`, so its own children stay), empties `info_text`, `past_club_days` and `past_vip_days`
 * and hands the controller the widget, which asks for the gift info (`GetClubGiftInfoComposer`);
 * `update` redraws whenever `setInfo` or a pick changes it.
 *
 * `updateInfo`: gifts available (`catalog.club_gift.available`, `amount`), else days until the next
 * (`days_until_next`, `days`), else `not_available` for a member (`hasClub`: club days left) and
 * `no_club` for anyone else; the past lengths are the purse's HC and VIP days together
 * (`past_club[.long]`) and its VIP days (`past_vip[.long]`, into the layout's hidden
 * `past_vip_days`), in months of 31 (`days` and `months`). `updateList` puts a
 * `club_gift_list_item` into `gift_list` for every gift offer that has a product, product data and
 * gift data (`createListItem`), in the order the server sent them; `select_button` opens
 * `ClubGiftConfirmationDialog` (`selectGift`).
 */
import { CatalogPricingModelEnum, IPurchasableOffer } from '@nitrodevco/nitro-api';
import { IClubGiftData } from '@nitrodevco/nitro-packets';
import { Template, TemplateItem } from '@nitrodevco/nitro-theme';
import { useEffect } from 'react';

import { requestClubGiftInfo } from '#base/commands';
import { useCatalogClubActions, useCatalogStore } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { ClubSubscription, useOwnClubSubscription } from '#base/context/user';
import { useTemplateLibrary } from '#base/theme';
import { getOfferProduct } from '#base/utils';

import { CatalogProductIconView } from '../../CatalogProductIconView';
import { CATALOG_LIBRARY, catalogTemplateId } from '../catalogTemplates';
import { useCatalogWidgetView } from '../catalogWidgetView';

/** `ClubGiftWidget.DAYS_IN_MONTH`. */
const DAYS_IN_MONTH = 31;

type Translate = ReturnType<typeof useTranslation>;

/** A length of days as `[.long]` text: `days` the rest of a 31 day month, `months` the whole ones. */
const daysText = (t: Translate, key: string, days: number) => t((days >= DAYS_IN_MONTH) ? `${key}.long` : key, '', {
    days: String(days % DAYS_IN_MONTH),
    months: String(Math.trunc(days / DAYS_IN_MONTH)),
});

interface ClubGiftItemState {
    giftsAvailable: number;
    subscription: ClubSubscription;
    t: Translate;
    onSelect: () => void;
}

/**
 * `createListItem` - a `club_gift_list_item`: the product's name and description, the requirement
 * in `months_required`, `vip_icon` for a VIP gift, `select_button` enabled only for a selectable
 * gift while gifts are available, and the offer's product container in `image_container`
 * (`initProductIcon`): the product's own icon in `image` for a single or multi offer, with
 * `multiContainer` showing `x<count>` for a multi offer, `ctlg_pic_deal_icon_narrow` for a bundle.
 *
 * The requirement: a gift that is not selectable yet with days still missing (`daysRequired` minus
 * the past VIP days for a VIP gift, minus the past HC and VIP days for the others) says
 * `catalog.club_gift.<vip|club>_missing[.long]`, a gift that can be taken while gifts are available
 * `catalog.club_gift.selectable`, and nothing otherwise.
 *
 * `mouseOverHandler` measures the icon on hover and hides the preview on leaving, but never calls
 * `showPreview`, so `club_gift_preview` never shows in Flash either.
 */
const clubGiftItem = (templates: Record<string, Template>, offer: IPurchasableOffer, gift: IClubGiftData, state: ClubGiftItemState): TemplateItem => {
    const { giftsAvailable, subscription, t, onSelect } = state;
    const product = getOfferProduct(offer);
    const productData = product?.productData;
    const isBundle = (offer.pricingModel === CatalogPricingModelEnum.Bundle);
    const isMulti = (offer.pricingModel === CatalogPricingModelEnum.Multi);
    const missingDays = gift.isVip
        ? (gift.daysRequired - subscription.pastVipDays)
        : (gift.daysRequired - (subscription.pastClubDays + subscription.pastVipDays));

    let requirement = '';

    if (!gift.isSelectable && (missingDays > 0)) requirement = daysText(t, `catalog.club_gift.${gift.isVip ? 'vip' : 'club'}_missing`, missingDays);
    else if (giftsAvailable > 0) requirement = t('catalog.club_gift.selectable');

    return {
        key: String(offer.offerId),
        from: templates[catalogTemplateId('club_gift_list_item')],
        bindings: {
            gift_name: { caption: productData?.name ?? '' },
            gift_desc: { caption: productData?.description ?? '' },
            months_required: { caption: requirement },
            vip_icon: { visible: gift.isVip },
            select_button: { disabled: !(gift.isSelectable && (giftsAvailable > 0)), onPointerTap: onSelect },
            image: isBundle
                ? { asset: 'habbo-catalog-com-ctlg_pic_deal_icon_narrow', pivot: 'center' }
                : {
                        children: product && (
                            <CatalogProductIconView
                                product={product}
                                width={52}
                                height={46}
                            />
                        ),
                    },
            multiContainer: { visible: isMulti && !!product },
            multiCounter: { caption: product ? `x${product.productCount}` : '' },
        },
    };
};

export const CatalogClubGiftWidgetView = () => {
    const giftInfo = useCatalogStore(x => x.clubGiftInfo);
    const subscription = useOwnClubSubscription();
    const { setClubGiftConfirmation } = useCatalogClubActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const templates = useTemplateLibrary(CATALOG_LIBRARY);

    useEffect(() => {
        requestClubGiftInfo(send);
    }, [ send ]);

    const giftsAvailable = giftInfo?.giftsAvailable ?? 0;
    const daysUntilNextGift = giftInfo?.daysUntilNextGift ?? 0;

    let info: string;

    if (giftsAvailable > 0) info = t('catalog.club_gift.available', '', { amount: String(giftsAvailable) });
    else if (daysUntilNextGift > 0) info = t('catalog.club_gift.days_until_next', '', { days: String(daysUntilNextGift) });
    else if (subscription.clubDays > 0) info = t('catalog.club_gift.not_available');
    else info = t('catalog.club_gift.no_club');

    const items = (templates && giftInfo)
        ? giftInfo.offers.flatMap((offer) => {
                const gift = giftInfo.giftData.get(offer.offerId);

                if (!gift || !getOfferProduct(offer)?.productData) return [];

                return [ clubGiftItem(templates, offer, gift, { giftsAvailable, subscription, t, onSelect: () => setClubGiftConfirmation(offer) }) ];
            })
        : [];

    useCatalogWidgetView(templates && {
        template: 'clubGiftWidget',
        bindings: {
            info_text: { caption: info },
            past_club_days: { caption: daysText(t, 'catalog.club_gift.past_club', subscription.pastClubDays + subscription.pastVipDays) },
            past_vip_days: { caption: daysText(t, 'catalog.club_gift.past_vip', subscription.pastVipDays) },
            gift_list: { items },
        },
    });

    return null;
};
