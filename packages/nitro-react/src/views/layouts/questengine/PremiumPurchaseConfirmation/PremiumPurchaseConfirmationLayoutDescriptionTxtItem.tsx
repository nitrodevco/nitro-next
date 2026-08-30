import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `description_txt` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutDescriptionTxtItemProps {
    captionDescriptionTxt?: string;
    layout?: BoxLayout;
}

export const PremiumPurchaseConfirmationLayoutDescriptionTxtItem = ({ captionDescriptionTxt, layout }: PremiumPurchaseConfirmationLayoutDescriptionTxtItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionDescriptionTxt ?? t('reward_track.premium.confirm.desc')}
            textOptions={{ fill: '#2d1f35', wordWrap: true, wordWrapWidth: 220, align: 'center' }}
            name="description_txt"
            verticalAlign="top"
            layout={{ width: 220, height: 30, flexShrink: 0, ...layout }}
        />
    );
};
