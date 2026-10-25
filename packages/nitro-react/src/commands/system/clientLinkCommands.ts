/**
 * The in-client link router: `navigator/goto/<room>`, `catalog/open/<page>`, `wiredmenu/open`, ...
 * mapped onto the window or command each one opens - what every Flash component did for the links
 * under its own `linkPattern` in `ILinkEventTracker.linkReceived`.
 */
import { NitroLogger, RoomZoomEvent } from '@nitrodevco/nitro-api';
import { ForwardToSomeRoomComposer, GetExtendedProfileByNameComposer, GetHabboGroupDetailsComposer, RateFlatComposer } from '@nitrodevco/nitro-packets';

import { clientModulesStore } from '#base/context/client-modules';
import { Send } from '#base/context/communication';
import { hintStore } from '#base/context/hints';
import { navigatorStore } from '#base/context/navigator';
import { getRoom } from '#base/context/room';
import { configBoolean, systemStore, WindowParams } from '#base/context/system';
import { PerkCodes, userStore } from '#base/context/user';
import { getWiredHasReadPermission, getWiredMenuEnabled, WIRED_MENU_TAB_INSPECTION, WIRED_MENU_TAB_MONITOR, WIRED_MENU_TAB_OVERVIEW } from '#base/context/wired';

import { openAchievements } from '../achievements/achievementCommands';
import { openCursedDragonAdoption } from '../cursed-dragon-adoption/cursedDragonAdoptionCommands';
import { openDailyTasksLink } from '../daily-tasks/dailyTasksCommands';
import { showEarnings } from '../earnings/earningsCommands';
import { openBadgeLeaderboardLink } from '../groups/badgeLeaderboardCommands';
import { openGroupForumLink } from '../groups/groupForumCommands';
import { habbiconsEnabled, openHabbiconHub } from '../habbicons/habbiconCommands';
import { forwardToRoom, goToHomeRoom, reportRoomFromWeb, searchNavigator, searchRoomTag } from '../navigator/navigatorCommands';
import { openRaidProtectionFromLink } from '../navigator/raidProtectionCommands';
import { toggleQuests } from '../quests/questCommands';
import { openRewardTrackLink } from '../reward-track/rewardTrackCommands';
import { startTakingPhoto } from '../room/cameraCommands';
import { openRoomThumbnailCameraLink } from '../room/roomThumbnailCameraCommands';
import { previewSoundVolumes, saveSoundVolumes } from '../sound/soundSettingsCommands';
import { openSpecialItemsDisplay } from '../special-items/specialItemsCommands';
import { findNewFriends } from '../user/friendBarCommands';
import { openMessengerConversation } from '../user/messengerCommands';
import { hideNoobLobbyOffer, showNoobLobbyOffer } from '../user/nuxCommands';
import { setRoomCameraFollowDisabled, setRoomInvitesIgnored } from '../user/userSettingsCommands';
import { openWiredRewardView, openWiredSelfDonation } from '../wired-trading/wiredTradingCommands';
import { openHabboPage } from './habboPagesCommands';

/** `HabboNewNavigator.getSearchCodeForTabLink`. */
const TAB_LINK_SEARCH_CODES: Record<string, string> = { me: 'myworld_view' };

/**
 * `Base64.decode`: the text the bytes spell as UTF-8 (`readUTFBytes`). Decoding stops at the first
 * character outside the alphabet - padding included - instead of failing.
 */
const decodeBase64Text = (value: string): string => {
    const encoded = /^[A-Za-z0-9+/]*/.exec(value)?.[0] ?? '';
    const whole = encoded.slice(0, encoded.length - (encoded.length % 4 === 1 ? 1 : 0));
    const binary = atob(whole.padEnd(Math.ceil(whole.length / 4) * 4, '='));

    return new TextDecoder().decode(Uint8Array.from(binary, char => char.charCodeAt(0)));
};

const INVENTORY_TABS: WindowParams<'inventory'>['tab'][] = [ 'furni', 'pets', 'bots', 'badges' ];

