import { IRoomObjectUpdateMessage, RoomObjectPlaySoundIdEvent } from '@nitrodevco/nitro-api';

import { ObjectDataUpdateMessage } from '../../../messages';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

/**
 * Port of Flash `FurnitureCuckooClockLogic`, the logic `RoomObjectFactory` builds for
 * `furniture_cuckoo_clock`.
 */
export class FurnitureCuckooClockLogic extends FurnitureMultiStateLogic {
    private _state: number = -1;
    private _height: number | undefined = undefined;

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [ RoomObjectPlaySoundIdEvent.PLAY_SOUND_AT_PITCH ]);
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (message instanceof ObjectDataUpdateMessage) {
            // The pitch follows the height the clock was last sent to, not where a slide has it now.
            if (this._state !== -1 && message.state !== this._state)
                this.dispatchSoundEvent(this._height ?? this.object.location.z);

            this._state = message.state;
        } else if (message?.location) {
            // Flash also takes the missing location of a message that has none, and then fails on
            // the next chime; the last known height is kept here instead.
            this._height = message.location.z;
        }
    }

    private dispatchSoundEvent(height: number): void {
        const pitch = Math.pow(2, height - 1.2);

        this.handleRoomObjectEvent(
            new RoomObjectPlaySoundIdEvent(
                RoomObjectPlaySoundIdEvent.PLAY_SOUND_AT_PITCH,
                this.object,
                'FURNITURE_cuckoo_clock',
                pitch,
            ),
        );
    }
}
