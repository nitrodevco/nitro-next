import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `amount_0` of PriceDisplayLayout - pass real rows through its `items…` slot. */
export interface PriceDisplayLayoutAmount0ItemProps {
    captionAmount0?: string;
    layout?: BoxLayout;
}

export const PriceDisplayLayoutAmount0Item = ({ captionAmount0, layout }: PriceDisplayLayoutAmount0ItemProps) => {
    return (
        <ThemeText
            text={captionAmount0 ?? ''}
            textStyle="text-style-u-bold"
            name="amount_0"
            layout={{ width: 4, height: 4, flexShrink: 0, ...layout }}
        />
    );
};
