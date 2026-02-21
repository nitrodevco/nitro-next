import type { IAssetData } from '@nitrodevco/nitro-api';
import { RoomObjectVariable } from '@nitrodevco/nitro-api';
import { RoomToObjectOwnAvatarMoveEvent } from '@nitrodevco/nitro-events';

import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureChangeStateWhenStepOnLogic extends FurnitureLogic {
    public override initialize(asset: IAssetData): void {
        super.initialize(asset);

        this.addEventListener<RoomToObjectOwnAvatarMoveEvent>(RoomToObjectOwnAvatarMoveEvent.ROAME_MOVE_TO, event => {
            const location = this.object.getLocation();
            const targetLocation = event.targetLocation;

            if (!targetLocation) return;

            let sizeX = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_SIZE_X);
            let sizeY = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_SIZE_Y);

            const direction = ((Math.floor(this.object.getDirection().x) + 45) % 360) / 90;

            if (direction === 1 || direction === 3) [sizeX, sizeY] = [sizeY, sizeX];

            if (
                targetLocation.x >= location.x &&
                targetLocation.x < location.x + sizeX &&
                targetLocation.y >= location.y &&
                targetLocation.y < location.y + sizeY
            ) {
                this.object.setState(1, 0);
            } else {
                this.object.setState(0, 0);
            }
        });
    }
}
