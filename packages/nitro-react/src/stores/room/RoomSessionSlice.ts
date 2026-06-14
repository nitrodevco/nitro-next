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
    setDoorMode: (mode: RoomDoorModeEnum) =>
        set(state => {
            return {
                ...state,
                doorMode: mode
            }
        }),
    setTradeMode: (mode: RoomTradeModeEnum) =>
        set(state => {
            return {
                ...state,
                tradeMode: mode
            }
        }),
    setControllerLevel: (level: RoomControllerLevelEnum) =>
        set(state => {
            return {
                ...state,
                controllerLevel: level
            }
        }),
    setOwnRoomIndex: (index: number) =>
        set(state => {
            return {
                ...state,
                ownRoomIndex: index
            }
        }),
    setIsGuildRoom: (flag: boolean) =>
        set(state => {
            return {
                ...state,
                isGuildRoom: flag
            }
        }),
    setIsRoomOwner: (flag: boolean) =>
        set(state => {
            return {
                ...state,
                isRoomOwner: flag
            }
        }),
    setIsDecorating: (flag: boolean) =>
        set(state => {
            return {
                ...state,
                isDecorating: flag
            }
        }),
    setIsSpectator: (flag: boolean) =>
        set(state => {
            return {
                ...state,
                isSpectator: flag
            }
        }),
    setIsPlayingGame: (flag: boolean) =>
        set(state => {
            return {
                ...state,
                isPlayingGame: flag
            }
        }),
});