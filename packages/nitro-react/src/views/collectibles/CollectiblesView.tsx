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
import { useState } from 'react';

import { selectCollectiblesTab } from '#base/commands';
import { COLLECTIBLES_TAB_COLLECTIONS, COLLECTIBLES_TAB_INFO, COLLECTIBLES_TAB_MINT, COLLECTIBLES_TAB_REWARDS, COLLECTIBLES_TAB_SHOP, COLLECTIBLES_TAB_TRANSFER, useCollectiblesStore } from '#base/context/collectibles';
import { useConfigValue, useTranslation, useWindowActions } from '#base/context/system';
import { Box, Frame, TemplateWindow, TemplateWindows } from '#base/theme';

import { CollectiblesCollectionsTab } from './CollectiblesCollectionsTab';
import { CollectiblesHeaderView } from './CollectiblesHeaderView';
import { CollectiblesInfoTab } from './CollectiblesInfoTab';
import { CollectiblesMintingTab } from './CollectiblesMintingTab';
import { CollectiblesRewardsTab } from './CollectiblesRewardsTab';
import { CollectiblesShopTab } from './CollectiblesShopTab';
import { CollectiblesTransferTab } from './CollectiblesTransferTab';

/** The layout the tab row is drawn from: `TabButtonController` sizes each tab to its caption. */
const TEMPLATE = 'habbo-catalog-com/collectible_view_xml';

/** The window's width - `centerTabLayout` centres the tabs on half of it. */
const WINDOW_WIDTH = 500;

/** The tab buttons `refresh` can show, with the captions `CollectiblesView` gives them. */
const TABS = [
    { name: COLLECTIBLES_TAB_REWARDS, caption: 'collectibles.claim.title', flag: undefined },
    { name: COLLECTIBLES_TAB_COLLECTIONS, caption: 'collectibles.collections.title', flag: undefined },
    { name: COLLECTIBLES_TAB_SHOP, caption: 'collectibles.shop.title', flag: 'nft.shop.enabled' },
    { name: COLLECTIBLES_TAB_MINT, caption: 'shop.minting.title', flag: 'nft.minting.enabled' },
    { name: COLLECTIBLES_TAB_TRANSFER, caption: 'collectibles.transfer', flag: 'collectibles.transfer.enabled' },
    { name: COLLECTIBLES_TAB_INFO, caption: 'collectibles.info.title', flag: undefined },
] as const;

/**
 * `centerTabLayout`: a hidden tab is made 0 wide, and the selector goes to the middle of the window
 * less half the visible tabs' width (an int). Returns that width.
 */
const centerTabLayout = ({ find }: TemplateWindows): number => {
    const selector = find(COLLECTIBLES_TAB_REWARDS)?.parent;

    if (!selector) return 0;

    let width = 0;

    for (const tab of selector.children) {
        if (tab.visible) width += tab.width;
        else tab.setWidth(0);
    }

    selector.setX(Math.trunc((WINDOW_WIDTH / 2) - (width / 2)));

    return width;
};

export const CollectiblesView = () => {
    const t = useTranslation();
    const { hideWindow } = useWindowActions();
    const currentTab = useCollectiblesStore(x => x.currentTab);
    const shopEnabled = useConfigValue<boolean>('nft.shop.enabled') === true;
    const mintingEnabled = useConfigValue<boolean>('nft.minting.enabled') === true;
    const transferEnabled = useConfigValue<boolean>('collectibles.transfer.enabled') === true;

    const flags: Record<string, boolean> = { 'nft.shop.enabled': shopEnabled, 'nft.minting.enabled': mintingEnabled, 'collectibles.transfer.enabled': transferEnabled };
    // `tab_bg` darkens the row once the visible tabs are wider than 350.
    const [ tabsWidth, setTabsWidth ] = useState(0);

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
            <Box layout={{ position: 'absolute', left: -5, top: 89 }}>
                <TemplateWindow
                    id={TEMPLATE}
                    part="top_view_select_tab_context"
                    bindings={Object.fromEntries(TABS.map(tab => [ tab.name, {
                        visible: !tab.flag || flags[tab.flag],
                        caption: `\${${tab.caption}}`,
                        selected: currentTab === tab.name,
                        onPointerTap: () => selectCollectiblesTab(tab.name),
                    } ]))}
                    arrange={windows => setTabsWidth(centerTabLayout(windows))}
                />
            </Box>
            {(currentTab === COLLECTIBLES_TAB_MINT) && <CollectiblesMintingTab />}
            {(currentTab === COLLECTIBLES_TAB_COLLECTIONS) && <CollectiblesCollectionsTab />}
            {(currentTab === COLLECTIBLES_TAB_SHOP) && <CollectiblesShopTab />}
            {(currentTab === COLLECTIBLES_TAB_TRANSFER) && <CollectiblesTransferTab />}
            {(currentTab === COLLECTIBLES_TAB_INFO) && <CollectiblesInfoTab />}
            {(currentTab === COLLECTIBLES_TAB_REWARDS) && <CollectiblesRewardsTab />}
        </Frame>
    );
};
