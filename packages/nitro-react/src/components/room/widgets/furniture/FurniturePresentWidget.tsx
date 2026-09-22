import { RoomObjectCategoryEnum, RoomObjectVariableEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { PresentOpenComposer } from '@nitrodevco/nitro-packets';

import { useCatalogPurchaseStore } from '#base/context/catalog-purchase';
import { useWebSocketContext } from '#base/context/communication';
import { useRoom, useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useWindowActions } from '#base/context/system';
import { useOwnUserId } from '#base/context/user';
import { FurniturePresentView } from '#base/views/room-widgets/furniture/FurniturePresentView';

import { PRESENT_OPENED_WIDGET, PresentOpenedData } from './furnitureWidgetData';

/**
 * A wrapped gift - the `showInterface` half of `PresentFurniWidget`. The note and the sender come
 * off the object (`FurniturePresentWidgetHandler`'s `RWPDUE_PACKAGEINFO`); only the person it was
 * placed for can open it or give a gift back (`controller`, the owner check Flash made). Whether
 * the sender is trusted (`FurniturePresentLogic` reads it off the gift's data) picks the banner and
 * the card.
 *
 * - `open_gift_button` (`sendOpen`): the card goes, the opened card is put up empty to wait for
 *   the contents (`§_-B28§`, `FurniturePresentOpenedWidget`), and the open is sent with the box's
 *   picking animation stopped.
 * - `give_gift_button` (`onGiveGift` -> `openGiftShop`), for a known sender: the sender becomes the
 *   catalogue's gift receiver (`HabboCatalog.giftReceiver`) and the `gift_shop` page opens; the
 *   card stays.
 */
export const FurniturePresentWidget = () => {
    const request = useRoomWidget(RoomObjectWidgetRequestEvent.PRESENT);
    const room = useRoom();
    const ownUserId = useOwnUserId();
    const setGiftReceiver = useCatalogPurchaseStore(x => x.setGiftReceiver);
    const { openRoomWidget, updateRoomWidgetData, closeRoomWidget } = useRoomWidgetActions();
    const { showWindow } = useWindowActions();
    const { send } = useWebSocketContext();

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.PRESENT);

    if (!request || !room) return null;

    const roomObject = room.getRoomObject(request.objectId, request.category);

    if (!roomObject) return null;

    const purchaserName = roomObject.model.getValue<string>(RoomObjectVariableEnum.FurniturePurchaserName) ?? '';
    const purchaserFigure = roomObject.model.getValue<string>(RoomObjectVariableEnum.FurniturePurchaserFigure) ?? '';
    const trustedSender = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureTrustedSender) === 1;
    const isController = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureOwnerId) === ownUserId;

    const onOpen = () => {
        if (!isController) return;

        openRoomWidget({ type: PRESENT_OPENED_WIDGET, objectId: -1, category: RoomObjectCategoryEnum.Floor, objectType: '' });
        updateRoomWidgetData(PRESENT_OPENED_WIDGET, { senderName: purchaserName, senderFigure: purchaserFigure, trustedSender } satisfies PresentOpenedData);
        onClose();

        send(new PresentOpenComposer({ objectId: request.objectId }));
        // `FurniturePresentWidgetHandler`'s `RWPOM_OPEN_PRESENT`: the pick-up animation stops the
        // moment the box is opened, so the reveal is not interrupted by the furni being tidied
        // away underneath it.
        roomObject.model.setValue(RoomObjectVariableEnum.FurnitureDisablePickingAnimation, 1);
    };

    const onGiveGift = () => {
        if (purchaserName.length) setGiftReceiver(purchaserName);

        showWindow('catalog', { pageName: 'gift_shop' });
    };

    return (
        <FurniturePresentView
            message={roomObject.model.getValue<string>(RoomObjectVariableEnum.FurnitureData) ?? ''}
            purchaserName={purchaserName}
            purchaserFigure={purchaserFigure}
            trustedSender={trustedSender}
            canOpen={isController}
            canGiveGift={isController && !!purchaserName.length}
            onOpen={onOpen}
            onGiveGift={onGiveGift}
            onClose={onClose}
        />
    );
};
