import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1_campaign_promo_xml` (layout "campaing_promo", 500x130) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CampaignPromoLayoutProps {
    content?: CampaignPromoLayoutContentProps;
    layout?: BoxLayout;
    srcPromoBackground?: string;
}

export const CampaignPromoLayout = ({ content, layout, srcPromoBackground }: CampaignPromoLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 500, height: 130, ...layout }}>
            <Region
                params={147472}
                layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 130, maxWidth: 500 }}
            >
                <ThemeImage
                    name="promo_background"
                    params={16}
                    src={srcPromoBackground}
                    layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 130 }}
                />
                <CampaignPromoLayoutContent {...content} />
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
            params={16}
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
            params={16}
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
            params={16}
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
            params={16}
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
            params={131089}
            onPointerTap={onButton}
            layout={{ width: 233, height: 48, flexShrink: 0, ...layout }}
        >
            {t('landing.view.campaign.promo.button')}
        </Button>
    );
};

/** Named region `content` of CampaignPromoLayout - configured through the parent's `content` prop. */
export interface CampaignPromoLayoutContentProps {
    itemsContent?: ReactNode;
    layout?: BoxLayout;
}

export const CampaignPromoLayoutContent = ({ itemsContent, layout }: CampaignPromoLayoutContentProps) => {
    return (
        <Region
            name="content"
            params={16}
            layout={{ position: 'absolute', left: 161, width: 275, top: 16, height: 96, flexDirection: 'column', ...layout }}
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
    );
};
