import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick } from '#base/theme';

/** Row template `buy_vip` of ViprequiredLayout - pass real rows through its `items…` slot. */
export interface ViprequiredLayoutBuyVipItemProps {
    layout?: BoxLayout;
    onBuyVip?: () => void;
}

export const ViprequiredLayoutBuyVipItem = ({ layout, onBuyVip }: ViprequiredLayoutBuyVipItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="5"
            name="buy_vip"
            tintColor="#00aa00"
            onPointerTap={onBuyVip}
            layout={{ width: 133, height: 32, flexShrink: 0, ...layout }}
        >
            {t('viprequired.buy.vip')}
        </ButtonThick>
    );
};
