import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1_campaign_promo_xml` (layout "campaing_promo", 500x130) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CampaignPromoLayoutProps {
    layout?: BoxLayout;
    onButton?: () => void;
}

export const CampaignPromoLayout = ({ layout, onButton }: CampaignPromoLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 500, height: 130, ...layout }}>
            <Region
                params={147472}
                layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 130, maxWidth: 500 }}
            >
                <ThemeImage
                    name="promo_background"
                    params={16}
                    src={undefined}
                    layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 130 }}
                />
                <Region
                    name="content"
                    params={16}
                    layout={{ position: 'absolute', left: 161, width: 275, top: 16, height: 96, flexDirection: 'column' }}
                >
                    <Region
                        name="promo_title"
                        params={16}
                        layout={{ width: 251, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('landing.view.campaign.promo.title')}
                            textStyle="text-style-il-heading-1"
                        />
                    </Region>
                    <Region
                        name="spacing"
                        params={16}
                        layout={{ width: 30, height: 6, flexShrink: 0 }}
                    />
                    <Region
                        name="promo_text"
                        params={16}
                        layout={{ width: 251, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('landing.view.campaign.promo.text')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 251 }}
                        />
                    </Region>
                    <Region
                        name="spacing"
                        params={16}
                        layout={{ width: 30, height: 6, flexShrink: 0 }}
                    />
                    <Button
                        variant="100"
                        name="button"
                        params={131089}
                        onPointerTap={onButton}
                        layout={{ width: 233, height: 48, flexShrink: 0 }}
                    >
                        {t('landing.view.campaign.promo.button')}
                    </Button>
                </Region>
            </Region>
        </Region>
    );
};
