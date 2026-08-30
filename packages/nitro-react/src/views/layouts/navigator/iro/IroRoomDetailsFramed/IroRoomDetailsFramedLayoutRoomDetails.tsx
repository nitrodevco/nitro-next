import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `room_details` of IroRoomDetailsFramedLayout - configured through the parent's `roomDetails` prop. */
export interface IroRoomDetailsFramedLayoutRoomDetailsProps {
    captionOwnerCaption?: string;
    captionOwnerName?: string;
    captionRankingCaption?: string;
    captionRankingTxt?: string;
    captionRatingCaption?: string;
    captionRatingTxt?: string;
    captionRoomDesc?: string;
    captionRoomName?: string;
    layout?: BoxLayout;
    onAddThumbnailRegion?: () => void;
    onFavouriteRegion?: () => void;
    onMakeFavouriteRegion?: () => void;
    onMakeHomeRegion?: () => void;
    onOwnerNameCont?: () => void;
    onRankingCont?: () => void;
    onRatingCont?: () => void;
    onRatingRegion?: () => void;
    onRemoveRightsRegion?: () => void;
    onTags?: () => void;
    paddingCont?: ReactNode;
    srcFavourite?: string;
    srcHome?: string;
    srcMakeFavourite?: string;
    srcMakeHome?: string;
    srcRemoveRights?: string;
    srcThumbnailImage?: string;
    srcThumbUp?: string;
    tags?: ReactNode;
    tintFavourite?: string;
    tintHome?: string;
    tintMakeFavourite?: string;
    tintMakeHome?: string;
    tintRemoveRights?: string;
    tintThumbUp?: string;
    visibleHome?: boolean;
}

