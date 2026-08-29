import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `828_memenu_effect_unselected_xml` (layout "memenu_effect_unselected", 154x52) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuEffectUnselectedLayoutProps {
    layout?: BoxLayout;
    selectedBorder?: MemenuEffectUnselectedLayoutSelectedBorderProps;
}

export const MemenuEffectUnselectedLayout = ({ layout, selectedBorder }: MemenuEffectUnselectedLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 154, height: 52, ...layout }}>
            <MemenuEffectUnselectedLayoutSelectedBorder {...selectedBorder} />
        </Region>
    );
};

/** Named region `selected_border` of MemenuEffectUnselectedLayout - configured through the parent's `selectedBorder` prop. */
export interface MemenuEffectUnselectedLayoutSelectedBorderProps {
    captionEffectAmount?: string;
    captionEffectName?: string;
    captionTimeLeft?: string;
    layout?: BoxLayout;
    onSelectedBorder?: () => void;
    srcEffectHilite?: string;
    srcEffectIcon?: string;
    srcEffectIconBg?: string;
}

export const MemenuEffectUnselectedLayoutSelectedBorder = ({ captionEffectAmount, captionEffectName, captionTimeLeft, layout, onSelectedBorder, srcEffectHilite, srcEffectIcon, srcEffectIconBg }: MemenuEffectUnselectedLayoutSelectedBorderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="selected_border"
            onPointerTap={onSelectedBorder}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 154, top: 0, height: 52, ...layout }}
        >
            <Border
                variant="2"
                tintColor="#666666"
                layout={{ position: 'absolute', left: 0, width: 154, top: 0, height: 48 }}
            >
                <ThemeImage
                    name="effect_icon_bg"
                    src={srcEffectIconBg}
                    layout={{ position: 'absolute', left: 4, width: 40, top: 4, height: 40 }}
                />
                <ThemeImage
                    name="effect_icon"
                    src={srcEffectIcon}
                    layout={{ position: 'absolute', left: 4, width: 40, top: 4, height: 40 }}
                />
                <ThemeImage
                    name="effect_hilite"
                    src={srcEffectHilite}
                    layout={{ position: 'absolute', left: 4, width: 40, top: 4, height: 40 }}
                />
                <Region
                    name="loader_border"
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 50, width: 98, top: 20, height: 22 }}
                >
                    <Region
                        name="loader_bg"
                        backgroundColor="#3d3d3d"
                        layout={{ position: 'absolute', left: 1, width: 96, top: 1, height: 20 }}
                    >
                        <Region
                            name="loader_bar"
                            backgroundColor="#666666"
                            layout={{ position: 'absolute', left: 1, width: 94, top: 1, height: 18 }}
                        >
                            <Region
                                name="loader_highlight"
                                backgroundColor="#999999"
                                layout={{ position: 'absolute', left: 0, width: 94, top: 0, height: 2 }}
                            />
                        </Region>
                    </Region>
                </Region>
                <Region
                    name="time_left"
                    layout={{ position: 'absolute', left: 52, width: 98, top: 24, height: 13, minWidth: 98, maxWidth: 98, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionTimeLeft ?? t('widgets.memenu.effects.active.timeleft')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Region
                    name="effect_name"
                    layout={{ position: 'absolute', left: 50, width: 163, top: 6, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionEffectName ?? t('widget.memenu.effectname')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="effect_amount_bg1"
                    backgroundColor="#dddddd"
                    layout={{ position: 'absolute', left: 24, width: 20, top: 4, height: 15 }}
                >
                    <Region
                        name="effect_amount_bg2"
                        layout={{ position: 'absolute', left: 1, width: 18, top: 1, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        backgroundColor="#666666"
                    >
                        <ThemeText
                            text={captionEffectAmount ?? '99'}
                            textOptions={{ fill: '#eeeeee' }}
                        />
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};
