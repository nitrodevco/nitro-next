import { Border, BoxLayout, Icon, Region, ThemeImage } from '#base/theme';

/** Named region `thumbnail` of RocRoomThumbnailLayout - configured through the parent's `thumbnail` prop. */
export interface RocRoomThumbnailLayoutThumbnailProps {
    captionTileSizeTxt?: string;
    layout?: BoxLayout;
    onThumbnail?: () => void;
    srcBgPic?: string;
    srcSelectArrow?: string;
    srcTileIconBlack?: string;
    srcTileIconWhite?: string;
    tintSelectArrow?: string;
    tintTileIconBlack?: string;
    tintTileIconWhite?: string;
}

export const RocRoomThumbnailLayoutThumbnail = ({ captionTileSizeTxt, layout, onThumbnail, srcBgPic, srcSelectArrow, srcTileIconBlack, srcTileIconWhite, tintSelectArrow, tintTileIconBlack, tintTileIconWhite }: RocRoomThumbnailLayoutThumbnailProps) => {
    return (
        <Region
            name="thumbnail"
            onPointerTap={onThumbnail}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="0"
                name="bg_sel"
                tintColor="#6f8285"
                layout={{ position: 'absolute', left: 0, right: 2, top: 0, bottom: 3 }}
            />
            <Border
                variant="0"
                name="bg_unsel"
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 0, right: 2, top: 0, bottom: 3 }}
            />
            <ThemeImage
                name="bg_pic"
                src={srcBgPic}
                layout={{ position: 'absolute', left: 0, width: 135, top: 0, height: 96 }}
            />
            <Region
                name="tile_size_txt"
                layout={{ position: 'absolute', left: 25, width: 18, bottom: 8, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                backgroundColor="#000000"
            >
                {captionTileSizeTxt ?? '104'}
            </Region>
            <ThemeImage
                name="tile_icon_black"
                src={srcTileIconBlack}
                tint={tintTileIconBlack}
                layout={{ position: 'absolute', left: 5, width: 18, bottom: 9, height: 10 }}
            />
            <ThemeImage
                name="tile_icon_white"
                src={srcTileIconWhite}
                tint={tintTileIconWhite}
                layout={{ position: 'absolute', left: 5, width: 18, bottom: 9, height: 10 }}
            />
            <ThemeImage
                name="select_arrow"
                src={srcSelectArrow}
                tint={tintSelectArrow}
                layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 18, top: 0, height: 20 }}
            />
            <Icon
                variant="12"
                name="club_icon"
                layout={{ position: 'absolute', right: 8, width: 20, top: 5, height: 10 }}
            />
        </Region>
    );
};
