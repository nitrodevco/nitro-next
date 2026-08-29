import { BoxLayout, Bubble, Region } from '#base/theme';

import { AvatarMenuWidgetLayoutBorder, AvatarMenuWidgetLayoutBorderProps } from './AvatarMenuWidgetLayoutBorder';

/** Generated from `1062_avatar_menu_widget_xml` (layout "avatar_menu_widget", 151x1462) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatarMenuWidgetLayoutProps {
    border?: AvatarMenuWidgetLayoutBorderProps;
    layout?: BoxLayout;
}

export const AvatarMenuWidgetLayout = ({ border, layout }: AvatarMenuWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 151, height: 1462, ...layout }}>
            <Bubble
                variant="0"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 530, height: 1462 }}
            >
                <AvatarMenuWidgetLayoutBorder {...border} />
            </Bubble>
        </Region>
    );
};
