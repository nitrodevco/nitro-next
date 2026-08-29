import { BoxLayout, CloseButton, Region, ThemeText } from '#base/theme';

/** Generated from `1933_header_leaderboard_xml` (layout "habbo_window_layout_header_leaderboard", 41x32) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HeaderLeaderboardLayoutProps {
    headerContainer?: HeaderLeaderboardLayoutHeaderContainerProps;
    layout?: BoxLayout;
}

export const HeaderLeaderboardLayout = ({ headerContainer, layout }: HeaderLeaderboardLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 41, height: 32, ...layout }}>
            <HeaderLeaderboardLayoutHeaderContainer {...headerContainer} />
        </Region>
    );
};

/** Named region `header_container` of HeaderLeaderboardLayout - configured through the parent's `headerContainer` prop. */
export interface HeaderLeaderboardLayoutHeaderContainerProps {
    captionHeaderTitleText?: string;
    layout?: BoxLayout;
    onHeaderButtonClose?: () => void;
}

export const HeaderLeaderboardLayoutHeaderContainer = ({ captionHeaderTitleText, layout, onHeaderButtonClose }: HeaderLeaderboardLayoutHeaderContainerProps) => {
    return (
        <Region
            name="header_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 32, justifyContent: 'center', ...layout }}
        >
            <Region
                name="header_title_text"
                layout={{ position: 'absolute', marginLeft: -10.5, marginRight: 10.5, width: 12, top: 6, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHeaderTitleText ?? ''}
                    textStyle="text-style-u-frame-title"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <CloseButton
                variant="10000"
                name="header_button_close"
                onPointerTap={onHeaderButtonClose}
                layout={{ position: 'absolute', right: 13, width: 15, top: 9, height: 16 }}
            />
        </Region>
    );
};
