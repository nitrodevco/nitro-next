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
                direction="up"
                layout={{ position: 'absolute', width: 13, top: 0, height: 9 }}
            />
            <BubblePointer
                name="down"
                direction="down"
                layout={{ position: 'absolute', width: 13, bottom: 0, height: 9 }}
            />
            <BubblePointer
                name="left"
                direction="left"
                layout={{ position: 'absolute', left: 0, width: 8, alignSelf: 'center', height: 13 }}
            />
            <BubblePointer
                name="right"
                direction="right"
                layout={{ position: 'absolute', right: 0, width: 8, alignSelf: 'center', height: 13 }}
            />
            <BubbleLayoutContentArea {...contentArea} />
        </Region>
    );
};

/** Named region `content_area` of BubbleLayout - configured through the parent's `contentArea` prop. */
export interface BubbleLayoutContentAreaProps {
    layout?: BoxLayout;
}

export const BubbleLayoutContentArea = ({ layout }: BubbleLayoutContentAreaProps) => {
    return (
        <Region
            name="content_area"
            layout={{ position: 'absolute', left: 8, right: 8, top: 8, bottom: 8, ...layout }}
        />
    );
};
