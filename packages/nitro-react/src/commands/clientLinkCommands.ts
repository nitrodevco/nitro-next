import { NitroLogger } from '@nitrodevco/nitro-api';
import { ForwardToSomeRoomComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { systemStore, WindowParams } from '#base/context/system';

import { forwardToRoom, goToHomeRoom, searchNavigator, searchRoomTag } from './navigatorCommands';

type Send = WebSocketConnection['send'];

/** `HabboNewNavigator.getSearchCodeForTabLink`. */
const TAB_LINK_SEARCH_CODES: Record<string, string> = { me: 'myworld_view' };

const INVENTORY_TABS: WindowParams<'inventory'>['tab'][] = [ 'furni', 'pets', 'bots', 'badges' ];

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
    const { showWindow } = systemStore.getState();

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
                    if (parts.length > 2) showWindow('catalog', { pageName: parts[2] });
                    else showWindow('catalog');

                    return;
                }
            }

            break;
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
