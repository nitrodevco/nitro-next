/**
 * The badge step - `BadgeEditorCtrl`: `badge_editor`, added to `step_cont_2`.
 *
 * - `guild_badge`: the badge as its layers draw it (`updatePreviewImage`).
 * - `part_edit`: a `badge_layer` per layer (`BadgeLayerCtrl.createWindow`) in `part_edit_list` - the
 *   base appended after the layout's "base" label, every symbol layer put in front, so the rows run
 *   from the top symbol down to the base. Each row: the part button with the layer's part drawn on it
 *   (`badge_part_add` for none); the 3x3 position grid, whose click picks the 14px cell under the
 *   pointer (`onPositionGridClick`), with the picker on the layer's cell - neither on the base, which
 *   always fills the badge; and the layer's colours (`ColorGridCtrl`).
 * - `part_select`, which the part button swaps in (`onShowSelectPart`): a `badge_part_item` per part
 *   of the layer's kind - a symbol layer's starting with the empty one - each drawn as the layer
 *   would draw it, the layer's own framed. Hovering one lights its background and shows it on the
 *   badge (`onPartHover`); a click picks it and goes back to the rows (`onPartSelected`).
 */
import { IBadgePartData, IGuildEditorData } from '@nitrodevco/nitro-packets';
import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { useState } from 'react';

import { BADGE_BASE_LAYER_INDEX, BADGE_POSITION_CELL, BadgeLayerOptions } from '#base/context/groups';
import { findTemplateChild, LayoutImage, Template, TemplateItem } from '#base/theme';

import { GroupBadgePartImage } from './GroupBadgePartImage';
import { GroupBadgePreview } from './GroupBadgePreview';
import { groupColorItems } from './groupColorItems';

/** `onPartMouseEvent`: a part's background, and while the pointer is over it. */
const PART_ITEM_COLOR = 0xFFE9E9E1;
const PART_ITEM_HOVER_COLOR = 0xFFD8D6C9;

const BADGE_PART_ADD = LayoutImage('habbo-groups-com/badge_part_add.png');
const BADGE_PART_EMPTY = LayoutImage('habbo-groups-com/badge_part_empty.png');
const BADGE_PART_PICKER = LayoutImage('habbo-groups-com/badge_part_picker.png');
const POSITION_GRID = LayoutImage('habbo-groups-com/position_grid.png');
const POSITION_PICKER = LayoutImage('habbo-groups-com/position_picker.png');

/** `updatePositionPicker`: the picker one pixel inside its cell. */
const PICKER_INSET = 1;

export interface GroupBadgeEditorHandlers {
    onPickPart: (layerIndex: number) => void;
    onSelectPart: (layerIndex: number, partIndex: number) => void;
    onPosition: (layerIndex: number, gridX: number, gridY: number) => void;
    onColor: (layerIndex: number, colorIndex: number) => void;
}

/** The parts a layer offers, by part index; a symbol layer's `-1` is the empty one. */
const layerParts = (options: BadgeLayerOptions, editorData: IGuildEditorData): { partIndex: number; part: IBadgePartData | undefined }[] => (options.layerIndex === BADGE_BASE_LAYER_INDEX
    ? editorData.baseParts.map((part, partIndex) => ({ partIndex, part }))
    : [ { partIndex: -1, part: undefined }, ...editorData.layerParts.map((part, partIndex) => ({ partIndex, part })) ]);

const partOf = (options: BadgeLayerOptions, editorData: IGuildEditorData) => ((options.partIndex < 0)
    ? undefined
    : ((options.layerIndex === BADGE_BASE_LAYER_INDEX) ? editorData.baseParts : editorData.layerParts)[options.partIndex]);

