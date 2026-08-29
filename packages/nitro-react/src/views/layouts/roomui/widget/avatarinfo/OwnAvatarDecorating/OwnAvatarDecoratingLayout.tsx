import { ReactNode } from 'react';

import { BoxLayout, Bubble, Region } from '#base/theme';

import { OwnAvatarDecoratingLayoutDecorateItem } from './OwnAvatarDecoratingLayoutDecorateItem';

/** Generated from `1097_own_avatar_decorating_xml` (layout "context_menu_widget", 115x49) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface OwnAvatarDecoratingLayoutProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const OwnAvatarDecoratingLayout = ({ itemsButtons, layout }: OwnAvatarDecoratingLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 49, ...layout }}>
            <Bubble
                variant="0"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, right: 0, bottom: -376, height: 49 }}
            >
                <Region
                    name="border"
                    layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 76, justifyContent: 'center' }}
                >
                    <Region
                        backgroundColor="#000000"
                        layout={{ position: 'absolute', left: 2, right: 2, top: 7, height: 1 }}
                    />
                    <Region
                        name="buttons"
                        layout={{ position: 'absolute', minWidth: 103, top: 7, minHeight: 26, flexDirection: 'column', gap: 1 }}
                    >
                        {itemsButtons ?? (
                            <OwnAvatarDecoratingLayoutDecorateItem />
                        )}
                    </Region>
                </Region>
            </Bubble>
        </Region>
    );
};
