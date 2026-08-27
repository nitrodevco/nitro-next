import { BoxLayout, Region } from '#base/theme';

/** Generated from `2342_bubble_7_xml` (layout "habbo_window_layout_bubble", 23x23) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Bubble7LayoutProps {
    layout?: BoxLayout;
}

export const Bubble7Layout = ({ layout }: Bubble7LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 23, height: 23, ...layout }}>
            <Region
                name="content_area"
                tags={[ '_CONTENT', '_INTERNAL', '_EXCLUDE' ]}
                layout={{ position: 'absolute', left: 8, width: 5, top: 8, height: 5 }}
            />
        </Region>
    );
};
