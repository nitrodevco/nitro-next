import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { RecyclerWidget, RecyclerWidgetProps } from '#base/views/layouts/catalog/widgets/RecyclerWidget';

/** Generated from `1712_layout_recycler_xml` (layout "ctlg_recycler", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutRecycler_1712LayoutProps {
    layout?: BoxLayout;
    recyclerWidget?: RecyclerWidgetProps;
    srcCtlgTeaserimg1?: string;
}

export const LayoutRecycler_1712Layout = ({ layout, recyclerWidget, srcCtlgTeaserimg1 }: LayoutRecycler_1712LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_recycler"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    name="ctlg_teaserimg_1"
                    src={srcCtlgTeaserimg1 ?? '${image.library.url}catalogue/ctlg_furnimatic_image.gif'}
                    layout={{ position: 'absolute', right: 5, width: 183, top: 170, height: 235 }}
                />
                <RecyclerWidget
                    layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 245 }}
                    {...recyclerWidget}
                />
            </Region>
        </Region>
    );
};
