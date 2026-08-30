import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `desc1` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutDesc1ItemProps {
    captionDesc1?: string;
    layout?: BoxLayout;
}

export const TransactionDetailsLayoutDesc1Item = ({ captionDesc1, layout }: TransactionDetailsLayoutDesc1ItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionDesc1 ?? t('wiredchests.log_details.extra.desc.1')}
            textOptions={{ wordWrap: true, wordWrapWidth: 293 }}
            name="desc1"
            verticalAlign="top"
            layout={{ width: 293, height: 30, flexShrink: 0, minWidth: 293, maxWidth: 293, ...layout }}
        />
    );
};
