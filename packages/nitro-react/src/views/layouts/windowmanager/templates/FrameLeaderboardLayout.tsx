import { ReactNode } from 'react';

import { BoxLayout, ContentArea, Header, HeaderProps, Region } from '#base/theme';

/** Generated from `2461_frame_leaderboard_xml` (layout "habbo_window_layout_frame_3", 193x130) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FrameLeaderboardLayoutProps {
    caption?: string;
    children?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    onHeaderPointerDown?: HeaderProps['onPointerDown'];
    tintColor?: string;
}

export const FrameLeaderboardLayout = ({ caption, children, layout, onClose, onHeaderPointerDown, tintColor }: FrameLeaderboardLayoutProps) => {
    return (
        <Region
            dropShadow={{ distance: 4, angle: 45, color: '#000000', alpha: 0.35, blur: 4 }}
            layout={{ position: 'relative', minWidth: 193, minHeight: 130, ...layout }}
        >
            <Header
                name="titlebar"
                caption={caption}
                tintColor={tintColor}
                onClose={onClose}
                onPointerDown={onHeaderPointerDown}
                layout={{ position: 'absolute', left: 76, right: 76, top: 3, height: 32 }}
            />
            <ContentArea
                name="content_area"
                layout={{ position: 'absolute', left: 10, right: 10, top: 52, bottom: 9 }}
            >
                {children}
            </ContentArea>
        </Region>
    );
};
