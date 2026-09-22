import { useFriendsStore } from '#base/context/friend';
import { useSystemActions, useTranslation, useWindowParams } from '#base/context/system';
import { useFriendRequests } from '#base/context/user';
import { Accordion, Box, ColorLayer, Frame, ThemeText } from '#base/theme';

import { FriendListFriends } from './FriendListFriends';
import { FriendListRequests } from './FriendListRequests';
import { FriendListSearch } from './FriendListSearch';

export type FriendListViewWindowParams = { tab?: '' | 'friends' | 'requests' | 'search' };

/** `FriendListTabs._windowWidth` - the window's width, `FriendListView.prepare`'s `width = 230`. */
const WINDOW_WIDTH = 230;
/** `FriendListView.prepare`'s `height = 350`, the window with a tab open. */
const WINDOW_HEIGHT_OPEN = 350;
/** The height of a tab's `header` - its 18px header bitmap. */
const TAB_HEADER_HEIGHT = 18;
/**
 * What `refreshWindowSize` adds around `main_content`: the 25px content margin above it, the
 * 30px `footer` under it and the 5 the window's height (`content.height + 30`) leaves below that.
 */
const WINDOW_CHROME_HEIGHT = 60;

/**
 * The friend list window - `main_window` as `FriendListView` / `FriendListTabsView` fill it. The
 * content sits at the frame's own margins (0, 25, 0, 0); `main_content` is a black container one
 * pixel in from each side, the visible tabs stacked in it from y 1 with a black pixel under the
 * last, and the `footer` under it carries the white `info_text` at (105, 11) that
 * `FriendListView.showInfo` fills with the hovered control's tip. `open_edit_ctgs_but` is hidden:
 * `friendship.category.management.enabled` is not set.
 *
 * With every tab closed the window is as tall as its headers (`content.height + 30`); with one
 * open it keeps `prepare`'s 350 and the open tab takes what the headers leave, which is where
 * `onWindow`'s resize handling leaves `tabContentHeight`. The scaler only shows with a tab open.
 */
export const FriendListView = () => {
    const { tab: activeTab = 'friends' } = useWindowParams('friendlist');

    const { toggleWindow, updateWindowParams } = useSystemActions();
    const tooltip = useFriendsStore(x => x.tooltip);
    const requests = useFriendRequests();

    const t = useTranslation();

    const setActiveTab = (tab: string) => {
        updateWindowParams('friendlist', { tab: tab as FriendListViewWindowParams['tab'] });
    };

    // `FriendListTabsView.isTabVisible`: the requests tab only while there are requests.
    const visibleTabs = Object.keys(requests).length ? 3 : 2;
    const closedHeight = (visibleTabs * TAB_HEADER_HEIGHT) + 2 + WINDOW_CHROME_HEIGHT;

    return (
        <Frame
            variant="0"
            id="friendlist"
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            defaultPosition={{ x: 20, y: 20 }}
            resizeDirection={activeTab ? 'all' : 'none'}
            layout={{ position: 'absolute', width: WINDOW_WIDTH, height: activeTab ? WINDOW_HEIGHT_OPEN : closedHeight, minWidth: 220 }}
            margins={[ 0, 25, 0, 0 ]}
            caption={t('friendlist.friends')}
            onClose={() => toggleWindow('friendlist')}
        >
            <Box layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, flexDirection: 'column' }}>
                <Accordion
                    collapsible
                    value={activeTab}
                    onValueChange={setActiveTab}
                    layout={{ position: 'relative', flex: activeTab ? 1 : undefined, flexShrink: 0, minHeight: 0, marginLeft: 1, marginRight: 1, paddingTop: 1, paddingBottom: 1 }}
                >
                    <ColorLayer color="#000000" />
                    <FriendListFriends value="friends" />
                    <FriendListRequests value="requests" />
                    <FriendListSearch value="search" />
                </Accordion>
                <Box layout={{ position: 'relative', width: '100%', height: 35, flexShrink: 0 }}>
                    <ThemeText
                        text={t(tooltip)}
                        textStyle="regular"
                        textOptions={{ fill: '#ffffff' }}
                        flashFormat={{ antiAliasType: 'advanced' }}
                        clip
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 105, right: 0, top: 11, height: 20 }}
                    />
                </Box>
            </Box>
        </Frame>
    );
};
