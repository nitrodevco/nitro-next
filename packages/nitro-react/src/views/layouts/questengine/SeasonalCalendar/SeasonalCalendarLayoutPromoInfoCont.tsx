import { useTranslation } from '#base/context';
import { BoxLayout, Button, Icon, Region, ThemeText } from '#base/theme';

/** Named region `promo_info_cont` of SeasonalCalendarLayout - configured through the parent's `promoInfoCont` prop. */
export interface SeasonalCalendarLayoutPromoInfoContProps {
    captionPromoHeader?: string;
    captionPromoInfo?: string;
    captionYourBalanceTxt?: string;
    layout?: BoxLayout;
    onBuyButton?: () => void;
}

export const SeasonalCalendarLayoutPromoInfoCont = ({ captionPromoHeader, captionPromoInfo, captionYourBalanceTxt, layout, onBuyButton }: SeasonalCalendarLayoutPromoInfoContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="promo_info_cont"
            layout={{ position: 'absolute', left: 106, width: 276, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="promo_header"
                layout={{ position: 'absolute', left: 0, width: 223, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPromoHeader ?? t('quests.seasonalcalendar.promo.header')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="promo_info"
                layout={{ position: 'absolute', left: 0, width: 4, top: 27, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPromoInfo ?? ''}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <Button
                variant="3"
                name="buy_button"
                onPointerTap={onBuyButton}
                layout={{ position: 'absolute', left: 145, width: 110, top: 51, height: 23, minWidth: 110, maxWidth: 110 }}
            >
                {t('quests.seasonalcalendar.promo.buy')}
            </Button>
            <Region
                name="currency_icon_cont"
                layout={{ position: 'absolute', left: 77, width: 30, top: 71, height: 30 }}
            >
                <Icon
                    variant="27"
                    name="currency_icon_1"
                    layout={{ position: 'absolute', left: 0, width: 21, top: 0, height: 20 }}
                />
                <Icon
                    variant="29"
                    name="currency_icon_2"
                    layout={{ position: 'absolute', left: 0, width: 18, top: 2, height: 18 }}
                />
                <Icon
                    variant="27"
                    name="currency_icon_101"
                    layout={{ position: 'absolute', left: 0, width: 21, top: 0, height: 20 }}
                />
            </Region>
            <Region
                name="your_balance_txt"
                layout={{ position: 'absolute', left: 0, width: 223, top: 72, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionYourBalanceTxt ?? t('quests.seasonalcalendar.promo.balance')}
                    textStyle="text-style-u-regular"
                />
            </Region>
        </Region>
    );
};
