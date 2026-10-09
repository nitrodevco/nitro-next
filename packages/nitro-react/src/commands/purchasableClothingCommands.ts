/**
 * Binding clothing furni - the half of Flash's `FurnitureContextMenuWidgetHandler` that outlives
 * `PurchasableClothingConfirmationView`: `redeemPurchasableClothing` sends the redeem and remembers
 * the figure the dialog showed, and `onFigureSetIds` puts that figure on once the server's
 * `FigureSetIdsMessage` lists the furni among the bound ones, within
 * `PENDING_PURCHASABLE_CLOTHING_TIMEOUT_MS` of the redeem. Any other `FigureSetIdsMessage` is only
 * the avatar editor's.
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { CustomizeAvatarWithFurniComposer, UpdateFigureDataComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';

type Send = WebSocketConnection['send'];

/** `PENDING_PURCHASABLE_CLOTHING_TIMEOUT_MS`. */
const PENDING_TIMEOUT_MS = 5000;

type PendingRedeem = {
    furniName: string;
    figure: string;
    gender: AvatarGenderType;
    sentAt: number;
};

let pending: PendingRedeem | null = null;

/** `redeemPurchasableClothing(objectId, className, figure, gender)`. */
export const redeemPurchasableClothing = (send: Send, objectId: number, furniName: string, figure: string, gender: AvatarGenderType) => {
    pending = { furniName, figure, gender, sentAt: Date.now() };

    send(new CustomizeAvatarWithFurniComposer({ itemId: objectId }));
};

/**
 * `onFigureSetIds`: a stale request is dropped; a fresh one waits until the bound names include
 * its furni, then the figure goes on (`UpdateFigureDataMessageComposer`).
 */
export const onPurchasableClothingFigureSetIds = (send: Send, boundFurnitureNames: string[]) => {
    if (!pending) return;

    if ((Date.now() - pending.sentAt) > PENDING_TIMEOUT_MS) {
        pending = null;

        return;
    }

    if (boundFurnitureNames.indexOf(pending.furniName) === -1) return;

    send(new UpdateFigureDataComposer({ figure: pending.figure, gender: pending.gender }));

    pending = null;
};
