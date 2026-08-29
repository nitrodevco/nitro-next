import { BoxLayout, Header, Region } from '#base/theme';

/** Generated from `2461_frame_leaderboard_xml` (layout "habbo_window_layout_frame_3", 193x130) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FrameLeaderboardLayoutProps {
    contentArea?: FrameLeaderboardLayoutContentAreaProps;
    layout?: BoxLayout;
}

export const FrameLeaderboardLayout = ({ contentArea, layout }: FrameLeaderboardLayoutProps) => {
    return (
        <Region
            dropShadow={{ distance: 4, angle: 45, color: '#000000', alpha: 0.35, blur: 4 }}
            layout={{ position: 'relative', width: 193, height: 130, ...layout }}
        >
            <Header
                name="titlebar"
                tags={[ '_HEADER', '_EXCLUDE', '_INTERNAL', '_COLORIZE' ]}
                layout={{ position: 'absolute', left: 76, right: 76, top: 3, height: 32 }}
            />
            <FrameLeaderboardLayoutContentArea
                tags={[ '_CONTENT', '_INTERNAL', '_EXCLUDE' ]}
                {...contentArea}
            />
        </Region>
    );
};

/** Named region `content_area` of FrameLeaderboardLayout - configured through the parent's `contentArea` prop. */
export interface FrameLeaderboardLayoutContentAreaProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const FrameLeaderboardLayoutContentArea = ({ layout, tags }: FrameLeaderboardLayoutContentAreaProps) => {
    return (
        <Region
            name="content_area"
            tags={tags}
            layout={{ position: 'absolute', left: 10, right: 10, top: 52, bottom: 9, ...layout }}
        />
    );
};
