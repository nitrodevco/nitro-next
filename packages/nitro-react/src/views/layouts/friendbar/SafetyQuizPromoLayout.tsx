import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `35_safety_quiz_promo_xml` (layout "safety_quiz_promo", 577x57) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SafetyQuizPromoLayoutProps {
    layout?: BoxLayout;
    onSafetyQuizButton?: () => void;
}

export const SafetyQuizPromoLayout = ({ layout, onSafetyQuizButton }: SafetyQuizPromoLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 577, height: 57, ...layout }}>
            <Border
                variant="2"
                name="safety_quiz_overlay"
                params={192}
                tintColor="#9b0000"
                layout={{ position: 'absolute', marginLeft: 186, marginRight: -186, width: 577, top: 0, height: 57 }}
            >
                <Border
                    variant="106"
                    params={144}
                    layout={{ position: 'absolute', left: 3, right: 3, top: 3, height: 51 }}
                />
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 73, width: 174, top: 11, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('safety.promo.widget.title')}
                        textStyle="text-style-il-heading-1"
                        textOptions={{ fill: '#9b0000' }}
                    />
                </Region>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 74, width: 160, top: 30, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={t('safety.promo.widget.message')} />
                </Region>
                <Button
                    variant="100"
                    name="safety_quiz_button"
                    params={396305}
                    onPointerTap={onSafetyQuizButton}
                    layout={{ position: 'absolute', right: 3, width: 188, alignSelf: 'center', height: 51 }}
                >
                    {t('safety.promo.widget.button')}
                </Button>
                <WidgetSlot
                    widgetType="avatar_image"
                    name="avatar"
                    params={16}
                    options={{ 'avatar_image:only_head': 'true', 'avatar_image:direction': 'south' }}
                    layout={{ position: 'absolute', left: -8, width: 90, top: -28, height: 130 }}
                />
                <ThemeImage
                    params={16}
                    src={layoutImage('help_bandaid.png')}
                    layout={{ position: 'absolute', left: 9, width: 57, top: 34, height: 18 }}
                />
            </Border>
        </Region>
    );
};
