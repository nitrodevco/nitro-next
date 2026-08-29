import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `desc1` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutDesc1ItemProps {
    captionDesc1?: string;
    layout?: BoxLayout;
}

export const TransactionDetailsLayoutDesc1Item = ({ captionDesc1, layout }: TransactionDetailsLayoutDesc1ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="desc1"
            layout={{ width: 293, height: 30, flexShrink: 0, minWidth: 293, maxWidth: 293, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionDesc1 ?? t('wiredchests.log_details.extra.desc.1')}
                textOptions={{ wordWrap: true, wordWrapWidth: 293 }}
            />
        </Region>
    );
};
