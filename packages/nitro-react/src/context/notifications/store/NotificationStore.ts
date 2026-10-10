import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { createStore } from 'zustand';

import type { CollectibleProductInfo } from '#base/context/collectibles';

import { NOTIFICATION_STYLES, NotificationAssetName, NotificationLayoutName, NotificationStyleConfig, NotificationStyleName } from './NotificationConfig';

/**
 * The bubble notifications that stack up under the purse - Flash's `HabboNotifications.addItem`
 * and the `SingularNotificationController` behind it: a queue of items waiting for room on the
 * screen, and the items that are up. The view (`views/notifications/NotificationsView`) plays
 * `HabboNotificationViewManager`: it takes the next item when there is room, animates the
 * bubbles and reports back when one starts to fade or is gone.
 *
 * It also holds the open `NotificationPopup`s - the other half of `HabboNotifications.showNotification`
 * (`commands/notificationCommands`), drawn by `views/notifications/NotificationPopupsView`.
 *
 * The packet-driven bubbles of Flash's `notifications/IncomingMessages` are in
 * `handlers/notifications/registerNotificationHandlers`. The component's own windows are not in
 * this store: the MOTD, club gift and safety lock windows and the `HabboAlertDialogManager`
 * alerts are `context/singular-notifications` (`registerSingularNotificationHandlers`,
 * `registerAlertDialogHandlers`), and the new-feature notifications are
 * `NewFeatureNotificationSlice`. The notification feed is not ported: no Flash path creates it.
 * `addSongPlayingNotification` is the sound manager's (`HabboSoundManager.notifyPlayedSong`),
 * which adds its `soundmachine` bubble here.
 */

/**
 * `addItem`'s extra data object, by `NotificationExtraDataKey`. `product`, `rarity` and
 * `rarity_color` are read by the `nft_opening` layout only.
 */
export interface NotificationOptions {
    /** `product`: the `IProductDisplayInfo` the `nft_opening` bubble's `product_icon` shows. */
    product?: CollectibleProductInfo;
    /** `rarity`: after `collectibles.item.rarity` on the `nft_opening` bubble's strip. */
    rarity?: string;
    /** `rarity_color`: the strip's colour. */
    rarityColor?: number;
    /**
     * `id`: a notification with an id is not added again while one with the same id is queued or
     * up, and can be taken down with `removeNotificationById`.
     */
    id?: string;
    /** `time_display`: milliseconds the bubble stays once faded in, instead of its view's own. */
    timeDisplay?: number;
    /**
     * `stay`: the bubble never times out and a click does not dismiss it; only
     * `removeNotificationById` takes it down. Flash tests for the key's presence, so there
     * `stay: false` stays too - here it does not.
     */
    stay?: boolean;
    /**
     * `toggle_callback`, `wired` style only: the bubble gets a button that reads
     * `${notification.stop}`, then `${notification.resume}`, and calls this with `true` when
     * stopped and `false` when resumed.
     */
    toggleCallback?: (stopped: boolean) => void;
    /**
     * `friendonline` style only: the friend whose face the bubble's circle shows. Flash hands
     * `addItemWithBitmap` the face itself (`HabboFaceFocuser.focusUserFace(image, "head", 2)`);
     * here the bubble draws it from the figure.
     */
    figure?: string;
    gender?: AvatarGenderType;
    /**
     * The pet the bubble's icon shows - the `PetImageUtility.getPetImage(type, palette, color)` render
     * Flash hands `addItem` as its bitmap (`onPetReceived`); here the bubble draws it from these.
     */
    pet?: { typeId: number; paletteId: number; color: number };
}

/** `HabboNotificationItem` with its `HabboNotificationItemStyle` folded in. */
export interface NotificationItem {
    /** Unique per item, for React and for the view's bookkeeping. `options.id` is the caller's. */
    key: number;
    /** As the caller gave it: a `${key}` in it is localized when drawn, like a Flash caption. */
    text: string;
    style: NotificationStyleName;
    layout: NotificationLayoutName;
    /** A `NotificationAssetName` or a URL: the caller's image, else the style's icon. */
    image: string | undefined;
    /** The caller's link, else the style's. Opened with `openClientLink` on click. */
    internalLink: string | undefined;
    options: NotificationOptions;
    /**
     * `HabboNotificationItemView.readyOrFading`: on its way out. A fading bubble no longer holds
     * its place in the stack, nor its id.
     */
    fading: boolean;
}

/**
 * One `NotificationPopup`, its parts read once as its constructor reads them
 * (`getNotificationPart` / `getNotificationImageUrl`).
 */
export interface NotificationPopupItem {
    key: number;
    /** The frame's caption: `title`. */
    title: string;
    /** `message`, the literal `\r` the server sends made a line break. Markup is honoured. */
    message: string;
    /** `linkUrl`, whole; an `event:` one is shown as the `action` button, any other as the `link` text. */
    linkUrl: string | undefined;
    /** `linkTitle`, else the url itself. */
    linkTitle: string | undefined;
    /** The `illustration`'s `assetUri`: a notification library bitmap by name, or a url with its `${...}` resolved. */
    image: string;
    /** `alertStyle == "critical"`: the frame is tinted `CRITICAL_COLOR` instead of the layout's own. */
    critical: boolean;
}

