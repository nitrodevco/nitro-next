import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `id_key` of TransactionOverviewLayout - pass real rows through its `items…` slot. */
export interface TransactionOverviewLayoutIdKeyItemProps {
    captionIdKey?: string;
    layout?: BoxLayout;
}

export const TransactionOverviewLayoutIdKeyItem = ({ captionIdKey, layout }: TransactionOverviewLayoutIdKeyItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionIdKey ?? t('wiredchests.logs.chest_id')}
            name="id_key"
            layout={{ width: 53, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
