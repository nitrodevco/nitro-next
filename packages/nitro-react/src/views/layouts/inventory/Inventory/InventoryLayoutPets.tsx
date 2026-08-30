import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Dropmenu, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `pets` of InventoryLayout - configured through the parent's `pets` prop. */
export interface InventoryLayoutPetsProps {
    captionPreviewDescription?: string;
    captionPreviewInfo?: string;
    captionPreviewText?: string;
    itemsGrid?: ReactNode;
    layout?: BoxLayout;
    onClearFilterButton?: () => void;
    onFilterOptions?: () => void;
    onFilterRarity?: () => void;
    onPlaceButton?: () => void;
    srcPreviewImage?: string;
    tintPreviewImage?: string;
    visibleClearFilterButton?: boolean;
    visiblePets?: boolean;
    visiblePreviewInfo?: boolean;
}

export const InventoryLayoutPets = ({ captionPreviewDescription, captionPreviewInfo, captionPreviewText, itemsGrid, layout, onClearFilterButton, onFilterOptions, onFilterRarity, onPlaceButton, srcPreviewImage, tintPreviewImage, visibleClearFilterButton, visiblePets, visiblePreviewInfo }: InventoryLayoutPetsProps) => {
    const t = useTranslation();
    const [ filterValue, setFilterValue ] = useState('');

    return (
        (visiblePets ?? false) && (
            <Region
                name="pets"
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
                </Border>
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 0, width: 274, top: 27, bottom: 3 }}
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
                    layout={{ position: 'absolute', right: -2, width: 190, top: 0, bottom: 0, justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionPreviewText ?? 'PetName'}
                        textStyle="text-style-u-headline-small"
                        name="preview_text"
                        layout={{ position: 'absolute', left: 0, right: 124, top: 32, height: 19 }}
                    />
                    <ThemeImage
                        name="preview_image"
                        src={srcPreviewImage}
                        tint={tintPreviewImage}
                        layout={{ position: 'absolute', left: 5, width: 150, top: 53, height: 152 }}
                    />
                    <ThemeText
                        text={captionPreviewDescription ?? 'Lorem ipsumlkj lj'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 180 }}
                        name="preview_description"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 4, right: 6, top: 205, height: 17, maxWidth: 220 }}
                    />
                    {(visiblePreviewInfo ?? false) && (
                        <ThemeText
                            text={captionPreviewInfo ?? '...'}
                            textOptions={{ wordWrap: true, wordWrapWidth: 154 }}
                            name="preview_info"
                            verticalAlign="top"
                            layout={{ position: 'absolute', marginLeft: -13, marginRight: 13, width: 154, top: 200, bottom: 32 }}
                        />
                    )}
                    <Button
                        variant="3"
                        name="place_button"
                        onPointerTap={onPlaceButton}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ position: 'absolute', left: 0, width: 158, bottom: 4, height: 28, minWidth: 158, maxWidth: 158 }}
                    >
                        {t('inventory.pets.placetoroom')}
                    </Button>
                </Region>
                <Dropmenu
                    variant="0"
                    name="filter.rarity"
                    onPointerTap={onFilterRarity}
                    layout={{ position: 'absolute', left: 274, width: 119, top: 2, height: 21 }}
                />
            </Region>
        )
    );
};
