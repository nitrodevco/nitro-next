import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `971_memenu_effect_inactive_xml` (layout "memenu_effect_unselected", 154x52) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuEffectInactiveLayoutProps {
    layout?: BoxLayout;
    selectedBorder?: MemenuEffectInactiveLayoutSelectedBorderProps;
}

export const MemenuEffectInactiveLayout = ({ layout, selectedBorder }: MemenuEffectInactiveLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 154, height: 52, ...layout }}>
            <MemenuEffectInactiveLayoutSelectedBorder {...selectedBorder} />
        </Region>
    );
};

/** Named region `effect_amount_bg2` of MemenuEffectInactiveLayout - configured through the parent's `effectAmountBg2` prop. */
export interface MemenuEffectInactiveLayoutEffectAmountBg2Props {
    captionEffectAmount?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const MemenuEffectInactiveLayoutEffectAmountBg2 = ({ captionEffectAmount, layout, tags }: MemenuEffectInactiveLayoutEffectAmountBg2Props) => {
    return (
        <Region
            name="effect_amount_bg2"
            tags={tags}
            backgroundColor="#666666"
            layout={{ position: 'absolute', left: 1, width: 18, top: 1, height: 13, ...layout }}
        >
            <Region
                name="effect_amount"
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

/** Named region `effect_amount_bg1` of MemenuEffectInactiveLayout - configured through the parent's `effectAmountBg1` prop. */
export interface MemenuEffectInactiveLayoutEffectAmountBg1Props {
    effectAmountBg2?: MemenuEffectInactiveLayoutEffectAmountBg2Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const MemenuEffectInactiveLayoutEffectAmountBg1 = ({ effectAmountBg2, layout, tags }: MemenuEffectInactiveLayoutEffectAmountBg1Props) => {
    return (
        <Region
            name="effect_amount_bg1"
            tags={tags}
            backgroundColor="#dddddd"
            layout={{ position: 'absolute', left: 24, width: 20, top: 4, height: 15, ...layout }}
        >
            <MemenuEffectInactiveLayoutEffectAmountBg2 {...effectAmountBg2} />
        </Region>
    );
};

/** Named region `selected_border` of MemenuEffectInactiveLayout - configured through the parent's `selectedBorder` prop. */
export interface MemenuEffectInactiveLayoutSelectedBorderProps {
    captionEffectName?: string;
    effectAmountBg1?: MemenuEffectInactiveLayoutEffectAmountBg1Props;
    layout?: BoxLayout;
    onActivateEffect?: () => void;
    onSelectedBorder?: () => void;
    srcEffectIcon?: string;
    srcEffectIconBg?: string;
    tags?: string[];
}

export const MemenuEffectInactiveLayoutSelectedBorder = ({ captionEffectName, effectAmountBg1, layout, onActivateEffect, onSelectedBorder, srcEffectIcon, srcEffectIconBg, tags }: MemenuEffectInactiveLayoutSelectedBorderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="selected_border"
            tags={tags}
            onPointerTap={onSelectedBorder}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 154, top: 0, height: 52, ...layout }}
        >
            <Border
                variant="2"
                blend={0}
                layout={{ position: 'absolute', left: 0, width: 175, top: 0, height: 48 }}
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
                <Region
                    name="effect_name"
                    layout={{ position: 'absolute', left: 50, width: 163, top: 6, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionEffectName ?? t('widget.memenu.effectname')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Button
                    variant="1"
                    name="activate_effect"
                    onPointerTap={onActivateEffect}
                    layout={{ position: 'absolute', left: 50, width: 98, top: 20, height: 22 }}
                >
                    {t('widgets.memenu.effects.activate')}
                </Button>
                <MemenuEffectInactiveLayoutEffectAmountBg1 {...effectAmountBg1} />
            </Border>
        </Region>
    );
};
