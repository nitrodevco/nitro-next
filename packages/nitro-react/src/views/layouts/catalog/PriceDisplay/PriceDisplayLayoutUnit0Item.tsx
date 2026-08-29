import { BoxLayout, Icon } from '#base/theme';

/** Row template `unit_0` of PriceDisplayLayout - pass real rows through its `items…` slot. */
export interface PriceDisplayLayoutUnit0ItemProps {
    layout?: BoxLayout;
}

export const PriceDisplayLayoutUnit0Item = ({ layout }: PriceDisplayLayoutUnit0ItemProps) => {
    return (
        <Icon
            variant="0"
            name="unit_0"
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        />
    );
};
