import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

import { InventoryLayoutBadges, InventoryLayoutBadgesProps } from './InventoryLayoutBadges';
import { InventoryLayoutCollectibles, InventoryLayoutCollectiblesProps } from './InventoryLayoutCollectibles';
import { InventoryLayoutFurni, InventoryLayoutFurniProps } from './InventoryLayoutFurni';
import { InventoryLayoutPets, InventoryLayoutPetsProps } from './InventoryLayoutPets';

/** Named region `contentArea` of InventoryLayout - configured through the parent's `contentArea` prop. */
export interface InventoryLayoutContentAreaProps {
    badges?: InventoryLayoutBadgesProps;
    captionBotDescription?: string;
    captionBotName?: string;
    collectibles?: InventoryLayoutCollectiblesProps;
    furni?: InventoryLayoutFurniProps;
    itemsGrid?: ReactNode;
    layout?: BoxLayout;
    onPlaceButton?: () => void;
    pets?: InventoryLayoutPetsProps;
    srcPreviewImage?: string;
    tintPreviewImage?: string;
    visibleBots?: boolean;
    visibleCollectibles?: boolean;
    visibleFurni?: boolean;
    visiblePets?: boolean;
}

export const InventoryLayoutContentArea = ({ badges, captionBotDescription, captionBotName, collectibles, furni, itemsGrid, layout, onPlaceButton, pets, srcPreviewImage, tintPreviewImage, visibleBots, visibleCollectibles, visibleFurni, visiblePets }: InventoryLayoutContentAreaProps) => {
    const t = useTranslation();

    return (
        <Region
            name="contentArea"
            layout={{ position: 'absolute', left: 5, width: 468, top: 35, bottom: 5, ...layout }}
        >
            {(visibleFurni ?? false) && (
                <InventoryLayoutFurni {...furni} />
            )}
            {(visibleCollectibles ?? false) && (
                <InventoryLayoutCollectibles {...collectibles} />
            )}
            {(visiblePets ?? false) && (
                <InventoryLayoutPets {...pets} />
            )}
            {(visibleBots ?? false) && (
                <Region
                    name="bots"
                    layout={{ position: 'absolute', left: 0, width: 468, top: 0, bottom: 0 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 0, right: 194, top: 0, bottom: 5 }}
                    >
                        <Region
                            name="grid"
                            layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                        >
                            {itemsGrid}
                        </Region>
                    </ScrollArea>
                    <Region
                        name="preview_container"
                        layout={{ position: 'absolute', right: -2, width: 190, top: 0, bottom: 0 }}
                    >
                        <Region
                            name="bot_name"
                            layout={{ position: 'absolute', left: 0, width: 67, alignSelf: 'center', marginTop: -121, marginBottom: 121, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionBotName ?? 'bot name'}
                                textStyle="text-style-u-headline-small"
                            />
                        </Region>
                        <ThemeImage
                            name="preview_image"
                            src={srcPreviewImage}
                            tint={tintPreviewImage}
                            layout={{ position: 'absolute', left: 43, width: 100, top: 24, height: 150 }}
                        />
                        <Region
                            name="bot_description"
                            layout={{ position: 'absolute', left: 0, width: 190, top: 174, height: 45, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionBotDescription ?? ''}
                                textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
                            />
                        </Region>
                        <Button
                            variant="3"
                            name="place_button"
                            onPointerTap={onPlaceButton}
                            textStyle="text-style-button-shiny-regular"
                            layout={{ position: 'absolute', left: 10, width: 158, bottom: 8, height: 28, minWidth: 158, maxWidth: 158 }}
                        >
                            {t('inventory.bot.placetoroom')}
                        </Button>
                    </Region>
                </Region>
            )}
            <InventoryLayoutBadges {...badges} />
        </Region>
    );
};
