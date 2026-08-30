import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `id_value` of TransactionOverviewLayout - pass real rows through its `items…` slot. */
export interface TransactionOverviewLayoutIdValueItemProps {
    captionIdValue?: string;
    layout?: BoxLayout;
}

export const TransactionOverviewLayoutIdValueItem = ({ captionIdValue, layout }: TransactionOverviewLayoutIdValueItemProps) => {
    return (
        <ThemeText
            text={captionIdValue ?? '12345'}
            name="id_value"
            layout={{ width: 38, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
