import { RoomObjectEvent } from './RoomObjectEvent';

export class RoomObjectFurnitureActionEvent extends RoomObjectEvent {
    public static DICE_OFF: string = 'ROFCAE_DICE_OFF' as const;
    public static DICE_ACTIVATE: string = 'ROFCAE_DICE_ACTIVATE' as const;
    public static USE_HABBOWHEEL: string = 'ROFCAE_USE_HABBOWHEEL' as const;
    public static STICKIE: string = 'ROFCAE_STICKIE' as const;
    public static ENTER_ONEWAYDOOR: string = 'ROFCAE_ENTER_ONEWAYDOOR' as const;
    public static SOUND_MACHINE_INIT: string = 'ROFCAE_SOUND_MACHINE_INIT' as const;
    public static SOUND_MACHINE_START: string = 'ROFCAE_SOUND_MACHINE_START' as const;
    public static SOUND_MACHINE_STOP: string = 'ROFCAE_SOUND_MACHINE_STOP' as const;
    public static SOUND_MACHINE_DISPOSE: string = 'ROFCAE_SOUND_MACHINE_DISPOSE' as const;
    public static JUKEBOX_INIT: string = 'ROFCAE_JUKEBOX_INIT' as const;
    public static JUKEBOX_START: string = 'ROFCAE_JUKEBOX_START' as const;
    public static JUKEBOX_MACHINE_STOP: string = 'ROFCAE_JUKEBOX_MACHINE_STOP' as const;
    public static JUKEBOX_DISPOSE: string = 'ROFCAE_JUKEBOX_DISPOSE' as const;
    public static MOUSE_BUTTON: string = 'ROFCAE_MOUSE_BUTTON' as const;
    public static MOUSE_ARROW: string = 'ROFCAE_MOUSE_ARROW' as const;
}
