import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `desc3` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutDesc3ItemProps {
    captionDesc3?: string;
    layout?: BoxLayout;
}

export const TransactionDetailsLayoutDesc3Item = ({ captionDesc3, layout }: TransactionDetailsLayoutDesc3ItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionDesc3 ?? t('wiredchests.log_details.extra.desc.3')}
            textOptions={{ wordWrap: true, wordWrapWidth: 293 }}
            name="desc3"
            verticalAlign="top"
            layout={{ width: 293, height: 30, flexShrink: 0, minWidth: 293, maxWidth: 293, ...layout }}
        />
    );
};
