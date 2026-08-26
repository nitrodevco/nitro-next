import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `971_memenu_effect_inactive_xml` (layout "memenu_effect_unselected", 154x52) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuEffectInactiveLayoutProps {
    layout?: BoxLayout;
    onActivateEffect?: () => void;
}

export const MemenuEffectInactiveLayout = ({ layout, onActivateEffect }: MemenuEffectInactiveLayoutProps) => {
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
                    blend={0}
                    layout={{ position: 'absolute', left: 0, width: 175, top: 0, height: 48 }}
                >
                    <ThemeImage
                        name="effect_icon_bg"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 4, width: 40, top: 4, height: 40 }}
                    />
                    <ThemeImage
                        name="effect_icon"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 4, width: 40, top: 4, height: 40 }}
                    />
                    <Region
                        name="effect_name"
                        params={16}
                        layout={{ position: 'absolute', left: 50, width: 163, top: 6, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('widget.memenu.effectname')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Button
                        variant="1"
                        name="activate_effect"
                        params={131089}
                        onPointerTap={onActivateEffect}
                        layout={{ position: 'absolute', left: 50, width: 98, top: 20, height: 22 }}
                    >
                        {t('widgets.memenu.effects.activate')}
                    </Button>
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
                                    text="99"
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