/** `RoomToolsWidget`'s one-click zoom, carried through `useRoomZoom`'s room engine event flow. */
const toggleRoomZoomLink = () => {
    if (!configBoolean('zoom.enabled')) return;

    const room = getRoom();
    const { currentRoomId } = navigatorStore.getState();

    if (!room || (room.roomId !== currentRoomId)) return;

    room.eventDispatcher.dispatchEvent(new RoomZoomEvent(room.roomId, (room.canvas?.scale === 1) ? 0 : 1));
};

/** `RoomToolsWidget.likeRoom`: rate only the room that is currently active, then retire its permission. */
const likeCurrentRoomLink = (send: Send) => {
    const room = getRoom();
    const { currentRoomId, canRateCurrentRoom, setRoomRating } = navigatorStore.getState();

    if (!room || (room.roomId !== currentRoomId) || !canRateCurrentRoom) return;

    send(new RateFlatComposer({ points: 1 }));
    setRoomRating(0, false);
};

/** `BottomBarLeft.linkReceived`'s `highlight` targets: the hint key (`getIconName`) of each. */
const TOOLBAR_HIGHLIGHT_ICONS: Record<string, string> = { catalog: 'CATALOGUE', navigator: 'NAVIGATOR', memenu: 'MEMENU' };

/**
 * `WiredMenuController.linkReceived` - `wiredmenu/open[/<tab>[/...]]` and `wiredmenu/logs`, turned
 * into the `wired_menu` window's params. Outside a room with wired the user may read, the link
 * gets Flash's "invalid room" alert instead.
 */
const openWiredMenuLink = (parts: string[]): boolean => {
    const { showWindow, showAlert, interpolate, visibleWindows } = systemStore.getState();

    if (!getWiredMenuEnabled() || !getWiredHasReadPermission()) {
        showAlert(interpolate('${wiredmenu.invalid_room.title}'), interpolate('${wiredmenu.invalid_room.desc}'));

        return true;
    }

    switch (parts[1]) {
        case 'open': {
            const params: WindowParams<'wired_menu'> = {};

            if (parts.length >= 3) params.tab = parts[2];

            // `routeInspectionLink`: wiredmenu/open/inspection/<sourceType>/<id>.
            if ((parts[2] === WIRED_MENU_TAB_INSPECTION) && (parts.length >= 5)) params.inspect = { sourceType: parseInt(parts[3], 10), id: parseInt(parts[4], 10) };

            // `routeOverviewLink`: wiredmenu/open/variable_overview/<name>.
            if ((parts[2] === WIRED_MENU_TAB_OVERVIEW) && (parts.length >= 4)) params.variableName = parts[3];

            showWindow('wired_menu', params);

            return true;
        }
        case 'logs': {
            // A menu that is not up yet opens on the monitor tab; one that is keeps its tab.
            showWindow('wired_menu', visibleWindows.wired_menu ? { ...visibleWindows.wired_menu, logs: true } : { tab: WIRED_MENU_TAB_MONITOR, logs: true });

            return true;
        }
    }

    return false;
};

/**
 * `ILinkEventTracker.linkReceived`: the in-client links a menu, a habbopage or a bot's link skill
 * can carry. Flash gave every component its own `linkPattern` and let it act on the links under
 * it; here a window is opened by name with its parameters instead, and the window's own hook
 * (`useCatalogPageRequest`, `useNavigatorSearchCodeRequest`, ...) acts on what it was passed.
 *
 * Only the links whose destination exists in this client are routed, and then those a client module
 * handles (`links.handle`); the rest are logged rather than dropped silently, the way each Flash
 * component logged its own unknown link type.
 */
