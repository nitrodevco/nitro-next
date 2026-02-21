import type { IRoomObjectUpdateMessage } from '@nitrodevco/nitro-api';
import { RoomWidgetEnumItemExtradataParameter } from '@nitrodevco/nitro-api';
import { RoomObjectFurnitureActionEvent } from '@nitrodevco/nitro-events';

import { ObjectDataUpdateMessage } from '../../../messages';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureSoundMachineLogic extends FurnitureMultiStateLogic {
    private _disposeEventsAllowed: boolean = false;
    private _isInitialized: boolean = false;
    private _currentState: number = -1;

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [
            RoomObjectFurnitureActionEvent.SOUND_MACHINE_START,
            RoomObjectFurnitureActionEvent.SOUND_MACHINE_STOP,
            RoomObjectFurnitureActionEvent.SOUND_MACHINE_DISPOSE,
            RoomObjectFurnitureActionEvent.SOUND_MACHINE_INIT,
        ]);
    }

    public override dispose(): void {
        this.requestDispose();

        super.dispose();
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (!this.isRealRoomObject()) return;

        if (!this._isInitialized) this.requestInit();

        this.object.model.setValue<string>(
            RoomWidgetEnumItemExtradataParameter.INFOSTAND_EXTRA_PARAM,
            RoomWidgetEnumItemExtradataParameter.JUKEBOX,
        );

        if (message instanceof ObjectDataUpdateMessage) {
            const state = this.object.getState(0);

            if (state !== this._currentState) {
                this._currentState = state;

                if (state === 1) this.requestPlayList();
                else if (state === 0) this.requestStopPlaying();
            }
        }
    }

    private requestInit(): void {
        this._disposeEventsAllowed = true;

        this.dispatchEvent(
            new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.SOUND_MACHINE_INIT, this.object),
        );

        this._isInitialized = true;
    }

    private requestPlayList(): void {
        this._disposeEventsAllowed = true;

        this.dispatchEvent(
            new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.SOUND_MACHINE_START, this.object),
        );
    }

    private requestStopPlaying(): void {
        this.dispatchEvent(
            new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.SOUND_MACHINE_STOP, this.object),
        );
    }

    private requestDispose(): void {
        this.dispatchEvent(
            new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.SOUND_MACHINE_DISPOSE, this.object),
        );
    }
}
