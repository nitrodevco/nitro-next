import { Border, BoxLayout, CloseButton, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { UserViewLayoutInfostandElementList, UserViewLayoutInfostandElementListProps } from './UserViewLayoutInfostandElementList';

/** Generated from `995_user_view_xml` (layout "userview_test", 1036x400) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UserViewLayoutProps {
    infostandElementList?: UserViewLayoutInfostandElementListProps;
    layout?: BoxLayout;
    onClose?: () => void;
    srcHomeIcon?: string;
    srcStickerCroco?: string;
    tintHomeIcon?: string;
}

export const UserViewLayout = ({ infostandElementList, layout, onClose, srcHomeIcon, srcStickerCroco, tintHomeIcon }: UserViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1036, height: 400, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'column', gap: 10 }}>
                <Border
                    variant="1"
                    name="info_border"
                    layout={{ width: 190, height: 357, flexShrink: 0 }}
                >
                    <ThemeImage
                        name="home_icon"
                        src={srcHomeIcon}
                        tint={tintHomeIcon}
                        layout={{ position: 'absolute', left: 8, width: 16, top: 11, height: 15 }}
                    />
                    <CloseButton
                        variant="1"
                        onPointerTap={onClose}
                        layout={{ position: 'absolute', left: 168, width: 18, top: 6, height: 16 }}
                    />
                    <ThemeImage
                        name="sticker_croco"
                        src={srcStickerCroco ?? layoutImage('sticker_croco.png')}
                        layout={{ position: 'absolute', left: 2, width: 92, top: 64, height: 63 }}
                    />
                    <UserViewLayoutInfostandElementList {...infostandElementList} />
                </Border>
            </Region>
        </Region>
    );
};
