import { ReactNode, useState } from 'react';

import { Border, BoxLayout, Dropmenu, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { InventoryLayoutPreviewContainer2, InventoryLayoutPreviewContainer2Props } from './InventoryLayoutPreviewContainer2';

/** Named region `collectibles` of InventoryLayout - configured through the parent's `collectibles` prop. */
export interface InventoryLayoutCollectiblesProps {
    captionItemsShown?: string;
    itemsItemGrid?: ReactNode;
    layout?: BoxLayout;
    onClearFilterButton?: () => void;
    onFilterOptions?: () => void;
    previewContainer?: InventoryLayoutPreviewContainer2Props;
    visibleClearFilterButton?: boolean;
    visibleCollectibles?: boolean;
    visibleItemsShown?: boolean;
}

export const InventoryLayoutCollectibles = ({ captionItemsShown, itemsItemGrid, layout, onClearFilterButton, onFilterOptions, previewContainer, visibleClearFilterButton, visibleCollectibles, visibleItemsShown }: InventoryLayoutCollectiblesProps) => {
    const [ filterValue, setFilterValue ] = useState('');

    return (
        (visibleCollectibles ?? false) && (
            <Region
                name="collectibles"
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
                            layout={{ position: 'absolute', left: 3, width: 120, top: 2, height: 15, minWidth: 60 }}
                        />
                        {(visibleClearFilterButton ?? false) && (
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
                        )}
                    </Border>
                    <Dropmenu
                        variant="0"
                        name="filter.options"
                        onPointerTap={onFilterOptions}
                        layout={{ position: 'absolute', left: 150, width: 119, top: 2, height: 21 }}
                    />
                </Border>
                <Region
                    name="grid_container"
                    layout={{ position: 'absolute', left: 0, width: 284, top: 27, bottom: 3 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 10 }}
                    >
                        <Region
                            name="item_grid"
                            layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                        >
                            {itemsItemGrid}
                        </Region>
                    </ScrollArea>
                    <Region
                        name="item_grid_pages"
                        layout={{ position: 'absolute', left: 0, width: 280, bottom: 1, height: 10, flexDirection: 'row', gap: 2 }}
                    >
                        <Region layout={{ width: 8, height: 14, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text="0"
                                textStyle="text-style-il-small"
                            />
                        </Region>
                    </Region>
                    {(visibleItemsShown ?? false) && (
                        <Region
                            name="items.shown"
                            layout={{ position: 'absolute', right: 1, width: 98, bottom: -3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionItemsShown ?? 'Items shown: x/y'}
                                textOptions={{ fill: '#777777' }}
                            />
                        </Region>
                    )}
                </Region>
                <InventoryLayoutPreviewContainer2 {...previewContainer} />
            </Region>
        )
    );
};