export const IroRoomDetailsFramedLayoutRoomDetails = ({ captionOwnerCaption, captionOwnerName, captionRankingCaption, captionRankingTxt, captionRatingCaption, captionRatingTxt, captionRoomDesc, captionRoomName, layout, onAddThumbnailRegion, onFavouriteRegion, onMakeFavouriteRegion, onMakeHomeRegion, onOwnerNameCont, onRankingCont, onRatingCont, onRatingRegion, onRemoveRightsRegion, onTags, paddingCont, srcFavourite, srcHome, srcMakeFavourite, srcMakeHome, srcRemoveRights, srcThumbnailImage, srcThumbUp, tags, tintFavourite, tintHome, tintMakeFavourite, tintMakeHome, tintRemoveRights, tintThumbUp, visibleHome }: IroRoomDetailsFramedLayoutRoomDetailsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="room_details"
            layout={{ position: 'absolute', left: 0, width: 230, top: 0, height: 256, ...layout }}
        >
            <Region
                name="remove_rights_region"
                tooltip={t('navigator.roominfo.removerights.tooltip')}
                onPointerTap={onRemoveRightsRegion}
                cursor="pointer"
                layout={{ position: 'absolute', right: 49, width: 18, top: 1, height: 22 }}
            >
                <ThemeImage
                    name="remove_rights"
                    src={srcRemoveRights}
                    tint={tintRemoveRights}
                    layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 22 }}
                />
            </Region>
            <Region
                name="make_home_region"
                tooltip={t('navigator.roominfo.makehome.tooltip')}
                onPointerTap={onMakeHomeRegion}
                cursor="pointer"
                layout={{ position: 'absolute', right: 27, width: 18, top: 1, height: 16 }}
            >
                <ThemeImage
                    name="make_home"
                    src={srcMakeHome}
                    tint={tintMakeHome}
                    layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
                />
            </Region>
            {(visibleHome ?? false) && (
                <ThemeImage
                    name="home"
                    src={srcHome}
                    tint={tintHome}
                    layout={{ position: 'absolute', left: 185, width: 18, top: 1, height: 18 }}
                />
            )}
            <Region
                name="favourite_region"
                tooltip={t('navigator.favourite.tooltip')}
                onPointerTap={onFavouriteRegion}
                cursor="pointer"
                layout={{ position: 'absolute', right: 6, width: 18, top: 1, height: 16 }}
            >
                <ThemeImage
                    name="favourite"
                    src={srcFavourite}
                    tint={tintFavourite}
                    layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
                />
            </Region>
            <Region
                name="make_favourite_region"
                tooltip={t('navigator.makefavourite.tooltip')}
                onPointerTap={onMakeFavouriteRegion}
                cursor="pointer"
                layout={{ position: 'absolute', right: 6, width: 18, top: 1, height: 16 }}
            >
                <ThemeImage
                    name="make_favourite"
                    src={srcMakeFavourite}
                    tint={tintMakeFavourite}
                    layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
                />
            </Region>
            <ThemeText
                text={captionRoomName ?? 'Room name placeholder. Diipa daapi dipaa.'}
                textStyle="text-style-u-bold"
                textOptions={{ wordWrap: true, wordWrapWidth: 153 }}
                name="room_name"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 5, width: 153, top: 3, height: 31 }}
            />
            <Region
                name="owner_name_cont"
                tooltip={t('infostand.profile.link.tooltip')}
                onPointerTap={onOwnerNameCont}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 34, height: 16 }}
            >
                <ThemeText
                    text={captionOwnerCaption ?? t('navigator.roomownercaption')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#777777' }}
                    name="owner_caption"
                    layout={{ position: 'absolute', left: 5, width: 168, top: 0, height: 17 }}
                />
                <Region
                    name="user_info_region"
                    layout={{ position: 'absolute', left: 50, width: 15, top: 0, height: 15 }}
                >
                    <Icon
                        variant="21"
                        name="icon_eye_off"
                        layout={{ position: 'absolute', left: 0, width: 15, top: 4, height: 11 }}
                    />
                    <Icon
                        variant="22"
                        name="icon_eye_over"
                        layout={{ position: 'absolute', left: 0, width: 15, top: 4, height: 11 }}
                    />
                </Region>
                <ThemeText
                    text={captionOwnerName ?? 'PH Owner Name'}
                    textStyle="text-style-u-regular"
                    name="owner_name"
                    layout={{ position: 'absolute', left: 67, width: 97, top: 0, height: 17 }}
                />
            </Region>
            <Region
                name="tags"
                onPointerTap={onTags}
                cursor="pointer"
                layout={{ position: 'absolute', left: 5, width: 220, top: 37, height: 100 }}
            >
                {tags}
            </Region>
            <ThemeText
                text={captionRoomDesc ?? 'PH Room Desc: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit'}
                textStyle="text-style-u-regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 220 }}
                name="room_desc"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 5, width: 220, top: 52, height: 82 }}
            />
            <Region
                name="rating_cont"
                onPointerTap={onRatingCont}
                cursor="pointer"
                layout={{ position: 'absolute', left: 5, width: 220, top: 110, height: 16 }}
            >
                <Region
                    name="rating_region"
                    tooltip={t('navigator.rateroom')}
                    onPointerTap={onRatingRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', right: 202, width: 18, top: 0, bottom: 0 }}
                >
                    <ThemeImage
                        name="thumb_up"
                        src={srcThumbUp}
                        tint={tintThumbUp}
                        layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
                    />
                </Region>
                <ThemeText
                    text={captionRatingCaption ?? t('navigator.roomrating')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#777777' }}
                    name="rating_caption"
                    layout={{ position: 'absolute', left: 0, width: 124, top: 0, height: 17 }}
                />
                <ThemeText
                    text={captionRatingTxt ?? 'PH 123'}
                    textStyle="text-style-u-regular"
                    name="rating_txt"
                    layout={{ position: 'absolute', left: 70, width: 43, top: 0, height: 17 }}
                />
            </Region>
            <Region
                name="ranking_cont"
                onPointerTap={onRankingCont}
                cursor="pointer"
                layout={{ position: 'absolute', left: 5, width: 220, top: 125, height: 16 }}
            >
                <ThemeText
                    text={captionRankingCaption ?? t('navigator.roomranking')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#777777' }}
                    name="ranking_caption"
                    layout={{ position: 'absolute', left: 0, width: 134, top: 0, height: 17 }}
                />
                <ThemeText
                    text={captionRankingTxt ?? 'PH 123'}
                    textStyle="text-style-u-regular"
                    name="ranking_txt"
                    layout={{ position: 'absolute', left: 70, width: 43, top: 0, height: 17 }}
                />
            </Region>
            <Region
                name="padding_cont"
                layout={{ position: 'absolute', left: 5, width: 220, top: 185, height: 10 }}
            >
                {paddingCont}
            </Region>
            <Region
                name="thumbnail_container"
                layout={{ position: 'absolute', left: 1, width: 227, top: 140, height: 114 }}
            >
                <Region
                    name="thumbnail_edges"
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 57, width: 112, top: 1, height: 112 }}
                >
                    <ThemeImage
                        name="thumbnail_image"
                        src={srcThumbnailImage ?? layoutImage('newnavigator_default_room.png')}
                        layout={{ position: 'absolute', left: 1, width: 110, top: 1, height: 110 }}
                    />
                </Region>
                <Region
                    name="add_thumbnail_region"
                    tooltip={t('tooltip.navigator.room.info.add.thumbnail')}
                    onPointerTap={onAddThumbnailRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 144, width: 24, top: 89, height: 26 }}
                >
                    <ThemeImage
                        src={layoutImage('roomtools_camera.png')}
                        layout={{ position: 'absolute', left: 0, width: 26, top: 0, height: 26 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
