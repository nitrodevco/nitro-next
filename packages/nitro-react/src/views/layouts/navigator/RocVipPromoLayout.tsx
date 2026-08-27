import { useTranslation } from '#base/context';
import { Border, BoxLayout, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `3008_roc_vip_promo_xml` (layout "roc_vip_promo", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RocVipPromoLayoutProps {
    captionLink?: string;
    layout?: BoxLayout;
}

export const RocVipPromoLayout = ({ captionLink, layout }: RocVipPromoLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Border
                variant="2"
                params={16}
                tintColor="#d48612"
                layout={{ position: 'absolute', left: 0, width: 272, top: 0, height: 52 }}
            >
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 52, width: 206, top: 6, height: 25, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('navigator.createroom.vippromo.text')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 206 }}
                    />
                </Region>
                <Region
                    name="link"
                    params={17}
                    layout={{ position: 'absolute', left: 52, width: 206, top: 30, height: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionLink ?? t('navigator.createroom.vippromo.link')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Icon
                    variant="16"
                    params={16}
                    layout={{ position: 'absolute', left: 9, width: 42, top: 6, height: 43 }}
                />
            </Border>
        </Region>
    );
};
