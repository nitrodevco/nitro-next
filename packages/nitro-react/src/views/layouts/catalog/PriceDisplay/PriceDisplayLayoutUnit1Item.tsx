import { BoxLayout, Icon } from '#base/theme';

/** Row template `unit_1` of PriceDisplayLayout - pass real rows through its `items…` slot. */
export interface PriceDisplayLayoutUnit1ItemProps {
    layout?: BoxLayout;
}

export const PriceDisplayLayoutUnit1Item = ({ layout }: PriceDisplayLayoutUnit1ItemProps) => {
    return (
        <Icon
            variant="0"
            name="unit_1"
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        />
    );
};
