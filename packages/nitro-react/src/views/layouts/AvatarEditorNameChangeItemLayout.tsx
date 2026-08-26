import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `3119_avatar_editor_name_change_item_xml` (layout "newuser_name_suggestion_item", 22x16) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatarEditorNameChangeItemLayoutProps {
    layout?: BoxLayout;
}

export const AvatarEditorNameChangeItemLayout = ({ layout }: AvatarEditorNameChangeItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 22, height: 16, ...layout }}>
            <Region
                name="content"
                params={17}
                layout={{ position: 'absolute', left: 4, width: 22, top: 4, height: 16, minWidth: 2, maxWidth: 120, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text="fef"
                    textStyle="text-style-il-regular"
                    textOptions={{ fill: '#224657' }}
                />
            </Region>
        </Region>
    );
};
