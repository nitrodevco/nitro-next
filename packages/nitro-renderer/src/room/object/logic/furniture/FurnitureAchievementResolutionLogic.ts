import { type IRoomObjectUpdateMessage, RoomObjectVariable } from '@nitrodevco/nitro-api';
import { RoomObjectBadgeAssetEvent, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-events';

import { ObjectGroupBadgeUpdateMessage, ObjectSelectedMessage } from '../../../messages';
import { FurnitureBadgeDisplayLogic } from './FurnitureBadgeDisplayLogic';

export class FurnitureAchievementResolutionLogic extends FurnitureBadgeDisplayLogic {
    public static STATE_RESOLUTION_NOT_STARTED: number = 0;
    public static STATE_RESOLUTION_IN_PROGRESS: number = 1;
    public static STATE_RESOLUTION_ACHIEVED: number = 2;
    public static STATE_RESOLUTION_FAILED: number = 3;
    private static ACH_NOT_SET: string = 'ach_0';
    private static BADGE_VISIBLE_IN_STATE: number = 2;

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [
            RoomObjectWidgetRequestEvent.ACHIEVEMENT_RESOLUTION_OPEN,
            RoomObjectWidgetRequestEvent.ACHIEVEMENT_RESOLUTION_ENGRAVING,
            RoomObjectWidgetRequestEvent.ACHIEVEMENT_RESOLUTION_FAILED,
            RoomObjectBadgeAssetEvent.LOAD_BADGE,
        ]);
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (message instanceof ObjectGroupBadgeUpdateMessage) {
            if (message.assetName !== 'loading_icon') {
                this.object.model.setValue(
                    RoomObjectVariable.FURNITURE_BADGE_VISIBLE_IN_STATE,
                    FurnitureAchievementResolutionLogic.BADGE_VISIBLE_IN_STATE,
                );
            }
        }

        if (message instanceof ObjectSelectedMessage) {
            this.dispatchEvent(
                new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.CLOSE_FURNI_CONTEXT_MENU, this.object),
            );
        }
    }

    public override useObject(): void {
        switch (this.object.getState(0)) {
            case FurnitureAchievementResolutionLogic.STATE_RESOLUTION_NOT_STARTED:
            case FurnitureAchievementResolutionLogic.STATE_RESOLUTION_IN_PROGRESS:
                this.dispatchEvent(
                    new RoomObjectWidgetRequestEvent(
                        RoomObjectWidgetRequestEvent.ACHIEVEMENT_RESOLUTION_OPEN,
                        this.object,
                    ),
                );
                break;
            case FurnitureAchievementResolutionLogic.STATE_RESOLUTION_ACHIEVED:
                this.dispatchEvent(
                    new RoomObjectWidgetRequestEvent(
                        RoomObjectWidgetRequestEvent.ACHIEVEMENT_RESOLUTION_ENGRAVING,
                        this.object,
                    ),
                );
                break;
            case FurnitureAchievementResolutionLogic.STATE_RESOLUTION_FAILED:
                this.dispatchEvent(
                    new RoomObjectWidgetRequestEvent(
                        RoomObjectWidgetRequestEvent.ACHIEVEMENT_RESOLUTION_FAILED,
                        this.object,
                    ),
                );
                break;
        }
    }

    protected override updateBadge(badgeId: string): void {
        if (badgeId === FurnitureAchievementResolutionLogic.ACH_NOT_SET) return;

        super.updateBadge(badgeId);
    }
}
