import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { FurniChestContentsLayoutGridItems, FurniChestContentsLayoutGridItemsProps } from './FurniChestContentsLayoutGridItems';
import { FurniChestContentsLayoutRightPanel, FurniChestContentsLayoutRightPanelProps } from './FurniChestContentsLayoutRightPanel';

/** Named region `furni_chest` of FurniChestContentsLayout - configured through the parent's `furniChest` prop. */
export interface FurniChestContentsLayoutFurniChestProps {
    captionNoItemsText?: string;
    captionSearchPlaceholder?: string;
    gridItems?: FurniChestContentsLayoutGridItemsProps;
    layout?: BoxLayout;
    onClearSearchButton?: () => void;
    rightPanel?: FurniChestContentsLayoutRightPanelProps;
    visibleSearchBorder?: boolean;
}

export const FurniChestContentsLayoutFurniChest = ({ captionNoItemsText, captionSearchPlaceholder, gridItems, layout, onClearSearchButton, rightPanel, visibleSearchBorder }: FurniChestContentsLayoutFurniChestProps) => {
    const t = useTranslation();
    const [ searchInputValue, setSearchInputValue ] = useState('');

    return (
        <Region
            name="furni_chest"
            layout={{ position: 'absolute', left: 0, width: 458, top: 0, height: 264, ...layout }}
        >
            <Border
                variant="2"
                name="items_grid_border"
                tintColor="#e3e3e3"
                layout={{ position: 'absolute', left: 9, right: 194, top: 11, bottom: 11, justifyContent: 'center' }}
            >
                {(visibleSearchBorder ?? false) && (
                    <Border
                        variant="105"
                        name="search_border"
                        layout={{ position: 'absolute', left: 5, right: 5, top: 4, height: 24, minHeight: 24, maxHeight: 24 }}
                    >
                        <Region
                            name="search_placeholder"
                            layout={{ position: 'absolute', left: 4, width: 82, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionSearchPlaceholder ?? t('catalog.search')}
                                textOptions={{ fill: '#666666' }}
                            />
                        </Region>
                        <TextInput
                            value={searchInputValue}
                            onChange={setSearchInputValue}
                            textColor="#666666"
                            layout={{ position: 'absolute', left: 4, right: 25, top: 3, height: 18, minHeight: 18, maxHeight: 18 }}
                        />
                        <Region
                            name="clear_search_button"
                            onPointerTap={onClearSearchButton}
                            cursor="pointer"
                            layout={{ position: 'absolute', right: 3, width: 20, top: 2, height: 20 }}
                        >
                            <ThemeImage
                                src={layoutImage('icons_close.png')}
                                layout={{ position: 'absolute', left: 4, width: 11, top: 4, height: 12 }}
                            />
                        </Region>
                    </Border>
                )}
                <Region
                    name="no_items_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 108, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionNoItemsText ?? t('wiredchests.furni_chest.no_items')}
                </Region>
                <FurniChestContentsLayoutGridItems {...gridItems} />
            </Border>
            <FurniChestContentsLayoutRightPanel {...rightPanel} />
        </Region>
    );
};
