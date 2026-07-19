import type { IRoomObjectUpdateMessage, IVector3D } from '@nitrodevco/nitro-api';
import { LegacyDataType, Vector3d } from '@nitrodevco/nitro-api';

import { ObjectDataUpdateMessage, ObjectMoveUpdateMessage } from '../../../messages';
import { MovingObjectLogic } from '../MovingObjectLogic';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurniturePushableLogic extends FurnitureMultiStateLogic {
    private static ANIMATION_NOT_MOVING: number = 0;
    private static ANIMATION_MOVING: number = 1;
    private static MAX_ANIMATION_COUNT: number = 10;

    private _oldLocation: IVector3D = new Vector3d();

    constructor() {
        super();

        this.updateInterval = MovingObjectLogic.DEFAULT_UPDATE_INTERVAL;
    }

    public override update(time: number): void {
        this._oldLocation.assign(this.object.getLocation());

        super.update(time);

        if (Vector3d.dif(this.object.getLocation(), this._oldLocation).length !== 0) return;

        if (this.object.getState(0) !== FurniturePushableLogic.ANIMATION_NOT_MOVING)
            this.object.setState(FurniturePushableLogic.ANIMATION_NOT_MOVING, 0);
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        if (!message) return;

        const isMoveMessage = message instanceof ObjectMoveUpdateMessage;

        if (!isMoveMessage && message.location) {
            const location = this.object.getLocation();
            const difference = Vector3d.dif(message.location, location);

            if (Math.abs(difference.x) < 2 && Math.abs(difference.y) < 2) {
                let prevLocation = location;

                if (Math.abs(difference.x) > 1 || Math.abs(difference.y) > 1)
                    prevLocation = Vector3d.sum(location, Vector3d.product(difference, 0.5));

                super.processUpdateMessage(
                    new ObjectMoveUpdateMessage(prevLocation, message.location, message.direction),
                );

                return;
            }

            super.processUpdateMessage(
                new ObjectMoveUpdateMessage(message.location, message.location, message.direction),
            );
        }

        if (message instanceof ObjectDataUpdateMessage) {
            if (message.state > 0) {
                this.updateInterval =
                    MovingObjectLogic.DEFAULT_UPDATE_INTERVAL / this.getUpdateIntervalValue(message.state);
            } else {
                this.updateInterval = 1;
            }

            const animation = this.getAnimationValue(message.state);

            if (animation !== message.state) {
                const legacyStuff = new LegacyDataType();

                legacyStuff.setString(animation.toString());

                message = new ObjectDataUpdateMessage(animation, legacyStuff, message.extra);
            }
        }

        super.processUpdateMessage(message);
    }

    protected getUpdateIntervalValue(value: number) {
        return value / FurniturePushableLogic.MAX_ANIMATION_COUNT;
    }

    protected getAnimationValue(value: number) {
        return value % FurniturePushableLogic.MAX_ANIMATION_COUNT;
    }
}
