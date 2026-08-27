import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2882_welcome_name_suggestion_item_xml` (layout "newuser_name_suggestion_item", 22x16) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WelcomeNameSuggestionItemLayoutProps {
    captionContent?: string;
    layout?: BoxLayout;
}

export const WelcomeNameSuggestionItemLayout = ({ captionContent, layout }: WelcomeNameSuggestionItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 22, height: 16, ...layout }}>
            <Region
                name="content"
                params={17}
                layout={{ position: 'absolute', left: 4, width: 22, top: 4, height: 16, minWidth: 2, maxWidth: 120, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionContent ?? 'fef'}
                    textStyle="text-style-il-regular"
                    textOptions={{ fill: '#224657' }}
                />
            </Region>
        </Region>
    );
};