export const openClientLink = (send: Send, link: string) => {
    const parts = link.split('/');
    const { showWindow, hideWindow } = systemStore.getState();

    switch (parts[0]) {
        // A custom settings view uses the same commands as the toolbar's own settings.
        case 'settings': {
            if ((parts[1] === 'sound') && (parts[2] === 'save') && (parts.length === 3)) {
                saveSoundVolumes(send);
                return;
            }

            if ((parts[1] === 'sound') && (parts[2] === 'preview') && (parts.length === 6)) {
                const values = parts.slice(3).map(Number);

                if (parts.slice(3).every(value => value.length > 0) && values.every(value => Number.isFinite(value) && value >= 0 && value <= 1)) {
                    previewSoundVolumes(values[0], values[1], values[2]);
                }

                return;
            }

            if ((parts.length === 3) && ((parts[2] === '0') || (parts[2] === '1'))) {
                if (parts[1] === 'ignore-room-invites') {
                    setRoomInvitesIgnored(send, parts[2] === '1');
                    return;
                }

                if (parts[1] === 'disable-camera-follow') {
                    setRoomCameraFollowDisabled(send, parts[2] === '1');
                    return;
                }
            }

            break;
        }
        // Generic room toolbar actions. Neither route targets a different room from the active one.
        case 'room': {
            if ((parts.length !== 2) || !parts[1]) break;

            if (parts[1] === 'zoom') toggleRoomZoomLink();
            else if (parts[1] === 'like') likeCurrentRoomLink(send);
            else break;

            return;
        }
        // `HabboNewNavigator.linkReceived`.
        case 'navigator': {
            switch (parts[1]) {
                case 'goto': {
                    if (parts.length <= 2) break;

                    const roomId = parseInt(parts[2], 10);

                    if (parts[2] === 'home') goToHomeRoom(send);
                    else if (roomId > 0) forwardToRoom(send, roomId);
                    // A name rather than an id: the server resolves it and forwards us.
                    else send(new ForwardToSomeRoomComposer({ forwardData: parts[2] }));

                    return;
                }
                case 'search': {
                    if (parts.length > 2) searchNavigator(send, decodeURIComponent(parts.slice(2).join('/')));

                    return;
                }
                case 'tag': {
                    if (parts.length > 2) searchRoomTag(send, decodeURIComponent(parts.slice(2).join('/')));

                    return;
                }
                case 'tab': {
                    if (parts.length > 2) showWindow('navigator', { searchCode: TAB_LINK_SEARCH_CODES[parts[2]] ?? parts[2] });

                    return;
                }
                // `HabboNewNavigator.linkReceived` -> `RaidProtectionSettingsController.openFromLink`.
                case 'raidprotection': {
                    openRaidProtectionFromLink(send, (parts.length === 3) ? parts[2] : undefined);

                    return;
                }
                // `LegacyNavigator.reportRoomFromWeb(globalId, Base64.decode(name))`.
                case 'report': {
                    if (parts.length > 3) reportRoomFromWeb(send, parts[2], decodeBase64Text(parts[3]));

                    return;
                }
            }

            break;
        }
        // `HabboCatalog.linkReceived`: `open` with no page opens the catalog where it was left.
        case 'catalog': {
            switch (parts[1]) {
                case 'open': {
                    // The normal catalogue takes over from the Builders Club one (`toggleCatalog`).
                    hideWindow('builders_catalog');

                    if (parts.length > 2) showWindow('catalog', { pageName: parts[2] });
                    else showWindow('catalog');

                    return;
                }
                // `warehouse`: the Builders Club catalogue - `openCatalogPage(page, "BUILDERS_CLUB")`, or
                // `toggleCatalog("BUILDERS_CLUB", true)`, which shows it whatever is open.
                case 'warehouse': {
                    hideWindow('catalog');

                    if (parts.length > 2) showWindow('builders_catalog', { pageName: parts[2] });
                    else showWindow('builders_catalog');

                    return;
                }
                // `createLinkEvent("habbicons/open")`, with `habbicons.enabled` on.
                case 'habbicons': {
                    if (habbiconsEnabled()) openClientLink(send, 'habbicons/open');

                    return;
                }
            }

            break;
        }
        // `HabbiconController.linkReceived`: `habbicons/open`, with `habbicons.enabled` on.
        case 'habbicons': {
            if (parts[1] === 'open') openHabbiconHub(send);

            return;
        }
        // `HabboInventory.linkReceived`: `open` alone means the furni tab.
        case 'questengine': {
            if (parts[1] === 'achievements') openAchievements(send, parts[2]);
            // `questController.onToolbarClick()`.
            else if (parts[1] === 'quests') toggleQuests(send);

            return;
        }
        case 'inventory': {
            if (parts[1] === 'open') {
                const tab = INVENTORY_TABS.find(x => x === parts[2]);

                showWindow('inventory', { tab: tab ?? 'furni' });

                return;
            }

            break;
        }
        // `HabboAvatarEditorManager.linkReceived`.
        case 'avatareditor': {
            if (parts[1] === 'open') {
                showWindow('avatar_editor');

                return;
            }

            break;
        }
        case 'wiredmenu': {
            if (openWiredMenuLink(parts)) return;

            break;
        }
        // `RewardNotificationController.linkReceived`: wiredrewards/open/<internalId>.
        case 'wiredrewards': {
            if ((parts[1] === 'open') && (parts.length >= 3)) {
                openWiredRewardView(parseInt(parts[2], 10));

                return;
            }

            break;
        }
        // `EarningsController.linkReceived`: habboUI/open/vault - what `HabboCatalog.openVault` sends.
        case 'habboUI': {
            if ((parts.length >= 3) && (parts[1] === 'open') && (parts[2] === 'vault')) {
                showEarnings(send);

                return;
            }

            // `HabboClubCenter.linkReceived`: habboUI/open/hccenter - `openClubCenter` / `verifyClubLevel`.
            // The club centre's own mount (`CatalogClubCenterComponent`) runs `showClubCenter`.
            if ((parts.length >= 3) && (parts[1] === 'open') && (parts[2] === 'hccenter')) {
                showWindow('club_center');

                return;
            }

            break;
        }
        // `CursedDragonAdoptionController.linkReceived`: cursed_dragon_adoption/open.
        case 'cursed_dragon_adoption': {
            if ((parts.length >= 2) && (parts[1] === 'open')) {
                openCursedDragonAdoption(send);

                return;
            }

            break;
        }
        // `SpecialItemsController.linkReceived`: special_items_display/<key>.
        case 'special_items_display': {
            if (parts.length >= 2) {
                openSpecialItemsDisplay(send, parts[1]);

                return;
            }

            break;
        }
        // `SelfDonationTool.linkReceived`: selfdonation/open, sandbox hotels only.
        case 'selfdonation': {
            if (parts[1] === 'open') {
                openWiredSelfDonation();

                return;
            }

            break;
        }
        /*
         * `HabboGroupsManager.linkReceived`: group/<id> opens that group's details window. Sent
         * here rather than through `openGroupInfo` so the link router keeps importing commands one
         * way only - `groupCommands` raises links, it does not answer them.
         */
        case 'group': {
            const groupId = parseInt(parts[1] ?? '', 10);

            if (groupId > 0) send(new GetHabboGroupDetailsComposer({ groupId, openDetails: true }));

            return;
        }
        // `GroupForumController.linkReceived`: groupforum/list/<active|popular|my>, groupforum/<group>[/<thread>[/<index>]].
        case 'groupforum': {
            openGroupForumLink(send, parts);

            return;
        }
        // `DailyTasksController.linkReceived`: dailytasks/open, with `dailytasks.enabled` on.
        case 'dailytasks': {
            openDailyTasksLink(parts);

            return;
        }
        // `RewardTrackController.linkReceived`: reward_track/open/<track id>.
        case 'reward_track': {
            openRewardTrackLink(parts);

            return;
        }
        // `HabboNuxDialogs.linkReceived`: nux/lobbyoffer/show, any other nux/lobbyoffer hides it.
        case 'nux': {
            if (parts[1] !== 'lobbyoffer') break;

            if (parts[2] === 'show') showNoobLobbyOffer(send);
            else hideNoobLobbyOffer();

            return;
        }
        // `RoomThumbnailCameraWidget.linkReceived`: roomThumbnailCamera/open.
        case 'roomThumbnailCamera': {
            openRoomThumbnailCameraLink(parts);

            return;
        }
        // `BadgeLeaderboardController.linkReceived`: badge_leaderboard/<type>/<rarity>/<page>.
        case 'badge_leaderboard': {
            openBadgeLeaderboardLink(send, parts);

            return;
        }
        // `CollectiblesController.linkReceived`: `collectibles/open`; anything else under it does nothing.
        case 'collectibles': {
            if ((parts.length >= 2) && (parts[1] === 'open')) showWindow('collectibles');

            return;
        }
        // `HabboFriendList.linkReceived`: `open`, and `openchat/<a>:<b>` - a conversation with whichever id is not the user's own.
        case 'friendlist': {
            if (parts[1] === 'open') {
                showWindow('friendlist');

                return;
            }

            if (parts[1] === 'openchat') {
                const ids = (parts[2] ?? '').split(':');

                if (ids.length < 2) return;

                const other = Number((ids[0] === String(userStore.getState().userId)) ? ids[1] : ids[0]);

                if (other > 0) {
                    showWindow('friendlist');
                    openMessengerConversation(send, other);
                }

                return;
            }

            break;
        }
        // `HabboFriendBarView.linkReceived`: `friendbar/findfriends` asks the server for a room with
        // people to meet (`findNewFriends`); `friendbar/user/<name>` shows that user's profile (`showProfileByName`).
        case 'friendbar': {
            if (parts[1] === 'findfriends') findNewFriends(send);
            else if ((parts[1] === 'user') && (parts.length > 2)) send(new GetExtendedProfileByNameComposer({ userName: parts[2] }));

            return;
        }
        // `CameraWidgetHandler.linkReceived`: `camera/open` is the toolbar's camera icon, for whoever has the `CAMERA` perk (`openCamera`).
        case 'camera': {
            if ((parts[1] === 'open') && (userStore.getState().perks.get(PerkCodes.Camera)?.isAllowed === true)) startTakingPhoto();

            return;
        }
        // `HabboPagesViewer.linkReceived`: `habbopages/<page>`, the page being everything after the first `/`.
        case 'habbopages': {
            if (parts.length >= 2) openHabboPage(parts.slice(1).join('/'));

            return;
        }
        // `BottomBarLeft.linkReceived`: `toolbar/memenu` toggles the me menu (`memenu.toggleVisibility()`);
        // `toolbar/highlight/<catalog|navigator|memenu>` points the hint arrow at that icon.
        case 'toolbar': {
            if (parts[1] === 'memenu') {
                systemStore.getState().toggleToolbarMenu('me');

                return;
            }

            if ((parts[1] !== 'highlight') || (parts.length <= 2)) break;

            const icon = TOOLBAR_HIGHLIGHT_ICONS[parts[2]];

            if (icon) hintStore.getState().showHint(icon);

            return;
        }
        // `HabboMessenger.linkReceived`: `messenger/<id>` opens a conversation.
        case 'messenger': {
            if (parts.length >= 2) openMessengerConversation(send, Number(parts[1]) | 0);

            return;
        }
    }

    // A client module's prefix (`links.handle`): only links the client itself has no route for.
    const moduleHandlers = clientModulesStore.getState().linkHandlers.filter(handler => handler.prefix === parts[0]);

    for (const handler of moduleHandlers) {
        try {
            handler.handle(link);
        } catch (error) {
            NitroLogger.error('ClientModules', `${handler.moduleKey}: link ${link} threw`, error);
        }
    }

    if (moduleHandlers.length) return;

    NitroLogger.log(`Unhandled client link: ${link}`);
};
