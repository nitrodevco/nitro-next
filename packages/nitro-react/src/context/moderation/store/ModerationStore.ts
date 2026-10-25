/**
 * The moderation store - what Flash's `ModerationManager` keeps for its tool:
 *
 * - `init` (`ModerationManager.initMsg`): the `ModeratorInit` the server sends a moderator; the
 *   start panel shows once it arrives (`ModerationMessageHandler.onModeratorInit`).
 * - `selectedUser` (`StartPanelCtrl.userSelected`): the last user clicked in the room, which the
 *   start panel's user info button opens.
 * - `currentRoomId` (`ModerationManager.currentFlatId`): the guest room entered, 0 out of one;
 *   the room tool and chatlog buttons follow it (`StartPanelCtrl.guestRoomEntered` / `roomExited`).
 * - `windows` (`WindowTracker`): the tool windows up, each once per kind and id (`ITrackedWindow`'s
 *   `getType` / `getId`), the newest last; `rects` where each is, by key (the start panel's
 *   `START_PANEL`), kept as they are dragged.
 * - `userInfos`, `roomInfos`, `chatlogs`: the answers their windows wait for.
 * - `defaultSanctions` (`IssueManager.updateSanctionData`): a player's default sanction, as the mod
 *   action window labels it, from `CfhSanction` for its account.
 * - `classifications` (`ModerationMessageHandler.onRoomUserClassification`): a `UserClassificationCtrl`
 *   window per `UserClassification` the server sent, each up until closed. They are not the
 *   `WindowTracker`'s: every answer opens another, where the layout puts it.
 */
import type { IModeratorRoomInfoData, IModeratorUserInfoData, IRoomChatlogData, IRoomVisitsData, IUserClassificationData, ModeratorInitMessageType } from '@nitrodevco/nitro-packets';
import { createStore } from 'zustand';

import { GetDesktopSize } from '#base/utils';

/** `ChatlogCtrl`'s types: 4 a room's chatlog, 5 a user's (`ModerationMessageHandler.onRoomChatlog` / `onUserChatlog`). */
export const MOD_CHATLOG_ROOM = 4;
export const MOD_CHATLOG_USER = 5;

/** `ChatlogCtrl`'s type 3: a call for help's evidence (`ModerationMessageHandler.onCfhChatlog`). */
export const MOD_CHATLOG_CFH = 3;

/**
 * A tracked window. A user info, send-message or mod action window opened from a call for help holds its
 * `issueId` (`IssueMessageData` passed along, `UserInfoCtrl._-C2S`), which the actions it sends carry; it is no
 * part of the window's key (`WindowTracker` ids are the user's).
 */
export type ModerationWindow
    = | { kind: 'userInfo'; userId: number; issueId?: number }
        | { kind: 'roomTool'; roomId: number }
        | { kind: 'chatlog'; type: number; id: number }
        | { kind: 'sendMessage'; userId: number; userName: string; issueId?: number }
        | { kind: 'modAction'; userId: number; userName: string; issueId?: number }
        | { kind: 'roomVisits'; userId: number };

/** The start panel's `rects` key, and where its layout puts it (`start_panel.xml`: 120, 64, 170 x 170). */
export const START_PANEL = 'startPanel';
const START_PANEL_RECT = { x: 120, y: 64, width: 170, height: 170 };

/** Each tracked window's frame size, from its layout: what `WindowTracker.show` places beside its caller. */
const WINDOW_SIZES: Record<ModerationWindow['kind'], { width: number; height: number }> = {
    userInfo: { width: 292, height: 225 },
    roomTool: { width: 240, height: 437 },
    chatlog: { width: 480, height: 565 },
    sendMessage: { width: 212, height: 168 },
    modAction: { width: 383, height: 295 },
    roomVisits: { width: 292, height: 224 },
};

/** `userclassification_frame.xml`'s frame (60, 4, 292 x 224): where `getXmlWindow` builds it, unplaced. */
const CLASSIFICATION_RECT = { x: 60, y: 4, width: 292, height: 224 };

/** A classification window's `rects` key (`UserClassificationCtrl` is no `WindowTracker` window). */
export const moderationClassificationKey = (id: number) => `userClassification:${id}`;

/** `WindowTracker.show`'s gap between a window and its caller. */
const CALLER_GAP = 5;

export interface ModerationRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface ModerationChatlog {
    caption: string;
    records: IRoomChatlogData[];
}

export interface ModerationClassification {
    id: number;
    users: IUserClassificationData[];
}

