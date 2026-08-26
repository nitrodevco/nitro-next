import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `1712_layout_recycler_xml` (layout "ctlg_recycler", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutRecycler_1712LayoutProps {
    layout?: BoxLayout;
}

export const LayoutRecycler_1712Layout = ({ layout }: LayoutRecycler_1712LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_recycler"
                params={16}
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <ThemeImage
                    name="ctlg_teaserimg_1"
                    params={16}
                    src="${image.library.url}catalogue/ctlg_furnimatic_image.gif"
                    layout={{ position: 'absolute', left: 172, width: 183, top: 170, height: 235 }}
                />
                <Region
                    name="recyclerWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 215, height: 245 }}
                />
            </Region>
        </Region>
    );
};
