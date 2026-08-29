import { BoxLayout, Region } from '#base/theme';

/** Row template `plus_txt` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutPlusTxtItemProps {
    captionPlusTxt?: string;
    layout?: BoxLayout;
}

export const PremiumPurchaseConfirmationLayoutPlusTxtItem = ({ captionPlusTxt, layout }: PremiumPurchaseConfirmationLayoutPlusTxtItemProps) => {
    return (
        <Region
            name="plus_txt"
            layout={{ width: 11, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionPlusTxt ?? ' '}
        </Region>
    );
};
