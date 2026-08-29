import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `amount_1` of PriceDisplayLayout - pass real rows through its `items…` slot. */
export interface PriceDisplayLayoutAmount1ItemProps {
    captionAmount1?: string;
    layout?: BoxLayout;
}

export const PriceDisplayLayoutAmount1Item = ({ captionAmount1, layout }: PriceDisplayLayoutAmount1ItemProps) => {
    return (
        <Region
            name="amount_1"
            layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionAmount1 ?? ''}
                textStyle="text-style-u-bold"
            />
        </Region>
    );
};
