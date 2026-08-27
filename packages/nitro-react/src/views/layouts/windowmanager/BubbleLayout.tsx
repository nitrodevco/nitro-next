import { BoxLayout, BubblePointer, Region } from '#base/theme';

/** Generated from `2567_bubble_xml` (layout "habbo_window_layout_bubble", 21x21) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BubbleLayoutProps {
    layout?: BoxLayout;
}

export const BubbleLayout = ({ layout }: BubbleLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 21, height: 21, ...layout }}>
            <BubblePointer
                name="up"
                tags={[ '_POINTER', '_INTERNAL', '_EXCLUDE', '_COLORIZE' ]}
                params={208}
                direction="up"
                layout={{ position: 'absolute', left: 4, width: 13, top: 0, height: 9 }}
            />
            <BubblePointer
                name="down"
                tags={[ '_POINTER', '_INTERNAL', '_EXCLUDE', '_COLORIZE' ]}
                params={1232}
                direction="down"
                layout={{ position: 'absolute', left: 4, width: 13, top: 12, height: 9 }}
            />
            <BubblePointer
                name="left"
                tags={[ '_POINTER', '_INTERNAL', '_EXCLUDE', '_COLORIZE' ]}
                params={3088}
                direction="left"
                layout={{ position: 'absolute', left: 0, width: 8, top: 4, height: 13 }}
            />
            <BubblePointer
                name="right"
                tags={[ '_POINTER', '_INTERNAL', '_EXCLUDE', '_COLORIZE' ]}
                params={3152}
                direction="right"
                layout={{ position: 'absolute', left: 13, width: 8, top: 4, height: 13 }}
            />
            <Region
                name="content_area"
                tags={[ '_CONTENT', '_INTERNAL', '_EXCLUDE' ]}
                params={12585104}
                layout={{ position: 'absolute', left: 8, right: 8, top: 8, bottom: 8 }}
            />
        </Region>
    );
};
