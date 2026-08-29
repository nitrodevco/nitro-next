import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Named region `selected_border` of MemenuEffectUnselectedLayout - configured through the parent's `selectedBorder` prop. */
export interface MemenuEffectUnselectedLayoutSelectedBorderProps {
    captionEffectAmount?: string;
    captionEffectName?: string;
    captionTimeLeft?: string;
    layout?: BoxLayout;
    loaderHighlight?: ReactNode;
    onSelectedBorder?: () => void;
    srcEffectHilite?: string;
    srcEffectIcon?: string;
    srcEffectIconBg?: string;
    tintEffectHilite?: string;
    tintEffectIcon?: string;
    tintEffectIconBg?: string;
}

export const MemenuEffectUnselectedLayoutSelectedBorder = ({ captionEffectAmount, captionEffectName, captionTimeLeft, layout, loaderHighlight, onSelectedBorder, srcEffectHilite, srcEffectIcon, srcEffectIconBg, tintEffectHilite, tintEffectIcon, tintEffectIconBg }: MemenuEffectUnselectedLayoutSelectedBorderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="selected_border"
            onPointerTap={onSelectedBorder}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Border
                variant="2"
                tintColor="#666666"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 4 }}
            >
                <ThemeImage
                    name="effect_icon_bg"
                    src={srcEffectIconBg}
                    tint={tintEffectIconBg}
                    layout={{ position: 'absolute', left: 4, width: 40, top: 4, height: 40 }}
                />
                <ThemeImage
                    name="effect_icon"
                    src={srcEffectIcon}
                    tint={tintEffectIcon}
                    layout={{ position: 'absolute', left: 4, width: 40, top: 4, height: 40 }}
                />
                <ThemeImage
                    name="effect_hilite"
                    src={srcEffectHilite}
                    tint={tintEffectHilite}
                    layout={{ position: 'absolute', left: 4, width: 40, top: 4, height: 40 }}
                />
                <Region
                    name="loader_border"
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', right: 6, width: 98, bottom: 6, height: 22 }}
                >
                    <Region
                        name="loader_bg"
                        backgroundColor="#3d3d3d"
                        layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1 }}
                    >
                        <Region
                            name="loader_bar"
                            backgroundColor="#666666"
                            layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1 }}
                        >
                            <Region
                                name="loader_highlight"
                                backgroundColor="#999999"
                                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 2 }}
                            >
                                {loaderHighlight}
                            </Region>
                        </Region>
                    </Region>
                </Region>
                <Region
                    name="time_left"
                    layout={{ position: 'absolute', right: 4, width: 98, bottom: 11, height: 13, minWidth: 98, maxWidth: 98, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
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
                        layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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
