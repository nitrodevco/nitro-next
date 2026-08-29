import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Icon, Region, ThemeText } from '#base/theme';

/** Row template `habbicon_popup_bottom_bar` of HabbiconHubLayout - pass real rows through its `items…` slot. */
export interface HabbiconHubLayoutHabbiconPopupBottomBarItemProps {
    captionHabbiconPopupPrice?: string;
    layout?: BoxLayout;
    onHabbiconPopupBuyButton?: () => void;
    visibleHabbiconPopupBuyButton?: boolean;
    visibleHabbiconPopupCurrencyIcon?: boolean;
    visibleHabbiconPopupPrice?: boolean;
}

export const HabbiconHubLayoutHabbiconPopupBottomBarItem = ({ captionHabbiconPopupPrice, layout, onHabbiconPopupBuyButton, visibleHabbiconPopupBuyButton, visibleHabbiconPopupCurrencyIcon, visibleHabbiconPopupPrice }: HabbiconHubLayoutHabbiconPopupBottomBarItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="3"
            name="habbicon_popup_bottom_bar"
            tintColor="#efefef"
            blend={0}
            layout={{ width: 180, height: 28, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', right: 12, width: 91, top: 0, height: 28, flexDirection: 'row', gap: 4 }}>
                {(visibleHabbiconPopupPrice ?? true) && (
                    <Region
                        name="habbicon_popup_price"
                        layout={{ width: 10, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionHabbiconPopupPrice ?? '0'}
                            textStyle="text-style-u-bold"
                        />
                    </Region>
                )}
                {(visibleHabbiconPopupCurrencyIcon ?? true) && (
                    <Icon
                        variant="35"
                        name="habbicon_popup_currency_icon"
                        layout={{ width: 16, height: 16, flexShrink: 0 }}
                    />
                )}
                {(visibleHabbiconPopupBuyButton ?? true) && (
                    <Button
                        variant="5"
                        name="habbicon_popup_buy_button"
                        tintColor="#01a101"
                        onPointerTap={onHabbiconPopupBuyButton}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ width: 57, height: 28, flexShrink: 0, minWidth: 57, maxWidth: 57 }}
                    >
                        {t('generic.buy')}
                    </Button>
                )}
            </Region>
        </Border>
    );
};
