import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `item_title` of SpecialItemsDisplayLayout - pass real rows through its `items…` slot. */
export interface SpecialItemsDisplayLayoutItemTitleItemProps {
    captionItemTitle?: string;
    layout?: BoxLayout;
}

export const SpecialItemsDisplayLayoutItemTitleItem = ({ captionItemTitle, layout }: SpecialItemsDisplayLayoutItemTitleItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionItemTitle ?? t('special_items.wf15.body.wf15_act.title')}
            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 300 }}
            name="item_title"
            verticalAlign="top"
            layout={{ width: 300, height: 17, flexShrink: 0, maxWidth: 300, ...layout }}
        />
    );
};
