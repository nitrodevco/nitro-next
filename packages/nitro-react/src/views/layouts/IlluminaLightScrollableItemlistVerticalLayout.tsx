import { BoxLayout, Region } from '#base/theme';

/** Generated from `2087_illumina_light_scrollable_itemlist_vertical_xml` (layout "habbo_window_layout_scrollable_itemlist", 40x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaLightScrollableItemlistVerticalLayoutProps {
    layout?: BoxLayout;
}

export const IlluminaLightScrollableItemlistVerticalLayout = ({ layout }: IlluminaLightScrollableItemlistVerticalLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 40, ...layout }}>
            <Region
                name="_ITEMLIST"
                tags={[ '_ITEMLIST', '_EXCLUDE', '_INTERNAL' ]}
                params={2193}
                layout={{ position: 'absolute', left: 0, width: 31, top: 0, height: 40, flexDirection: 'column' }}
            />
        </Region>
    );
};
