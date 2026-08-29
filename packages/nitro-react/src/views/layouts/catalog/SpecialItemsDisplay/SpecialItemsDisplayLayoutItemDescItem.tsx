import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `item_desc` of SpecialItemsDisplayLayout - pass real rows through its `items…` slot. */
export interface SpecialItemsDisplayLayoutItemDescItemProps {
    captionItemDesc?: string;
    layout?: BoxLayout;
}

export const SpecialItemsDisplayLayoutItemDescItem = ({ captionItemDesc, layout }: SpecialItemsDisplayLayoutItemDescItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="item_desc"
            layout={{ width: 300, height: 57, flexShrink: 0, maxWidth: 300, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionItemDesc ?? t('special_items.wf15.body.wf15_act.desc')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 300 }}
            />
        </Region>
    );
};
