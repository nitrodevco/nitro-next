import { useTranslation } from '#base/context';
import { Border, BoxLayout, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `benefit_levels_row` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutBenefitLevelsRowItemProps {
    captionBenefitLevelsTxt?: string;
    layout?: BoxLayout;
    visibleBenefitLevelsTxt?: boolean;
}

export const PremiumPurchaseConfirmationLayoutBenefitLevelsRowItem = ({ captionBenefitLevelsTxt, layout, visibleBenefitLevelsTxt }: PremiumPurchaseConfirmationLayoutBenefitLevelsRowItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="15"
            name="benefit_levels_row"
            tintColor="#f3dcf7"
            layout={{ width: 220, height: 24, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('reward_track_checkmark.png')}
                layout={{ position: 'absolute', left: 7, width: 17, top: 5, height: 15 }}
            />
            {(visibleBenefitLevelsTxt ?? true) && (
                <ThemeText
                    text={captionBenefitLevelsTxt ?? t('reward_track.premium.confirm.benefit.levels')}
                    name="benefit_levels_txt"
                    layout={{ position: 'absolute', left: 30, width: 181, top: 4, height: 17 }}
                />
            )}
        </Border>
    );
};
