import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `title` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutTitleItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const TransactionDetailsLayoutTitleItem = ({ captionTitle, layout }: TransactionDetailsLayoutTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="title"
            layout={{ width: 123, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTitle ?? t('wiredchests.log_details.extra.title')}
                textStyle="text-style-u-bold"
            />
        </Region>
    );
};
