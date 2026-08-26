import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeText } from '#base/theme';

/** Generated from `884_memenu_effects_xml` (layout "memenu_effects", 175x114) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuEffectsLayoutProps {
    layout?: BoxLayout;
    onBackBtn?: () => void;
}

export const MemenuEffectsLayout = ({ layout, onBackBtn }: MemenuEffectsLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 175, height: 114, ...layout }}>
            <Border
                variant="1"
                name="effects_brdr"
                params={12582928}
                layout={{ position: 'absolute', left: 1, width: 175, top: 1, height: 114 }}
            >
                <Region
                    params={786640}
                    layout={{ position: 'absolute', left: 0, width: 176, top: 5, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('widget.memenu.activeeffects')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="line"
                    params={786640}
                    backgroundColor="#2f2f2f"
                    layout={{ position: 'absolute', left: 11, width: 153, top: 22, height: 1 }}
                />
                <Region
                    name="effects_cnvs"
                    params={17}
                    layout={{ position: 'absolute', left: 11, width: 154, top: 29, height: 48 }}
                />
                <Button
                    variant="1"
                    name="back_btn"
                    params={1180721}
                    onPointerTap={onBackBtn}
                    layout={{ position: 'absolute', left: 5, width: 165, top: 87, height: 22, minWidth: 165, maxWidth: 165 }}
                >
                    {t('generic.back')}
                </Button>
                <Region
                    name="info_text"
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 137, top: 26, height: 51, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('widget.memenu.effects.info')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 137 }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
