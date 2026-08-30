import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1557_suggestion_list_item_new_xml` (layout "suggestion_list_item", 262x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SuggestionListItemNewLayoutProps {
    captionNameText?: string;
    layout?: BoxLayout;
    onSuggestionListItem?: () => void;
}

export const SuggestionListItemNewLayout = ({ captionNameText, layout, onSuggestionListItem }: SuggestionListItemNewLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 262, height: 20, ...layout }}>
            <Region
                name="suggestion_list_item"
                backgroundColor="#cceeff"
                onPointerTap={onSuggestionListItem}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minWidth: 150, maxWidth: 262, minHeight: 20, maxHeight: 20 }}
            >
                <ThemeText
                    text={captionNameText ?? t('001_lorem_ipsum_title')}
                    textStyle="text-style-u-regular"
                    name="name_text"
                    layout={{ position: 'absolute', left: 0, top: 0, minWidth: 150, maxWidth: 261, minHeight: 20, maxHeight: 20 }}
                />
            </Region>
        </Region>
    );
};
