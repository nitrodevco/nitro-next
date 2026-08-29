import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, TabButton, TabContext, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { InventoryLayoutContentArea, InventoryLayoutContentAreaProps } from './InventoryLayoutContentArea';

/** Named region `top_content` of InventoryLayout - configured through the parent's `topContent` prop. */
export interface InventoryLayoutTopContentProps {
    captionInventoryEmptyDescription?: string;
    captionInventoryEmptyTitle?: string;
    contentArea?: InventoryLayoutContentAreaProps;
    layout?: BoxLayout;
    onBadges?: () => void;
    onBots?: () => void;
    onCollectibles?: () => void;
    onFurni?: () => void;
    onOpenCatalogBtn?: () => void;
    onPets?: () => void;
    onRentables?: () => void;
    selectedTabs?: string;
    srcDownloadImage?: string;
    srcImage?: string;
    visibleEmptyContainer?: boolean;
    visibleLoadingContainer?: boolean;
}

export const InventoryLayoutTopContent = ({ captionInventoryEmptyDescription, captionInventoryEmptyTitle, contentArea, layout, onBadges, onBots, onCollectibles, onFurni, onOpenCatalogBtn, onPets, onRentables, selectedTabs, srcDownloadImage, srcImage, visibleEmptyContainer, visibleLoadingContainer }: InventoryLayoutTopContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="top_content"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <TabContext
                variant="3"
                name="tabs"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <TabButton
                    variant="3"
                    name="furni"
                    selected={selectedTabs === 'furni'}
                    onPointerTap={onFurni}
                    layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 34 }}
                >
                    {t('inventory.furni')}
                </TabButton>
                <TabButton
                    variant="3"
                    name="collectibles"
                    selected={selectedTabs === 'collectibles'}
                    onPointerTap={onCollectibles}
                    layout={{ position: 'absolute', left: 107, width: 87, top: 0, height: 34 }}
                >
                    {t('inventory.collectibles')}
                </TabButton>
                <TabButton
                    variant="3"
                    name="rentables"
                    selected={selectedTabs === 'rentables'}
                    onPointerTap={onRentables}
                    layout={{ position: 'absolute', left: 194, width: 131, top: 0, height: 34 }}
                >
                    {t('inventory.rentables')}
                </TabButton>
                <TabButton
                    variant="3"
                    name="pets"
                    selected={selectedTabs === 'pets'}
                    onPointerTap={onPets}
                    layout={{ position: 'absolute', left: 325, width: 155, top: 0, height: 34 }}
                >
                    {t('inventory.furni.tab.pets')}
                </TabButton>
                <TabButton
                    variant="3"
                    name="badges"
                    selected={selectedTabs === 'badges'}
                    onPointerTap={onBadges}
                    layout={{ position: 'absolute', left: 480, width: 64, top: 0, height: 34 }}
                >
                    {t('inventory.badges')}
                </TabButton>
                <TabButton
                    variant="3"
                    name="bots"
                    selected={selectedTabs === 'bots'}
                    onPointerTap={onBots}
                    layout={{ position: 'absolute', left: 544, width: 105, top: 0, height: 34 }}
                >
                    {t('inventory.bots')}
                </TabButton>
            </TabContext>
            {(visibleEmptyContainer ?? false) && (
                <Region
                    name="empty_container"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 20, bottom: 3, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="image"
                        src={srcImage ?? layoutImage('inventory_inventory_empty.png')}
                        layout={{ position: 'absolute', left: 46, width: 180, top: 42, height: 180 }}
                    />
                    <Region layout={{ position: 'absolute', left: 287, width: 176, top: 64, height: 154, flexDirection: 'column', gap: 5 }}>
                        <Region
                            name="inventory_empty_title"
                            layout={{ width: 176, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionInventoryEmptyTitle ?? t('inventory.empty.title')}
                                textStyle="text-style-il-heading-2"
                                textOptions={{ fill: '#dd0000', wordWrap: true, wordWrapWidth: 176 }}
                            />
                        </Region>
                        <Region
                            name="inventory_empty_description"
                            layout={{ width: 176, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionInventoryEmptyDescription ?? t('inventory.empty.desc')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 176 }}
                            />
                        </Region>
                    </Region>
                    <Button
                        variant="3"
                        name="open_catalog_btn"
                        onPointerTap={onOpenCatalogBtn}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ position: 'absolute', marginLeft: 76.5, marginRight: -76.5, width: 149, bottom: 2, height: 51 }}
                    >
                        {t('inventory.open.catalog')}
                    </Button>
                </Region>
            )}
            {(visibleLoadingContainer ?? false) && (
                <Region
                    name="loading_container"
                    layout={{ position: 'absolute', left: 6, width: 264, top: 27, bottom: 6 }}
                >
                    <ThemeImage
                        name="download_image"
                        src={srcDownloadImage ?? layoutImage('inventory_download_icon.png')}
                        layout={{ position: 'absolute', left: 0, width: 264, top: 0, height: 268 }}
                    />
                </Region>
            )}
            <InventoryLayoutContentArea {...contentArea} />
        </Region>
    );
};
