import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1723_suggestion_list_item_xml` (layout "suggestion_list_item", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SuggestionListItemLayoutProps {
    layout?: BoxLayout;
}

export const SuggestionListItemLayout = ({ layout }: SuggestionListItemLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Region
                name="suggestion_list_item"
                params={17}
                backgroundColor="#cceeff"
                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 20 }}
            >
                <Region
                    name="name_text"
                    params={16}
                    layout={{ position: 'absolute', left: 6, width: 183, top: 2, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('001_lorem_ipsum_title')}
                        textOptions={{ fill: '#000000' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
