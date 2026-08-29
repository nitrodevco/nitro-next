import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeText } from '#base/theme';

/** Generated from `884_memenu_effects_xml` (layout "memenu_effects", 175x114) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuEffectsLayoutProps {
    captionInfoText?: string;
    effectsCnvs?: MemenuEffectsLayoutEffectsCnvsProps;
    layout?: BoxLayout;
    line?: MemenuEffectsLayoutLineProps;
    onBackBtn?: () => void;
}

export const MemenuEffectsLayout = ({ captionInfoText, effectsCnvs, layout, line, onBackBtn }: MemenuEffectsLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 175, height: 114, ...layout }}>
            <Border
                variant="1"
                name="effects_brdr"
                layout={{ position: 'absolute', left: 1, width: 175, top: 1, height: 114, justifyContent: 'center' }}
            >
                <Region layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 176, top: 5, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('widget.memenu.activeeffects')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <MemenuEffectsLayoutLine {...line} />
                <MemenuEffectsLayoutEffectsCnvs {...effectsCnvs} />
                <Button
                    variant="1"
                    name="back_btn"
                    onPointerTap={onBackBtn}
                    layout={{ position: 'absolute', left: 5, width: 165, bottom: 5, height: 22, minWidth: 165, maxWidth: 165 }}
                >
                    {t('generic.back')}
                </Button>
                <Region
                    name="info_text"
                    layout={{ position: 'absolute', left: 10, width: 137, top: 26, height: 51, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionInfoText ?? t('widget.memenu.effects.info')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 137 }}
                    />
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `line` of MemenuEffectsLayout - configured through the parent's `line` prop. */
export interface MemenuEffectsLayoutLineProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const MemenuEffectsLayoutLine = ({ layout, tags }: MemenuEffectsLayoutLineProps) => {
    return (
        <Region
            name="line"
            tags={tags}
            backgroundColor="#2f2f2f"
            layout={{ position: 'absolute', width: 153, top: 22, height: 1, ...layout }}
        />
    );
};

/** Named region `effects_cnvs` of MemenuEffectsLayout - configured through the parent's `effectsCnvs` prop. */
export interface MemenuEffectsLayoutEffectsCnvsProps {
    layout?: BoxLayout;
    onEffectsCnvs?: () => void;
    tags?: string[];
}

export const MemenuEffectsLayoutEffectsCnvs = ({ layout, onEffectsCnvs, tags }: MemenuEffectsLayoutEffectsCnvsProps) => {
    return (
        <Region
            name="effects_cnvs"
            tags={tags}
            onPointerTap={onEffectsCnvs}
            cursor="pointer"
            layout={{ position: 'absolute', left: 11, width: 154, top: 29, height: 48, ...layout }}
        />
    );
};