type State = {
    /** The `NotificationPopup`s that are open, oldest first - each is its own modal dialog. */
    popups: NotificationPopupItem[];
    /** `SingularNotificationController`'s queue: added, not yet shown. */
    queue: NotificationItem[];
    /** `HabboNotificationViewManager._viewItems`: up on the screen, fading ones included. */
    visible: NotificationItem[];
    /**
     * `IHabboToolbar.extensionView.screenHeight`: how far down the purse column reaches, which
     * is where the stack starts. 0 until `NotificationsExtensionAnchor` has measured it.
     */
    extensionHeight: number;
    /**
     * `HabboNotifications.disabled`, which `SingularNotificationController.addItem` returns 0 on:
     * the server turns the bubbles off with `InfoFeedEnableMessage` and nothing else sets it.
     */
    disabled: boolean;
    /** `SingularNotificationController`'s moderation disclaimer flag: shown once, then never again. */
    moderationDisclaimerShown: boolean;
    /** Its timer: the disclaimer waits for the room entry effect, one wait at a time. */
    moderationDisclaimerPending: boolean;
};

type Actions = {
    /**
     * `HabboNotifications.addItem` / `addItemWithBitmap`. `image` is a bitmap of the Flash
     * notifications library by name, or any image URL. Returns the item's key, or 0 when the
     * bubbles are disabled, or when its `options.id` is already queued or up and nothing was added.
     */
    addNotification: (text: string, style: NotificationStyleName, image?: NotificationAssetName | (string & {}), internalLink?: string, options?: NotificationOptions) => number;
    /** `HabboNotifications.removeNotificationById`: drops it from the queue, fades it out if it is up. */
    removeNotificationById: (id: string) => void;
    /** For the view: moves the head of the queue onto the screen and returns it. */
    showNextNotification: () => NotificationItem | undefined;
    /** `HabboNotificationItemView.remove` / `startFadeOut`: marks a bubble that is up as fading. */
    dismissNotification: (key: number) => void;
    /** For the view: the bubble has faded or slid out and is gone. */
    finishNotification: (key: number) => void;
    setExtensionHeight: (extensionHeight: number) => void;
    /** `InfoFeedEnableMessage`: the server turning the bubbles off, and back on. */
    setNotificationsDisabled: (disabled: boolean) => void;
    patchModerationDisclaimer: (patch: Partial<Pick<State, 'moderationDisclaimerShown' | 'moderationDisclaimerPending'>>) => void;
    /** `new NotificationPopup(...)`: opens one. Returns its key. */
    addNotificationPopup: (popup: Omit<NotificationPopupItem, 'key'>) => number;
    /** `NotificationPopup.dispose`. */
    removeNotificationPopup: (key: number) => void;
};

export type NotificationStore = State & Actions;

let nextNotificationKey = 1;

export const createNotificationStore = () => createStore<NotificationStore>()((set, get) => ({
    popups: [],
    queue: [],
    visible: [],
    extensionHeight: 0,
    disabled: false,
    moderationDisclaimerShown: false,
    moderationDisclaimerPending: false,
    addNotification: (text, style, image, internalLink, options = {}) => {
        const { queue, visible, disabled } = get();
        const id = options.id;

        if (disabled) return 0;

        // `SingularNotificationController.hasNotificationById`.
        if ((id !== undefined) && (queue.some(item => item.options.id === id) || visible.some(item => (item.options.id === id) && !item.fading))) return 0;

        const styleConfig: NotificationStyleConfig = NOTIFICATION_STYLES[style];
        const key = nextNotificationKey++;

        set({
            queue: [ ...queue, {
                key,
                text,
                style,
                layout: styleConfig.layout ?? 'default',
                image: image ?? styleConfig.icon,
                internalLink: internalLink || styleConfig.internalLink,
                options,
                fading: false,
            } ],
        });

        return key;
    },
    removeNotificationById: id => set(x => ({
        queue: x.queue.filter(item => item.options.id !== id),
        visible: x.visible.map(item => (((item.options.id === id) && !item.fading) ? { ...item, fading: true } : item)),
    })),
    showNextNotification: () => {
        const { queue, visible } = get();
        const item = queue[0];

        if (!item) return undefined;

        set({ queue: queue.slice(1), visible: [ ...visible, item ] });

        return item;
    },
    dismissNotification: key => set(x => (x.visible.some(item => (item.key === key) && !item.fading)
        ? { visible: x.visible.map(item => ((item.key === key) ? { ...item, fading: true } : item)) }
        : x)),
    finishNotification: key => set(x => ({ visible: x.visible.filter(item => item.key !== key) })),
    setExtensionHeight: extensionHeight => set(x => ((x.extensionHeight === extensionHeight) ? x : { extensionHeight })),
    setNotificationsDisabled: disabled => set({ disabled }),
    patchModerationDisclaimer: patch => set(patch),
    addNotificationPopup: (popup) => {
        const key = nextNotificationKey++;

        set(x => ({ popups: [ ...x.popups, { ...popup, key } ] }));

        return key;
    },
    removeNotificationPopup: key => set(x => ({ popups: x.popups.filter(popup => popup.key !== key) })),
}));

/**
 * The one NotificationStore for the whole client: a bubble can be raised from anywhere - a
 * packet handler, a command, a window - and outlives whatever raised it, so it is an app-wide
 * singleton like the SystemStore. Components read it through `useNotificationStore` and
 * `useNotificationActions`; handlers and commands through `getState()`.
 */
export const notificationStore = createNotificationStore();
