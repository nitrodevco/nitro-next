import { BoxLayout, Icon } from '#base/theme';

/** Row template `credits_icon` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutCreditsIconItemProps {
    layout?: BoxLayout;
}

export const PremiumPurchaseConfirmationLayoutCreditsIconItem = ({ layout }: PremiumPurchaseConfirmationLayoutCreditsIconItemProps) => {
    return (
        <Icon
            variant="34"
            name="credits_icon"
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        />
    );
};
