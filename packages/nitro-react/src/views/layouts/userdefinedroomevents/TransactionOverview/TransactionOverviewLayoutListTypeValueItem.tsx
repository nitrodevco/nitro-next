import { useTranslation } from '#base/context';
import { BoxLayout, Region } from '#base/theme';

/** Row template `list_type_value` of TransactionOverviewLayout - pass real rows through its `items…` slot. */
export interface TransactionOverviewLayoutListTypeValueItemProps {
    captionListTypeValue?: string;
    layout?: BoxLayout;
}

export const TransactionOverviewLayoutListTypeValueItem = ({ captionListTypeValue, layout }: TransactionOverviewLayoutListTypeValueItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="list_type_value"
            layout={{ width: 35, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionListTypeValue ?? t('wiredchests.logs.type.0')}
        </Region>
    );
};
