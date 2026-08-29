import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `desc3` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutDesc3ItemProps {
    captionDesc3?: string;
    layout?: BoxLayout;
}

export const TransactionDetailsLayoutDesc3Item = ({ captionDesc3, layout }: TransactionDetailsLayoutDesc3ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="desc3"
            layout={{ width: 293, height: 30, flexShrink: 0, minWidth: 293, maxWidth: 293, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionDesc3 ?? t('wiredchests.log_details.extra.desc.3')}
                textOptions={{ wordWrap: true, wordWrapWidth: 293 }}
            />
        </Region>
    );
};
