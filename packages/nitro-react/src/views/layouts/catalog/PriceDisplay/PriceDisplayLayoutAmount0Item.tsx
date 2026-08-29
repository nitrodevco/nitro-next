import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `amount_0` of PriceDisplayLayout - pass real rows through its `items…` slot. */
export interface PriceDisplayLayoutAmount0ItemProps {
    captionAmount0?: string;
    layout?: BoxLayout;
}

export const PriceDisplayLayoutAmount0Item = ({ captionAmount0, layout }: PriceDisplayLayoutAmount0ItemProps) => {
    return (
        <Region
            name="amount_0"
            layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionAmount0 ?? ''}
                textStyle="text-style-u-bold"
            />
        </Region>
    );
};
