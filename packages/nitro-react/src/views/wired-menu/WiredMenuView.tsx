/**
 * The wired menu window ("wired creator tools") - `WiredMenuView` on `wired_menu_view_xml`: the
 * tab row, the header with the tab's title over the wired box pattern and the Discord link, and
 * the body the active tab fills, with the translucent `loading_view` over it (and "loading" in the
 * caption) while the tab waits for its data (`WiredMenuDefaultTab.updateLoadingState`).
 *
 * Only enabled tabs get a button, and the buttons share the row's width equally (`alignTabs`):
 * the info tab is disabled, so five tabs of 100.
 *
 * Being up is being viewed: mounting marks the menu as viewed and starts the active tab
 * (`show` -> `startViewing`), a tab switch stops one tab and starts the next (`setActiveTab`), and
 * unmounting stops it (`hide`). The active tab is ticked every 100 ms for its polls, where Flash
 * checked them every frame.
 */
import { useEffect } from 'react';

import { initializeWiredMenu, pollWiredMenuTab, selectWiredMenuTab, setWiredMenuViewing, startViewingWiredMenuTab, stopViewingWiredMenuTab } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useTranslation, useWindowActions } from '#base/context/system';
import { useWiredStore, WIRED_INSPECTION_STATE_AWAITING_VARIABLES, WIRED_INSPECTION_STATE_FETCHING, WIRED_MENU_TAB_CHESTS, WIRED_MENU_TAB_INSPECTION, WIRED_MENU_TAB_MONITOR, WIRED_MENU_TAB_OVERVIEW, WIRED_MENU_TAB_SETTINGS, WIRED_MENU_TABS } from '#base/context/wired';
import { useWiredMenuLinkRequest } from '#base/hooks';
import { Box, Frame, LayoutImage, Region, TabButton, TabContext, ThemeImage, ThemeText } from '#base/theme';

import { WiredMenuChestsTab } from './WiredMenuChestsTab';
import { WiredMenuInspectionTab } from './WiredMenuInspectionTab';
import { WiredMenuMonitorTab } from './WiredMenuMonitorTab';
import { WiredMenuOverviewTab } from './WiredMenuOverviewTab';
import { WiredMenuSettingsTab } from './WiredMenuSettingsTab';

const FRAME_WIDTH = 500;
const FRAME_HEIGHT = 500;
/** How often the active tab's `update` runs. */
const TAB_TICK_MS = 100;
/** `header_detail`: the wired box pattern, alternately 20 below and 20 above the header's top. */
const HEADER_PATTERN = [ 8, 78, 148, 218, 288, 358, 428 ];

const ENABLED_TABS = WIRED_MENU_TABS.filter(tab => tab.enabled);

/** `isLoading` of the active tab: its `isDataReady` is false. */
const useWiredMenuTabLoading = (tabId: string): boolean => {
    const monitorLoading = useWiredStore(x => (x.monitorStats === null) || (x.monitorErrors === null));
    const overviewLoading = useWiredStore(x => x.overviewVariables === null);
    const inspectionLoading = useWiredStore(x => (x.inspectionState === WIRED_INSPECTION_STATE_FETCHING) || (x.inspectionState === WIRED_INSPECTION_STATE_AWAITING_VARIABLES));
    const chestsLoading = useWiredStore(x => x.chestsPreview === null);
    const settingsLoading = useWiredStore(x => (x.settingsModifyMask === -1) || (x.settingsReadMask === -1) || (x.settingsTimezone === null));

    switch (tabId) {
        case WIRED_MENU_TAB_MONITOR: return monitorLoading;
        case WIRED_MENU_TAB_OVERVIEW: return overviewLoading;
        case WIRED_MENU_TAB_INSPECTION: return inspectionLoading;
        case WIRED_MENU_TAB_CHESTS: return chestsLoading;
        case WIRED_MENU_TAB_SETTINGS: return settingsLoading;
        default: return false;
    }
};

