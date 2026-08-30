import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `desc2` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutDesc2ItemProps {
    captionDesc2?: string;
    layout?: BoxLayout;
}

export const TransactionDetailsLayoutDesc2Item = ({ captionDesc2, layout }: TransactionDetailsLayoutDesc2ItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionDesc2 ?? t('wiredchests.log_details.extra.desc.2')}
            textOptions={{ wordWrap: true, wordWrapWidth: 293 }}
            name="desc2"
            verticalAlign="top"
            layout={{ width: 293, height: 57, flexShrink: 0, minWidth: 293, maxWidth: 293, ...layout }}
        />
    );
};
