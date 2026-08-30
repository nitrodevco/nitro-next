import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `plus_txt` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutPlusTxtItemProps {
    captionPlusTxt?: string;
    layout?: BoxLayout;
}

export const PremiumPurchaseConfirmationLayoutPlusTxtItem = ({ captionPlusTxt, layout }: PremiumPurchaseConfirmationLayoutPlusTxtItemProps) => {
    return (
        <ThemeText
            text={captionPlusTxt ?? ' '}
            name="plus_txt"
            layout={{ width: 11, height: 18, flexShrink: 0, ...layout }}
        />
    );
};
