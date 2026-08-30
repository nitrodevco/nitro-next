import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `item_desc` of SpecialItemsDisplayLayout - pass real rows through its `items…` slot. */
export interface SpecialItemsDisplayLayoutItemDescItemProps {
    captionItemDesc?: string;
    layout?: BoxLayout;
}

export const SpecialItemsDisplayLayoutItemDescItem = ({ captionItemDesc, layout }: SpecialItemsDisplayLayoutItemDescItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionItemDesc ?? t('special_items.wf15.body.wf15_act.desc')}
            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 300 }}
            name="item_desc"
            verticalAlign="top"
            layout={{ width: 300, height: 57, flexShrink: 0, maxWidth: 300, ...layout }}
        />
    );
};
