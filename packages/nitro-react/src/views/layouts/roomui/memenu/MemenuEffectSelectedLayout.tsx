import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `916_memenu_effect_selected_xml` (layout "memenu_effect_selected", 154x52) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuEffectSelectedLayoutProps {
    layout?: BoxLayout;
    selectedBorder?: MemenuEffectSelectedLayoutSelectedBorderProps;
}

export const MemenuEffectSelectedLayout = ({ layout, selectedBorder }: MemenuEffectSelectedLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 154, height: 52, ...layout }}>
            <MemenuEffectSelectedLayoutSelectedBorder {...selectedBorder} />
        </Region>
    );
};

/** Named region `loader_highlight` of MemenuEffectSelectedLayout - configured through the parent's `loaderHighlight` prop. */
export interface MemenuEffectSelectedLayoutLoaderHighlightProps {
    layout?: BoxLayout;
}

export const MemenuEffectSelectedLayoutLoaderHighlight = ({ layout }: MemenuEffectSelectedLayoutLoaderHighlightProps) => {
    return (
        <Region
            name="loader_highlight"
            backgroundColor="#66cc66"
            layout={{ position: 'absolute', left: 0, width: 94, top: 0, height: 2, ...layout }}
        />
    );
};

/** Named region `loader_bar` of MemenuEffectSelectedLayout - configured through the parent's `loaderBar` prop. */
export interface MemenuEffectSelectedLayoutLoaderBarProps {
    layout?: BoxLayout;
    loaderHighlight?: MemenuEffectSelectedLayoutLoaderHighlightProps;
}

export const MemenuEffectSelectedLayoutLoaderBar = ({ layout, loaderHighlight }: MemenuEffectSelectedLayoutLoaderBarProps) => {
    return (
        <Region
            name="loader_bar"
            backgroundColor="#339933"
            layout={{ position: 'absolute', left: 1, width: 94, top: 1, height: 18, ...layout }}
        >
            <MemenuEffectSelectedLayoutLoaderHighlight {...loaderHighlight} />
        </Region>
    );
};

/** Named region `loader_bg` of MemenuEffectSelectedLayout - configured through the parent's `loaderBg` prop. */
export interface MemenuEffectSelectedLayoutLoaderBgProps {
    layout?: BoxLayout;
    loaderBar?: MemenuEffectSelectedLayoutLoaderBarProps;
}

export const MemenuEffectSelectedLayoutLoaderBg = ({ layout, loaderBar }: MemenuEffectSelectedLayoutLoaderBgProps) => {
    return (
        <Region
            name="loader_bg"
            backgroundColor="#3d3d3d"
            layout={{ position: 'absolute', left: 1, width: 96, top: 1, height: 20, ...layout }}
        >
            <MemenuEffectSelectedLayoutLoaderBar {...loaderBar} />
        </Region>
    );
};

/** Named region `loader_border` of MemenuEffectSelectedLayout - configured through the parent's `loaderBorder` prop. */
export interface MemenuEffectSelectedLayoutLoaderBorderProps {
    layout?: BoxLayout;
    loaderBg?: MemenuEffectSelectedLayoutLoaderBgProps;
}

export const MemenuEffectSelectedLayoutLoaderBorder = ({ layout, loaderBg }: MemenuEffectSelectedLayoutLoaderBorderProps) => {
    return (
        <Region
            name="loader_border"
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 50, width: 98, top: 20, height: 22, ...layout }}
        >
            <MemenuEffectSelectedLayoutLoaderBg {...loaderBg} />
        </Region>
    );
};

/** Named region `effect_amount_bg2` of MemenuEffectSelectedLayout - configured through the parent's `effectAmountBg2` prop. */
export interface MemenuEffectSelectedLayoutEffectAmountBg2Props {
    captionEffectAmount?: string;
    layout?: BoxLayout;
}

export const MemenuEffectSelectedLayoutEffectAmountBg2 = ({ captionEffectAmount, layout }: MemenuEffectSelectedLayoutEffectAmountBg2Props) => {
    return (
        <Region
            name="effect_amount_bg2"
            layout={{ position: 'absolute', left: 1, width: 18, top: 1, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
            backgroundColor="#666666"
        >
            <ThemeText
                text={captionEffectAmount ?? '99'}
                textOptions={{ fill: '#eeeeee' }}
            />
        </Region>
    );
};

/** Named region `effect_amount_bg1` of MemenuEffectSelectedLayout - configured through the parent's `effectAmountBg1` prop. */
export interface MemenuEffectSelectedLayoutEffectAmountBg1Props {
    effectAmountBg2?: MemenuEffectSelectedLayoutEffectAmountBg2Props;
    layout?: BoxLayout;
}

export const MemenuEffectSelectedLayoutEffectAmountBg1 = ({ effectAmountBg2, layout }: MemenuEffectSelectedLayoutEffectAmountBg1Props) => {
    return (
        <Region
            name="effect_amount_bg1"
            backgroundColor="#dddddd"
            layout={{ position: 'absolute', left: 24, width: 20, top: 4, height: 15, ...layout }}
        >
            <MemenuEffectSelectedLayoutEffectAmountBg2 {...effectAmountBg2} />
        </Region>
    );
};

/** Named region `selected_border` of MemenuEffectSelectedLayout - configured through the parent's `selectedBorder` prop. */
export interface MemenuEffectSelectedLayoutSelectedBorderProps {
    captionEffectName?: string;
    captionTimeLeft?: string;
    effectAmountBg1?: MemenuEffectSelectedLayoutEffectAmountBg1Props;
    layout?: BoxLayout;
    loaderBorder?: MemenuEffectSelectedLayoutLoaderBorderProps;
    onSelectedBorder?: () => void;
    srcEffectHilite?: string;
    srcEffectIcon?: string;
    srcEffectIconBg?: string;
}

export const MemenuEffectSelectedLayoutSelectedBorder = ({ captionEffectName, captionTimeLeft, effectAmountBg1, layout, loaderBorder, onSelectedBorder, srcEffectHilite, srcEffectIcon, srcEffectIconBg }: MemenuEffectSelectedLayoutSelectedBorderProps) => {
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
                tintColor="#cccccc"
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
                <MemenuEffectSelectedLayoutLoaderBorder {...loaderBorder} />
                <Region
                    name="time_left"
                    layout={{ position: 'absolute', left: 52, width: 98, top: 24, height: 13, minWidth: 98, maxWidth: 98, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionTimeLeft ?? t('widgets.memenu.effects.active.timeleft')}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                <Region
                    name="effect_name"
                    layout={{ position: 'absolute', left: 50, width: 163, top: 6, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionEffectName ?? t('widget.memenu.effectname')} />
                </Region>
                <MemenuEffectSelectedLayoutEffectAmountBg1 {...effectAmountBg1} />
            </Border>
        </Region>
    );
};
