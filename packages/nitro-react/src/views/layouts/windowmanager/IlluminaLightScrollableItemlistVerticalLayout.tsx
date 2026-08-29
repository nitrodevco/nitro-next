import { BoxLayout, Region } from '#base/theme';

/** Generated from `2087_illumina_light_scrollable_itemlist_vertical_xml` (layout "habbo_window_layout_scrollable_itemlist", 40x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaLightScrollableItemlistVerticalLayoutProps {
    iTEMLIST?: IlluminaLightScrollableItemlistVerticalLayoutITEMLISTProps;
    layout?: BoxLayout;
}

export const IlluminaLightScrollableItemlistVerticalLayout = ({ iTEMLIST, layout }: IlluminaLightScrollableItemlistVerticalLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 40, ...layout }}>
            <IlluminaLightScrollableItemlistVerticalLayoutITEMLIST {...iTEMLIST} />
            {/* <scrollbar_vertical> for ? - rendered by that list's ScrollArea */}
        </Region>
    );
};

/** Named region `_ITEMLIST` of IlluminaLightScrollableItemlistVerticalLayout - configured through the parent's `iTEMLIST` prop. */
export interface IlluminaLightScrollableItemlistVerticalLayoutITEMLISTProps {
    layout?: BoxLayout;
}

export const IlluminaLightScrollableItemlistVerticalLayoutITEMLIST = ({ layout }: IlluminaLightScrollableItemlistVerticalLayoutITEMLISTProps) => {
    return (
        <Region
            name="_ITEMLIST"
            tags={[ '_ITEMLIST', '_EXCLUDE', '_INTERNAL' ]}
            params={2193}
            layout={{ position: 'absolute', left: 0, right: 9, top: 0, bottom: 0, flexDirection: 'column', ...layout }}
        />
    );
};
