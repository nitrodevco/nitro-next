import { BoxLayout, Icon } from '#base/theme';

/** Row template `credit_icon` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutCreditIconItemProps {
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutCreditIconItem = ({ layout }: PhotoPurchaseConfirmationLayoutCreditIconItemProps) => {
    return (
        <Icon
            variant="34"
            name="credit_icon"
            layout={{ width: 30, height: 30, flexShrink: 0, ...layout }}
        />
    );
};
