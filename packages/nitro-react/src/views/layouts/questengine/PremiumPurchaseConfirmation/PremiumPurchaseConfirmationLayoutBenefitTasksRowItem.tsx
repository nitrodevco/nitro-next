import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `benefit_tasks_row` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutBenefitTasksRowItemProps {
    captionBenefitTasksTxt?: string;
    layout?: BoxLayout;
    visibleBenefitTasksTxt?: boolean;
}

export const PremiumPurchaseConfirmationLayoutBenefitTasksRowItem = ({ captionBenefitTasksTxt, layout, visibleBenefitTasksTxt }: PremiumPurchaseConfirmationLayoutBenefitTasksRowItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="15"
            name="benefit_tasks_row"
            tintColor="#f3dcf7"
            layout={{ width: 220, height: 24, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('reward_track_checkmark.png')}
                layout={{ position: 'absolute', left: 7, width: 17, top: 5, height: 15 }}
            />
            {(visibleBenefitTasksTxt ?? true) && (
                <Region
                    name="benefit_tasks_txt"
                    layout={{ position: 'absolute', left: 30, width: 181, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionBenefitTasksTxt ?? t('reward_track.premium.confirm.benefit.tasks')}
                </Region>
            )}
        </Border>
    );
};
