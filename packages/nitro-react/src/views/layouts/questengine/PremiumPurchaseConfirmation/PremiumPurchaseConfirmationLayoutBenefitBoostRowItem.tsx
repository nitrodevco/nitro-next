import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `benefit_boost_row` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutBenefitBoostRowItemProps {
    captionBenefitBoostTxt?: string;
    layout?: BoxLayout;
    visibleBenefitBoostTxt?: boolean;
}

export const PremiumPurchaseConfirmationLayoutBenefitBoostRowItem = ({ captionBenefitBoostTxt, layout, visibleBenefitBoostTxt }: PremiumPurchaseConfirmationLayoutBenefitBoostRowItemProps) => {
    return (
        <Border
            variant="15"
            name="benefit_boost_row"
            tintColor="#f3dcf7"
            layout={{ width: 220, height: 24, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('reward_track_checkmark.png')}
                layout={{ position: 'absolute', left: 7, width: 17, top: 5, height: 15 }}
            />
            {(visibleBenefitBoostTxt ?? true) && (
                <Region
                    name="benefit_boost_txt"
                    layout={{ position: 'absolute', left: 30, width: 181, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionBenefitBoostTxt ?? ''}
                </Region>
            )}
        </Border>
    );
};
