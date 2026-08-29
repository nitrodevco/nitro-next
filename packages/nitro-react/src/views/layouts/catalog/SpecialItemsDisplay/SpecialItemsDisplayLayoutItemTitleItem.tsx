import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `item_title` of SpecialItemsDisplayLayout - pass real rows through its `items…` slot. */
export interface SpecialItemsDisplayLayoutItemTitleItemProps {
    captionItemTitle?: string;
    layout?: BoxLayout;
}

export const SpecialItemsDisplayLayoutItemTitleItem = ({ captionItemTitle, layout }: SpecialItemsDisplayLayoutItemTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="item_title"
            layout={{ width: 300, height: 17, flexShrink: 0, maxWidth: 300, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionItemTitle ?? t('special_items.wf15.body.wf15_act.title')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 300 }}
            />
        </Region>
    );
};
