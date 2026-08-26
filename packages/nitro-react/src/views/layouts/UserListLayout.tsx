import { BoxLayout, Region } from '#base/theme';

/** Generated from `62_user_list_xml` (layout "Achievement competition hall of fame", 800x220) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UserListLayoutProps {
    layout?: BoxLayout;
}

export const UserListLayout = ({ layout }: UserListLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 800, height: 220, ...layout }}>
            <Region
                params={148496}
                layout={{ position: 'absolute', left: 0, width: 800, top: 0, height: 220 }}
            />
        </Region>
    );
};
