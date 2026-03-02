import {
    type IRoomObjectUpdateMessage,
    RoomObjectVariableEnum,
    RoomWidgetEnumItemExtradataParameter,
} from '@nitrodevco/nitro-api';
import {
    RoomObjectFurnitureActionEvent,
    RoomObjectStateChangedEvent,
    RoomObjectWidgetRequestEvent,
} from '@nitrodevco/nitro-shared';

import { ObjectDataUpdateMessage } from '../../../messages';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureJukeboxLogic extends FurnitureMultiStateLogic {
    private _disposeEventsAllowed: boolean = false;
    private _isInitialized: boolean = false;
    private _currentState: number = -1;

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [
            RoomObjectFurnitureActionEvent.JUKEBOX_START,
            RoomObjectFurnitureActionEvent.JUKEBOX_MACHINE_STOP,
            RoomObjectFurnitureActionEvent.JUKEBOX_DISPOSE,
            RoomObjectFurnitureActionEvent.JUKEBOX_INIT,
            RoomObjectWidgetRequestEvent.JUKEBOX_PLAYLIST_EDITOR,
        ]);
    }

    public override dispose(): void {
        this.requestDispose();

        super.dispose();
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (this.isRealRoomObject()) return;

        if (!this._isInitialized) this.requestInit();

        this.object.model.setValue<string>(
            RoomObjectVariableEnum.InfostandExtraParam,
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

    public override useObject(): void {
        this.handleRoomObjectEvent(
            new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.JUKEBOX_PLAYLIST_EDITOR, this.object),
        );
        this.handleRoomObjectEvent(
            new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_CHANGE, this.object, -1),
        );
    }

    private requestInit(): void {
        this._disposeEventsAllowed = true;

        this.handleRoomObjectEvent(
            new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.JUKEBOX_INIT, this.object),
        );

        this._isInitialized = true;
    }

    private requestPlayList(): void {
        this._disposeEventsAllowed = true;

        this.handleRoomObjectEvent(
            new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.JUKEBOX_START, this.object),
        );
    }

    private requestStopPlaying(): void {
        this.handleRoomObjectEvent(
            new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.JUKEBOX_MACHINE_STOP, this.object),
        );
    }

    private requestDispose(): void {
        if (!this._disposeEventsAllowed) return;

        this.handleRoomObjectEvent(
            new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.JUKEBOX_DISPOSE, this.object),
        );
    }
}
