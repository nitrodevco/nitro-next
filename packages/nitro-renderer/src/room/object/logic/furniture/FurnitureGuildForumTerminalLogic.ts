import { RoomObjectVariableEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';

import { FurnitureGuildCustomizedLogic } from './FurnitureGuildCustomizedLogic';

/**
 * Port of Flash's obfuscated `§_-H2A§`, the logic `RoomObjectFactory` builds for
 * `furniture_group_forum_terminal`.
 */
export class FurnitureGuildForumTerminalLogic extends FurnitureGuildCustomizedLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [ RoomObjectWidgetRequestEvent.INTERNAL_LINK ]);
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(
            new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.INTERNAL_LINK, this.object),
        );

        super.useObject();
    }

    protected override updateGroupId(id: string): void {
        super.updateGroupId(id);

        this.object.model.setValue(RoomObjectVariableEnum.FurnitureInternalLink, `groupforum/${id}`);
    }
}
