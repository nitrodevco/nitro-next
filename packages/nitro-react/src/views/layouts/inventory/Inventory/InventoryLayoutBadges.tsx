import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Dropmenu, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { InventoryLayoutDescriptionArea, InventoryLayoutDescriptionAreaProps } from './InventoryLayoutDescriptionArea';

/** Named region `badges` of InventoryLayout - configured through the parent's `badges` prop. */
export interface InventoryLayoutBadgesProps {
    captionMyBadgesTitle?: string;
    captionScoreDescriptionText?: string;
    captionWearingTitle?: string;
    descriptionArea?: InventoryLayoutDescriptionAreaProps;
    itemsActiveItems?: ReactNode;
    itemsInactiveItems?: ReactNode;
    layout?: BoxLayout;
    onClearFilterButton?: () => void;
    onFilterOptions?: () => void;
    onFilterRarity?: () => void;
    visibleAchievementsScoreContainer?: boolean;
    visibleMyBadgesTitle?: boolean;
}

export const InventoryLayoutBadges = ({ captionMyBadgesTitle, captionScoreDescriptionText, captionWearingTitle, descriptionArea, itemsActiveItems, itemsInactiveItems, layout, onClearFilterButton, onFilterOptions, onFilterRarity, visibleAchievementsScoreContainer, visibleMyBadgesTitle }: InventoryLayoutBadgesProps) => {
    const t = useTranslation();
    const [ filterValue, setFilterValue ] = useState('');

    return (
        <Region
            name="badges"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Border
                variant="3"
                name="options_container"
                tintColor="#cacaca"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 25 }}
            >
                <Border
                    variant="0"
                    layout={{ position: 'absolute', left: 4, width: 139, top: 3, height: 20 }}
                >
                    <TextInput
                        value={filterValue}
                        onChange={setFilterValue}
                        layout={{ position: 'absolute', left: 3, width: 122, top: 2, height: 15, minWidth: 60 }}
                    />
                    <Region
                        name="clear_filter_button"
                        onPointerTap={onClearFilterButton}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 120, width: 20, top: 0, bottom: 0 }}
                    >
                        <ThemeImage
                            src={layoutImage('icons_close.png')}
                            layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                        />
                    </Region>
                </Border>
                <Dropmenu
                    variant="0"
                    name="filter.options"
                    onPointerTap={onFilterOptions}
                    layout={{ position: 'absolute', left: 150, width: 119, top: 2, height: 21 }}
                />
            </Border>
            <Dropmenu
                variant="0"
                name="filter.rarity"
                onPointerTap={onFilterRarity}
                layout={{ position: 'absolute', left: 274, width: 119, top: 2, height: 21 }}
            />
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 0, right: 140, top: 27, bottom: 91 }}
            >
                <Region
                    name="inactive_items"
                    layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                >
                    {itemsInactiveItems}
                </Region>
            </ScrollArea>
            <Region
                name="item_grid_pages"
                layout={{ position: 'absolute', left: 0, width: 328, bottom: 81, height: 10, flexDirection: 'row', gap: 2 }}
            >
                <Region layout={{ width: 8, height: 14, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text="0"
                        textStyle="text-style-il-small"
                    />
                </Region>
            </Region>
            <Region
                name="active_items"
                layout={{ position: 'absolute', right: -2, width: 135, top: 58, bottom: 83, flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}
            >
                {itemsActiveItems}
            </Region>
            {(visibleMyBadgesTitle ?? false) && (
                <Region
                    name="myBadgesTitle"
                    layout={{ position: 'absolute', left: 20, width: 285, top: -3, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionMyBadgesTitle ?? t('inventory.badges.inactivebadges')}
                        textStyle="text-style-u-headline-small"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            )}
            <Region
                name="wearingTitle"
                layout={{ position: 'absolute', right: 4, width: 134, top: 32, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionWearingTitle ?? t('inventory.badges.activebadges')}
                    textStyle="text-style-u-headline-small"
                    textOptions={{ align: 'center' }}
                />
            </Region>
            <InventoryLayoutDescriptionArea {...descriptionArea} />
            {(visibleAchievementsScoreContainer ?? false) && (
                <Region
                    name="achievements_score_container"
                    layout={{ position: 'absolute', left: 0, right: 0, bottom: -2, height: 24 }}
                >
                    <Border
                        variant="3"
                        name="score_description_border"
                        tintColor="#428bb2"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 4, height: 17, minWidth: 368 }}
                    >
                        <Region
                            name="score_description_text"
                            layout={{ position: 'absolute', right: 0, width: 468, alignSelf: 'center', height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionScoreDescriptionText ?? t('achievements_score_description')}
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                    </Border>
                </Region>
            )}
        </Region>
    );
};
