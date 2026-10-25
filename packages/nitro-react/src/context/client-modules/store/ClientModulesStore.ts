/**
 * Not Flash's: what the client modules of Turbo's `client.modules` extension have added to the
 * client - their windows and which are open, their toolbar icons and me menu entries, the link
 * prefixes they handle, what they draw over the avatars in the room and in the reception, their notification
 * layouts and the pictures they give alerts. Each entry carries the key of the module that added it, so a module that stops takes
 * everything it added with it (`removeModule`). The loader is `commands/client-modules`.
 */
import { ComponentType, ReactNode } from 'react';
import { createStore } from 'zustand/vanilla';

/** What a module's window component is given. */
export interface ClientModuleWindowProps {
    /** What `windows.open` was given, `{}` without. */
    params: Record<string, unknown>;
    close: () => void;
}

export interface ClientModuleWindow {
    moduleKey: string;
    /** `<module key>/<id>`: unique across modules. */
    key: string;
    component: ComponentType<ClientModuleWindowProps>;
    /** Drawn above every window that does not ask for it, whichever was raised last. */
    onTop?: boolean;
}

export interface ClientModuleToolbarItem {
    moduleKey: string;
    key: string;
    /** The icon's image URL, drawn in the place of the cloned region's own bitmap. */
    icon: string;
    tooltip?: string;
    onClick: () => void;
}

export interface ClientModuleMeMenuItem {
    moduleKey: string;
    key: string;
    caption: string;
    onClick: () => void;
}

export interface ClientModuleLinkHandler {
    moduleKey: string;
    /** The link's first part (`<prefix>/...`), as Flash's `linkPattern`. */
    prefix: string;
    handle: (link: string) => void;
}

/** An avatar in the room, as an overlay is asked to draw over it. */
export interface ClientModuleAvatar {
    /** The room index: the avatar's room object id. */
    roomIndex: number;
    userId: number;
    name: string;
    /** The user's own avatar. */
    isOwnUser: boolean;
}

export interface ClientModuleAvatarOverlay {
    moduleKey: string;
    key: number;
    /** What to draw over one avatar; `null` draws nothing over it. */
    render: (avatar: ClientModuleAvatar) => ReactNode;
}

/** What a reception layer is given: the reception's size, the desktop's. */
export interface ClientModuleHotelViewLayerProps {
    width: number;
    height: number;
}

export interface ClientModuleHotelViewLayer {
    moduleKey: string;
    key: number;
    component: ComponentType<ClientModuleHotelViewLayerProps>;
    /** The layer draws the reception's backdrop itself: the reception's own background bitmaps are hidden while it is added. */
    replacesBackground: boolean;
}

/** A module's bubble layout: a template of the bundles, and its height in the stack. */
export interface ClientModuleNotificationLayout {
    moduleKey: string;
    template: string;
    height: number;
}

/** An alert as a module's illustration hook is shown it. */
export interface ClientModuleAlert {
    /** `alert`: a simple alert (the system store's `simpleAlert`); `popup`: a notification popup. */
    kind: 'alert' | 'popup';
    caption: string;
    message: string;
    /** Its picture as the client (or a hook before this one) gives it: a bitmap's asset name or a URL; `undefined` for none. */
    illustration?: string;
}

export interface ClientModuleAlertIllustration {
    moduleKey: string;
    key: number;
    /** The alert's picture - an asset name or a URL - or `undefined` to leave it as it is. */
    resolve: (alert: ClientModuleAlert) => string | undefined;
}

type State = {
    windows: Record<string, ClientModuleWindow>;
    /** The open windows' params, by window key. */
    openWindows: Record<string, Record<string, unknown>>;
    toolbarItems: ClientModuleToolbarItem[];
    meMenuItems: ClientModuleMeMenuItem[];
    linkHandlers: ClientModuleLinkHandler[];
    avatarOverlays: ClientModuleAvatarOverlay[];
    /** In the order they were added: each drawn over the ones before it. */
    hotelViewLayers: ClientModuleHotelViewLayer[];
    /** By layout name. */
    notificationLayouts: Record<string, ClientModuleNotificationLayout>;
    /** In the order they were set: each is shown the picture the ones before it left. */
    alertIllustrations: ClientModuleAlertIllustration[];
};

