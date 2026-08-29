import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1038_user_tag_xml` (layout "user_tag", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UserTagLayoutProps {
    layout?: BoxLayout;
}

export const UserTagLayout = ({ layout }: UserTagLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Region
                layout={{ position: 'absolute', left: 0, width: 43, top: 0, bottom: 5, minHeight: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                backgroundColor="#333333"
            >
                <ThemeText
                    text="my tag"
                    textOptions={{ fill: '#777215' }}
                />
            </Region>
        </Region>
    );
};
