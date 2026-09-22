/**
 * The club purchase confirmation - Flash's `ClubBuyConfirmationDialog`, drawn from
 * `club_buy_confirmation.xml` (369x210, style 3 frame in `0x418db0`, margins 3/36/3/3). Its
 * `itemlist_vertical` resizes to its rows and reflects the growth on to the frame, so the window
 * is as tall as what it shows: the product block (the style 18 club icon, the subscription name
 * in bold 16, the end date, the cost and the `purchase_cost_box` price), the spending disclaimer,
 * and the cancel and subscribe buttons.
 *
 * `showConfirmation`: the name is `catalog.vip.buy.confirm.<extension|subscription>.<days|months>`
 * (extension while the purse has VIP left), with `num_days` / `num_months`; the end date is
 * `catalog.vip.buy.confirm.end_date` with the offer's `day`, `month` and `year`. While
 * `disclaimer.credit_spending.enabled` is on the disclaimer shows and the subscribe button waits
 * for its checkbox (`setDisclaimerAccepted`); otherwise the disclaimer is disposed. Subscribe is
 * `confirmSelection` (`purchaseProduct`), the close and cancel `forgetPageDuringVipPurchase`.
 *
 * The frame's `help_page` (`habboclub`) would show the header's help button, which the theme's
 * frame header does not draw.
 */
import { useState } from 'react';

import { cancelClubBuy, confirmClubBuy } from '#base/commands';
import { useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useTranslation } from '#base/context/system';
import { getPurseHasClubLeft, useUserStore } from '#base/context/user';
import { Button, ButtonThick, CheckBox, Frame, Icon, ReflectResize, Region, ThemeText } from '#base/theme';

import { CatalogClubPriceView } from './CatalogClubPriceView';

/** The layout's `itemlist_vertical` height, which the frame's 210 was laid out for. */
const CONTENT_HEIGHT = 161;

export const CatalogClubBuyConfirmationView = () => {
    const confirmation = useCatalogStore(x => x.clubBuyConfirmation);
    const clubSubscription = useUserStore(x => x.clubSubscription);
    const disclaimerEnabled = useConfigValue<boolean | string>('disclaimer.credit_spending.enabled');
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const [ disclaimer, setDisclaimer ] = useState({ offerId: -1, accepted: false });

    if (!confirmation) return null;

    const { offer } = confirmation;
    const hasDisclaimer = (disclaimerEnabled === true) || (disclaimerEnabled === 'true');
    const accepted = (disclaimer.offerId === offer.offerId) && disclaimer.accepted;
    const kind = (getPurseHasClubLeft(clubSubscription) && clubSubscription.isVip) ? 'extension' : 'subscription';
    const unit = (offer.months === 0) ? 'days' : 'months';
    const subscriptionName = t(`catalog.vip.buy.confirm.${kind}.${unit}`, '', { [`num_${unit}`]: String((offer.months === 0) ? offer.extraDays : offer.months) });
    const endDate = t('catalog.vip.buy.confirm.end_date', '', { day: String(offer.day), month: String(offer.month), year: String(offer.year) });
    const cancel = () => cancelClubBuy(store);

    return (
        <Frame
            id="club-buy-confirmation"
            variant="3"
            centered
            rememberPosition={false}
            caption={t('catalog.club.buy.confirm')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            resizeDirection="none"
            margins={[ 3, 36, 3, 3 ]}
            onClose={cancel}
            layout={{ position: 'absolute', width: 369, height: 210 }}
        >
            <ReflectResize
                height={CONTENT_HEIGHT}
                layout={{ position: 'absolute', left: 0, top: 0, width: 362, flexDirection: 'column', gap: 10 }}
            >
                <Region layout={{ width: 354, minHeight: 60, paddingTop: 10, paddingLeft: 109, flexShrink: 0 }}>
                    <Icon
                        variant="18"
                        name="icon"
                        layout={{ position: 'absolute', left: 12, width: 85, top: 20, height: 40 }}
                    />
                    <Region layout={{ width: 245, flexDirection: 'column', gap: 3 }}>
                        <ThemeText
                            name="subscription_name"
                            text={subscriptionName}
                            textStyle="u_regular"
                            textOptions={{ fontSize: 16, wordWrap: true, wordWrapWidth: 241 }}
                            flashFormat={{ bold: true }}
                            verticalAlign="top"
                            layout={{ width: 245, flexShrink: 0 }}
                        />
                        <ThemeText
                            name="end_date"
                            text={endDate}
                            textStyle="u_regular"
                            textOptions={{ fontSize: 14, wordWrap: true, wordWrapWidth: 203 }}
                            clip
                            verticalAlign="top"
                            layout={{ width: 207, height: 20, flexShrink: 0 }}
                        />
                        <Region layout={{ flexDirection: 'row', flexShrink: 0 }}>
                            <ThemeText
                                text={t('catalog.purchase.confirmation.dialog.cost')}
                                textStyle="u_regular"
                                textOptions={{ fontSize: 14 }}
                                verticalAlign="top"
                                layout={{ marginTop: 1, flexShrink: 0 }}
                            />
                            <Region
                                name="purchase_cost_box"
                                layout={{ flexShrink: 0 }}
                            >
                                <CatalogClubPriceView
                                    priceCredits={offer.priceCredits}
                                    priceActivityPoints={offer.priceActivityPoints}
                                    activityPointType={offer.priceActivityPointType}
                                />
                            </Region>
                        </Region>
                    </Region>
                </Region>
                {hasDisclaimer && (
                    <Region
                        name="disclaimer"
                        layout={{ width: 353, minHeight: 17, flexShrink: 0 }}
                    >
                        <ThemeText
                            text={t('disclaimer.credit_spending')}
                            textStyle="u_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 318 }}
                            verticalAlign="top"
                            layout={{ marginLeft: 31, width: 322 }}
                        />
                        <CheckBox
                            variant="3"
                            name="spending_disclaimer"
                            selected={accepted}
                            onPointerTap={() => setDisclaimer({ offerId: offer.offerId, accepted: !accepted })}
                            layout={{ position: 'absolute', left: 11, width: 342, top: 0, height: 16 }}
                        />
                    </Region>
                )}
                <Region layout={{ width: 355, height: 27, flexShrink: 0 }}>
                    <Button
                        variant="3"
                        name="cancel_button"
                        onPointerTap={cancel}
                        layout={{ position: 'absolute', left: 9, width: 120, top: 0, height: 27 }}
                    >
                        {t('cancel')}
                    </Button>
                    <ButtonThick
                        variant="5"
                        name="select_button"
                        tintColor="#00aa00"
                        disabled={hasDisclaimer && !accepted}
                        onPointerTap={() => confirmClubBuy(send, store)}
                        layout={{ position: 'absolute', left: 235, width: 120, top: 0, height: 27 }}
                    >
                        {t('catalog.club.buy.subscribe')}
                    </ButtonThick>
                </Region>
            </ReflectResize>
        </Frame>
    );
};
