import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1_campaign_promo_xml` (layout "campaing_promo", 500x130) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CampaignPromoLayoutProps {
    itemsContent?: ReactNode;
    layout?: BoxLayout;
    srcPromoBackground?: string;
}

export const CampaignPromoLayout = ({ itemsContent, layout, srcPromoBackground }: CampaignPromoLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 500, height: 130, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 130, maxWidth: 500 }}>
                <ThemeImage
                    name="promo_background"
                    src={srcPromoBackground}
                    layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 130 }}
                />
                <Region
                    name="content"
                    layout={{ position: 'absolute', left: 161, width: 275, top: 16, height: 96, flexDirection: 'column' }}
                >
                    {itemsContent ?? (
                        <>
                            <CampaignPromoLayoutPromoTitleItem />
                            <CampaignPromoLayoutSpacingItem />
                            <CampaignPromoLayoutPromoTextItem />
                            <CampaignPromoLayoutSpacingItem2 />
                            <CampaignPromoLayoutButtonItem />
                        </>
                    )}
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `promo_title` of CampaignPromoLayout - pass real rows through its `items…` slot. */
export interface CampaignPromoLayoutPromoTitleItemProps {
    captionPromoTitle?: string;
    layout?: BoxLayout;
}

export const CampaignPromoLayoutPromoTitleItem = ({ captionPromoTitle, layout }: CampaignPromoLayoutPromoTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="promo_title"
            layout={{ width: 251, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPromoTitle ?? t('landing.view.campaign.promo.title')}
                textStyle="text-style-il-heading-1"
            />
        </Region>
    );
};

/** Row template `spacing` of CampaignPromoLayout - pass real rows through its `items…` slot. */
export interface CampaignPromoLayoutSpacingItemProps {
    layout?: BoxLayout;
}

export const CampaignPromoLayoutSpacingItem = ({ layout }: CampaignPromoLayoutSpacingItemProps) => {
    return (
        <Region
            name="spacing"
            layout={{ width: 30, height: 6, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `promo_text` of CampaignPromoLayout - pass real rows through its `items…` slot. */
export interface CampaignPromoLayoutPromoTextItemProps {
    captionPromoText?: string;
    layout?: BoxLayout;
}

export const CampaignPromoLayoutPromoTextItem = ({ captionPromoText, layout }: CampaignPromoLayoutPromoTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="promo_text"
            layout={{ width: 251, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPromoText ?? t('landing.view.campaign.promo.text')}
                textOptions={{ wordWrap: true, wordWrapWidth: 251 }}
            />
        </Region>
    );
};

/** Row template `spacing` of CampaignPromoLayout - pass real rows through its `items…` slot. */
export interface CampaignPromoLayoutSpacingItem2Props {
    layout?: BoxLayout;
}

export const CampaignPromoLayoutSpacingItem2 = ({ layout }: CampaignPromoLayoutSpacingItem2Props) => {
    return (
        <Region
            name="spacing"
            layout={{ width: 30, height: 6, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `button` of CampaignPromoLayout - pass real rows through its `items…` slot. */
export interface CampaignPromoLayoutButtonItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
}

export const CampaignPromoLayoutButtonItem = ({ layout, onButton }: CampaignPromoLayoutButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="100"
            name="button"
            onPointerTap={onButton}
            layout={{ width: 233, height: 48, flexShrink: 0, ...layout }}
        >
            {t('landing.view.campaign.promo.button')}
        </Button>
    );
};
