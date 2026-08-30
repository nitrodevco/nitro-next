import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `coins_amount_txt` of CoinsChestContentsLayout - pass real rows through its `items…` slot. */
export interface CoinsChestContentsLayoutCoinsAmountTxtItemProps {
    captionCoinsAmountTxt?: string;
    layout?: BoxLayout;
}

export const CoinsChestContentsLayoutCoinsAmountTxtItem = ({ captionCoinsAmountTxt, layout }: CoinsChestContentsLayoutCoinsAmountTxtItemProps) => {
    return (
        <ThemeText
            text={captionCoinsAmountTxt ?? '0'}
            name="coins_amount_txt"
            layout={{ width: 10, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
