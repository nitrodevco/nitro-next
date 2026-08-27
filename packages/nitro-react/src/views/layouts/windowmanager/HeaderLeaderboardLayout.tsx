import { BoxLayout, CloseButton, Region, ThemeText } from '#base/theme';

/** Generated from `1933_header_leaderboard_xml` (layout "habbo_window_layout_header_leaderboard", 41x32) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HeaderLeaderboardLayoutProps {
    captionHeaderTitleText?: string;
    layout?: BoxLayout;
    onHeaderButtonClose?: () => void;
}

export const HeaderLeaderboardLayout = ({ captionHeaderTitleText, layout, onHeaderButtonClose }: HeaderLeaderboardLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 41, height: 32, ...layout }}>
            <Region
                name="header_container"
                tags={[ '_EXCLUDE', '_INTERNAL' ]}
                params={2147483824}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 32 }}
            >
                <Region
                    name="header_title_text"
                    tags={[ '_TITLE', '_EXCLUDE', '_INTERNAL' ]}
                    params={2147483856}
                    layout={{ position: 'absolute', left: '50%', marginLeft: -16.5, width: 12, top: 6, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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
                    tags={[ '_EXCLUDE', '_INTERNAL', 'close' ]}
                    params={81}
                    onPointerTap={onHeaderButtonClose}
                    layout={{ position: 'absolute', right: 13, width: 15, top: 9, height: 16 }}
                />
            </Region>
        </Region>
    );
};
