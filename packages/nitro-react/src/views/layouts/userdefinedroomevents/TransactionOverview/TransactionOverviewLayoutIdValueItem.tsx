import { BoxLayout, Region } from '#base/theme';

/** Row template `id_value` of TransactionOverviewLayout - pass real rows through its `items…` slot. */
export interface TransactionOverviewLayoutIdValueItemProps {
    captionIdValue?: string;
    layout?: BoxLayout;
}

export const TransactionOverviewLayoutIdValueItem = ({ captionIdValue, layout }: TransactionOverviewLayoutIdValueItemProps) => {
    return (
        <Region
            name="id_value"
            layout={{ width: 38, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionIdValue ?? '12345'}
        </Region>
    );
};
