import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `promo_title` of CampaignPromoLayout - pass real rows through its `items…` slot. */
export interface CampaignPromoLayoutPromoTitleItemProps {
    captionPromoTitle?: string;
    layout?: BoxLayout;
}

export const CampaignPromoLayoutPromoTitleItem = ({ captionPromoTitle, layout }: CampaignPromoLayoutPromoTitleItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionPromoTitle ?? t('landing.view.campaign.promo.title')}
            textStyle="text-style-il-heading-1"
            name="promo_title"
            layout={{ width: 251, height: 21, flexShrink: 0, ...layout }}
        />
    );
};
