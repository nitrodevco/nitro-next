import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ScrollArea, ThemeText } from '#base/theme';

import { BadgeEditorLayoutGuildBadge, BadgeEditorLayoutGuildBadgeProps } from './BadgeEditorLayoutGuildBadge';
import { BadgeEditorLayoutPartEdit, BadgeEditorLayoutPartEditProps } from './BadgeEditorLayoutPartEdit';

/** Named region `badge_editor` of BadgeEditorLayout - configured through the parent's `badgeEditor` prop. */
export interface BadgeEditorLayoutBadgeEditorProps {
    captionLabelSymbol?: string;
    guildBadge?: BadgeEditorLayoutGuildBadgeProps;
    itemsPartSelectGrid?: ReactNode;
    layout?: BoxLayout;
    partEdit?: BadgeEditorLayoutPartEditProps;
}

export const BadgeEditorLayoutBadgeEditor = ({ captionLabelSymbol, guildBadge, itemsPartSelectGrid, layout, partEdit }: BadgeEditorLayoutBadgeEditorProps) => {
    const t = useTranslation();

    return (
        <Region
            name="badge_editor"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <BadgeEditorLayoutGuildBadge {...guildBadge} />
            <BadgeEditorLayoutPartEdit {...partEdit} />
            <Region
                name="part_select"
                layout={{ position: 'absolute', left: 128, width: 264, top: 0, bottom: 0 }}
            >
                <Region
                    name="part_edit_top_labels"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 29 }}
                >
                    <ThemeText
                        text={captionLabelSymbol ?? t('group.edit.badge.pick.symbol')}
                        textStyle="text-style-u-bold"
                        name="label_symbol"
                        layout={{ position: 'absolute', left: 0, width: 78, top: 8, height: 17 }}
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
                            layout={{ position: 'absolute', left: 3, width: 214, top: 4, height: 258 }}
                        >
                            <Region
                                name="part_select_grid"
                                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                            >
                                {itemsPartSelectGrid}
                            </Region>
                        </ScrollArea>
                        {/* <scrollbar_vertical> for part_select_grid - rendered by that list's ScrollArea */}
                    </Border>
                </Border>
            </Region>
        </Region>
    );
};
