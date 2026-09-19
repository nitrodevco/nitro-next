import { IRoomChatSettings, IRoomModerationSettings, RoomChatFloodSensitivityType, RoomControllerLevelEnum, RoomDoorModeEnum, RoomModerationType, RoomTradeModeEnum } from '@nitrodevco/nitro-api';
import { StateCreator } from 'zustand';

type State = {
    doorMode: RoomDoorModeEnum;
    tradeMode: RoomTradeModeEnum;
    controllerLevel: RoomControllerLevelEnum;
    ownRoomIndex: number;
    allowPets: boolean;
    isGuildRoom: boolean;
    isRoomOwner: boolean;
    isDecorating: boolean;
    isSpectator: boolean;
    isPlayingGame: boolean;
    isMoveBlocked: boolean;
    isOwnDancing: boolean;
    /** The room's wired configuration items forbid passing and dropping hand items. */
    isHanditemControlBlocked: boolean;
    /** The room's wired configuration items let anyone move and use any furni. */
    isFreeFurniMovementsMode: boolean;
    moderationSettings: IRoomModerationSettings;
    chatSettings: IRoomChatSettings;
};

type Actions = {
    setDoorMode: (mode: RoomDoorModeEnum) => void;
    setTradeMode: (mode: RoomTradeModeEnum) => void;
    setControllerLevel: (level: RoomControllerLevelEnum) => void;
    setOwnRoomIndex: (index: number) => void;
    setAllowPets: (flag: boolean) => void;
    setIsGuildRoom: (flag: boolean) => void;
    setIsRoomOwner: (flag: boolean) => void;
    setIsDecorating: (flag: boolean) => void;
    setIsSpectator: (flag: boolean) => void;
    setIsPlayingGame: (flag: boolean) => void;
    setIsOwnDancing: (flag: boolean) => void;
    setIsHanditemControlBlocked: (flag: boolean) => void;
    setIsFreeFurniMovementsMode: (flag: boolean) => void;
    setModerationSettings: (settings: IRoomModerationSettings) => void;
    setChatSettings: (settings: IRoomChatSettings) => void;
};

/**
 * Your session in the room - Flash's `RoomSession`: rights and ownership, the modes the room
 * runs in (door, trade, pets), and the moderation and chat settings the widgets gate on.
 */
export const RoomSessionSliceInitialState: State = {
    doorMode: RoomDoorModeEnum.Open,
    tradeMode: RoomTradeModeEnum.Disabled,
    allowPets: false,
    // Nobody has rights until the server says so - `YouAreControllerMessage` on entry.
    controllerLevel: RoomControllerLevelEnum.None,
    ownRoomIndex: -1,
    isGuildRoom: false,
    isRoomOwner: false,
    isDecorating: false,
    isSpectator: false,
    isPlayingGame: false,
    isMoveBlocked: false,
    isOwnDancing: false,
    isHanditemControlBlocked: false,
    isFreeFurniMovementsMode: false,
    moderationSettings: {
        whoCanMute: RoomModerationType.None,
        whoCanKick: RoomModerationType.None,
        whoCanBan: RoomModerationType.None,
    },
    chatSettings: {
        floodSensitivity: RoomChatFloodSensitivityType.Normal,
    },
};

export type RoomSessionSlice = State & Actions;

export const createRoomSessionSlice: StateCreator<RoomSessionSlice, [], [], RoomSessionSlice> = (set, get, store) => ({
    ...RoomSessionSliceInitialState,
    setDoorMode: (mode: RoomDoorModeEnum) => set({ doorMode: mode }),
    setTradeMode: (mode: RoomTradeModeEnum) => set({ tradeMode: mode }),
    setControllerLevel: (level: RoomControllerLevelEnum) => set({ controllerLevel: level }),
    setOwnRoomIndex: (index: number) => set({ ownRoomIndex: index }),
    setAllowPets: (flag: boolean) => set({ allowPets: flag }),
    setIsGuildRoom: (flag: boolean) => set({ isGuildRoom: flag }),
    setIsRoomOwner: (flag: boolean) => set({ isRoomOwner: flag }),
    setIsDecorating: (flag: boolean) => set({ isDecorating: flag }),
    setIsSpectator: (flag: boolean) => set({ isSpectator: flag }),
    setIsPlayingGame: (flag: boolean) => set({ isPlayingGame: flag }),
    setIsOwnDancing: (flag: boolean) => set({ isOwnDancing: flag }),
    setIsHanditemControlBlocked: (flag: boolean) => set({ isHanditemControlBlocked: flag }),
    setIsFreeFurniMovementsMode: (flag: boolean) => set({ isFreeFurniMovementsMode: flag }),
    setModerationSettings: (settings: IRoomModerationSettings) => set({ moderationSettings: { ...settings } }),
    setChatSettings: (settings: IRoomChatSettings) => set({ chatSettings: { ...settings } }),
});
