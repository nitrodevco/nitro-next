import { ReactNode } from 'react';

import { BoxLayout, BubblePointer, Region } from '#base/theme';

/** Generated from `2342_bubble_7_xml` (layout "habbo_window_layout_bubble", 23x23) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Bubble7LayoutProps {
    contentArea?: ReactNode;
    layout?: BoxLayout;
    visibleLeft?: boolean;
    visibleRight?: boolean;
    visibleUp?: boolean;
}

export const Bubble7Layout = ({ contentArea, layout, visibleLeft, visibleRight, visibleUp }: Bubble7LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 23, height: 23, ...layout }}>
            {(visibleUp ?? false) && (
                <BubblePointer
                    name="up"
                    direction="up"
                    layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 16, top: -2, height: 10 }}
                />
            )}
            <BubblePointer
                name="down"
                direction="down"
                layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 16, bottom: -2, height: 11 }}
            />
            {(visibleLeft ?? false) && (
                <BubblePointer
                    name="left"
                    direction="left"
                    layout={{ position: 'absolute', left: -2, width: 11, alignSelf: 'center', marginTop: 1.5, marginBottom: -1.5, height: 18 }}
                />
            )}
            {(visibleRight ?? false) && (
                <BubblePointer
                    name="right"
                    direction="right"
                    layout={{ position: 'absolute', right: -2, width: 11, alignSelf: 'center', marginTop: 1.5, marginBottom: -1.5, height: 18 }}
                />
            )}
            <Region
                name="content_area"
                layout={{ position: 'absolute', left: 8, right: 10, top: 8, bottom: 10 }}
            >
                {contentArea}
            </Region>
        </Region>
    );
};
