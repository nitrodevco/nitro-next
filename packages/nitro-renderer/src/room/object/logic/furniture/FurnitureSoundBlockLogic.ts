import type { IAssetData, IRoomObjectUpdateMessage } from '@nitrodevco/nitro-api';
import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { RoomObjectSamplePlaybackEvent } from '@nitrodevco/nitro-events';

import { ObjectDataUpdateMessage } from '../../../messages';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureSoundBlockLogic extends FurnitureMultiStateLogic {
    private static HIGHEST_SEMITONE: number = 12;
    private static LOWEST_SEMITONE: number = -12;
    private static STATE_UNINITIALIZED: number = -1;

    private _state: number = -1;
    private _sampleId: number = -1;
    private _noPitch: boolean = false;
    private _lastLocZ: number = 0;

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [
            RoomObjectSamplePlaybackEvent.ROOM_OBJECT_INITIALIZED,
            RoomObjectSamplePlaybackEvent.ROOM_OBJECT_DISPOSED,
            RoomObjectSamplePlaybackEvent.PLAY_SAMPLE,
            RoomObjectSamplePlaybackEvent.CHANGE_PITCH,
        ]);
    }

    public override initialize(asset: IAssetData): void {
        super.initialize(asset);

        if (asset.logic && asset.logic.soundSample) {
            this._sampleId = asset.logic.soundSample.id as number;
            this._noPitch = asset.logic.soundSample.noPitch as boolean;
        }

        this.object.model.setValue(RoomObjectVariableEnum.FurnitureSoundblockRelativeAnimationSpeed, 1);
    }

    public override dispose(): void {
        if (this._state !== FurnitureSoundBlockLogic.STATE_UNINITIALIZED)
            this.dispatchEvent(
                new RoomObjectSamplePlaybackEvent(
                    RoomObjectSamplePlaybackEvent.ROOM_OBJECT_DISPOSED,
                    this.object,
                    this._sampleId,
                ),
            );

        super.dispose();
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (message instanceof ObjectDataUpdateMessage) {
            if (this.isRealRoomObject()) {
                if (this._state === FurnitureSoundBlockLogic.STATE_UNINITIALIZED) {
                    this._lastLocZ = this.object.location.z;

                    this.dispatchEvent(
                        new RoomObjectSamplePlaybackEvent(
                            RoomObjectSamplePlaybackEvent.ROOM_OBJECT_INITIALIZED,
                            this.object,
                            this._sampleId,
                            this.getPitchForHeight(this.object.location.z),
                        ),
                    );
                } else if (this._lastLocZ !== this.object.location.z) {
                    this._lastLocZ = this.object.location.z;

                    this.dispatchEvent(
                        new RoomObjectSamplePlaybackEvent(
                            RoomObjectSamplePlaybackEvent.CHANGE_PITCH,
                            this.object,
                            this._sampleId,
                            this.getPitchForHeight(this.object.location.z),
                        ),
                    );
                }
            }

            if (this._state !== FurnitureSoundBlockLogic.STATE_UNINITIALIZED && message.state !== this._state)
                this.playSoundAt(this.object.location.z);

            this._state = message.state;
        }
    }

    private playSoundAt(height: number): void {
        const pitch: number = this.getPitchForHeight(height);

        this.object.model.setValue(RoomObjectVariableEnum.FurnitureSoundblockRelativeAnimationSpeed, pitch);

        this.dispatchEvent(
            new RoomObjectSamplePlaybackEvent(
                RoomObjectSamplePlaybackEvent.PLAY_SAMPLE,
                this.object,
                this._sampleId,
                pitch,
            ),
        );
    }

    private getPitchForHeight(height: number): number {
        if (this._noPitch) return 1;

        let heightScaled: number = height * 2;

        if (heightScaled > FurnitureSoundBlockLogic.HIGHEST_SEMITONE) {
            heightScaled = Math.min(
                0,
                FurnitureSoundBlockLogic.LOWEST_SEMITONE +
                    (heightScaled - FurnitureSoundBlockLogic.HIGHEST_SEMITONE - 1),
            );
        }

        return Math.pow(2, heightScaled / 12);
    }
}
