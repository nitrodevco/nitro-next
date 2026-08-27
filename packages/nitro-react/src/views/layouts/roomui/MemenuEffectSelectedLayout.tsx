import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `916_memenu_effect_selected_xml` (layout "memenu_effect_selected", 154x52) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuEffectSelectedLayoutProps {
    captionEffectAmount?: string;
    captionEffectName?: string;
    captionTimeLeft?: string;
    layout?: BoxLayout;
    srcEffectHilite?: string;
    srcEffectIcon?: string;
    srcEffectIconBg?: string;
}

export const MemenuEffectSelectedLayout = ({ captionEffectAmount, captionEffectName, captionTimeLeft, layout, srcEffectHilite, srcEffectIcon, srcEffectIconBg }: MemenuEffectSelectedLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 154, height: 52, ...layout }}>
            <Region
                name="selected_border"
                params={17}
                layout={{ position: 'absolute', left: 0, width: 154, top: 0, height: 52 }}
            >
                <Border
                    variant="2"
                    params={16}
                    tintColor="#cccccc"
                    layout={{ position: 'absolute', left: 0, width: 154, top: 0, height: 48 }}
                >
                    <ThemeImage
                        name="effect_icon_bg"
                        params={16}
                        src={srcEffectIconBg}
                        layout={{ position: 'absolute', left: 4, width: 40, top: 4, height: 40 }}
                    />
                    <ThemeImage
                        name="effect_icon"
                        params={16}
                        src={srcEffectIcon}
                        layout={{ position: 'absolute', left: 4, width: 40, top: 4, height: 40 }}
                    />
                    <ThemeImage
                        name="effect_hilite"
                        params={16}
                        src={srcEffectHilite}
                        layout={{ position: 'absolute', left: 4, width: 40, top: 4, height: 40 }}
                    />
                    <Region
                        name="loader_border"
                        params={16}
                        backgroundColor="#ffffff"
                        layout={{ position: 'absolute', left: 50, width: 98, top: 20, height: 22 }}
                    >
                        <Region
                            name="loader_bg"
                            params={16}
                            backgroundColor="#3d3d3d"
                            layout={{ position: 'absolute', left: 1, width: 96, top: 1, height: 20 }}
                        >
                            <Region
                                name="loader_bar"
                                params={16}
                                backgroundColor="#339933"
                                layout={{ position: 'absolute', left: 1, width: 94, top: 1, height: 18 }}
                            >
                                <Region
                                    name="loader_highlight"
                                    params={16}
                                    backgroundColor="#66cc66"
                                    layout={{ position: 'absolute', left: 0, width: 94, top: 0, height: 2 }}
                                />
                            </Region>
                        </Region>
                    </Region>
                    <Region
                        name="time_left"
                        params={16}
                        layout={{ position: 'absolute', left: 52, width: 98, top: 24, height: 13, minWidth: 98, maxWidth: 98, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionTimeLeft ?? t('widgets.memenu.effects.active.timeleft')}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="effect_name"
                        params={16}
                        layout={{ position: 'absolute', left: 50, width: 163, top: 6, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionEffectName ?? t('widget.memenu.effectname')} />
                    </Region>
                    <Region
                        name="effect_amount_bg1"
                        params={16}
                        backgroundColor="#dddddd"
                        layout={{ position: 'absolute', left: 24, width: 20, top: 4, height: 15 }}
                    >
                        <Region
                            name="effect_amount_bg2"
                            params={16}
                            backgroundColor="#666666"
                            layout={{ position: 'absolute', left: 1, width: 18, top: 1, height: 13 }}
                        >
                            <Region
                                name="effect_amount"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionEffectAmount ?? '99'}
                                    textOptions={{ fill: '#eeeeee' }}
                                />
                            </Region>
                        </Region>
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
