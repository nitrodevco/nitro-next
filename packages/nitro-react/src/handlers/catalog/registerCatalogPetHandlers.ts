/**
 * The pet packets `HabboCatalog` listens to for the pet pages - `onApproveNameResult` and
 * `onSellablePalettes`.
 *
 * - `ApproveNameMessage` goes to the open page as `CatalogWidgetApproveNameResultEvent`; the pet
 *   widget that asked (`PetsCatalogWidget` / `NewPetsCatalogWidget`, waiting on its approval)
 *   alerts or opens the purchase confirmation.
 * - `SellablePetPalettesMessage` replaces the product code's row of `_sellablePetPalettes`
 *   (`CatalogPetSlice`) and, with a page on show, goes to it as
 *   `CatalogWidgetSellablePetPalettesEvent`.
 */
import { ApproveNameMessage, SellablePetPalettesMessage } from '@nitrodevco/nitro-packets';
import { StoreApi } from 'zustand';

import { CatalogStore, CatalogWidgetEventEnum } from '#base/context/catalog';
import { WebSocketConnection } from '#base/context/communication';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerCatalogPetHandlers = (store: StoreApi<CatalogStore>, { subscribe }: WebSocketConnection) => {
    const { setSellablePetPalettes } = store.getState();

    return subscribeAll(subscribe, [
        on(ApproveNameMessage, data => store.getState().activePage?.dispatchWidgetEvent({ type: CatalogWidgetEventEnum.APPROVE_NAME_RESULT, result: data.result, nameValidationInfo: data.nameValidationInfo })),

        on(SellablePetPalettesMessage, (data) => {
            setSellablePetPalettes(data.productCode, data.sellablePalettes.slice());

            store.getState().activePage?.dispatchWidgetEvent({ type: CatalogWidgetEventEnum.SELLABLE_PET_PALETTES, productCode: data.productCode, sellablePalettes: data.sellablePalettes.slice() });
        }),
    ]);
};