export const WiredMenuView = () => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const { hideWindow } = useWindowActions();
    const activeTab = useWiredStore(x => x.menuActiveTab);
    const discordLink = useConfigValue<string>('wired.discord.link') ?? '';
    const loading = useWiredMenuTabLoading(activeTab);

    useEffect(() => {
        initializeWiredMenu(send);
        setWiredMenuViewing(true);

        return () => setWiredMenuViewing(false);
    }, [ send ]);

    useEffect(() => {
        startViewingWiredMenuTab(send, activeTab);

        const timer = setInterval(() => pollWiredMenuTab(send, activeTab), TAB_TICK_MS);

        return () => {
            clearInterval(timer);
            stopViewingWiredMenuTab(activeTab);
        };
    }, [ send, activeTab ]);

    // After the tab has started: a link may select another tab and act on it.
    useWiredMenuLinkRequest();

    const tabWidth = FRAME_WIDTH / ENABLED_TABS.length;

    return (
        <Frame
            variant="3"
            id="wiredmenu_frame"
            caption={t(loading ? 'wiredmenu.title.loading' : 'wiredmenu.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            resizeDirection="none"
            defaultPosition={{ x: 36, y: 35 }}
            onClose={() => hideWindow('wired_menu')}
            layout={{ position: 'absolute', width: FRAME_WIDTH, height: FRAME_HEIGHT }}
        >
            <TabContext
                variant="3"
                layout={{ position: 'absolute', left: 0, top: 2, width: FRAME_WIDTH, height: 30 }}
            >
                {ENABLED_TABS.map((tab, index) => (
                    <TabButton
                        key={tab.id}
                        variant="3"
                        selected={tab.id === activeTab}
                        onPointerTap={() => selectWiredMenuTab(tab.id)}
                        layout={{ position: 'absolute', left: index * tabWidth, top: 0, width: tabWidth, height: 32 }}
                    >
                        {t(`wiredmenu.${tab.id}.tab`, `wiredmenu.${tab.id}.tab`)}
                    </TabButton>
                ))}
            </TabContext>
            <Box layout={{ position: 'absolute', left: 1, top: 32, width: 498, height: 50, overflow: 'hidden' }}>
                <Region
                    backgroundColor="#486f81"
                    layout={{ position: 'absolute', left: 0, top: 0, width: 498, height: 50 }}
                >
                    <Region
                        backgroundColor="#235061"
                        layout={{ position: 'absolute', left: 2, top: 2, width: 494, height: 46 }}
                    />
                </Region>
                {HEADER_PATTERN.map((left, index) => (
                    <ThemeImage
                        key={left}
                        src={LayoutImage('wired/wired_box_lines.png')}
                        alpha={0.3}
                        layout={{ position: 'absolute', left, top: (index % 2) ? -20 : 20, width: 64, height: 51 }}
                    />
                ))}
                <ThemeText
                    text={t(`wiredmenu.${activeTab}.title`, activeTab)}
                    textStyle="text-style-u-headline-medium"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, top: 14, width: FRAME_WIDTH, height: 21 }}
                />
                <Region
                    dynamicStyle="brightness_and_shadow_under"
                    tooltip={t('wiredmenu.discord_region.tooltip', 'wiredmenu.discord_region.tooltip')}
                    cursor="pointer"
                    onPointerTap={() => {
                        if (discordLink.length) window.open(discordLink, '_blank', 'noopener');
                    }}
                    layout={{ position: 'absolute', left: 473, top: 3, width: 22, height: 25 }}
                >
                    <ThemeImage
                        dynamicRole="icon"
                        src={LayoutImage('wired/icon_discord.png')}
                        layout={{ position: 'absolute', left: 0, top: 1, width: 22, height: 23 }}
                    />
                </Region>
            </Box>
            <Box layout={{ position: 'absolute', left: 0, top: 82, width: FRAME_WIDTH, height: 382 }}>
                {(activeTab === WIRED_MENU_TAB_MONITOR) && <WiredMenuMonitorTab />}
                {(activeTab === WIRED_MENU_TAB_OVERVIEW) && <WiredMenuOverviewTab />}
                {(activeTab === WIRED_MENU_TAB_INSPECTION) && <WiredMenuInspectionTab />}
                {(activeTab === WIRED_MENU_TAB_CHESTS) && <WiredMenuChestsTab />}
                {(activeTab === WIRED_MENU_TAB_SETTINGS) && <WiredMenuSettingsTab />}
                {loading && (
                    // `loading_view`: it covers the body and swallows its clicks.
                    <Region
                        backgroundColor="#e9e9e1"
                        alpha={0.6}
                        onPointerDown={event => event.stopPropagation()}
                        layout={{ position: 'absolute', left: 0, top: 0, width: FRAME_WIDTH, height: 382 }}
                    />
                )}
            </Box>
        </Frame>
    );
};
