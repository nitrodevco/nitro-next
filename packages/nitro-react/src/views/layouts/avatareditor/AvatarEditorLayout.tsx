import { Border, BoxLayout, Region } from '#base/theme';

/** Generated from `3111_AvatarEditor_xml` (layout "AvatarEditor", 131x124) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatarEditorLayoutProps {
    layout?: BoxLayout;
}

export const AvatarEditorLayout = ({ layout }: AvatarEditorLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 131, height: 124, ...layout }}>
            <Border
                variant="6"
                name="avatarEditor"
                params={12716176}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
        </Region>
    );
};
