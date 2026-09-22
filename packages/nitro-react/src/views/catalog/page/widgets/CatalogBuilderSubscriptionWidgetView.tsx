import { useState } from 'react';

import { hasBuilderSecondsLeft } from '#base/commands';
import { CatalogWidgetEventEnum, useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useConfigValue, useTranslation } from '#base/context/system';
import { useCatalogNavigation, useCatalogNodeActions, useCatalogWidgetEvent } from '#base/hooks';
import { ButtonThick } from '#base/theme';

import { CatalogWidgetProps } from '../CatalogPageRegistry';

/** Where `subscribe_button_sms` moves to when the try button is hidden: `try_button`'s own position. */
const TRY_BUTTON_POSITION = { left: 25, top: 60 };
const SMS_BUTTON_POSITION = { left: 195, top: 20 };

/**
 * The join / try buttons of the Builders Club front page - the `builderSubscriptionWidget`
 * container of `layout_builders_club_frontpage.xml`, Flash's `BuilderSubscriptionCatalogWidget`,
 * drawn from the layout's own children (it attaches no view).
 *
 * `updateSubscriptionInfo`, on building and on every `CWE_BUILDER_SUBSCRIPTION_UPDATED`: a member
 * (seconds left), or a hotel whose Builders Club index has no `builders_club.try_page`, gets the big
 * join button; a trial user gets the try button. When the hotel names a membership page
 * (`builders_club.buy_membership_page`), the sms join button shows too - where the try button is
 * when that is hidden - and replaces the big one. The small `subscribe_button` is never shown.
 *
 * The join buttons open the hotel's subscription shop (`web.shop.subscription.relativeUrl`) or the
 * membership page in the browser (`HabboWebTools.openWebPageAndMinimizeClient`); the try button
 * opens the try page in this catalogue.
 */
export const CatalogBuilderSubscriptionWidgetView = ({ page }: CatalogWidgetProps) => {
    const store = useCatalogStoreApi();
    const rootNode = useCatalogStore(x => x.rootNode);
    const [ hasSecondsLeft, setHasSecondsLeft ] = useState(() => hasBuilderSecondsLeft(store));
    const buyMembershipPage = useConfigValue<string>('builders_club.buy_membership_page') ?? '';
    const tryPage = useConfigValue<string>('builders_club.try_page') ?? '';
    const subscriptionUrl = useConfigValue<string>('web.shop.subscription.relativeUrl') ?? '';
    const { getNodeByPageName } = useCatalogNodeActions();
    const { openPageByName } = useCatalogNavigation();
    const t = useTranslation();

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.BUILDER_SUBSCRIPTION_UPDATED, () => setHasSecondsLeft(hasBuilderSecondsLeft(store)));

    const hasTryPage = !!rootNode && !!getNodeByPageName(tryPage, rootNode);

    let bigVisible = (hasSecondsLeft || !hasTryPage);
    const tryVisible = !bigVisible;
    const smsVisible = (buyMembershipPage !== '');

    if (smsVisible) bigVisible = false;

    const smsPosition = tryVisible ? SMS_BUTTON_POSITION : TRY_BUTTON_POSITION;
    const openSubscriptionShop = () => window.open(subscriptionUrl, '_blank', 'noopener');

    return (
        <>
            {bigVisible && (
                <ButtonThick
                    variant="5"
                    name="subscribe_button_big"
                    tintColor="#0a9bc5"
                    onPointerTap={openSubscriptionShop}
                    layout={{ position: 'absolute', left: 90, width: 180, top: 40, height: 50, minWidth: 180, maxWidth: 180 }}
                >
                    {t('builder.front_page.join')}
                </ButtonThick>
            )}
            {tryVisible && (
                <ButtonThick
                    variant="5"
                    name="try_button"
                    tintColor="#dda100"
                    onPointerTap={() => openPageByName(tryPage)}
                    layout={{ position: 'absolute', left: TRY_BUTTON_POSITION.left, width: 140, top: TRY_BUTTON_POSITION.top, height: 30, minWidth: 140, maxWidth: 140 }}
                >
                    {t('builder.front_page.try')}
                </ButtonThick>
            )}
            {smsVisible && (
                <ButtonThick
                    variant="5"
                    name="subscribe_button_sms"
                    tintColor="#0a9bc5"
                    onPointerTap={() => window.open(buyMembershipPage, '_blank', 'noopener')}
                    layout={{ position: 'absolute', left: smsPosition.left, width: 140, top: smsPosition.top, height: 30, minWidth: 140, maxWidth: 140 }}
                >
                    {t('builder.front_page.join.sms')}
                </ButtonThick>
            )}
        </>
    );
};