export interface ModerationStore {
    init: ModeratorInitMessageType | undefined;
    selectedUser: { userId: number; userName: string } | undefined;
    currentRoomId: number;
    windows: ModerationWindow[];
    rects: Record<string, ModerationRect>;
    userInfos: Record<number, IModeratorUserInfoData>;
    roomInfos: Record<number, IModeratorRoomInfoData>;
    chatlogs: Record<string, ModerationChatlog>;
    defaultSanctions: Record<number, string>;
    roomVisits: Record<number, IRoomVisitsData>;
    classifications: ModerationClassification[];
    setInit: (init: ModeratorInitMessageType) => void;
    userSelected: (userId: number, userName: string) => void;
    setCurrentRoomId: (roomId: number) => void;
    /**
     * `WindowTracker.show(window, callerFrame, below, false, true)`: a window already up for the same
     * kind and id is closed instead (every caller passes the toggle); else it opens beside its
     * caller's frame - right of it, or under it with `below` - 5 px off, kept on the desktop.
     */
    showWindow: (window: ModerationWindow, caller?: string, below?: boolean) => void;
    /** A frame dragged: where it is now (`onPositionChange`). */
    moveWindow: (key: string, position: { x: number; y: number }) => void;
    /** Where a frame no tracked window is lies (the issue handler), so the windows it opens go beside it as beside any caller. */
    placeFrame: (key: string, rect: ModerationRect) => void;
    closeWindow: (window: ModerationWindow) => void;
    setUserInfo: (info: IModeratorUserInfoData) => void;
    setRoomInfo: (info: IModeratorRoomInfoData) => void;
    setChatlog: (type: number, id: number, chatlog: ModerationChatlog) => void;
    setDefaultSanction: (userId: number, label: string) => void;
    setRoomVisits: (visits: IRoomVisitsData) => void;
    /** `onRoomUserClassification`: a new `UserClassificationCtrl` window with the users. */
    showClassification: (users: IUserClassificationData[]) => void;
    /** `UserClassificationCtrl.onClose`. */
    closeClassification: (id: number) => void;
}

export const moderationWindowKey = (window: ModerationWindow) => {
    switch (window.kind) {
        case 'userInfo': return `userInfo:${window.userId}`;
        case 'roomTool': return `roomTool:${window.roomId}`;
        case 'chatlog': return `chatlog:${window.type}:${window.id}`;
        case 'sendMessage': return `sendMessage:${window.userId}`;
        case 'modAction': return `modAction:${window.userId}`;
        case 'roomVisits': return `roomVisits:${window.userId}`;
    }
};

export const moderationChatlogKey = (type: number, id: number) => `${type}:${id}`;

export const createModerationStore = () => createStore<ModerationStore>(set => ({
    init: undefined,
    selectedUser: undefined,
    currentRoomId: 0,
    windows: [],
    rects: { [START_PANEL]: START_PANEL_RECT },
    userInfos: {},
    roomInfos: {},
    chatlogs: {},
    defaultSanctions: {},
    roomVisits: {},
    classifications: [],
    setInit: init => set({ init }),
    userSelected: (userId, userName) => set({ selectedUser: { userId, userName } }),
    setCurrentRoomId: currentRoomId => set({ currentRoomId }),
    showWindow: (window, caller, below = false) => set((state) => {
        const key = moderationWindowKey(window);

        if (state.windows.some(x => moderationWindowKey(x) === key)) return { windows: state.windows.filter(x => moderationWindowKey(x) !== key) };

        const { width, height } = WINDOW_SIZES[window.kind];
        const from = caller ? state.rects[caller] : undefined;
        const desktop = GetDesktopSize();
        let x = from ? (below ? from.x : from.x + from.width + CALLER_GAP) : (desktop.width - width) / 2;
        let y = from ? (below ? from.y + from.height + CALLER_GAP : from.y) : (desktop.height - height) / 2;

        x = Math.floor(Math.max(0, Math.min(x, desktop.width - width)));
        y = Math.floor(Math.max(0, Math.min(y, desktop.height - height)));

        return { windows: [ ...state.windows, window ], rects: { ...state.rects, [key]: { x, y, width, height } } };
    }),
    moveWindow: (key, position) => set((state) => {
        const rect = state.rects[key];

        return rect ? { rects: { ...state.rects, [key]: { ...rect, ...position } } } : {};
    }),
    placeFrame: (key, rect) => set(state => ({ rects: { ...state.rects, [key]: rect } })),
    closeWindow: window => set((state) => {
        const key = moderationWindowKey(window);

        return { windows: state.windows.filter(x => moderationWindowKey(x) !== key) };
    }),
    setUserInfo: info => set(state => ({ userInfos: { ...state.userInfos, [info.userId]: info } })),
    setRoomInfo: info => set(state => ({ roomInfos: { ...state.roomInfos, [info.flatId]: info } })),
    setChatlog: (type, id, chatlog) => set(state => ({ chatlogs: { ...state.chatlogs, [moderationChatlogKey(type, id)]: chatlog } })),
    setDefaultSanction: (userId, label) => set(state => ({ defaultSanctions: { ...state.defaultSanctions, [userId]: label } })),
    setRoomVisits: visits => set(state => ({ roomVisits: { ...state.roomVisits, [visits.userId]: visits } })),
    showClassification: users => set((state) => {
        const id = (state.classifications.at(-1)?.id ?? 0) + 1;

        return { classifications: [ ...state.classifications, { id, users } ], rects: { ...state.rects, [moderationClassificationKey(id)]: CLASSIFICATION_RECT } };
    }),
    closeClassification: id => set((state) => {
        const { [moderationClassificationKey(id)]: _, ...rects } = state.rects;

        return { classifications: state.classifications.filter(x => x.id !== id), rects };
    }),
}));

export const moderationStore = createModerationStore();

/**
 * A tool window's frame options: opened where `showWindow` placed it, not where it was last dragged
 * (`WindowTracker` places every window it shows), and its drags kept for the windows it opens.
 */
export const moderationFrame = (key: string, onClose?: () => void) => ({
    id: `moderation-${key.replace(/:/g, '-')}`,
    defaultPosition: moderationStore.getState().rects[key],
    rememberPosition: false,
    onPositionChange: (position: { x: number; y: number }) => moderationStore.getState().moveWindow(key, position),
    onClose,
});
