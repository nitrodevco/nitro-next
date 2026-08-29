import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { RecyclerWidget, RecyclerWidgetProps } from '#base/views/layouts/catalog/widgets/RecyclerWidget';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1572_layout_recycler_xml` (layout "ctlg_recycler", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutRecycler_1572LayoutProps {
    layout?: BoxLayout;
    recyclerWidget?: RecyclerWidgetProps;
    srcRecycleMachine?: string;
}

export const LayoutRecycler_1572Layout = ({ layout, recyclerWidget, srcRecycleMachine }: LayoutRecycler_1572LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_recycler"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    name="recycle_machine"
                    src={srcRecycleMachine ?? layoutImage('recycler_furnimatic_machine.png')}
                    layout={{ position: 'absolute', left: 81, width: 198, top: 58, height: 257 }}
                />
                <ThemeImage
                    src={layoutImage('recycler_furnimatic_title.png')}
                    layout={{ position: 'absolute', left: 51, width: 258, top: 5, height: 55 }}
                />
                <RecyclerWidget
                    layout={{ position: 'absolute', left: 0, width: 360, bottom: -6, height: 208 }}
                    {...recyclerWidget}
                />
            </Region>
        </Region>
    );
};
