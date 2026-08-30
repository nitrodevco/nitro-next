import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `list_type_key` of TransactionOverviewLayout - pass real rows through its `items…` slot. */
export interface TransactionOverviewLayoutListTypeKeyItemProps {
    captionListTypeKey?: string;
    layout?: BoxLayout;
}

export const TransactionOverviewLayoutListTypeKeyItem = ({ captionListTypeKey, layout }: TransactionOverviewLayoutListTypeKeyItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionListTypeKey ?? t('wiredchests.logs.list_type')}
            name="list_type_key"
            layout={{ width: 57, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
