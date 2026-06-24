import { RoomControllerLevelEnum, RoomDoorModeEnum, RoomTradeModeEnum } from "@nitrodevco/nitro-api";
import type { StateCreator } from "zustand";

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
}

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
};

export const RoomSessionSliceInitialState: State = {
    doorMode: RoomDoorModeEnum.Open,
    tradeMode: RoomTradeModeEnum.Disabled,
    allowPets: false,
    controllerLevel: RoomControllerLevelEnum.Moderator,
    ownRoomIndex: -1,
    isGuildRoom: false,
    isRoomOwner: false,
    isDecorating: false,
    isSpectator: false,
    isPlayingGame: false,
    isMoveBlocked: false
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
});