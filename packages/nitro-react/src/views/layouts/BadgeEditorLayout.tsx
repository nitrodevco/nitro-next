import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1191_badge_editor_xml` (layout "badge_editor", 392x305) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BadgeEditorLayoutProps {
    layout?: BoxLayout;
}

export const BadgeEditorLayout = ({ layout }: BadgeEditorLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 392, height: 305, ...layout }}>
            <Region
                name="badge_editor"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 392, top: 0, height: 305 }}
            >
                <Region
                    name="guild_badge"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 128, top: 0, height: 305 }}
                >
                    <Region
                        name="guild_badge"
                        params={16}
                        layout={{ position: 'absolute', left: 25, width: 71, top: 8, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('group.edit.badge.badge')}
                            textStyle="text-style-u-bold"
                        />
                    </Region>
                    <Border
                        variant="0"
                        name="border"
                        params={16}
                        layout={{ position: 'absolute', left: 17, width: 94, top: 29, height: 94 }}
                    >
                        <Border
                            variant="3"
                            params={16}
                            tintColor="#e9e9e1"
                            layout={{ position: 'absolute', left: 4, width: 86, top: 4, height: 86 }}
                        />
                        <ThemeImage
                            name="layer_0"
                            params={16}
                            src={undefined}
                            layout={{ position: 'absolute', left: 27, width: 39, top: 27, height: 39 }}
                        />
                        <ThemeImage
                            name="layer_1"
                            params={16}
                            src={undefined}
                            layout={{ position: 'absolute', left: 27, width: 39, top: 27, height: 39 }}
                        />
                        <ThemeImage
                            name="layer_2"
                            params={16}
                            src={undefined}
                            layout={{ position: 'absolute', left: 27, width: 39, top: 27, height: 39 }}
                        />
                        <ThemeImage
                            name="layer_3"
                            params={16}
                            src={undefined}
                            layout={{ position: 'absolute', left: 27, width: 39, top: 27, height: 39 }}
                        />
                        <ThemeImage
                            name="layer_4"
                            params={16}
                            src={undefined}
                            layout={{ position: 'absolute', left: 27, width: 39, top: 27, height: 39 }}
                        />
                    </Border>
                </Region>
                <Region
                    name="part_edit"
                    params={16}
                    layout={{ position: 'absolute', left: 128, width: 264, top: 0, height: 305 }}
                >
                    <Region
                        name="part_edit_top_labels"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 264, top: 0, height: 29 }}
                    >
                        <Region
                            name="label_symbol"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 43, top: 8, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('group.edit.badge.symbol')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                        <Region
                            name="label_position"
                            params={16}
                            layout={{ position: 'absolute', left: 64, width: 49, top: 8, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('group.edit.badge.position')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                        <Region
                            name="label_colors"
                            params={16}
                            layout={{ position: 'absolute', left: 155, width: 40, top: 8, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('group.edit.badge.colors')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    </Region>
                    <Region
                        name="part_edit_list"
                        params={2176}
                        layout={{ position: 'absolute', left: 0, width: 264, top: 29, height: 276, flexDirection: 'column', gap: 2 }}
                    >
                        <Region
                            params={16}
                            layout={{ width: 264, height: 19, flexShrink: 0 }}
                        >
                            <Region
                                name="label_base"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('group.edit.badge.base')}
                                    textStyle="text-style-u-bold"
                                />
                            </Region>
                        </Region>
                    </Region>
                </Region>
                <Region
                    name="part_select"
                    params={16}
                    layout={{ position: 'absolute', left: 128, width: 264, top: 0, height: 305 }}
                >
                    <Region
                        name="part_edit_top_labels"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 264, top: 0, height: 29 }}
                    >
                        <Region
                            name="label_symbol"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 78, top: 8, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('group.edit.badge.pick.symbol')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    </Region>
                    <Border
                        variant="3"
                        name="part_select_outer_border"
                        params={16}
                        tintColor="#bebba5"
                        layout={{ position: 'absolute', left: 0, width: 247, top: 29, height: 274 }}
                    >
                        <Border
                            variant="3"
                            name="part_select_inner_border"
                            params={16}
                            layout={{ position: 'absolute', left: 4, width: 239, top: 4, height: 266 }}
                        >
                            <ScrollArea
                                orientation="vertical"
                                layout={{ position: 'absolute', left: 3, width: 214, top: 4, height: 258 }}
                            >
                                <Region
                                    name="part_select_grid"
                                    params={16}
                                    layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                                />
                            </ScrollArea>
                        </Border>
                    </Border>
                </Region>
            </Region>
        </Region>
    );
};
