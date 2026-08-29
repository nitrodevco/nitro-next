import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1191_badge_editor_xml` (layout "badge_editor", 392x305) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BadgeEditorLayoutProps {
    badgeEditor?: BadgeEditorLayoutBadgeEditorProps;
    layout?: BoxLayout;
}

export const BadgeEditorLayout = ({ badgeEditor, layout }: BadgeEditorLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 392, height: 305, ...layout }}>
            <BadgeEditorLayoutBadgeEditor {...badgeEditor} />
        </Region>
    );
};

/** Named region `guild_badge` of BadgeEditorLayout - configured through the parent's `guildBadge` prop. */
export interface BadgeEditorLayoutGuildBadgeProps {
    captionGuildBadge?: string;
    layout?: BoxLayout;
    srcLayer0?: string;
    srcLayer1?: string;
    srcLayer2?: string;
    srcLayer3?: string;
    srcLayer4?: string;
}

export const BadgeEditorLayoutGuildBadge = ({ captionGuildBadge, layout, srcLayer0, srcLayer1, srcLayer2, srcLayer3, srcLayer4 }: BadgeEditorLayoutGuildBadgeProps) => {
    const t = useTranslation();

    return (
        <Region
            name="guild_badge"
            layout={{ position: 'absolute', left: 0, width: 128, top: 0, height: 305, ...layout }}
        >
            <Region
                name="guild_badge"
                layout={{ position: 'absolute', left: 25, width: 71, top: 8, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionGuildBadge ?? t('group.edit.badge.badge')}
                    textStyle="text-style-u-bold"
                />
            </Region>
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
                <ThemeImage
                    name="layer_0"
                    src={srcLayer0}
                    layout={{ position: 'absolute', left: 27, width: 39, top: 27, height: 39 }}
                />
                <ThemeImage
                    name="layer_1"
                    src={srcLayer1}
                    layout={{ position: 'absolute', left: 27, width: 39, top: 27, height: 39 }}
                />
                <ThemeImage
                    name="layer_2"
                    src={srcLayer2}
                    layout={{ position: 'absolute', left: 27, width: 39, top: 27, height: 39 }}
                />
                <ThemeImage
                    name="layer_3"
                    src={srcLayer3}
                    layout={{ position: 'absolute', left: 27, width: 39, top: 27, height: 39 }}
                />
                <ThemeImage
                    name="layer_4"
                    src={srcLayer4}
                    layout={{ position: 'absolute', left: 27, width: 39, top: 27, height: 39 }}
                />
            </Border>
        </Region>
    );
};

/** Named region `part_edit_top_labels` of BadgeEditorLayout - configured through the parent's `partEditTopLabels` prop. */
export interface BadgeEditorLayoutPartEditTopLabelsProps {
    captionLabelColors?: string;
    captionLabelPosition?: string;
    captionLabelSymbol?: string;
    layout?: BoxLayout;
}

export const BadgeEditorLayoutPartEditTopLabels = ({ captionLabelColors, captionLabelPosition, captionLabelSymbol, layout }: BadgeEditorLayoutPartEditTopLabelsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="part_edit_top_labels"
            layout={{ position: 'absolute', left: 0, width: 264, top: 0, height: 29, ...layout }}
        >
            <Region
                name="label_symbol"
                layout={{ position: 'absolute', left: 0, width: 43, top: 8, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionLabelSymbol ?? t('group.edit.badge.symbol')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="label_position"
                layout={{ position: 'absolute', left: 64, width: 49, top: 8, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionLabelPosition ?? t('group.edit.badge.position')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="label_colors"
                layout={{ position: 'absolute', left: 155, width: 40, top: 8, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionLabelColors ?? t('group.edit.badge.colors')}
                    textStyle="text-style-u-bold"
                />
            </Region>
        </Region>
    );
};

/** Named region `part_edit_list` of BadgeEditorLayout - configured through the parent's `partEditList` prop. */
export interface BadgeEditorLayoutPartEditListProps {
    captionLabelBase?: string;
    layout?: BoxLayout;
}

export const BadgeEditorLayoutPartEditList = ({ captionLabelBase, layout }: BadgeEditorLayoutPartEditListProps) => {
    const t = useTranslation();

    return (
        <Region
            name="part_edit_list"
            layout={{ position: 'absolute', left: 0, right: 0, top: 29, bottom: 0, flexDirection: 'column', gap: 2, ...layout }}
        >
            <Region layout={{ width: 264, height: 19, flexShrink: 0 }}>
                <Region
                    name="label_base"
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionLabelBase ?? t('group.edit.badge.base')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `part_edit` of BadgeEditorLayout - configured through the parent's `partEdit` prop. */
export interface BadgeEditorLayoutPartEditProps {
    layout?: BoxLayout;
    partEditList?: BadgeEditorLayoutPartEditListProps;
    partEditTopLabels?: BadgeEditorLayoutPartEditTopLabelsProps;
}

export const BadgeEditorLayoutPartEdit = ({ layout, partEditList, partEditTopLabels }: BadgeEditorLayoutPartEditProps) => {
    return (
        <Region
            name="part_edit"
            layout={{ position: 'absolute', left: 128, width: 264, top: 0, height: 305, ...layout }}
        >
            <BadgeEditorLayoutPartEditTopLabels {...partEditTopLabels} />
            <BadgeEditorLayoutPartEditList {...partEditList} />
        </Region>
    );
};

/** Named region `part_edit_top_labels` of BadgeEditorLayout - configured through the parent's `partEditTopLabels` prop. */
export interface BadgeEditorLayoutPartEditTopLabels2Props {
    captionLabelSymbol?: string;
    layout?: BoxLayout;
}

export const BadgeEditorLayoutPartEditTopLabels2 = ({ captionLabelSymbol, layout }: BadgeEditorLayoutPartEditTopLabels2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="part_edit_top_labels"
            layout={{ position: 'absolute', left: 0, width: 264, top: 0, height: 29, ...layout }}
        >
            <Region
                name="label_symbol"
                layout={{ position: 'absolute', left: 0, width: 78, top: 8, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionLabelSymbol ?? t('group.edit.badge.pick.symbol')}
                    textStyle="text-style-u-bold"
                />
            </Region>
        </Region>
    );
};

/** Named region `part_select_grid` of BadgeEditorLayout - configured through the parent's `partSelectGrid` prop. */
export interface BadgeEditorLayoutPartSelectGridProps {
    layout?: BoxLayout;
}

export const BadgeEditorLayoutPartSelectGrid = ({ layout }: BadgeEditorLayoutPartSelectGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 3, width: 214, top: 4, height: 258, ...layout }}
        >
            <Region
                name="part_select_grid"
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `part_select` of BadgeEditorLayout - configured through the parent's `partSelect` prop. */
export interface BadgeEditorLayoutPartSelectProps {
    layout?: BoxLayout;
    partEditTopLabels?: BadgeEditorLayoutPartEditTopLabels2Props;
    partSelectGrid?: BadgeEditorLayoutPartSelectGridProps;
}

export const BadgeEditorLayoutPartSelect = ({ layout, partEditTopLabels, partSelectGrid }: BadgeEditorLayoutPartSelectProps) => {
    return (
        <Region
            name="part_select"
            layout={{ position: 'absolute', left: 128, width: 264, top: 0, height: 305, ...layout }}
        >
            <BadgeEditorLayoutPartEditTopLabels2 {...partEditTopLabels} />
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
                    <BadgeEditorLayoutPartSelectGrid {...partSelectGrid} />
                    {/* <scrollbar_vertical> for part_select_grid - rendered by that list's ScrollArea */}
                </Border>
            </Border>
        </Region>
    );
};

/** Named region `badge_editor` of BadgeEditorLayout - configured through the parent's `badgeEditor` prop. */
export interface BadgeEditorLayoutBadgeEditorProps {
    guildBadge?: BadgeEditorLayoutGuildBadgeProps;
    layout?: BoxLayout;
    partEdit?: BadgeEditorLayoutPartEditProps;
    partSelect?: BadgeEditorLayoutPartSelectProps;
}

export const BadgeEditorLayoutBadgeEditor = ({ guildBadge, layout, partEdit, partSelect }: BadgeEditorLayoutBadgeEditorProps) => {
    return (
        <Region
            name="badge_editor"
            layout={{ position: 'absolute', left: 0, width: 392, top: 0, height: 305, ...layout }}
        >
            <BadgeEditorLayoutGuildBadge {...guildBadge} />
            <BadgeEditorLayoutPartEdit {...partEdit} />
            <BadgeEditorLayoutPartSelect {...partSelect} />
        </Region>
    );
};
