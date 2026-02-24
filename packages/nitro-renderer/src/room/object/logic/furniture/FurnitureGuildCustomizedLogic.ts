import type { IRoomGeometry, IRoomObjectUpdateMessage, IRoomSpriteMouseEvent } from '@nitrodevco/nitro-api';
import { MouseEventType, RoomObjectVariableEnum, StringDataType } from '@nitrodevco/nitro-api';
import { RoomObjectBadgeAssetEvent, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-shared';

import { GetTickerTime } from '../../../../utils';
import { ObjectDataUpdateMessage, ObjectGroupBadgeUpdateMessage, ObjectSelectedMessage } from '../../../messages';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureGuildCustomizedLogic extends FurnitureMultiStateLogic {
    public static GROUPID_KEY: number = 1;
    public static BADGE_KEY: number = 2;
    public static COLOR1_KEY: number = 3;
    public static COLOR2_KEY: number = 4;

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [
            RoomObjectBadgeAssetEvent.LOAD_BADGE,
            RoomObjectWidgetRequestEvent.GUILD_FURNI_CONTEXT_MENU,
            RoomObjectWidgetRequestEvent.CLOSE_FURNI_CONTEXT_MENU,
        ]);
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (message instanceof ObjectDataUpdateMessage) {
            const data = message.data;

            if (data instanceof StringDataType) {
                this.updateGroupId(data.getValue(FurnitureGuildCustomizedLogic.GROUPID_KEY));
                this.updateBadge(data.getValue(FurnitureGuildCustomizedLogic.BADGE_KEY));
                this.updateColors(
                    data.getValue(FurnitureGuildCustomizedLogic.COLOR1_KEY),
                    data.getValue(FurnitureGuildCustomizedLogic.COLOR2_KEY),
                );
            }

            return;
        }

        if (message instanceof ObjectGroupBadgeUpdateMessage) {
            if (message.assetName !== 'loading_icon') {
                this.object.model.setValue(RoomObjectVariableEnum.FurnitureGuildCustomizedAssetName, message.assetName);

                this.update(GetTickerTime());
            }

            return;
        }

        if (message instanceof ObjectSelectedMessage) {
            if (!message.selected)
                this.dispatchEvent(
                    new RoomObjectWidgetRequestEvent(
                        RoomObjectWidgetRequestEvent.CLOSE_FURNI_CONTEXT_MENU,
                        this.object,
                    ),
                );

            return;
        }
    }

    public override mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry): void {
        if (!event || !geometry) return;

        switch (event.type) {
            case MouseEventType.MOUSE_CLICK:
                this.openContextMenu();
        }

        super.mouseEvent(event, geometry);
    }

    protected updateGroupId(id: string): void {
        this.object.model.setValue(RoomObjectVariableEnum.FurnitureGuildCustomizedGuildId, parseInt(id));
    }

    private updateBadge(badge: string): void {
        this.dispatchEvent(
            new RoomObjectBadgeAssetEvent(RoomObjectBadgeAssetEvent.LOAD_BADGE, this.object, badge, true),
        );
    }

    public updateColors(color1: string, color2: string): void {
        this.object.model.setValue(RoomObjectVariableEnum.FurnitureGuildCustomizedColor1, parseInt(color1, 16));
        this.object.model.setValue(RoomObjectVariableEnum.FurnitureGuildCustomizedColor2, parseInt(color2, 16));
    }

    private openContextMenu(): void {
        this.dispatchEvent(
            new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.GUILD_FURNI_CONTEXT_MENU, this.object),
        );
    }
}
