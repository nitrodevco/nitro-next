import { IPurchasableOffer } from '@nitrodevco/nitro-api';
import { useEffect, useRef } from 'react';

import { APPROVE_NAME_TYPE_PET, approveName, purchaseWillBeGift, showPurchaseConfirmation } from '#base/commands';
import { CatalogPage, CatalogWidgetEventEnum, PetImageRequest, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation, useWindowActions } from '#base/context/system';
import { useCatalogWidgetEvent } from '#base/hooks';
import { PET_NAME_ERRORS } from '#base/utils';

interface PetNamePurchaseOptions {
    /** Whether this widget runs the page - the other pet widget's `init()` failed. */
    initialised: boolean;
    name: string;
    offer: IPurchasableOffer | undefined;
    /** `getPurchaseParameters`: the extra parameter, or '' - having alerted when the name is empty. */
    getPurchaseParameters: () => string;
    /** `getPetImage()`, which the purchase confirmation shows the pet as picked with. */
    getPetImageRequest: () => PetImageRequest | undefined;
}

/**
 * The name approval the buy button goes through on a pet page - identical in Flash's
 * `PetsCatalogWidget` and `NewPetsCatalogWidget`: `onPurchase` sends `approveName(name, 1)`
 * (once the purchase parameters are good), and `CWE_APPROVE_RESULT` either alerts why the name was
 * refused (`constructErrorMessage`: the reason's text, or its `.additionalInfo` text when the
 * server said more) or opens the purchase confirmation with the extra parameter. Returns
 * `overridePurchase`, which takes the buy button over (`CatalogWidgetPurchaseOverrideEvent`).
 */
export const usePetNamePurchase = (page: CatalogPage, { initialised, name, offer, getPurchaseParameters, getPetImageRequest }: PetNamePurchaseOptions) => {
    const waitingForApproval = useRef(false);
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const { showAlert } = useWindowActions();
    const t = useTranslation();

    const onPurchase = () => {
        if (getPurchaseParameters() === '') return;

        waitingForApproval.current = true;

        approveName(send, name, APPROVE_NAME_TYPE_PET);
    };

    const onPurchaseRef = useRef(onPurchase);

    useEffect(() => {
        onPurchaseRef.current = onPurchase;
    });

    const constructErrorMessage = (reason: string, nameValidationInfo: string) => {
        const key = `catalog.alert.petname.${reason}`;
        const additionalInfo = t(`${key}.additionalInfo`, '', { additional_info: nameValidationInfo });

        return (nameValidationInfo.length && additionalInfo.length) ? additionalInfo : t(key);
    };

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.APPROVE_NAME_RESULT, (event) => {
        if (!initialised || !waitingForApproval.current) return;

        waitingForApproval.current = false;

        if (event.result !== 0) purchaseWillBeGift(store, false);

        const reason = PET_NAME_ERRORS[event.result];

        if (reason) {
            showAlert(t('catalog.alert.purchaseerror.title'), constructErrorMessage(reason, event.nameValidationInfo));

            return;
        }

        const extraParameter = getPurchaseParameters();

        if ((extraParameter === '') || !offer) return;

        // Flash passes `getPetImage()` as the eighth argument: the dialog shows the pet as picked.
        showPurchaseConfirmation(store, offer, page.pageId, extraParameter, 1, undefined, undefined, getPetImageRequest());
    });

    return {
        overridePurchase: () => page.events.dispatchEvent({ type: CatalogWidgetEventEnum.PURCHASE_OVERRIDE, callback: () => onPurchaseRef.current() }),
    };
};
