import type { IAssetData, IRoomObjectUpdateMessage, StringDataType } from '@nitrodevco/nitro-api';
import { ContextMenuEnum, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-shared';

import { ObjectDataUpdateMessage } from '../../../messages';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureFriendFurniLogic extends FurnitureMultiStateLogic {
    private static readonly STATE_UNINITIALIZED: number = -1;
    private static readonly STATE_UNLOCKED: number = 0;
    private static readonly STATE_LOCKED: number = 1;

    private _state: number = -1;

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectWidgetRequestEvent.FRIEND_FURNITURE_ENGRAVING]);
    }

    public override initialize(asset: IAssetData | undefined): void {
        super.initialize(asset);

        this.object.model.setValue(RoomObjectVariableEnum.FurnitureFriendfurniEngraving, this.engravingDialogType);
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        if (message instanceof ObjectDataUpdateMessage) {
            const data = message.data as StringDataType;

            if (data) {
                this._state = data.state;
            } else {
                this._state = message.state;
            }
        }

        super.processUpdateMessage(message);
    }

    public override useObject(): void {
        if (this._state === FurnitureFriendFurniLogic.STATE_LOCKED) {
            this.handleRoomObjectEvent(
                new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.FRIEND_FURNITURE_ENGRAVING, this.object),
            );

            return;
        }

        super.useObject();
    }

    public get engravingDialogType(): number {
        return 0;
    }

    public override get contextMenu(): string {
        return this._state === FurnitureFriendFurniLogic.STATE_UNLOCKED
            ? ContextMenuEnum.FRIEND_FURNITURE
            : ContextMenuEnum.DUMMY;
    }
}
