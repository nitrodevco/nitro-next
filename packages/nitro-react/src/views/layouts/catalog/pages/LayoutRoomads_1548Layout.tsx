import { BoxLayout, Region, ThemeText } from '#base/theme';
import { RoomAdsCatalogWidget, RoomAdsCatalogWidgetProps } from '#base/views/layouts/catalog/widgets/RoomAdsCatalogWidget';

/** Generated from `1548_layout_roomads_xml` (layout "ctlg_roomads", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutRoomads_1548LayoutProps {
    layout?: BoxLayout;
    roomads?: LayoutRoomads_1548LayoutRoomadsProps;
}

export const LayoutRoomads_1548Layout = ({ layout, roomads }: LayoutRoomads_1548LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutRoomads_1548LayoutRoomads {...roomads} />
        </Region>
    );
};

/** Named region `roomads` of LayoutRoomads_1548Layout - configured through the parent's `roomads` prop. */
export interface LayoutRoomads_1548LayoutRoomadsProps {
    captionCtlgPrice1?: string;
    layout?: BoxLayout;
    roomAdsCatalogWidget?: RoomAdsCatalogWidgetProps;
    tags?: string[];
}

export const LayoutRoomads_1548LayoutRoomads = ({ captionCtlgPrice1, layout, roomAdsCatalogWidget, tags }: LayoutRoomads_1548LayoutRoomadsProps) => {
    return (
        <Region
            name="roomads"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="ctlg_price_1"
                layout={{ position: 'absolute', left: 242, width: 78, top: 395, height: 13, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgPrice1 ?? ''}
                    textOptions={{ wordWrap: true, wordWrapWidth: 78 }}
                />
            </Region>
            <RoomAdsCatalogWidget
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
                {...roomAdsCatalogWidget}
            />
        </Region>
    );
};
