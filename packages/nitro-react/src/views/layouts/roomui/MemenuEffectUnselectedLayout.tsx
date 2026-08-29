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

/** Named region `loader_highlight` of MemenuEffectUnselectedLayout - configured through the parent's `loaderHighlight` prop. */
export interface MemenuEffectUnselectedLayoutLoaderHighlightProps {
    layout?: BoxLayout;
}

export const MemenuEffectUnselectedLayoutLoaderHighlight = ({ layout }: MemenuEffectUnselectedLayoutLoaderHighlightProps) => {
    return (
        <Region
            name="loader_highlight"
            params={16}
            backgroundColor="#999999"
            layout={{ position: 'absolute', left: 0, width: 94, top: 0, height: 2, ...layout }}
        />
    );
};

/** Named region `loader_bar` of MemenuEffectUnselectedLayout - configured through the parent's `loaderBar` prop. */
export interface MemenuEffectUnselectedLayoutLoaderBarProps {
    layout?: BoxLayout;
    loaderHighlight?: MemenuEffectUnselectedLayoutLoaderHighlightProps;
}

export const MemenuEffectUnselectedLayoutLoaderBar = ({ layout, loaderHighlight }: MemenuEffectUnselectedLayoutLoaderBarProps) => {
    return (
        <Region
            name="loader_bar"
            params={16}
            backgroundColor="#666666"
            layout={{ position: 'absolute', left: 1, width: 94, top: 1, height: 18, ...layout }}
        >
            <MemenuEffectUnselectedLayoutLoaderHighlight {...loaderHighlight} />
        </Region>
    );
};

/** Named region `loader_bg` of MemenuEffectUnselectedLayout - configured through the parent's `loaderBg` prop. */
export interface MemenuEffectUnselectedLayoutLoaderBgProps {
    layout?: BoxLayout;
    loaderBar?: MemenuEffectUnselectedLayoutLoaderBarProps;
}

export const MemenuEffectUnselectedLayoutLoaderBg = ({ layout, loaderBar }: MemenuEffectUnselectedLayoutLoaderBgProps) => {
    return (
        <Region
            name="loader_bg"
            params={16}
            backgroundColor="#3d3d3d"
            layout={{ position: 'absolute', left: 1, width: 96, top: 1, height: 20, ...layout }}
        >
            <MemenuEffectUnselectedLayoutLoaderBar {...loaderBar} />
        </Region>
    );
};

/** Named region `loader_border` of MemenuEffectUnselectedLayout - configured through the parent's `loaderBorder` prop. */
export interface MemenuEffectUnselectedLayoutLoaderBorderProps {
    layout?: BoxLayout;
    loaderBg?: MemenuEffectUnselectedLayoutLoaderBgProps;
}

export const MemenuEffectUnselectedLayoutLoaderBorder = ({ layout, loaderBg }: MemenuEffectUnselectedLayoutLoaderBorderProps) => {
    return (
        <Region
            name="loader_border"
            params={16}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 50, width: 98, top: 20, height: 22, ...layout }}
        >
            <MemenuEffectUnselectedLayoutLoaderBg {...loaderBg} />
        </Region>
    );
};

/** Named region `effect_amount_bg2` of MemenuEffectUnselectedLayout - configured through the parent's `effectAmountBg2` prop. */
export interface MemenuEffectUnselectedLayoutEffectAmountBg2Props {
    captionEffectAmount?: string;
    layout?: BoxLayout;
}

export const MemenuEffectUnselectedLayoutEffectAmountBg2 = ({ captionEffectAmount, layout }: MemenuEffectUnselectedLayoutEffectAmountBg2Props) => {
    return (
        <Region
            name="effect_amount_bg2"
            params={16}
            backgroundColor="#666666"
            layout={{ position: 'absolute', left: 1, width: 18, top: 1, height: 13, ...layout }}
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
    );
};

/** Named region `effect_amount_bg1` of MemenuEffectUnselectedLayout - configured through the parent's `effectAmountBg1` prop. */
export interface MemenuEffectUnselectedLayoutEffectAmountBg1Props {
    effectAmountBg2?: MemenuEffectUnselectedLayoutEffectAmountBg2Props;
    layout?: BoxLayout;
}

export const MemenuEffectUnselectedLayoutEffectAmountBg1 = ({ effectAmountBg2, layout }: MemenuEffectUnselectedLayoutEffectAmountBg1Props) => {
    return (
        <Region
            name="effect_amount_bg1"
            params={16}
            backgroundColor="#dddddd"
            layout={{ position: 'absolute', left: 24, width: 20, top: 4, height: 15, ...layout }}
        >
            <MemenuEffectUnselectedLayoutEffectAmountBg2 {...effectAmountBg2} />
        </Region>
    );
};

/** Named region `selected_border` of MemenuEffectUnselectedLayout - configured through the parent's `selectedBorder` prop. */
export interface MemenuEffectUnselectedLayoutSelectedBorderProps {
    captionEffectName?: string;
    captionTimeLeft?: string;
    effectAmountBg1?: MemenuEffectUnselectedLayoutEffectAmountBg1Props;
    layout?: BoxLayout;
    loaderBorder?: MemenuEffectUnselectedLayoutLoaderBorderProps;
    onSelectedBorder?: () => void;
    srcEffectHilite?: string;
    srcEffectIcon?: string;
    srcEffectIconBg?: string;
}

export const MemenuEffectUnselectedLayoutSelectedBorder = ({ captionEffectName, captionTimeLeft, effectAmountBg1, layout, loaderBorder, onSelectedBorder, srcEffectHilite, srcEffectIcon, srcEffectIconBg }: MemenuEffectUnselectedLayoutSelectedBorderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="selected_border"
            params={17}
            onPointerTap={onSelectedBorder}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 154, top: 0, height: 52, ...layout }}
        >
            <Border
                variant="2"
                params={16}
                tintColor="#666666"
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
                <MemenuEffectUnselectedLayoutLoaderBorder {...loaderBorder} />
                <Region
                    name="time_left"
                    params={16}
                    layout={{ position: 'absolute', left: 52, width: 98, top: 24, height: 13, minWidth: 98, maxWidth: 98, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionTimeLeft ?? t('widgets.memenu.effects.active.timeleft')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Region
                    name="effect_name"
                    params={16}
                    layout={{ position: 'absolute', left: 50, width: 163, top: 6, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionEffectName ?? t('widget.memenu.effectname')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <MemenuEffectUnselectedLayoutEffectAmountBg1 {...effectAmountBg1} />
            </Border>
        </Region>
    );
};
