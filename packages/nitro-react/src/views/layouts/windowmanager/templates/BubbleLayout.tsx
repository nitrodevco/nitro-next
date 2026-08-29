import { BoxLayout, BubblePointer, Region } from '#base/theme';

/** Generated from `2567_bubble_xml` (layout "habbo_window_layout_bubble", 21x21) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BubbleLayoutProps {
    layout?: BoxLayout;
    visibleLeft?: boolean;
    visibleRight?: boolean;
    visibleUp?: boolean;
}

export const BubbleLayout = ({ layout, visibleLeft, visibleRight, visibleUp }: BubbleLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 21, height: 21, ...layout }}>
            {(visibleUp ?? false) && (
                <BubblePointer
                    name="up"
                    direction="up"
                    layout={{ position: 'absolute', width: 13, top: 0, height: 9 }}
                />
            )}
            <BubblePointer
                name="down"
                direction="down"
                layout={{ position: 'absolute', width: 13, bottom: 0, height: 9 }}
            />
            {(visibleLeft ?? false) && (
                <BubblePointer
                    name="left"
                    direction="left"
                    layout={{ position: 'absolute', left: 0, width: 8, alignSelf: 'center', height: 13 }}
                />
            )}
            {(visibleRight ?? false) && (
                <BubblePointer
                    name="right"
                    direction="right"
                    layout={{ position: 'absolute', right: 0, width: 8, alignSelf: 'center', height: 13 }}
                />
            )}
            <Region
                name="content_area"
                layout={{ position: 'absolute', left: 8, right: 8, top: 8, bottom: 8 }}
            />
        </Region>
    );
};
