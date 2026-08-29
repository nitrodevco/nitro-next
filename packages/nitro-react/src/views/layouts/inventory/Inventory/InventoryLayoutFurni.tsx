import { ReactNode, useState } from 'react';

import { Border, BoxLayout, Dropmenu, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { InventoryLayoutPreviewContainer, InventoryLayoutPreviewContainerProps } from './InventoryLayoutPreviewContainer';

/** Named region `furni` of InventoryLayout - configured through the parent's `furni` prop. */
export interface InventoryLayoutFurniProps {
    captionItemsShown?: string;
    itemsItemGrid?: ReactNode;
    layout?: BoxLayout;
    onClearFilterButton?: () => void;
    onFilterOptions?: () => void;
    onPlacementOptions?: () => void;
    previewContainer?: InventoryLayoutPreviewContainerProps;
    visibleClearFilterButton?: boolean;
    visibleFurni?: boolean;
}

export const InventoryLayoutFurni = ({ captionItemsShown, itemsItemGrid, layout, onClearFilterButton, onFilterOptions, onPlacementOptions, previewContainer, visibleClearFilterButton, visibleFurni }: InventoryLayoutFurniProps) => {
    const [ filterValue, setFilterValue ] = useState('');

    return (
        (visibleFurni ?? false) && (
            <Region
                name="furni"
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
                    <Dropmenu
                        variant="0"
                        name="placement.options"
                        onPointerTap={onPlacementOptions}
                        layout={{ position: 'absolute', left: 274, width: 119, top: 2, height: 21 }}
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
                    <Region
                        name="items.shown"
                        layout={{ position: 'absolute', right: 1, width: 98, bottom: -3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionItemsShown ?? 'Items shown: x/y'}
                            textOptions={{ fill: '#777777' }}
                        />
                    </Region>
                </Region>
                <InventoryLayoutPreviewContainer {...previewContainer} />
            </Region>
        )
    );
};
