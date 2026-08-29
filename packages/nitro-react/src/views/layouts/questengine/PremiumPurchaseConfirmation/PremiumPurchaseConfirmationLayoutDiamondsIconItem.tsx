import { BoxLayout, Icon } from '#base/theme';

/** Row template `diamonds_icon` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutDiamondsIconItemProps {
    layout?: BoxLayout;
}

export const PremiumPurchaseConfirmationLayoutDiamondsIconItem = ({ layout }: PremiumPurchaseConfirmationLayoutDiamondsIconItemProps) => {
    return (
        <Icon
            variant="41"
            name="diamonds_icon"
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        />
    );
};
