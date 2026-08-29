import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1557_suggestion_list_item_new_xml` (layout "suggestion_list_item", 262x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SuggestionListItemNewLayoutProps {
    layout?: BoxLayout;
    suggestionListItem?: SuggestionListItemNewLayoutSuggestionListItemProps;
}

export const SuggestionListItemNewLayout = ({ layout, suggestionListItem }: SuggestionListItemNewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 262, height: 20, ...layout }}>
            <SuggestionListItemNewLayoutSuggestionListItem {...suggestionListItem} />
        </Region>
    );
};

/** Named region `suggestion_list_item` of SuggestionListItemNewLayout - configured through the parent's `suggestionListItem` prop. */
export interface SuggestionListItemNewLayoutSuggestionListItemProps {
    captionNameText?: string;
    layout?: BoxLayout;
    onSuggestionListItem?: () => void;
}

export const SuggestionListItemNewLayoutSuggestionListItem = ({ captionNameText, layout, onSuggestionListItem }: SuggestionListItemNewLayoutSuggestionListItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="suggestion_list_item"
            params={12730385}
            backgroundColor="#cceeff"
            onPointerTap={onSuggestionListItem}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 262, top: 0, height: 20, minWidth: 150, maxWidth: 262, minHeight: 20, maxHeight: 20, ...layout }}
        >
            <Region
                name="name_text"
                params={12730384}
                layout={{ position: 'absolute', left: 0, top: 0, minWidth: 150, maxWidth: 261, minHeight: 20, maxHeight: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionNameText ?? t('001_lorem_ipsum_title')}
                    textStyle="text-style-u-regular"
                />
            </Region>
        </Region>
    );
};
