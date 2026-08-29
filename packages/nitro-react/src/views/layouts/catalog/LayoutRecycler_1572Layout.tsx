import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1572_layout_recycler_xml` (layout "ctlg_recycler", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutRecycler_1572LayoutProps {
    ctlgRecycler?: LayoutRecycler_1572LayoutCtlgRecyclerProps;
    layout?: BoxLayout;
}

export const LayoutRecycler_1572Layout = ({ ctlgRecycler, layout }: LayoutRecycler_1572LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutRecycler_1572LayoutCtlgRecycler {...ctlgRecycler} />
        </Region>
    );
};

/** Named region `recyclerWidget` of LayoutRecycler_1572Layout - configured through the parent's `recyclerWidget` prop. */
export interface LayoutRecycler_1572LayoutRecyclerWidgetProps {
    layout?: BoxLayout;
}

export const LayoutRecycler_1572LayoutRecyclerWidget = ({ layout }: LayoutRecycler_1572LayoutRecyclerWidgetProps) => {
    return (
        <Region
            name="recyclerWidget"
            tags={[ 'E' ]}
            params={1040}
            layout={{ position: 'absolute', left: 0, width: 360, bottom: -6, height: 208, ...layout }}
        />
    );
};

/** Named region `ctlg_recycler` of LayoutRecycler_1572Layout - configured through the parent's `ctlgRecycler` prop. */
export interface LayoutRecycler_1572LayoutCtlgRecyclerProps {
    layout?: BoxLayout;
    recyclerWidget?: LayoutRecycler_1572LayoutRecyclerWidgetProps;
    srcRecycleMachine?: string;
}

export const LayoutRecycler_1572LayoutCtlgRecycler = ({ layout, recyclerWidget, srcRecycleMachine }: LayoutRecycler_1572LayoutCtlgRecyclerProps) => {
    return (
        <Region
            name="ctlg_recycler"
            params={2064}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <ThemeImage
                name="recycle_machine"
                params={16}
                src={srcRecycleMachine ?? layoutImage('recycler_furnimatic_machine.png')}
                layout={{ position: 'absolute', left: 81, width: 198, top: 58, height: 257 }}
            />
            <ThemeImage
                params={16}
                src={layoutImage('recycler_furnimatic_title.png')}
                layout={{ position: 'absolute', left: 51, width: 258, top: 5, height: 55 }}
            />
            <LayoutRecycler_1572LayoutRecyclerWidget {...recyclerWidget} />
        </Region>
    );
};
