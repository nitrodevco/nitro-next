import { Border, BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3048_roc_room_thumbnail_xml` (layout "roc_room_thumbnail", 137x99) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RocRoomThumbnailLayoutProps {
    layout?: BoxLayout;
    thumbnail?: RocRoomThumbnailLayoutThumbnailProps;
}

export const RocRoomThumbnailLayout = ({ layout, thumbnail }: RocRoomThumbnailLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 137, height: 99, ...layout }}>
            <RocRoomThumbnailLayoutThumbnail {...thumbnail} />
        </Region>
    );
};

/** Named region `thumbnail` of RocRoomThumbnailLayout - configured through the parent's `thumbnail` prop. */
export interface RocRoomThumbnailLayoutThumbnailProps {
    captionTileSizeTxt?: string;
    layout?: BoxLayout;
    onThumbnail?: () => void;
    srcBgPic?: string;
    srcSelectArrow?: string;
    srcTileIconBlack?: string;
    srcTileIconWhite?: string;
    tags?: string[];
}

export const RocRoomThumbnailLayoutThumbnail = ({ captionTileSizeTxt, layout, onThumbnail, srcBgPic, srcSelectArrow, srcTileIconBlack, srcTileIconWhite, tags }: RocRoomThumbnailLayoutThumbnailProps) => {
    return (
        <Region
            name="thumbnail"
            tags={tags}
            onPointerTap={onThumbnail}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 137, top: 0, height: 99, ...layout }}
        >
            <Border
                variant="0"
                name="bg_sel"
                tintColor="#6f8285"
                layout={{ position: 'absolute', left: 0, width: 135, top: 0, height: 96 }}
            />
            <Border
                variant="0"
                name="bg_unsel"
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 0, width: 135, top: 0, height: 96 }}
            />
            <ThemeImage
                name="bg_pic"
                src={srcBgPic}
                layout={{ position: 'absolute', left: 0, width: 135, top: 0, height: 96 }}
            />
            <Region
                name="tile_size_txt"
                layout={{ position: 'absolute', left: 25, width: 18, top: 78, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                backgroundColor="#000000"
            >
                <ThemeText text={captionTileSizeTxt ?? '104'} />
            </Region>
            <ThemeImage
                name="tile_icon_black"
                src={srcTileIconBlack}
                layout={{ position: 'absolute', left: 5, width: 18, top: 80, height: 10 }}
            />
            <ThemeImage
                name="tile_icon_white"
                src={srcTileIconWhite}
                layout={{ position: 'absolute', left: 5, width: 18, top: 80, height: 10 }}
            />
            <ThemeImage
                name="select_arrow"
                src={srcSelectArrow}
                layout={{ position: 'absolute', left: 60, width: 18, top: 0, height: 20 }}
            />
            <Icon
                variant="12"
                name="club_icon"
                layout={{ position: 'absolute', left: 109, width: 20, top: 5, height: 10 }}
            />
        </Region>
    );
};
