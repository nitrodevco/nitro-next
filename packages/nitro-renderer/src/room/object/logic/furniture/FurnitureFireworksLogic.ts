import type { IAssetData, IParticleSystem, IRoomGeometry, IRoomSpriteMouseEvent } from '@nitrodevco/nitro-api';
import { MouseEventType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { RoomObjectStateChangedEvent } from '@nitrodevco/nitro-events';

import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureFireworksLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectStateChangedEvent.STATE_CHANGE]);
    }

    public override initialize(asset: IAssetData): void {
        super.initialize(asset);

        if (asset.logic && asset.logic.particleSystems && asset.logic.particleSystems.length)
            this.object.model.setValue<IParticleSystem[]>(
                RoomObjectVariableEnum.FurnitureFireworksData,
                asset.logic.particleSystems,
            );
    }

    public override mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry): void {
        if (!event || !geometry) return;

        switch (event.type) {
            case MouseEventType.DOUBLE_CLICK:
                switch (event.spriteTag) {
                    case 'start_stop':
                        this.dispatchEvent(
                            new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_CHANGE, this.object, 1),
                        );
                        return;
                    case 'reset':
                        this.dispatchEvent(
                            new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_CHANGE, this.object, 2),
                        );
                        return;
                }
                break;
        }

        super.mouseEvent(event, geometry);
    }

    public override useObject(): void {
        this.dispatchEvent(new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_CHANGE, this.object, 0));
    }
}
