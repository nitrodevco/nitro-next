/**
 * The collectibles hub - `CollectiblesView` on `collectible_view.xml` (500 x 600, style 3 frame,
 * `#2a2a2a`, content margins 6/35/6/6): the collector header, the tab row and the container of the
 * selected tab (`refresh` shows one of the eight and hides the rest).
 *
 * The tab row is the layout's `top_view_select_tab_context`. The minting, transfer and shop tabs
 * show only with `nft.minting.enabled`, `collectibles.transfer.enabled` and `nft.shop.enabled`;
 * the collector profile and levels tabs are hidden in the layout and nothing shows them. A hidden
 * tab takes no room, and `centerTabLayout` centres the rest in the window (`selector.x`), with the
 * dark `tab_bg` under them once they are wider than 350.
 *
 * The collector profile and levels containers are never shown (their tabs are hidden), so they are
 * not drawn. Every tab was built with the hub; only the selected one is drawn here.
 */
import { selectCollectiblesTab } from '#base/commands';
import { COLLECTIBLES_TAB_COLLECTIONS, COLLECTIBLES_TAB_INFO, COLLECTIBLES_TAB_MINT, COLLECTIBLES_TAB_REWARDS, COLLECTIBLES_TAB_SHOP, COLLECTIBLES_TAB_TRANSFER, useCollectiblesStore } from '#base/context/collectibles';
import { useConfigValue, useTranslation, useWindowActions } from '#base/context/system';
import { Box, Frame, TabButton, TabContext } from '#base/theme';

import { CollectiblesCollectionsTab } from './CollectiblesCollectionsTab';
import { CollectiblesHeaderView } from './CollectiblesHeaderView';
import { CollectiblesInfoTab } from './CollectiblesInfoTab';
import { CollectiblesMintingTab } from './CollectiblesMintingTab';
import { CollectiblesRewardsTab } from './CollectiblesRewardsTab';
import { CollectiblesShopTab } from './CollectiblesShopTab';
import { CollectiblesTransferTab } from './CollectiblesTransferTab';

/** The window's width - `centerTabLayout` centres the tabs on half of it. */
const WINDOW_WIDTH = 500;

/** The tab buttons in the layout's order, with their widths and the captions `CollectiblesView` gives them. */
const TABS = [
    { name: COLLECTIBLES_TAB_REWARDS, width: 72, caption: 'collectibles.claim.title', flag: undefined },
    { name: COLLECTIBLES_TAB_COLLECTIONS, width: 87, caption: 'collectibles.collections.title', flag: undefined },
    { name: COLLECTIBLES_TAB_SHOP, width: 52, caption: 'collectibles.shop.title', flag: 'nft.shop.enabled' },
    { name: COLLECTIBLES_TAB_MINT, width: 66, caption: 'shop.minting.title', flag: 'nft.minting.enabled' },
    { name: COLLECTIBLES_TAB_TRANSFER, width: 70, caption: 'collectibles.transfer', flag: 'collectibles.transfer.enabled' },
    { name: COLLECTIBLES_TAB_INFO, width: 46, caption: 'collectibles.info.title', flag: undefined },
] as const;

export const CollectiblesView = () => {
    const t = useTranslation();
    const { hideWindow } = useWindowActions();
    const currentTab = useCollectiblesStore(x => x.currentTab);
    const shopEnabled = useConfigValue<boolean>('nft.shop.enabled') === true;
    const mintingEnabled = useConfigValue<boolean>('nft.minting.enabled') === true;
    const transferEnabled = useConfigValue<boolean>('collectibles.transfer.enabled') === true;

    const flags: Record<string, boolean> = { 'nft.shop.enabled': shopEnabled, 'nft.minting.enabled': mintingEnabled, 'collectibles.transfer.enabled': transferEnabled };
    const tabs = TABS.filter(tab => !tab.flag || flags[tab.flag]);
    const tabsWidth = tabs.reduce((width, tab) => width + tab.width, 0);
    // `selector.x = window.width / 2 - width / 2`, an int.
    const tabsLeft = Math.trunc((WINDOW_WIDTH / 2) - (tabsWidth / 2));

    return (
        <Frame
            variant="3"
            id="CollectorHub"
            name="CollectorHub"
            caption={t('collectibles.title')}
            tintColor="#2a2a2a"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={() => hideWindow('collectibles')}
            resizeDirection="none"
            defaultPosition={{ x: 59, y: 79 }}
            layout={{ position: 'absolute', width: 500, height: 600 }}
            margins={[ 6, 35, 6, 6 ]}
        >
            <CollectiblesHeaderView tabBackgroundVisible={tabsWidth > 350} />
            <TabContext
                variant="3"
                name="top_view_select_tab_context"
                tintColor="#dfdfe1"
                layout={{ position: 'absolute', left: -5, width: 498, top: 89, height: 34 }}
            >
                <Box layout={{ position: 'absolute', left: tabsLeft, top: 0, height: 32, flexDirection: 'row' }}>
                    {tabs.map(tab => (
                        <TabButton
                            key={tab.name}
                            variant="3"
                            name={tab.name}
                            selected={currentTab === tab.name}
                            onPointerTap={() => selectCollectiblesTab(tab.name)}
                            layout={{ width: tab.width, height: 32, flexShrink: 0 }}
                        >
                            {t(tab.caption)}
                        </TabButton>
                    ))}
                </Box>
            </TabContext>
            {(currentTab === COLLECTIBLES_TAB_MINT) && <CollectiblesMintingTab />}
            {(currentTab === COLLECTIBLES_TAB_COLLECTIONS) && <CollectiblesCollectionsTab />}
            {(currentTab === COLLECTIBLES_TAB_SHOP) && <CollectiblesShopTab />}
            {(currentTab === COLLECTIBLES_TAB_TRANSFER) && <CollectiblesTransferTab />}
            {(currentTab === COLLECTIBLES_TAB_INFO) && <CollectiblesInfoTab />}
            {(currentTab === COLLECTIBLES_TAB_REWARDS) && <CollectiblesRewardsTab />}
        </Frame>
    );
};
