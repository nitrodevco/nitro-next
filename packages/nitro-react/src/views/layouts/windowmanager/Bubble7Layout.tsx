import { BoxLayout, BubblePointer, Region } from '#base/theme';

/** Generated from `2342_bubble_7_xml` (layout "habbo_window_layout_bubble", 23x23) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Bubble7LayoutProps {
    layout?: BoxLayout;
}

export const Bubble7Layout = ({ layout }: Bubble7LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 23, height: 23, ...layout }}>
            <BubblePointer
                name="up"
                tags={[ '_POINTER', '_INTERNAL', '_EXCLUDE', '_COLORIZE' ]}
                params={208}
                direction="up"
                layout={{ position: 'absolute', left: 4, width: 16, top: -2, height: 10 }}
            />
            <BubblePointer
                name="down"
                tags={[ '_POINTER', '_INTERNAL', '_EXCLUDE', '_COLORIZE' ]}
                params={1232}
                direction="down"
                layout={{ position: 'absolute', left: 4, width: 16, top: 14, height: 11 }}
            />
            <BubblePointer
                name="left"
                tags={[ '_POINTER', '_INTERNAL', '_EXCLUDE', '_COLORIZE' ]}
                params={3088}
                direction="left"
                layout={{ position: 'absolute', left: -2, width: 11, top: 4, height: 18 }}
            />
            <BubblePointer
                name="right"
                tags={[ '_POINTER', '_INTERNAL', '_EXCLUDE', '_COLORIZE' ]}
                params={3152}
                direction="right"
                layout={{ position: 'absolute', left: 14, width: 11, top: 4, height: 18 }}
            />
            <Region
                name="content_area"
                tags={[ '_CONTENT', '_INTERNAL', '_EXCLUDE' ]}
                params={12585104}
                layout={{ position: 'absolute', left: 8, right: 10, top: 8, bottom: 10 }}
            />
        </Region>
    );
};
