/**
 * The club gifts, the embedded `clubGiftWidget` of `layout_club_gifts.xml` - Flash's
 * `ClubGiftWidget` with its `ClubGiftController`: the italic `info_text` at the top, the
 * `gift_list` (a scrollable item list, spacing 1) of `club_gift_list_item`s, and `past_club_days`
 * centred along the bottom. The layout's `past_vip_days` is `visible="false"` and the widget only
 * sets its caption, so it is not drawn.
 *
 * `init` hands the controller the widget, which asks for the gift info (`GetClubGiftInfoComposer`);
 * `update` redraws whenever `setInfo` or a pick changes it. `updateInfo`: gifts available
 * (`catalog.club_gift.available`, `amount`), else days until the next (`days_until_next`, `days`),
 * else `not_available` for a member and `no_club` for anyone else; the past length is the purse's
 * HC and VIP days together in months of 31 (`past_club[.long]`, `days` and `months`).
 * `updateList` makes an item of every gift offer that has a product, product data and gift data
 * (`createListItem`), in the order the server sent them; select opens
 * `ClubGiftConfirmationDialog`.
 */
import { useEffect } from 'react';

import { requestClubGiftInfo } from '#base/commands';
import { useCatalogClubActions, useCatalogStore } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { Region, ScrollArea, ThemeText } from '#base/theme';
import { getOfferProduct } from '#base/utils';

import { CatalogClubGiftListItemView } from '../../club/CatalogClubGiftListItemView';

/** `ClubGiftWidget.DAYS_IN_MONTH`. */
const DAYS_IN_MONTH = 31;

export const CatalogClubGiftWidgetView = () => {
    const giftInfo = useCatalogStore(x => x.clubGiftInfo);
    const subscription = useUserStore(x => x.clubSubscription);
    const { setClubGiftConfirmation } = useCatalogClubActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();

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

    const pastDays = subscription.pastClubDays + subscription.pastVipDays;
    const pastClubDays = t((pastDays >= DAYS_IN_MONTH) ? 'catalog.club_gift.past_club.long' : 'catalog.club_gift.past_club', '', {
        days: String(pastDays % DAYS_IN_MONTH),
        months: String(Math.trunc(pastDays / DAYS_IN_MONTH)),
    });

    return (
        <>
            <ScrollArea
                orientation="vertical"
                variant="3"
                layout={{ position: 'absolute', left: 0, width: 360, top: 35, bottom: 16 }}
            >
                <Region
                    name="gift_list"
                    layout={{ flexDirection: 'column', gap: 1, width: '100%' }}
                >
                    {giftInfo && giftInfo.offers.map((offer) => {
                        const gift = giftInfo.giftData.get(offer.offerId);

                        if (!gift || !getOfferProduct(offer)?.productData) return null;

                        return (
                            <CatalogClubGiftListItemView
                                key={offer.offerId}
                                offer={offer}
                                gift={gift}
                                giftsAvailable={giftsAvailable}
                                subscription={subscription}
                                onSelect={() => setClubGiftConfirmation(offer)}
                            />
                        );
                    })}
                </Region>
            </ScrollArea>
            <ThemeText
                name="info_text"
                text={info}
                textStyle="u_italic"
                textOptions={{ wordWrap: true, wordWrapWidth: 356 }}
                clip
                verticalAlign="top"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 35 }}
            />
            <ThemeText
                name="past_club_days"
                text={pastClubDays}
                textStyle="u_small"
                textOptions={{ wordWrap: true, wordWrapWidth: 356, align: 'center' }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 0, width: 360, bottom: 0 }}
            />
        </>
    );
};
