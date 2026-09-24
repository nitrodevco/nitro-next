import { IGuildEditorData } from '@nitrodevco/nitro-packets';

import { BADGE_BASE_LAYER_INDEX, BADGE_IMAGE_HEIGHT, BADGE_IMAGE_WIDTH, BADGE_POSITION_CELL, BadgeLayerOptions } from '#base/context/groups';
import { Border, ButtonThick, LayoutImage, Region, ThemeImage } from '#base/theme';

import { GroupBadgePartImage } from './GroupBadgePartImage';
import { GroupColorGrid } from './GroupColorGrid';

export interface GroupBadgeLayerRowProps {
    options: BadgeLayerOptions;
    editorData: IGuildEditorData;
    /** `onPartPreviewButtonClick` - swaps the layer list for the symbol picker. */
    onPickPart: () => void;
    onPosition: (gridX: number, gridY: number) => void;
    onColor: (colorIndex: number) => void;
}

/** `position_picker` sits one pixel inside the grid art, and steps a cell at a time. */
const PICKER_INSET = 1;

/**
 * One row of the badge editor's layer list - `badge_layer`, driven by `BadgeLayerCtrl`: the part
 * button with its preview, the 3x3 position picker and the layer's colour palette.
 *
 * The base layer has no position: `createWindow` hides both the grid and the picker for layer 0,
 * because the base shape always fills the badge.
 */
export const GroupBadgeLayerRow = ({ options, editorData, onPickPart, onPosition, onColor }: GroupBadgeLayerRowProps) => {
    const isBaseLayer = options.layerIndex === BADGE_BASE_LAYER_INDEX;
    const parts = isBaseLayer ? editorData.baseParts : editorData.layerParts;
    const part = (options.partIndex >= 0) ? parts[options.partIndex] : undefined;
    const color = editorData.badgeColors[options.colorIndex]?.color;

    return (
        <Region
            name="container"
            layout={{ width: 247, height: 49, flexShrink: 0 }}
        >
            <Border
                variant="3"
                name="border"
                tintColor="#bebba5"
                layout={{ position: 'absolute', left: 0, width: 247, top: 0, height: 49 }}
            />
            <Region
                name="preview_container"
                layout={{ position: 'absolute', left: 3, width: 51, top: 0, height: 49 }}
            >
                <ButtonThick
                    variant="3"
                    name="part_button"
                    onPointerTap={onPickPart}
                    layout={{ position: 'absolute', left: 0, width: 49, top: 0, height: 49 }}
                />
                <Region
                    name="part_preview"
                    layout={{ position: 'absolute', left: 5, width: BADGE_IMAGE_WIDTH, top: 5, height: BADGE_IMAGE_HEIGHT, overflow: 'hidden' }}
                >
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
                                    src={LayoutImage('groups/badge_part_add.png')}
                                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                                />
                            )}
                </Region>
            </Region>
            {!isBaseLayer && (
                <Region
                    name="position_container"
                    layout={{ position: 'absolute', left: 67, width: 43, top: 3, height: 43 }}
                >
                    <ThemeImage
                        name="position_grid"
                        src={LayoutImage('groups/position_grid.png')}
                        layout={{ position: 'absolute', left: 0, width: 43, top: 0, height: 43 }}
                    />
                    <ThemeImage
                        name="position_picker"
                        src={LayoutImage('groups/position_picker.png')}
                        layout={{
                            position: 'absolute',
                            left: PICKER_INSET + (Math.max(0, options.gridX) * BADGE_POSITION_CELL),
                            top: PICKER_INSET + (Math.max(0, options.gridY) * BADGE_POSITION_CELL),
                            width: 13,
                            height: 13,
                        }}
                    />
                    {/*
                      * `onPositionGridClick` works the cell out from the press position; nine cells
                      * of the grid's own size say the same thing without reading local coordinates.
                      */}
                    {Array.from({ length: 9 }, (unused, cell) => ({ gridX: cell % 3, gridY: Math.floor(cell / 3) })).map(({ gridX, gridY }) => (
                        <Region
                            key={`${gridX}-${gridY}`}
                            onPointerTap={() => onPosition(gridX, gridY)}
                            cursor="pointer"
                            layout={{
                                position: 'absolute',
                                left: gridX * BADGE_POSITION_CELL,
                                top: gridY * BADGE_POSITION_CELL,
                                width: BADGE_POSITION_CELL,
                                height: BADGE_POSITION_CELL,
                            }}
                        />
                    ))}
                </Region>
            )}
            <GroupColorGrid
                colors={editorData.badgeColors}
                selectedColorId={editorData.badgeColors[options.colorIndex]?.id ?? -1}
                onSelect={colorId => onColor(editorData.badgeColors.findIndex(entry => entry.id === colorId))}
                layout={{ position: 'absolute', left: 124, width: 120, top: 2, height: 45 }}
            />
        </Region>
    );
};
