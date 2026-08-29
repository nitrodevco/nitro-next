import { BoxLayout, Bubble, Region } from '#base/theme';

import { OwnAvatarMenuLayoutBorder, OwnAvatarMenuLayoutBorderProps } from './OwnAvatarMenuLayoutBorder';

/** Generated from `958_own_avatar_menu_xml` (layout "context_menu_widget", 115x887) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface OwnAvatarMenuLayoutProps {
    border?: OwnAvatarMenuLayoutBorderProps;
    layout?: BoxLayout;
}

export const OwnAvatarMenuLayout = ({ border, layout }: OwnAvatarMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 887, ...layout }}>
            <Bubble
                variant="0"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 20, width: 115, bottom: 0, height: 887 }}
            >
                <OwnAvatarMenuLayoutBorder {...border} />
            </Bubble>
        </Region>
    );
};
