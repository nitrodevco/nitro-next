import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `promo_text` of CampaignPromoLayout - pass real rows through its `items…` slot. */
export interface CampaignPromoLayoutPromoTextItemProps {
    captionPromoText?: string;
    layout?: BoxLayout;
}

export const CampaignPromoLayoutPromoTextItem = ({ captionPromoText, layout }: CampaignPromoLayoutPromoTextItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionPromoText ?? t('landing.view.campaign.promo.text')}
            textOptions={{ wordWrap: true, wordWrapWidth: 251 }}
            name="promo_text"
            verticalAlign="top"
            layout={{ width: 251, height: 15, flexShrink: 0, ...layout }}
        />
    );
};