export const useGroupBadgeEditorItem = (
    templates: Readonly<Record<string, Template>> | undefined,
    layers: BadgeLayerOptions[],
    editorData: IGuildEditorData | undefined,
    pickingLayerIndex: number | undefined,
    handlers: GroupBadgeEditorHandlers,
): TemplateItem | undefined => {
    // `onPartHover`: the part last hovered in the picker, which the badge shows until another is.
    const [ hovered, setHovered ] = useState<{ layerIndex: number; partIndex: number } | null>(null);

    if (hovered && (hovered.layerIndex !== pickingLayerIndex)) setHovered(null);

    const editor = templates?.['habbo-groups-com/badge_editor'];
    const layerTemplate = templates?.['habbo-groups-com/badge_layer'];
    const partTemplate = templates?.['habbo-groups-com/badge_part_item'];
    const colorTemplate = templates?.['habbo-groups-com/badge_color_item'];

    if (!editor || !layerTemplate || !partTemplate || !colorTemplate || !editorData) return undefined;

    const picking = (pickingLayerIndex === undefined) ? undefined : layers.find(layer => layer.layerIndex === pickingLayerIndex);
    const previewLayers = (hovered && picking) ? layers.map(layer => ((layer.layerIndex === hovered.layerIndex) ? { ...layer, partIndex: hovered.partIndex } : layer)) : layers;
    const colorOf = (options: BadgeLayerOptions) => editorData.badgeColors[options.colorIndex]?.color;

    /** `BadgeLayerCtrl`: one row. */
    const layerItem = (options: BadgeLayerOptions): TemplateItem => {
        const isBase = options.layerIndex === BADGE_BASE_LAYER_INDEX;
        const part = partOf(options, editorData);

        return {
            key: `layer_${options.layerIndex}`,
            from: layerTemplate,
            bindings: {
                part_button: { onPointerTap: () => handlers.onPickPart(options.layerIndex) },
                part_preview: part
                    ? {
                            children: (
                                <GroupBadgePartImage
                                    part={part}
                                    options={options}
                                    color={colorOf(options)}
                                />
                            ),
                        }
                    : { asset: BADGE_PART_ADD },
                position_grid: {
                    visible: !isBase,
                    asset: POSITION_GRID,
                    onPointerTap: (event: FederatedPointerEvent) => {
                        if (!(event.currentTarget instanceof PixiContainer)) return;

                        const local = event.getLocalPosition(event.currentTarget);
                        const cell = (value: number) => Math.min(2, Math.max(0, Math.floor(value / BADGE_POSITION_CELL)));

                        handlers.onPosition(options.layerIndex, cell(local.x), cell(local.y));
                    },
                },
                position_picker: { visible: !isBase, asset: POSITION_PICKER },
                color_selector: { items: groupColorItems(colorTemplate, editorData.badgeColors, options.colorIndex, index => handlers.onColor(options.layerIndex, index)) },
            },
            arrange: ({ find }) => {
                find('position_picker')?.setX((options.gridX * BADGE_POSITION_CELL) + PICKER_INSET);
                find('position_picker')?.setY((options.gridY * BADGE_POSITION_CELL) + PICKER_INSET);
            },
        };
    };

    // `createWindow`: the base after the label, each symbol layer in front of what is there.
    const partEditList = findTemplateChild(editor.elements, 'part_edit_list');
    const baseLabel = partEditList?.children[0];
    const baseLayer = layers.find(layer => layer.layerIndex === BADGE_BASE_LAYER_INDEX);
    const rows: TemplateItem[] = [
        ...layers.filter(layer => layer.layerIndex !== BADGE_BASE_LAYER_INDEX).slice().reverse().map(layerItem),
        ...(baseLabel ? [ { key: 'base_label', from: baseLabel } ] : []),
        ...(baseLayer ? [ layerItem(baseLayer) ] : []),
    ];

    /** `BadgeSelectPartCtrl.updateGrid`: the layer's parts, drawn as it would draw them. */
    const partItems: TemplateItem[] = picking
        ? layerParts(picking, editorData).map(({ partIndex, part }) => {
                const options = { ...picking, partIndex };
                const lit = hovered?.partIndex === partIndex;

                return {
                    key: String(partIndex),
                    from: partTemplate,
                    bindings: {
                        '': {
                            onPointerOver: () => setHovered({ layerIndex: picking.layerIndex, partIndex }),
                            onPointerTap: () => handlers.onSelectPart(picking.layerIndex, partIndex),
                        },
                        background: { color: lit ? PART_ITEM_HOVER_COLOR : PART_ITEM_COLOR },
                        part: part
                            ? {
                                    children: (
                                        <GroupBadgePartImage
                                            part={part}
                                            options={options}
                                            color={colorOf(options)}
                                        />
                                    ),
                                }
                            : { asset: BADGE_PART_EMPTY },
                        selected: { asset: BADGE_PART_PICKER, visible: partIndex === picking.partIndex },
                    },
                };
            })
        : [];

    return {
        key: 'badge_editor',
        from: editor,
        bindings: {
            layer_0: {
                children: (
                    <GroupBadgePreview
                        layers={previewLayers}
                        editorData={editorData}
                    />
                ),
            },
            part_edit: { visible: !picking },
            part_edit_list: { items: rows },
            part_select: { visible: !!picking },
            part_select_grid: { items: partItems },
        },
    };
};
