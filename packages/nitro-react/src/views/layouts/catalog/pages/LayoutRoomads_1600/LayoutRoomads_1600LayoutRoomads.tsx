import { BoxLayout, Region, ThemeText } from '#base/theme';
import { RoomAdsCatalogWidget2, RoomAdsCatalogWidget2Props } from '#base/views/layouts/catalog/widgets/RoomAdsCatalogWidget2';

/** Named region `roomads` of LayoutRoomads_1600Layout - configured through the parent's `roomads` prop. */
export interface LayoutRoomads_1600LayoutRoomadsProps {
    captionCtlgPrice1?: string;
    layout?: BoxLayout;
    roomAdsCatalogWidget?: RoomAdsCatalogWidget2Props;
}

export const LayoutRoomads_1600LayoutRoomads = ({ captionCtlgPrice1, layout, roomAdsCatalogWidget }: LayoutRoomads_1600LayoutRoomadsProps) => {
    return (
        <Region
            name="roomads"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="ctlg_price_1"
                layout={{ position: 'absolute', left: 242, width: 78, top: 402, height: 13, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgPrice1 ?? ''}
                    textOptions={{ wordWrap: true, wordWrapWidth: 78 }}
                />
            </Region>
            <RoomAdsCatalogWidget2
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                {...roomAdsCatalogWidget}
            />
        </Region>
    );
};
