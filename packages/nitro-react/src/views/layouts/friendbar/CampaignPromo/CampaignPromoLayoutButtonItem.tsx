import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

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
