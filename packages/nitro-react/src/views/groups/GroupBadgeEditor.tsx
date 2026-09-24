import { IGuildEditorData } from '@nitrodevco/nitro-packets';

import { BADGE_BASE_LAYER_INDEX, BadgeLayerOptions } from '#base/context/groups';
import { useTranslation } from '#base/context/system';
import { Border, Region, ThemeText } from '#base/theme';

import { GroupBadgeLayerRow } from './GroupBadgeLayerRow';
import { GroupBadgePartPicker } from './GroupBadgePartPicker';
import { GroupBadgePreview } from './GroupBadgePreview';

export interface GroupBadgeEditorProps {
    layers: BadgeLayerOptions[];
    editorData: IGuildEditorData;
    /** The layer whose symbol is being picked, which replaces the layer list while it is set. */
    pickingLayerIndex: number | undefined;
    onPickPart: (layerIndex: number) => void;
    onSelectPart: (layerIndex: number, partIndex: number) => void;
    onPosition: (layerIndex: number, gridX: number, gridY: number) => void;
    onColor: (layerIndex: number, colorIndex: number) => void;
}

/**
 * The badge step - `badge_editor`, built by `BadgeEditorCtrl`: the badge on the left, and on the
 * right either the five layer rows or the symbol picker one of them opened.
 *
 * The rows run top symbol first and the base last, which is how `BadgeLayerCtrl.createWindow`
 * fills the list - the base layer is appended and every symbol layer is put in front of it, with
 * the layout's own "base" label between the two.
 */
export const GroupBadgeEditor = ({ layers, editorData, pickingLayerIndex, onPickPart, onSelectPart, onPosition, onColor }: GroupBadgeEditorProps) => {
    const t = useTranslation();

    const symbolLayers = layers.filter(layer => layer.layerIndex !== BADGE_BASE_LAYER_INDEX).slice().reverse();
    const baseLayer = layers.find(layer => layer.layerIndex === BADGE_BASE_LAYER_INDEX);
    const pickedLayer = (pickingLayerIndex === undefined) ? undefined : layers.find(layer => layer.layerIndex === pickingLayerIndex);

    const layerRow = (options: BadgeLayerOptions) => (
        <GroupBadgeLayerRow
            key={options.layerIndex}
            options={options}
            editorData={editorData}
            onPickPart={() => onPickPart(options.layerIndex)}
            onPosition={(gridX, gridY) => onPosition(options.layerIndex, gridX, gridY)}
            onColor={colorIndex => onColor(options.layerIndex, colorIndex)}
        />
    );

    return (
        <Region
            name="badge_editor"
            layout={{ position: 'absolute', left: 0, width: 392, top: 0, height: 305 }}
        >
            <Region
                name="guild_badge"
                layout={{ position: 'absolute', left: 0, width: 128, top: 0, height: 305 }}
            >
                <ThemeText
                    text={t('group.edit.badge.badge')}
                    textStyle="u_bold"
                    name="guild_badge"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 25, top: 8 }}
                />
                <Border
                    variant="0"
                    name="border"
                    layout={{ position: 'absolute', left: 17, width: 94, top: 29, height: 94 }}
                >
                    <Border
                        variant="3"
                        tintColor="#e9e9e1"
                        layout={{ position: 'absolute', left: 4, width: 86, top: 4, height: 86 }}
                    />
                    <GroupBadgePreview
                        layers={layers}
                        editorData={editorData}
                        layout={{ position: 'absolute', left: 27, top: 27 }}
                    />
                </Border>
            </Region>
            {pickedLayer
                ? (
                        <GroupBadgePartPicker
                            options={pickedLayer}
                            editorData={editorData}
                            onSelect={partIndex => onSelectPart(pickedLayer.layerIndex, partIndex)}
                        />
                    )
                : (
                        <Region
                            name="part_edit"
                            layout={{ position: 'absolute', left: 128, width: 264, top: 0, height: 305 }}
                        >
                            <Region
                                name="part_edit_top_labels"
                                layout={{ position: 'absolute', left: 0, width: 264, top: 0, height: 29 }}
                            >
                                <ThemeText
                                    text={t('group.edit.badge.symbol')}
                                    textStyle="u_bold"
                                    name="label_symbol"
                                    verticalAlign="top"
                                    layout={{ position: 'absolute', left: 0, top: 8 }}
                                />
                                <ThemeText
                                    text={t('group.edit.badge.position')}
                                    textStyle="u_bold"
                                    name="label_position"
                                    verticalAlign="top"
                                    layout={{ position: 'absolute', left: 64, top: 8 }}
                                />
                                <ThemeText
                                    text={t('group.edit.badge.colors')}
                                    textStyle="u_bold"
                                    name="label_colors"
                                    verticalAlign="top"
                                    layout={{ position: 'absolute', left: 155, top: 8 }}
                                />
                            </Region>
                            <Region
                                name="part_edit_list"
                                layout={{ position: 'absolute', left: 0, right: 0, top: 29, bottom: 0, flexDirection: 'column', gap: 2 }}
                            >
                                {symbolLayers.map(layerRow)}
                                <Region layout={{ height: 19, width: 264, flexShrink: 0 }}>
                                    <ThemeText
                                        text={t('group.edit.badge.base')}
                                        textStyle="u_bold"
                                        flashFormat={{ thickness: -15, sharpness: 80 }}
                                        clip
                                        name="label_base"
                                        verticalAlign="top"
                                        layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 17 }}
                                    />
                                </Region>
                                {baseLayer && layerRow(baseLayer)}
                            </Region>
                        </Region>
                    )}
        </Region>
    );
};
