import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1723_suggestion_list_item_xml` (layout "suggestion_list_item", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SuggestionListItemLayoutProps {
    layout?: BoxLayout;
    suggestionListItem?: SuggestionListItemLayoutSuggestionListItemProps;
}

export const SuggestionListItemLayout = ({ layout, suggestionListItem }: SuggestionListItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <SuggestionListItemLayoutSuggestionListItem {...suggestionListItem} />
        </Region>
    );
};

/** Named region `suggestion_list_item` of SuggestionListItemLayout - configured through the parent's `suggestionListItem` prop. */
export interface SuggestionListItemLayoutSuggestionListItemProps {
    captionNameText?: string;
    layout?: BoxLayout;
    onSuggestionListItem?: () => void;
}

export const SuggestionListItemLayoutSuggestionListItem = ({ captionNameText, layout, onSuggestionListItem }: SuggestionListItemLayoutSuggestionListItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="suggestion_list_item"
            params={17}
            backgroundColor="#cceeff"
            onPointerTap={onSuggestionListItem}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 20, ...layout }}
        >
            <Region
                name="name_text"
                params={16}
                layout={{ position: 'absolute', left: 6, width: 183, top: 2, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionNameText ?? t('001_lorem_ipsum_title')}
                    textOptions={{ fill: '#000000' }}
                />
            </Region>
        </Region>
    );
};
