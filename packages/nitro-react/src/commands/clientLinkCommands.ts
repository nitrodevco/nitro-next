import { NitroLogger } from '@nitrodevco/nitro-api';
import { ForwardToSomeRoomComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { systemStore, WindowParams } from '#base/context/system';
import { getWiredHasReadPermission, getWiredMenuEnabled } from '#base/context/wired';

import { showEarnings } from './earningsCommands';
import { habbiconsEnabled, openHabbiconHub } from './habbiconCommands';
import { forwardToRoom, goToHomeRoom, searchNavigator, searchRoomTag } from './navigatorCommands';
import { openSpecialItemsDisplay } from './specialItemsCommands';
import { openWiredRewardView, openWiredSelfDonation } from './wiredTradingCommands';

type Send = WebSocketConnection['send'];

/** `HabboNewNavigator.getSearchCodeForTabLink`. */
const TAB_LINK_SEARCH_CODES: Record<string, string> = { me: 'myworld_view' };

const INVENTORY_TABS: WindowParams<'inventory'>['tab'][] = [ 'furni', 'pets', 'bots', 'badges' ];

/** `WiredMenuTabConfigs.TAB_*_ID` - the wired menu tabs a link can route further into. */
const WIRED_MENU_TAB_MONITOR = 'monitor';
const WIRED_MENU_TAB_OVERVIEW = 'variable_overview';
const WIRED_MENU_TAB_INSPECTION = 'inspection';

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
 * Only the links whose destination exists in this client are routed; the rest are logged rather
 * than dropped silently, the way each Flash component logged its own unknown link type.
 */
export const openClientLink = (send: Send, link: string) => {
    const parts = link.split('/');
    const { showWindow, hideWindow } = systemStore.getState();

    switch (parts[0]) {
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
        // `CollectiblesController.linkReceived`: `collectibles/open`; anything else under it does nothing.
        case 'collectibles': {
            if ((parts.length >= 2) && (parts[1] === 'open')) showWindow('collectibles');

            return;
        }
        // `HabboFriendList.linkReceived`; `openchat` needs the messenger, which has no window yet.
        case 'friendlist': {
            if (parts[1] === 'open') {
                showWindow('friendlist');

                return;
            }

            break;
        }
    }

    NitroLogger.log(`Unhandled client link: ${link}`);
};
