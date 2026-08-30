import { Border, BoxLayout, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `benefit_instant_points_row` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutBenefitInstantPointsRowItemProps {
    captionBenefitInstantPointsTxt?: string;
    layout?: BoxLayout;
    visibleBenefitInstantPointsTxt?: boolean;
}

export const PremiumPurchaseConfirmationLayoutBenefitInstantPointsRowItem = ({ captionBenefitInstantPointsTxt, layout, visibleBenefitInstantPointsTxt }: PremiumPurchaseConfirmationLayoutBenefitInstantPointsRowItemProps) => {
    return (
        <Border
            variant="15"
            name="benefit_instant_points_row"
            tintColor="#f3dcf7"
            layout={{ width: 220, height: 24, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('reward_track_checkmark.png')}
                layout={{ position: 'absolute', left: 7, width: 17, top: 5, height: 15 }}
            />
            {(visibleBenefitInstantPointsTxt ?? true) && (
                <ThemeText
                    text={captionBenefitInstantPointsTxt ?? ''}
                    name="benefit_instant_points_txt"
                    layout={{ position: 'absolute', left: 30, width: 181, top: 4, height: 17 }}
                />
            )}
        </Border>
    );
};
