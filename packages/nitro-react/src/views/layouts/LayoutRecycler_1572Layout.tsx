import { BoxLayout, Region, ThemeImage } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1572_layout_recycler_xml` (layout "ctlg_recycler", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutRecycler_1572LayoutProps {
    layout?: BoxLayout;
}

export const LayoutRecycler_1572Layout = ({ layout }: LayoutRecycler_1572LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_recycler"
                params={2064}
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <ThemeImage
                    name="recycle_machine"
                    params={16}
                    src={layoutImage('recycler_furnimatic_machine.png')}
                    layout={{ position: 'absolute', left: 81, width: 198, top: 58, height: 257 }}
                />
                <ThemeImage
                    params={16}
                    src={layoutImage('recycler_furnimatic_title.png')}
                    layout={{ position: 'absolute', left: 51, width: 258, top: 5, height: 55 }}
                />
                <Region
                    name="recyclerWidget"
                    tags={[ 'E' ]}
                    params={1040}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 258, height: 208 }}
                />
            </Region>
        </Region>
    );
};
