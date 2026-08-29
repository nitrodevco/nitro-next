import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1096_user_tag_highlighted_xml` (layout "user_tag_highlighted", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UserTagHighlightedLayoutProps {
    layout?: BoxLayout;
}

export const UserTagHighlightedLayout = ({ layout }: UserTagHighlightedLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Region
                layout={{ position: 'absolute', left: 0, width: 43, top: 0, height: 15, minHeight: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                backgroundColor="#333333"
            >
                <ThemeText
                    text="my tag"
                    textOptions={{ fill: '#728294' }}
                />
            </Region>
        </Region>
    );
};
