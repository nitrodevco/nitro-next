import { BoxLayout, BubblePointer, Region } from '#base/theme';

/** Generated from `2567_bubble_xml` (layout "habbo_window_layout_bubble", 21x21) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BubbleLayoutProps {
    contentArea?: BubbleLayoutContentAreaProps;
    layout?: BoxLayout;
}

export const BubbleLayout = ({ contentArea, layout }: BubbleLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 21, height: 21, ...layout }}>
            <BubblePointer
                name="up"
                tags={[ '_POINTER', '_INTERNAL', '_EXCLUDE', '_COLORIZE' ]}
                direction="up"
                layout={{ position: 'absolute', width: 13, top: 0, height: 9 }}
            />
            <BubblePointer
                name="down"
                tags={[ '_POINTER', '_INTERNAL', '_EXCLUDE', '_COLORIZE' ]}
                direction="down"
                layout={{ position: 'absolute', width: 13, bottom: 0, height: 9 }}
            />
            <BubblePointer
                name="left"
                tags={[ '_POINTER', '_INTERNAL', '_EXCLUDE', '_COLORIZE' ]}
                direction="left"
                layout={{ position: 'absolute', left: 0, width: 8, alignSelf: 'center', height: 13 }}
            />
            <BubblePointer
                name="right"
                tags={[ '_POINTER', '_INTERNAL', '_EXCLUDE', '_COLORIZE' ]}
                direction="right"
                layout={{ position: 'absolute', right: 0, width: 8, alignSelf: 'center', height: 13 }}
            />
            <BubbleLayoutContentArea
                tags={[ '_CONTENT', '_INTERNAL', '_EXCLUDE' ]}
                {...contentArea}
            />
        </Region>
    );
};

/** Named region `content_area` of BubbleLayout - configured through the parent's `contentArea` prop. */
export interface BubbleLayoutContentAreaProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const BubbleLayoutContentArea = ({ layout, tags }: BubbleLayoutContentAreaProps) => {
    return (
        <Region
            name="content_area"
            tags={tags}
            layout={{ position: 'absolute', left: 8, right: 8, top: 8, bottom: 8, ...layout }}
        />
    );
};
