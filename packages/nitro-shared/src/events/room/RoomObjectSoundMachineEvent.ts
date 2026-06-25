import { RoomEngineObjectEvent } from './RoomEngineObjectEvent';

export class RoomObjectSoundMachineEvent extends RoomEngineObjectEvent {
    public static SOUND_MACHINE_INIT: string = 'ROSM_SOUND_MACHINE_INIT' as const;
    public static SOUND_MACHINE_SWITCHED_ON: string = 'ROSM_SOUND_MACHINE_SWITCHED_ON' as const;
    public static SOUND_MACHINE_SWITCHED_OFF: string = 'ROSM_SOUND_MACHINE_SWITCHED_OFF' as const;
    public static SOUND_MACHINE_DISPOSE: string = 'ROSM_SOUND_MACHINE_DISPOSE' as const;
    public static JUKEBOX_INIT: string = 'ROSM_JUKEBOX_INIT' as const;
    public static JUKEBOX_SWITCHED_ON: string = 'ROSM_JUKEBOX_SWITCHED_ON' as const;
    public static JUKEBOX_SWITCHED_OFF: string = 'ROSM_JUKEBOX_SWITCHED_OFF' as const;
    public static JUKEBOX_DISPOSE: string = 'ROSM_JUKEBOX_DISPOSE' as const;
}
