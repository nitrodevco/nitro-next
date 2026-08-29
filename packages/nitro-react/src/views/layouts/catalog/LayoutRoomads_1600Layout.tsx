import { BoxLayout, Region, ThemeText } from '#base/theme';
import { RoomAdsCatalogWidget, RoomAdsCatalogWidgetProps } from '#base/views/layouts/catalog/widgets/RoomAdsCatalogWidget';

/** Generated from `1600_layout_roomads_xml` (layout "ctlg_roomads", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutRoomads_1600LayoutProps {
    layout?: BoxLayout;
    roomads?: LayoutRoomads_1600LayoutRoomadsProps;
}

export const LayoutRoomads_1600Layout = ({ layout, roomads }: LayoutRoomads_1600LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutRoomads_1600LayoutRoomads {...roomads} />
        </Region>
    );
};

/** Named region `roomads` of LayoutRoomads_1600Layout - configured through the parent's `roomads` prop. */
export interface LayoutRoomads_1600LayoutRoomadsProps {
    captionCtlgPrice1?: string;
    layout?: BoxLayout;
    roomAdsCatalogWidget?: RoomAdsCatalogWidgetProps;
}

export const LayoutRoomads_1600LayoutRoomads = ({ captionCtlgPrice1, layout, roomAdsCatalogWidget }: LayoutRoomads_1600LayoutRoomadsProps) => {
    return (
        <Region
            name="roomads"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <Region
                name="ctlg_price_1"
                params={16}
                layout={{ position: 'absolute', left: 242, width: 78, top: 402, height: 13, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgPrice1 ?? ''}
                    textOptions={{ wordWrap: true, wordWrapWidth: 78 }}
                />
            </Region>
            <RoomAdsCatalogWidget
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
                {...roomAdsCatalogWidget}
            />
        </Region>
    );
};
