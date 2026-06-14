import { RoomControllerLevelEnum, RoomDoorModeEnum, RoomTradeModeEnum } from "@nitrodevco/nitro-api";
import type { StateCreator } from "zustand";

type State = {
    doorMode: RoomDoorModeEnum;
    tradeMode: RoomTradeModeEnum;
    controllerLevel: RoomControllerLevelEnum;
    ownRoomIndex: number;
    isGuildRoom: boolean;
    isRoomOwner: boolean;
    isDecorating: boolean;
    isSpectator: boolean;
    isPlayingGame: boolean;
}

type Actions = {
    setDoorMode: (mode: RoomDoorModeEnum) => void;
    setTradeMode: (mode: RoomTradeModeEnum) => void;
    setControllerLevel: (level: RoomControllerLevelEnum) => void;
    setOwnRoomIndex: (index: number) => void;
    setIsGuildRoom: (flag: boolean) => void;
    setIsRoomOwner: (flag: boolean) => void;
    setIsDecorating: (flag: boolean) => void;
    setIsSpectator: (flag: boolean) => void;
    setIsPlayingGame: (flag: boolean) => void;
};

const initialState: State = {
    doorMode: RoomDoorModeEnum.Open,
    tradeMode: RoomTradeModeEnum.Disabled,
    controllerLevel: RoomControllerLevelEnum.Moderator,
    ownRoomIndex: -1,
    isGuildRoom: false,
    isRoomOwner: true,
    isDecorating: false,
    isSpectator: false,
    isPlayingGame: false
};

export type RoomSessionSlice = State & Actions;

export const createRoomSessionSlice: StateCreator<RoomSessionSlice, [], [], RoomSessionSlice> = (set, get, store) => ({
    ...initialState,
    setDoorMode: (mode: RoomDoorModeEnum) => set({ doorMode: mode }),
    setTradeMode: (mode: RoomTradeModeEnum) => set({ tradeMode: mode }),
    setControllerLevel: (level: RoomControllerLevelEnum) => set({ controllerLevel: level }),
    setOwnRoomIndex: (index: number) => set({ ownRoomIndex: index }),
    setIsGuildRoom: (flag: boolean) => set({ isGuildRoom: flag }),
    setIsRoomOwner: (flag: boolean) => set({ isRoomOwner: flag }),
    setIsDecorating: (flag: boolean) => set({ isDecorating: flag }),
    setIsSpectator: (flag: boolean) => set({ isSpectator: flag }),
    setIsPlayingGame: (flag: boolean) => set({ isPlayingGame: flag }),
});