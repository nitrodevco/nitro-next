import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeText } from '#base/theme';

/** Generated from `884_memenu_effects_xml` (layout "memenu_effects", 175x114) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuEffectsLayoutProps {
    captionInfoText?: string;
    effectsCnvs?: ReactNode;
    layout?: BoxLayout;
    line?: ReactNode;
    onBackBtn?: () => void;
    onEffectsCnvs?: () => void;
}

export const MemenuEffectsLayout = ({ captionInfoText, effectsCnvs, layout, line, onBackBtn, onEffectsCnvs }: MemenuEffectsLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 175, height: 114, ...layout }}>
            <Border
                variant="1"
                name="effects_brdr"
                layout={{ position: 'absolute', left: 1, width: 175, top: 1, height: 114, justifyContent: 'center' }}
            >
                <ThemeText
                    text={t('widget.memenu.activeeffects')}
                    textOptions={{ fill: '#ffffff' }}
                    layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 176, top: 5, height: 13 }}
                />
                <Region
                    name="line"
                    backgroundColor="#2f2f2f"
                    layout={{ position: 'absolute', width: 153, top: 22, height: 1 }}
                >
                    {line}
                </Region>
                <Region
                    name="effects_cnvs"
                    onPointerTap={onEffectsCnvs}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 11, width: 154, top: 29, height: 48 }}
                >
                    {effectsCnvs}
                </Region>
                <Button
                    variant="1"
                    name="back_btn"
                    onPointerTap={onBackBtn}
                    layout={{ position: 'absolute', left: 5, width: 165, bottom: 5, height: 22, minWidth: 165, maxWidth: 165 }}
                >
                    {t('generic.back')}
                </Button>
                <ThemeText
                    text={captionInfoText ?? t('widget.memenu.effects.info')}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 137 }}
                    name="info_text"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 10, width: 137, top: 26, height: 51 }}
                />
            </Border>
        </Region>
    );
};
