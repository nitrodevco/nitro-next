import { RoomObjectEvent, RoomObjectPlaySoundIdEvent, RoomObjectSamplePlaybackEvent } from '@nitrodevco/nitro-api';

import { GetSoundManager } from './HabboSoundManager';

/** The two event classes `handleRoomObjectSoundEvent` takes. A play sound event is a furniture action event too, so test this first. */
export const isRoomObjectSoundEvent = (event: RoomObjectEvent): event is RoomObjectSamplePlaybackEvent | RoomObjectPlaySoundIdEvent =>
    (event instanceof RoomObjectSamplePlaybackEvent) || (event instanceof RoomObjectPlaySoundIdEvent);

/**
 * A furniture logic asking for a sound - Flash's `RoomObjectEventHandler.handleRoomObjectSamplePlaybackEvent`
 * and `handleRoomObjectPlaySoundEvent`, which re-raised these as `RoomEngineObjectSamplePlaybackEvent`
 * / `RoomEngineObjectPlaySoundEvent` on the room engine's events for the sound manager to hear
 * (`FurniSamplePlaybackManager`'s four listeners, `HabboSoundManagerFlash10.onRoomEngineObjectPlaySound`).
 * The room's event handler hands them straight to the sound manager here; nothing else listened.
 *
 * The sound blocks (`FurnitureSoundBlockLogic`) send the sample events; the cuckoo clock
 * (`FurnitureCuckooClockLogic`) plays `FURNITURE_cuckoo_clock` at a pitch its height gives.
 */
export const handleRoomObjectSoundEvent = (event: RoomObjectSamplePlaybackEvent | RoomObjectPlaySoundIdEvent): void => {
    const soundManager = GetSoundManager();

    if (event instanceof RoomObjectPlaySoundIdEvent) {
        switch (event.type) {
            case RoomObjectPlaySoundIdEvent.PLAY_SOUND:
                soundManager.playSound(event.soundId);
                return;
            case RoomObjectPlaySoundIdEvent.PLAY_SOUND_AT_PITCH:
                soundManager.playSoundAtPitch(event.soundId, event.pitch);
                return;
        }

        return;
    }

    const furni = soundManager.furniSamplePlaybackManager;

    switch (event.type) {
        case RoomObjectSamplePlaybackEvent.ROOM_OBJECT_INITIALIZED:
            furni.onRoomObjectInitialized(event.objectId, event.sampleId, event.pitch);
            return;
        case RoomObjectSamplePlaybackEvent.ROOM_OBJECT_DISPOSED:
            furni.onRoomObjectDisposed(event.objectId);
            return;
        case RoomObjectSamplePlaybackEvent.PLAY_SAMPLE:
            furni.onRoomObjectPlaySample(event.objectId);
            return;
        case RoomObjectSamplePlaybackEvent.CHANGE_PITCH:
            furni.onRoomObjectChangeSamplePitch(event.objectId, event.pitch);
            return;
    }
};
