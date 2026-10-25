import { useState } from 'react';

import { hasBuilderSecondsLeft } from '#base/commands';
import { CatalogWidgetEventEnum, useCatalogRootNode, useCatalogStoreApi } from '#base/context/catalog';
import { useConfigValue } from '#base/context/system';
import { useCatalogNavigation, useCatalogNodeActions, useCatalogWidgetEvent } from '#base/hooks';
import { openWebPage } from '#base/utils';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { useCatalogWidgetView } from '../catalogWidgetView';

/**
 * The join / try buttons of the Builders Club front page - the `builderSubscriptionWidget`
 * container of `layout_builders_club_frontpage.xml`, Flash's `BuilderSubscriptionCatalogWidget`,
 * which attaches no view: it works on the layout's own children.
 *
 * `updateSubscriptionInfo`, on building and on every `CWE_BUILDER_SUBSCRIPTION_UPDATED`: a member
 * (seconds left), or a hotel whose Builders Club index has no `builders_club.try_page`, gets
 * `subscribe_button_big`; a trial user gets `try_button`. When the hotel names a membership page
 * (`builders_club.buy_membership_page`), `subscribe_button_sms` shows too - moved to where
 * `try_button` is when that is hidden - and replaces the big one. The small `subscribe_button` is
 * never shown.
 *
 * The join buttons open the hotel's subscription shop (`web.shop.subscription.relativeUrl`) or the
 * membership page in the browser (`HabboWebTools.openWebPageAndMinimizeClient`); the try button
 * opens the try page in this catalogue (`windowProcedure`).
 */
export const CatalogBuilderSubscriptionWidgetView = ({ page }: CatalogWidgetProps) => {
    const store = useCatalogStoreApi();
    const rootNode = useCatalogRootNode();
    const [ hasSecondsLeft, setHasSecondsLeft ] = useState(() => hasBuilderSecondsLeft(store));
    const buyMembershipPage = useConfigValue<string>('builders_club.buy_membership_page') ?? '';
    const tryPage = useConfigValue<string>('builders_club.try_page') ?? '';
    const subscriptionUrl = useConfigValue<string>('web.shop.subscription.relativeUrl') ?? '';
    const { getNodeByPageName } = useCatalogNodeActions();
    const { openPageByName } = useCatalogNavigation();

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.BUILDER_SUBSCRIPTION_UPDATED, () => setHasSecondsLeft(hasBuilderSecondsLeft(store)));

    const hasTryPage = !!rootNode && !!getNodeByPageName(tryPage, rootNode);

    let bigVisible = (hasSecondsLeft || !hasTryPage);
    const tryVisible = !bigVisible;
    const smsVisible = (buyMembershipPage !== '');

    if (smsVisible) bigVisible = false;

    const openSubscriptionShop = () => openWebPage(subscriptionUrl);

    useCatalogWidgetView({
        bindings: {
            subscribe_button_big: { visible: bigVisible, onPointerTap: openSubscriptionShop },
            subscribe_button: { visible: false, onPointerTap: openSubscriptionShop },
            try_button: { visible: tryVisible, onPointerTap: () => openPageByName(tryPage) },
            subscribe_button_sms: { visible: smsVisible, onPointerTap: () => openWebPage(buyMembershipPage) },
        },
        arrange: (smsVisible && !tryVisible)
            ? ({ find }) => {
                    const sms = find('subscribe_button_sms');
                    const tryButton = find('try_button');

                    if (sms && tryButton) {
                        sms.setX(tryButton.x);
                        sms.setY(tryButton.y);
                    }
                }
            : undefined,
    });

    return null;
};
