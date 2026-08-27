import { BoxLayout, Region } from '#base/theme';

/** Generated from `2754_frame_xml` (layout "habbo_window_layout_frame", 40x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FrameLayoutProps {
    layout?: BoxLayout;
}

export const FrameLayout = ({ layout }: FrameLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 40, ...layout }}>
            <Region
                name="content_area"
                tags={[ '_CONTENT', '_INTERNAL', '_EXCLUDE' ]}
                layout={{ position: 'absolute', left: 6, width: 28, top: 25, height: 8 }}
            />
        </Region>
    );
};
