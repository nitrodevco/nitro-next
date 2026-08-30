import { useTranslation } from '#base/context';
import { Border, BoxLayout, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `benefit_rewards_row` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutBenefitRewardsRowItemProps {
    captionBenefitRewardsTxt?: string;
    layout?: BoxLayout;
    visibleBenefitRewardsTxt?: boolean;
}

export const PremiumPurchaseConfirmationLayoutBenefitRewardsRowItem = ({ captionBenefitRewardsTxt, layout, visibleBenefitRewardsTxt }: PremiumPurchaseConfirmationLayoutBenefitRewardsRowItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="15"
            name="benefit_rewards_row"
            tintColor="#f3dcf7"
            layout={{ width: 220, height: 24, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('reward_track_checkmark.png')}
                layout={{ position: 'absolute', left: 7, width: 17, top: 5, height: 15 }}
            />
            {(visibleBenefitRewardsTxt ?? true) && (
                <ThemeText
                    text={captionBenefitRewardsTxt ?? t('reward_track.premium.confirm.benefit.rewards')}
                    name="benefit_rewards_txt"
                    layout={{ position: 'absolute', left: 30, width: 181, top: 4, height: 17 }}
                />
            )}
        </Border>
    );
};
