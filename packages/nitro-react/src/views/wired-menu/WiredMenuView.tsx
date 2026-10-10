/**
 * The wired menu window ("wired creator tools") - `WiredMenuView`, drawn from its template
 * `wired_menu_view_xml`: the frame, the tab row, the header with the tab's title over the wired box
 * pattern and the Discord link, and the body the active tab fills, with the translucent
 * `loading_view` over it (and "loading" in the caption) while the tab waits for its data
 * (`WiredMenuDefaultTab.updateLoadingState`).
 *
 * `alignTabs`: a disabled tab's button is hidden and 0 wide, the others share the strip equally
 * (`tabItem.parent.width / enabled`, the selector's width - the context's 500 less the 8 it is
 * inset by at either end), and the selector packs them. `initializeTabs` / `setActiveTab`: every
 * tab's `<id>_container` is hidden but the active one's. Each tab (`WiredMenu*Tab`) draws its own
 * container out of this template (`TemplateWindow`'s `part`) with its own bindings, so here the
 * containers are all hidden and the active tab's is drawn in `body_container`, where its own is.
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
import { Region, TemplateWindow, TemplateWindows } from '#base/theme';

import { WiredMenuChestsTab } from './WiredMenuChestsTab';
import { WiredMenuInspectionTab } from './WiredMenuInspectionTab';
import { WiredMenuMonitorTab } from './WiredMenuMonitorTab';
import { WiredMenuOverviewTab } from './WiredMenuOverviewTab';
import { WiredMenuSettingsTab } from './WiredMenuSettingsTab';

const FRAME_WIDTH = 500;
/** How often the active tab's `update` runs. */
const TAB_TICK_MS = 100;
/**
 * `alignTabs`: the disabled tabs' buttons take no room; the enabled ones get an equal share of the
 * selector, truncated as Flash's `int` width truncates it.
 */
const alignTabs = ({ find }: TemplateWindows) => {
    const enabled = WIRED_MENU_TABS.filter(tab => tab.enabled).length;

    for (const tab of WIRED_MENU_TABS) {
        const button = find(`top_view_${tab.id}_button`);

        if (!button) continue;

        button.setWidth(tab.enabled ? Math.trunc((button.parent?.width ?? FRAME_WIDTH) / enabled) : 0);
    }
};

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

    return (
        <TemplateWindow
            id="habbo-user-defined-room-events-com/wired_menu_view_xml"
            frame={{ id: 'wiredmenu_frame', defaultPosition: { x: 36, y: 35 }, onClose: () => hideWindow('wired_menu') }}
            arrange={alignTabs}
            bindings={{
                '': { caption: t(loading ? 'wiredmenu.title.loading' : 'wiredmenu.title') },
                ...Object.fromEntries(WIRED_MENU_TABS.map(tab => [
                    `top_view_${tab.id}_button`,
                    { visible: tab.enabled, selected: tab.id === activeTab, onPointerTap: () => selectWiredMenuTab(tab.id) },
                ])),
                ...Object.fromEntries(WIRED_MENU_TABS.map(tab => [ `${tab.id}_container`, { visible: false } ])),
                header_title: { caption: t(`wiredmenu.${activeTab}.title`, activeTab) },
                discord_region: {
                    onPointerTap: () => {
                        if (discordLink.length) window.open(discordLink, '_blank', 'noopener');
                    },
                },
                loading_view: { visible: false },
                body_container: {
                    children: (
                        <>
                            {(activeTab === WIRED_MENU_TAB_MONITOR) && <WiredMenuMonitorTab />}
                            {(activeTab === WIRED_MENU_TAB_OVERVIEW) && <WiredMenuOverviewTab />}
                            {(activeTab === WIRED_MENU_TAB_INSPECTION) && <WiredMenuInspectionTab />}
                            {(activeTab === WIRED_MENU_TAB_CHESTS) && <WiredMenuChestsTab />}
                            {(activeTab === WIRED_MENU_TAB_SETTINGS) && <WiredMenuSettingsTab />}
                            {loading && (
                                // `loading_view`: it covers the body and swallows its clicks.
                                <Region
                                    backgroundColor="#e9e9e1"
                                    backgroundAlpha={0.6}
                                    onPointerDown={event => event.stopPropagation()}
                                    layout={{ position: 'absolute', left: 0, top: 0, width: FRAME_WIDTH, height: 382 }}
                                />
                            )}
                        </>
                    ),
                },
            }}
        />
    );
};
