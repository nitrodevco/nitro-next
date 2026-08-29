import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Named region `part_edit` of BadgeEditorLayout - configured through the parent's `partEdit` prop. */
export interface BadgeEditorLayoutPartEditProps {
    captionLabelBase?: string;
    captionLabelColors?: string;
    captionLabelPosition?: string;
    captionLabelSymbol?: string;
    layout?: BoxLayout;
}

export const BadgeEditorLayoutPartEdit = ({ captionLabelBase, captionLabelColors, captionLabelPosition, captionLabelSymbol, layout }: BadgeEditorLayoutPartEditProps) => {
    const t = useTranslation();

    return (
        <Region
            name="part_edit"
            layout={{ position: 'absolute', left: 128, width: 264, top: 0, height: 305, ...layout }}
        >
            <Region
                name="part_edit_top_labels"
                layout={{ position: 'absolute', left: 0, width: 264, top: 0, height: 29 }}
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
            <Region
                name="part_edit_list"
                layout={{ position: 'absolute', left: 0, right: 0, top: 29, bottom: 0, flexDirection: 'column', gap: 2 }}
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
        </Region>
    );
};
