import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `desc2` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutDesc2ItemProps {
    captionDesc2?: string;
    layout?: BoxLayout;
}

export const TransactionDetailsLayoutDesc2Item = ({ captionDesc2, layout }: TransactionDetailsLayoutDesc2ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="desc2"
            layout={{ width: 293, height: 57, flexShrink: 0, minWidth: 293, maxWidth: 293, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionDesc2 ?? t('wiredchests.log_details.extra.desc.2')}
                textOptions={{ wordWrap: true, wordWrapWidth: 293 }}
            />
        </Region>
    );
};
