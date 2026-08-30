import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `list_type_value` of TransactionOverviewLayout - pass real rows through its `items…` slot. */
export interface TransactionOverviewLayoutListTypeValueItemProps {
    captionListTypeValue?: string;
    layout?: BoxLayout;
}

export const TransactionOverviewLayoutListTypeValueItem = ({ captionListTypeValue, layout }: TransactionOverviewLayoutListTypeValueItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionListTypeValue ?? t('wiredchests.logs.type.0')}
            name="list_type_value"
            layout={{ width: 35, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
