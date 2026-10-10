/**
 * The collectibles hub - `CollectiblesView`, drawn from its template `collectible_view_xml`: the
 * collector header, the tab row and the container of the selected tab (`refresh` shows one of the
 * eight and hides the rest). Each tab (`Collectibles*Tab`) draws its own container out of this
 * template (`CollectiblesTabWindow`), so here the containers are all hidden and the selected tab's
 * is drawn where its own is.
 *
 * The header: the score and high score and the level badge (`onCollectionsScoreMessage`, which
 * tints both level ribbons by level), `LEVEL` upper-cased from `collectibles.level`, and the silver
 * and emerald balances (`updateBalances`, from the purse).
 *
 * The tab row is the layout's `top_view_select_tab_context`. The minting, transfer and shop tabs
 * show only with `nft.minting.enabled`, `collectibles.transfer.enabled` and `nft.shop.enabled`;
 * the collector profile and levels tabs are hidden in the layout and nothing shows them. A hidden
 * tab takes no room, and `centerTabLayout` centres the rest in the window (`selector.x`), with the
 * dark `tab_bg` under them once they are wider than 350.
 */
import { useLayoutEffect, useRef, useState } from 'react';

import { selectCollectiblesTab } from '#base/commands';
import { COLLECTIBLES_TAB_COLLECTIONS, COLLECTIBLES_TAB_INFO, COLLECTIBLES_TAB_MINT, COLLECTIBLES_TAB_REWARDS, COLLECTIBLES_TAB_SHOP, COLLECTIBLES_TAB_TRANSFER, useCollectiblesStore } from '#base/context/collectibles';
import { useConfigValue, useTranslation, useWindowActions } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { TemplateWindow, TemplateWindows, useTemplateFrame } from '#base/theme';

import { CollectiblesCollectionsTab } from './CollectiblesCollectionsTab';
import { CollectiblesInfoTab } from './CollectiblesInfoTab';
import { CollectiblesMintingTab } from './CollectiblesMintingTab';
import { CollectiblesRewardsTab } from './CollectiblesRewardsTab';
import { CollectiblesShopTab } from './CollectiblesShopTab';
import { COLLECTIBLES_TEMPLATE } from './collectiblesTemplate';
import { CollectiblesTransferTab } from './CollectiblesTransferTab';

/** The window's width - `centerTabLayout` centres the tabs on half of it. */
const WINDOW_WIDTH = 500;
/** `centerTabLayout` shows `tab_bg` once the visible tabs are wider than this. */
const TAB_BG_MIN_WIDTH = 350;

/** The tab containers `hideAllTabContainers` hides. */
const TAB_CONTAINERS = [ 'collectorProfileContainer', 'collectionsContainer', 'levelsContainer', 'mintingContainer', 'transferContainer', 'infoContainer', 'shopContainer', 'rewardsContainer' ];

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
    const frame = useTemplateFrame({ id: 'CollectorHub', defaultPosition: { x: 59, y: 79 }, onClose: () => hideWindow('collectibles') });
    const currentTab = useCollectiblesStore(x => x.currentTab);
    const score = useCollectiblesStore(x => x.score);
    const highestScore = useCollectiblesStore(x => x.highestScore);
    const level = useCollectiblesStore(x => x.level);
    const levelColor = useCollectiblesStore(x => x.levelColor);
    const silver = useUserStore(x => x.silver);
    const emeralds = useUserStore(x => x.emeralds);
    const shopEnabled = useConfigValue<boolean>('nft.shop.enabled') === true;
    const mintingEnabled = useConfigValue<boolean>('nft.minting.enabled') === true;
    const transferEnabled = useConfigValue<boolean>('collectibles.transfer.enabled') === true;

    const flags: Record<string, boolean> = { 'nft.shop.enabled': shopEnabled, 'nft.minting.enabled': mintingEnabled, 'collectibles.transfer.enabled': transferEnabled };

    // The visible tabs' width as `centerTabLayout` measured it in the last layout, read once it is committed.
    const tabsWidth = useRef(0);
    const [ tabBgVisible, setTabBgVisible ] = useState(false);

    useLayoutEffect(() => setTabBgVisible(tabsWidth.current > TAB_BG_MIN_WIDTH));

    return (
        <TemplateWindow
            id={COLLECTIBLES_TEMPLATE}
            frame={frame}
            arrange={(windows) => {
                tabsWidth.current = centerTabLayout(windows);
            }}
            bindings={{
                '': {
                    children: (
                        <>
                            {(currentTab === COLLECTIBLES_TAB_MINT) && <CollectiblesMintingTab />}
                            {(currentTab === COLLECTIBLES_TAB_COLLECTIONS) && <CollectiblesCollectionsTab />}
                            {(currentTab === COLLECTIBLES_TAB_SHOP) && <CollectiblesShopTab />}
                            {(currentTab === COLLECTIBLES_TAB_TRANSFER) && <CollectiblesTransferTab />}
                            {(currentTab === COLLECTIBLES_TAB_INFO) && <CollectiblesInfoTab />}
                            {(currentTab === COLLECTIBLES_TAB_REWARDS) && <CollectiblesRewardsTab />}
                        </>
                    ),
                },
                ...Object.fromEntries(TAB_CONTAINERS.map(name => [ name, { visible: false } ])),
                ...Object.fromEntries(TABS.map(tab => [ tab.name, {
                    visible: !tab.flag || flags[tab.flag],
                    caption: `\${${tab.caption}}`,
                    selected: currentTab === tab.name,
                    onPointerTap: () => selectCollectiblesTab(tab.name),
                } ])),
                current_score_value: { caption: String(score) },
                current_hiscore_value: { caption: String(highestScore) },
                collector_level: { caption: String(level) },
                level_title: { caption: t('collectibles.level').toUpperCase() },
                collector_level_bg: { color: levelColor },
                collector_level_bg2: { color: levelColor },
                silver_currency_value: { caption: String(silver) },
                emerald_currency_value: { caption: String(emeralds) },
                tab_bg: { visible: tabBgVisible },
            }}
        />
    );
};