type Actions = {
    addWindow: (window: ClientModuleWindow) => void;
    removeWindow: (key: string) => void;
    openWindow: (key: string, params?: Record<string, unknown>) => void;
    closeWindow: (key: string) => void;
    addToolbarItem: (item: ClientModuleToolbarItem) => void;
    removeToolbarItem: (key: string) => void;
    addMeMenuItem: (item: ClientModuleMeMenuItem) => void;
    removeMeMenuItem: (key: string) => void;
    addLinkHandler: (handler: ClientModuleLinkHandler) => void;
    removeLinkHandler: (handler: ClientModuleLinkHandler) => void;
    addAvatarOverlay: (overlay: ClientModuleAvatarOverlay) => void;
    removeAvatarOverlay: (key: number) => void;
    addHotelViewLayer: (layer: ClientModuleHotelViewLayer) => void;
    removeHotelViewLayer: (key: number) => void;
    addNotificationLayout: (name: string, layout: ClientModuleNotificationLayout) => void;
    removeNotificationLayout: (name: string) => void;
    addAlertIllustration: (illustration: ClientModuleAlertIllustration) => void;
    removeAlertIllustration: (key: number) => void;
    /** Everything the module added, gone. */
    removeModule: (moduleKey: string) => void;
};

export type ClientModulesStore = State & Actions;

const without = <T>(record: Record<string, T>, key: string) => Object.fromEntries(Object.entries(record).filter(([ entry ]) => entry !== key));

const filterRecord = <T>(record: Record<string, T>, keep: (value: T, key: string) => boolean) => Object.fromEntries(Object.entries(record).filter(([ key, value ]) => keep(value, key)));

export const createClientModulesStore = () => createStore<ClientModulesStore>()(set => ({
    windows: {},
    openWindows: {},
    toolbarItems: [],
    meMenuItems: [],
    linkHandlers: [],
    avatarOverlays: [],
    hotelViewLayers: [],
    notificationLayouts: {},
    alertIllustrations: [],
    addWindow: window => set(x => ({ windows: { ...x.windows, [window.key]: window } })),
    removeWindow: key => set(x => ({ windows: without(x.windows, key), openWindows: without(x.openWindows, key) })),
    openWindow: (key, params = {}) => set(x => (x.windows[key] ? { openWindows: { ...x.openWindows, [key]: params } } : x)),
    closeWindow: key => set(x => ((key in x.openWindows) ? { openWindows: without(x.openWindows, key) } : x)),
    addToolbarItem: item => set(x => ({ toolbarItems: [ ...x.toolbarItems.filter(entry => entry.key !== item.key), item ] })),
    removeToolbarItem: key => set(x => ({ toolbarItems: x.toolbarItems.filter(entry => entry.key !== key) })),
    addMeMenuItem: item => set(x => ({ meMenuItems: [ ...x.meMenuItems.filter(entry => entry.key !== item.key), item ] })),
    removeMeMenuItem: key => set(x => ({ meMenuItems: x.meMenuItems.filter(entry => entry.key !== key) })),
    addLinkHandler: handler => set(x => ({ linkHandlers: [ ...x.linkHandlers, handler ] })),
    removeLinkHandler: handler => set(x => ({ linkHandlers: x.linkHandlers.filter(entry => entry !== handler) })),
    addAvatarOverlay: overlay => set(x => ({ avatarOverlays: [ ...x.avatarOverlays, overlay ] })),
    removeAvatarOverlay: key => set(x => ({ avatarOverlays: x.avatarOverlays.filter(entry => entry.key !== key) })),
    addHotelViewLayer: layer => set(x => ({ hotelViewLayers: [ ...x.hotelViewLayers, layer ] })),
    removeHotelViewLayer: key => set(x => ({ hotelViewLayers: x.hotelViewLayers.filter(entry => entry.key !== key) })),
    addNotificationLayout: (name, layout) => set(x => ({ notificationLayouts: { ...x.notificationLayouts, [name]: layout } })),
    removeNotificationLayout: name => set(x => ({ notificationLayouts: without(x.notificationLayouts, name) })),
    addAlertIllustration: illustration => set(x => ({ alertIllustrations: [ ...x.alertIllustrations, illustration ] })),
    removeAlertIllustration: key => set(x => ({ alertIllustrations: x.alertIllustrations.filter(entry => entry.key !== key) })),
    removeModule: moduleKey => set((x) => {
        const windows = filterRecord(x.windows, window => window.moduleKey !== moduleKey);

        return {
            windows,
            openWindows: filterRecord(x.openWindows, (_, key) => key in windows),
            toolbarItems: x.toolbarItems.filter(entry => entry.moduleKey !== moduleKey),
            meMenuItems: x.meMenuItems.filter(entry => entry.moduleKey !== moduleKey),
            linkHandlers: x.linkHandlers.filter(entry => entry.moduleKey !== moduleKey),
            avatarOverlays: x.avatarOverlays.filter(entry => entry.moduleKey !== moduleKey),
            hotelViewLayers: x.hotelViewLayers.filter(entry => entry.moduleKey !== moduleKey),
            notificationLayouts: filterRecord(x.notificationLayouts, layout => layout.moduleKey !== moduleKey),
            alertIllustrations: x.alertIllustrations.filter(entry => entry.moduleKey !== moduleKey),
        };
    }),
}));

/** The one store: modules live as long as the connection, not a window. */
export const clientModulesStore = createClientModulesStore();
