import { BoxLayout, Region } from '#base/theme';

/** Generated from `2461_frame_leaderboard_xml` (layout "habbo_window_layout_frame_3", 193x130) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FrameLeaderboardLayoutProps {
    layout?: BoxLayout;
}

export const FrameLeaderboardLayout = ({ layout }: FrameLeaderboardLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 193, height: 130, ...layout }}>
            <Region
                name="content_area"
                tags={[ '_CONTENT', '_INTERNAL', '_EXCLUDE' ]}
                layout={{ position: 'absolute', left: 10, width: 173, top: 52, height: 69 }}
            />
        </Region>
    );
};
