import { IBadgePartData, IGuildEditorData } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { BADGE_BASE_LAYER_INDEX, BADGE_IMAGE_HEIGHT, BADGE_IMAGE_WIDTH, BadgeLayerOptions } from '#base/context/groups';
import { useTranslation } from '#base/context/system';
import { Border, LayoutImage, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

import { GroupBadgePartImage } from './GroupBadgePartImage';

export interface GroupBadgePartPickerProps {
    /** The layer being edited - every candidate is drawn in its colour and grid cell. */
    options: BadgeLayerOptions;
    editorData: IGuildEditorData;
    onSelect: (partIndex: number) => void;
}

/** `badge_part_item`'s own size, and the two fills `onPartMouseEvent` swaps between. */
const PART_ITEM_SIZE = 41;
const PART_ITEM_COLOR = '#e9e9e1';
const PART_ITEM_HOVER_COLOR = '#d8d6c9';

/**
 * The symbol picker - `badge_editor`'s `part_select`, filled by `BadgeSelectPartCtrl`. Every
 * candidate is drawn as the layer would draw it, so picking one is picking what the badge will
 * look like; a layer above the base also offers an empty slot, which is how a symbol is taken off.
 */
export const GroupBadgePartPicker = ({ options, editorData, onSelect }: GroupBadgePartPickerProps) => {
    const t = useTranslation();
    const [ hoveredIndex, setHoveredIndex ] = useState<number | undefined>(undefined);

    const isBaseLayer = options.layerIndex === BADGE_BASE_LAYER_INDEX;
    const parts: (IBadgePartData | undefined)[] = isBaseLayer ? editorData.baseParts : [ undefined, ...editorData.layerParts ];
    const color = editorData.badgeColors[options.colorIndex]?.color;

    return (
        <Region
            name="part_select"
            layout={{ position: 'absolute', left: 128, width: 264, top: 0, height: 305 }}
        >
            <Region
                name="part_edit_top_labels"
                layout={{ position: 'absolute', left: 0, width: 264, top: 0, height: 29 }}
            >
                <ThemeText
                    text={t('group.edit.badge.pick.symbol')}
                    textStyle="u_bold"
                    name="label_symbol"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, top: 8 }}
                />
            </Region>
            <Border
                variant="3"
                name="part_select_outer_border"
                tintColor="#bebba5"
                layout={{ position: 'absolute', left: 0, width: 247, top: 29, height: 274 }}
            >
                <Border
                    variant="3"
                    name="part_select_inner_border"
                    layout={{ position: 'absolute', left: 4, width: 239, top: 4, height: 266 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        variant="0"
                        hideDisabledScrollbar={false}
                        layout={{ position: 'absolute', left: 3, width: 233, top: 4, height: 258 }}
                        viewportLayout={{ position: 'absolute', left: 0, top: 0, width: 214, height: 258 }}
                        scrollbarLayout={{ position: 'absolute', left: 216, top: 0, width: 17, height: 258 }}
                    >
                        <Region
                            name="part_select_grid"
                            layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                        >
                            {parts.map((part, index) => {
                                // The empty slot is item 0 of a symbol layer, which is part index -1.
                                const partIndex = isBaseLayer ? index : (index - 1);

                                return (
                                    <Region
                                        key={part?.id ?? 'none'}
                                        name="container"
                                        onPointerTap={() => onSelect(partIndex)}
                                        onPointerOver={() => setHoveredIndex(partIndex)}
                                        onPointerOut={() => setHoveredIndex(undefined)}
                                        cursor="pointer"
                                        layout={{ width: PART_ITEM_SIZE, height: PART_ITEM_SIZE, flexShrink: 0 }}
                                    >
                                        <Border
                                            variant="3"
                                            name="background"
                                            tintColor={(hoveredIndex === partIndex) ? PART_ITEM_HOVER_COLOR : PART_ITEM_COLOR}
                                            layout={{ position: 'absolute', left: 0, width: PART_ITEM_SIZE, top: 0, height: PART_ITEM_SIZE }}
                                        />
                                        <Region layout={{ position: 'absolute', left: 0, top: 0, width: BADGE_IMAGE_WIDTH, height: BADGE_IMAGE_HEIGHT, overflow: 'hidden' }}>
                                            {part
                                                ? (
                                                        <GroupBadgePartImage
                                                            part={part}
                                                            options={options}
                                                            color={color}
                                                        />
                                                    )
                                                : (
                                                        <ThemeImage
                                                            src={LayoutImage('groups/badge_part_empty.png')}
                                                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                                                        />
                                                    )}
                                        </Region>
                                        {(partIndex === options.partIndex) && (
                                            <ThemeImage
                                                name="selected"
                                                src={LayoutImage('groups/badge_part_picker.png')}
                                                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                                            />
                                        )}
                                    </Region>
                                );
                            })}
                        </Region>
                    </ScrollArea>
                </Border>
            </Border>
        </Region>
    );
};
