import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `description_txt` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutDescriptionTxtItemProps {
    captionDescriptionTxt?: string;
    layout?: BoxLayout;
}

export const PremiumPurchaseConfirmationLayoutDescriptionTxtItem = ({ captionDescriptionTxt, layout }: PremiumPurchaseConfirmationLayoutDescriptionTxtItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="description_txt"
            layout={{ width: 220, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionDescriptionTxt ?? t('reward_track.premium.confirm.desc')}
                textOptions={{ fill: '#2d1f35', wordWrap: true, wordWrapWidth: 220, align: 'center' }}
            />
        </Region>
    );
};
