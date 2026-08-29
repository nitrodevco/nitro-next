import { BoxLayout, CloseButton, Region, ThemeText } from '#base/theme';

/** Generated from `1933_header_leaderboard_xml` (layout "habbo_window_layout_header_leaderboard", 41x32) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HeaderLeaderboardLayoutProps {
    caption?: string;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const HeaderLeaderboardLayout = ({ caption, layout, onClose }: HeaderLeaderboardLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', minWidth: 41, minHeight: 32, ...layout }}>
            <Region
                name="header_container"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}
            >
                <Region
                    name="header_title_text"
                    layout={{ position: 'absolute', marginLeft: -10.5, marginRight: 10.5, width: 12, top: 6, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={caption ?? ''}
                        textStyle="text-style-u-frame-title"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <CloseButton
                    variant="10000"
                    name="header_button_close"
                    onPointerTap={onClose}
                    layout={{ position: 'absolute', right: 13, width: 15, top: 9, height: 16 }}
                />
            </Region>
        </Region>
    );
};
