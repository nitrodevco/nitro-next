import { createStore } from 'zustand';

import type { UserInfoSlice } from './UserInfoSlice';
import { createUserInfoSlice } from './UserInfoSlice';

type State = {
    systemOpen: boolean;
    systemShutdown: boolean;
    isAuthenticHabbo: boolean;
    isRoomCameraFollowDisabled: boolean;
    uiFlags: number;
};

type Actions = {};

const initialState: State = {
    systemOpen: false,
    systemShutdown: false,
    isAuthenticHabbo: false,
    isRoomCameraFollowDisabled: false,
    uiFlags: 0,
};

type SessionStore = State & Actions & UserInfoSlice;

export const SessionStore = createStore<SessionStore>((...args) => ({
    ...initialState,
    ...createUserInfoSlice(...args),
}));
