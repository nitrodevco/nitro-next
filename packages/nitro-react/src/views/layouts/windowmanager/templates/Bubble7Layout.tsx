import { BoxLayout, BubblePointer, Region } from '#base/theme';

/** Generated from `2342_bubble_7_xml` (layout "habbo_window_layout_bubble", 23x23) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Bubble7LayoutProps {
    contentArea?: Bubble7LayoutContentAreaProps;
    layout?: BoxLayout;
}

export const Bubble7Layout = ({ contentArea, layout }: Bubble7LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 23, height: 23, ...layout }}>
            <BubblePointer
                name="up"
                tags={[ '_POINTER', '_INTERNAL', '_EXCLUDE', '_COLORIZE' ]}
                direction="up"
                layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 16, top: -2, height: 10 }}
            />
            <BubblePointer
                name="down"
                tags={[ '_POINTER', '_INTERNAL', '_EXCLUDE', '_COLORIZE' ]}
                direction="down"
                layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 16, bottom: -2, height: 11 }}
            />
            <BubblePointer
                name="left"
                tags={[ '_POINTER', '_INTERNAL', '_EXCLUDE', '_COLORIZE' ]}
                direction="left"
                layout={{ position: 'absolute', left: -2, width: 11, alignSelf: 'center', marginTop: 1.5, marginBottom: -1.5, height: 18 }}
            />
            <BubblePointer
                name="right"
                tags={[ '_POINTER', '_INTERNAL', '_EXCLUDE', '_COLORIZE' ]}
                direction="right"
                layout={{ position: 'absolute', right: -2, width: 11, alignSelf: 'center', marginTop: 1.5, marginBottom: -1.5, height: 18 }}
            />
            <Bubble7LayoutContentArea
                tags={[ '_CONTENT', '_INTERNAL', '_EXCLUDE' ]}
                {...contentArea}
            />
        </Region>
    );
};

/** Named region `content_area` of Bubble7Layout - configured through the parent's `contentArea` prop. */
export interface Bubble7LayoutContentAreaProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const Bubble7LayoutContentArea = ({ layout, tags }: Bubble7LayoutContentAreaProps) => {
    return (
        <Region
            name="content_area"
            tags={tags}
            layout={{ position: 'absolute', left: 8, right: 10, top: 8, bottom: 10, ...layout }}
        />
    );
};
