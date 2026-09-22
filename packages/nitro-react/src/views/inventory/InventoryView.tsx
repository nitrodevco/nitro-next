/**
 * The inventory window - Flash `InventoryMainView` over `inventory_xml`: a style 3 frame (490x342,
 * content margins 6/35/6/6, width fixed, height down to 300) whose `top_content` holds the
 * `tabs` tab context, the `empty_container` and `loading_container` a page shows while it has
 * nothing to list, and the `contentArea` (5,35 468x261) the selected page draws in.
 *
 * - The frame opens at `DEFAULT_VIEW_LOCATION` (120,150) and scales only with
 *   `inventory.allow.scaling` (`getWindow`'s `setParamFlag(65536, ...)`).
 * - The tab context's `tab_content` (style 3) is drawn at 0,30 over the whole context, its
 *   `tab_selector` at 8,0, 32 high; each `tab_container_button` is as wide as its label (margins
 *   10 left and right, the text 7 down, `u_regular` from the Ubuntu theme) and they are laid
 *   left to right (`SelectorListController.updateSelectableRegion`).
 * - `getWindow` re-adds the tabs in layout order - furni, collectibles, rentables, pets, badges,
 *   bots. The port has four of those pages and keeps them all: `collectibles` (web3 trading),
 *   `rentables` (`duckets.enabled` without `mergeRentFurni`) are not ported, and `bots` shows only
 *   with `inventory.bots.enabled`, as it does in Flash.
 * - `empty_container` / `loading_container` follow `FurniView.updateContainerVisibility` on the
 *   furni page - loading until the list has arrived, empty while it holds nothing - and the
 *   empty page's `open_catalog_btn` opens the catalog (`InventoryMainView.windowEventProc`). The
 *   pets, bots and badges pages have no data yet, so they never show either.
 *
 * Not ported: `subContentArea` (the trading view Flash docks under the pages).
 */
import { useInventoryStore } from '#base/context/inventory';
import { useConfigValue, useSystemActions, useTranslation, useWindowParams, WindowParams } from '#base/context/system';
import { Button, Frame, LayoutImage, Region, TabButton, TabContent, TabContext, ThemeImage, ThemeText } from '#base/theme';

import { InventoryBadgesView } from './InventoryBadgesView';
import { InventoryBotsView } from './InventoryBotsView';
import { InventoryFurniView } from './InventoryFurniView';
import { InventoryPetsView } from './InventoryPetsView';

export type InventoryViewWindowParams = { tab?: 'furni' | 'pets' | 'bots' | 'badges' };

type InventoryTab = NonNullable<WindowParams<'inventory'>['tab']>;

/** The ported tabs in `inventory_xml`'s order, with their captions. */
const TABS: readonly { id: InventoryTab; caption: string }[] = [
    { id: 'furni', caption: 'inventory.furni' },
    { id: 'pets', caption: 'inventory.furni.tab.pets' },
    { id: 'badges', caption: 'inventory.badges' },
    { id: 'bots', caption: 'inventory.bots' },
];

export const InventoryView = () => {
    const { tab: activeTab = 'furni' } = useWindowParams('inventory');
    const t = useTranslation();
    const { toggleWindow, showWindow, updateWindowParams } = useSystemActions();
    const allowScaling = useConfigValue<boolean>('inventory.allow.scaling') === true;
    const botsEnabled = useConfigValue<boolean>('inventory.bots.enabled') === true;
    const furniListInitialized = useInventoryStore(x => x.furniListInitialized);
    const furniCount = useInventoryStore(x => x.furniGroups.length);

    // `FurniView.setViewToState`: 1 loading, 2 empty, 3 the page.
    const furniLoading = (activeTab === 'furni') && !furniListInitialized;
    const furniEmpty = (activeTab === 'furni') && furniListInitialized && !furniCount;

    return (
        <Frame
            id="inventory"
            variant="3"
            caption={t('inventory.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            resizeDirection={allowScaling ? 'y' : 'none'}
            defaultPosition={{ x: 120, y: 150 }}
            onClose={() => toggleWindow('inventory')}
            layout={{ position: 'absolute', width: 490, height: 342, minWidth: 490, maxWidth: 490, minHeight: 300 }}
            margins={[ 6, 35, 6, 6 ]}
        >
            <Region layout={{ position: 'absolute', left: 0, top: 0, width: 478, bottom: 0 }}>
                <TabContent
                    variant="3"
                    layout={{ position: 'absolute', left: 0, top: 30, width: 478, bottom: 0, marginTop: 0, padding: 0 }}
                />
                <TabContext
                    variant="3"
                    layout={{ position: 'absolute', left: 8, top: 0, width: 462, height: 32, padding: 0, overflow: 'hidden' }}
                >
                    {TABS.filter(tab => (tab.id !== 'bots') || botsEnabled).map(tab => (
                        <TabButton
                            key={tab.id}
                            variant="3"
                            textStyle="u_regular"
                            selected={activeTab === tab.id}
                            onPointerTap={() => updateWindowParams('inventory', { tab: tab.id })}
                            layout={{ flexShrink: 0, alignItems: 'flex-start', paddingLeft: 10, paddingTop: 7, paddingRight: 10 }}
                        >
                            {t(tab.caption)}
                        </TabButton>
                    ))}
                </TabContext>
                {furniEmpty && (
                    <Region layout={{ position: 'absolute', left: 0, top: 20, width: 478, bottom: 3 }}>
                        <ThemeImage
                            src={LayoutImage('inventory/inventory_inventory_empty.png')}
                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                            layout={{ position: 'absolute', left: 46, top: 42, width: 180, height: 180 }}
                        />
                        <Region layout={{ position: 'absolute', left: 287, top: 64, width: 176, height: 154, flexDirection: 'column', gap: 5 }}>
                            <ThemeText
                                text={t('inventory.empty.title')}
                                textStyle="il_heading_2"
                                textOptions={{ fill: '#dd0000', wordWrap: true, wordWrapWidth: 172 }}
                                verticalAlign="top"
                                layout={{ width: 176, flexShrink: 0 }}
                            />
                            <ThemeText
                                text={t('inventory.empty.desc')}
                                textStyle="u_regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: 172 }}
                                verticalAlign="top"
                                layout={{ width: 176, flexShrink: 0 }}
                            />
                        </Region>
                        <Button
                            variant="3"
                            textStyle="button_shiny_regular"
                            onPointerTap={() => showWindow('catalog')}
                            layout={{ position: 'absolute', left: 241, width: 149, bottom: 2, height: 51 }}
                        >
                            {t('inventory.open.catalog')}
                        </Button>
                    </Region>
                )}
                {furniLoading && (
                    <ThemeImage
                        src={LayoutImage('inventory/inventory_download_icon.png')}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                        layout={{ position: 'absolute', left: 6, top: 27, width: 264, bottom: 6 }}
                    />
                )}
                <Region layout={{ position: 'absolute', left: 5, top: 35, width: 468, bottom: 5 }}>
                    {(activeTab === 'furni') && <InventoryFurniView />}
                    {(activeTab === 'pets') && <InventoryPetsView />}
                    {(activeTab === 'badges') && <InventoryBadgesView />}
                    {(activeTab === 'bots') && <InventoryBotsView />}
                </Region>
            </Region>
        </Frame>
    );
};
