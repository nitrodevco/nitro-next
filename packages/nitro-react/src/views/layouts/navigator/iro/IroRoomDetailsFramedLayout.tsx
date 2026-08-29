import { useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ContainerButton, Frame, Icon, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2999_iro_room_details_framed_xml` (layout "roominfo", 236x411) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IroRoomDetailsFramedLayoutProps {
    buttonsCont?: IroRoomDetailsFramedLayoutButtonsContProps;
    embedInfo?: IroRoomDetailsFramedLayoutEmbedInfoProps;
    layout?: BoxLayout;
    onClose?: () => void;
    publicSpaceDetails?: IroRoomDetailsFramedLayoutPublicSpaceDetailsProps;
    roomDetails?: IroRoomDetailsFramedLayoutRoomDetailsProps;
}

export const IroRoomDetailsFramedLayout = ({ buttonsCont, embedInfo, layout, onClose, publicSpaceDetails, roomDetails }: IroRoomDetailsFramedLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="event_window"
            name="event_window"
            caption={t('navigator.roomsettings.roominfo')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 236, height: 411, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <IroRoomDetailsFramedLayoutEmbedInfo {...embedInfo} />
                <IroRoomDetailsFramedLayoutPublicSpaceDetails {...publicSpaceDetails} />
                <IroRoomDetailsFramedLayoutRoomDetails {...roomDetails} />
                <IroRoomDetailsFramedLayoutButtonsCont {...buttonsCont} />
            </Region>
        </Frame>
    );
};

/** Named region `embed_info_region` of IroRoomDetailsFramedLayout - configured through the parent's `embedInfoRegion` prop. */
export interface IroRoomDetailsFramedLayoutEmbedInfoRegionProps {
    layout?: BoxLayout;
    onEmbedInfoRegion?: () => void;
    tags?: string[];
}

export const IroRoomDetailsFramedLayoutEmbedInfoRegion = ({ layout, onEmbedInfoRegion, tags }: IroRoomDetailsFramedLayoutEmbedInfoRegionProps) => {
    return (
        <Region
            name="embed_info_region"
            tags={tags}
            onPointerTap={onEmbedInfoRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 230, top: 0, height: 79, ...layout }}
        />
    );
};

/** Named region `embed_info` of IroRoomDetailsFramedLayout - configured through the parent's `embedInfo` prop. */
export interface IroRoomDetailsFramedLayoutEmbedInfoProps {
    captionEmbedInfoTxt?: string;
    embedInfoRegion?: IroRoomDetailsFramedLayoutEmbedInfoRegionProps;
    layout?: BoxLayout;
    srcIconWeblink?: string;
    tags?: string[];
    visibleEmbedInfo?: boolean;
}

export const IroRoomDetailsFramedLayoutEmbedInfo = ({ captionEmbedInfoTxt, embedInfoRegion, layout, srcIconWeblink, tags, visibleEmbedInfo }: IroRoomDetailsFramedLayoutEmbedInfoProps) => {
    const t = useTranslation();
    const [ embedSrcTxtValue, setEmbedSrcTxtValue ] = useState('');

    return (
        <Region
            name="embed_info"
            tags={tags}
            visible={visibleEmbedInfo ?? false}
            layout={{ position: 'absolute', left: 0, width: 230, top: 0, height: 79, ...layout }}
        >
            <ThemeImage
                name="icon_weblink"
                src={srcIconWeblink}
                layout={{ position: 'absolute', left: 11, width: 17, top: 5, height: 15 }}
            />
            <Region layout={{ position: 'absolute', left: 29, width: 143, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('navigator.embed.caption')}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <Region
                name="embed_info_txt"
                layout={{ position: 'absolute', left: 9, width: 216, top: 20, height: 38, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionEmbedInfoTxt ?? t('navigator.embed.info')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 216 }}
                />
            </Region>
            <TextInput
                value={embedSrcTxtValue}
                onChange={setEmbedSrcTxtValue}
                layout={{ position: 'absolute', left: 11, width: 208, top: 57, height: 15 }}
            />
            <IroRoomDetailsFramedLayoutEmbedInfoRegion {...embedInfoRegion} />
        </Region>
    );
};

/** Named region `public_space_details` of IroRoomDetailsFramedLayout - configured through the parent's `publicSpaceDetails` prop. */
export interface IroRoomDetailsFramedLayoutPublicSpaceDetailsProps {
    captionPublicSpaceDesc?: string;
    captionPublicSpaceName?: string;
    layout?: BoxLayout;
    onPublicSpaceDetails?: () => void;
    tags?: string[];
    visiblePublicSpaceDetails?: boolean;
}

export const IroRoomDetailsFramedLayoutPublicSpaceDetails = ({ captionPublicSpaceDesc, captionPublicSpaceName, layout, onPublicSpaceDetails, tags, visiblePublicSpaceDetails }: IroRoomDetailsFramedLayoutPublicSpaceDetailsProps) => {
    return (
        <Region
            name="public_space_details"
            tags={tags}
            visible={visiblePublicSpaceDetails ?? false}
            onPointerTap={onPublicSpaceDetails}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 230, top: 0, height: 100, ...layout }}
        >
            <Region
                name="public_space_name"
                layout={{ position: 'absolute', left: 5, width: 220, top: 3, height: 37, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPublicSpaceName ?? 'Public space name placeholder Diipa Daapa Zaapa'}
                    textStyle="text-style-u-bold"
                    textOptions={{ wordWrap: true, wordWrapWidth: 220 }}
                />
            </Region>
            <Region
                name="public_space_desc"
                layout={{ position: 'absolute', left: 5, width: 220, top: 31, height: 53, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPublicSpaceDesc ?? 'PH Room Desc: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit'}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 220 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `remove_rights_region` of IroRoomDetailsFramedLayout - configured through the parent's `removeRightsRegion` prop. */
export interface IroRoomDetailsFramedLayoutRemoveRightsRegionProps {
    layout?: BoxLayout;
    onRemoveRightsRegion?: () => void;
    srcRemoveRights?: string;
    tags?: string[];
}

export const IroRoomDetailsFramedLayoutRemoveRightsRegion = ({ layout, onRemoveRightsRegion, srcRemoveRights, tags }: IroRoomDetailsFramedLayoutRemoveRightsRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="remove_rights_region"
            tags={tags}
            tooltip={t('navigator.roominfo.removerights.tooltip')}
            onPointerTap={onRemoveRightsRegion}
            cursor="pointer"
            layout={{ position: 'absolute', right: 49, width: 18, top: 1, height: 22, ...layout }}
        >
            <ThemeImage
                name="remove_rights"
                src={srcRemoveRights}
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 22 }}
            />
        </Region>
    );
};

/** Named region `make_home_region` of IroRoomDetailsFramedLayout - configured through the parent's `makeHomeRegion` prop. */
export interface IroRoomDetailsFramedLayoutMakeHomeRegionProps {
    layout?: BoxLayout;
    onMakeHomeRegion?: () => void;
    srcMakeHome?: string;
    tags?: string[];
}

export const IroRoomDetailsFramedLayoutMakeHomeRegion = ({ layout, onMakeHomeRegion, srcMakeHome, tags }: IroRoomDetailsFramedLayoutMakeHomeRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="make_home_region"
            tags={tags}
            tooltip={t('navigator.roominfo.makehome.tooltip')}
            onPointerTap={onMakeHomeRegion}
            cursor="pointer"
            layout={{ position: 'absolute', right: 27, width: 18, top: 1, height: 16, ...layout }}
        >
            <ThemeImage
                name="make_home"
                src={srcMakeHome}
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
            />
        </Region>
    );
};

/** Named region `favourite_region` of IroRoomDetailsFramedLayout - configured through the parent's `favouriteRegion` prop. */
export interface IroRoomDetailsFramedLayoutFavouriteRegionProps {
    layout?: BoxLayout;
    onFavouriteRegion?: () => void;
    srcFavourite?: string;
    tags?: string[];
}

export const IroRoomDetailsFramedLayoutFavouriteRegion = ({ layout, onFavouriteRegion, srcFavourite, tags }: IroRoomDetailsFramedLayoutFavouriteRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="favourite_region"
            tags={tags}
            tooltip={t('navigator.favourite.tooltip')}
            onPointerTap={onFavouriteRegion}
            cursor="pointer"
            layout={{ position: 'absolute', right: 6, width: 18, top: 1, height: 16, ...layout }}
        >
            <ThemeImage
                name="favourite"
                src={srcFavourite}
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
            />
        </Region>
    );
};

/** Named region `make_favourite_region` of IroRoomDetailsFramedLayout - configured through the parent's `makeFavouriteRegion` prop. */
export interface IroRoomDetailsFramedLayoutMakeFavouriteRegionProps {
    layout?: BoxLayout;
    onMakeFavouriteRegion?: () => void;
    srcMakeFavourite?: string;
    tags?: string[];
}

export const IroRoomDetailsFramedLayoutMakeFavouriteRegion = ({ layout, onMakeFavouriteRegion, srcMakeFavourite, tags }: IroRoomDetailsFramedLayoutMakeFavouriteRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="make_favourite_region"
            tags={tags}
            tooltip={t('navigator.makefavourite.tooltip')}
            onPointerTap={onMakeFavouriteRegion}
            cursor="pointer"
            layout={{ position: 'absolute', right: 6, width: 18, top: 1, height: 16, ...layout }}
        >
            <ThemeImage
                name="make_favourite"
                src={srcMakeFavourite}
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
            />
        </Region>
    );
};

/** Named region `user_info_region` of IroRoomDetailsFramedLayout - configured through the parent's `userInfoRegion` prop. */
export interface IroRoomDetailsFramedLayoutUserInfoRegionProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const IroRoomDetailsFramedLayoutUserInfoRegion = ({ layout, tags }: IroRoomDetailsFramedLayoutUserInfoRegionProps) => {
    return (
        <Region
            name="user_info_region"
            tags={tags}
            layout={{ position: 'absolute', left: 50, width: 15, top: 0, height: 15, ...layout }}
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
    );
};

/** Named region `owner_name_cont` of IroRoomDetailsFramedLayout - configured through the parent's `ownerNameCont` prop. */
export interface IroRoomDetailsFramedLayoutOwnerNameContProps {
    captionOwnerCaption?: string;
    captionOwnerName?: string;
    layout?: BoxLayout;
    onOwnerNameCont?: () => void;
    tags?: string[];
    userInfoRegion?: IroRoomDetailsFramedLayoutUserInfoRegionProps;
}

export const IroRoomDetailsFramedLayoutOwnerNameCont = ({ captionOwnerCaption, captionOwnerName, layout, onOwnerNameCont, tags, userInfoRegion }: IroRoomDetailsFramedLayoutOwnerNameContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="owner_name_cont"
            tags={tags}
            tooltip={t('infostand.profile.link.tooltip')}
            onPointerTap={onOwnerNameCont}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 230, top: 34, height: 16, ...layout }}
        >
            <Region
                name="owner_caption"
                layout={{ position: 'absolute', left: 5, width: 168, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionOwnerCaption ?? t('navigator.roomownercaption')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#777777' }}
                />
            </Region>
            <IroRoomDetailsFramedLayoutUserInfoRegion {...userInfoRegion} />
            <Region
                name="owner_name"
                layout={{ position: 'absolute', left: 67, width: 97, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionOwnerName ?? 'PH Owner Name'}
                    textStyle="text-style-u-regular"
                />
            </Region>
        </Region>
    );
};

/** Named region `tags` of IroRoomDetailsFramedLayout - configured through the parent's `tags` prop. */
export interface IroRoomDetailsFramedLayoutTagsProps {
    layout?: BoxLayout;
    onTags?: () => void;
    tags?: string[];
}

export const IroRoomDetailsFramedLayoutTags = ({ layout, onTags, tags }: IroRoomDetailsFramedLayoutTagsProps) => {
    return (
        <Region
            name="tags"
            tags={tags}
            onPointerTap={onTags}
            cursor="pointer"
            layout={{ position: 'absolute', left: 5, width: 220, top: 37, height: 100, ...layout }}
        />
    );
};

/** Named region `rating_region` of IroRoomDetailsFramedLayout - configured through the parent's `ratingRegion` prop. */
export interface IroRoomDetailsFramedLayoutRatingRegionProps {
    layout?: BoxLayout;
    onRatingRegion?: () => void;
    srcThumbUp?: string;
    tags?: string[];
}

export const IroRoomDetailsFramedLayoutRatingRegion = ({ layout, onRatingRegion, srcThumbUp, tags }: IroRoomDetailsFramedLayoutRatingRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rating_region"
            tags={tags}
            tooltip={t('navigator.rateroom')}
            onPointerTap={onRatingRegion}
            cursor="pointer"
            layout={{ position: 'absolute', right: 202, width: 18, top: 0, height: 16, ...layout }}
        >
            <ThemeImage
                name="thumb_up"
                src={srcThumbUp}
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
            />
        </Region>
    );
};

/** Named region `rating_cont` of IroRoomDetailsFramedLayout - configured through the parent's `ratingCont` prop. */
export interface IroRoomDetailsFramedLayoutRatingContProps {
    captionRatingCaption?: string;
    captionRatingTxt?: string;
    layout?: BoxLayout;
    onRatingCont?: () => void;
    ratingRegion?: IroRoomDetailsFramedLayoutRatingRegionProps;
    tags?: string[];
}

export const IroRoomDetailsFramedLayoutRatingCont = ({ captionRatingCaption, captionRatingTxt, layout, onRatingCont, ratingRegion, tags }: IroRoomDetailsFramedLayoutRatingContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rating_cont"
            tags={tags}
            onPointerTap={onRatingCont}
            cursor="pointer"
            layout={{ position: 'absolute', left: 5, width: 220, top: 110, height: 16, ...layout }}
        >
            <IroRoomDetailsFramedLayoutRatingRegion {...ratingRegion} />
            <Region
                name="rating_caption"
                layout={{ position: 'absolute', left: 0, width: 124, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRatingCaption ?? t('navigator.roomrating')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#777777' }}
                />
            </Region>
            <Region
                name="rating_txt"
                layout={{ position: 'absolute', left: 70, width: 43, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRatingTxt ?? 'PH 123'}
                    textStyle="text-style-u-regular"
                />
            </Region>
        </Region>
    );
};

/** Named region `ranking_cont` of IroRoomDetailsFramedLayout - configured through the parent's `rankingCont` prop. */
export interface IroRoomDetailsFramedLayoutRankingContProps {
    captionRankingCaption?: string;
    captionRankingTxt?: string;
    layout?: BoxLayout;
    onRankingCont?: () => void;
    tags?: string[];
}

export const IroRoomDetailsFramedLayoutRankingCont = ({ captionRankingCaption, captionRankingTxt, layout, onRankingCont, tags }: IroRoomDetailsFramedLayoutRankingContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ranking_cont"
            tags={tags}
            onPointerTap={onRankingCont}
            cursor="pointer"
            layout={{ position: 'absolute', left: 5, width: 220, top: 125, height: 16, ...layout }}
        >
            <Region
                name="ranking_caption"
                layout={{ position: 'absolute', left: 0, width: 134, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRankingCaption ?? t('navigator.roomranking')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#777777' }}
                />
            </Region>
            <Region
                name="ranking_txt"
                layout={{ position: 'absolute', left: 70, width: 43, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRankingTxt ?? 'PH 123'}
                    textStyle="text-style-u-regular"
                />
            </Region>
        </Region>
    );
};

/** Named region `padding_cont` of IroRoomDetailsFramedLayout - configured through the parent's `paddingCont` prop. */
export interface IroRoomDetailsFramedLayoutPaddingContProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const IroRoomDetailsFramedLayoutPaddingCont = ({ layout, tags }: IroRoomDetailsFramedLayoutPaddingContProps) => {
    return (
        <Region
            name="padding_cont"
            tags={tags}
            layout={{ position: 'absolute', left: 5, width: 220, top: 185, height: 10, ...layout }}
        />
    );
};

/** Named region `thumbnail_edges` of IroRoomDetailsFramedLayout - configured through the parent's `thumbnailEdges` prop. */
export interface IroRoomDetailsFramedLayoutThumbnailEdgesProps {
    layout?: BoxLayout;
    srcThumbnailImage?: string;
    tags?: string[];
}

export const IroRoomDetailsFramedLayoutThumbnailEdges = ({ layout, srcThumbnailImage, tags }: IroRoomDetailsFramedLayoutThumbnailEdgesProps) => {
    return (
        <Region
            name="thumbnail_edges"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 57, width: 112, top: 1, height: 112, ...layout }}
        >
            <ThemeImage
                name="thumbnail_image"
                src={srcThumbnailImage ?? layoutImage('newnavigator_default_room.png')}
                layout={{ position: 'absolute', left: 1, width: 110, top: 1, height: 110 }}
            />
        </Region>
    );
};

/** Named region `add_thumbnail_region` of IroRoomDetailsFramedLayout - configured through the parent's `addThumbnailRegion` prop. */
export interface IroRoomDetailsFramedLayoutAddThumbnailRegionProps {
    layout?: BoxLayout;
    onAddThumbnailRegion?: () => void;
    tags?: string[];
}

export const IroRoomDetailsFramedLayoutAddThumbnailRegion = ({ layout, onAddThumbnailRegion, tags }: IroRoomDetailsFramedLayoutAddThumbnailRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="add_thumbnail_region"
            tags={tags}
            tooltip={t('tooltip.navigator.room.info.add.thumbnail')}
            onPointerTap={onAddThumbnailRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 144, width: 24, top: 89, height: 26, ...layout }}
        >
            <ThemeImage
                src={layoutImage('roomtools_camera.png')}
                layout={{ position: 'absolute', left: 0, width: 26, top: 0, height: 26 }}
            />
        </Region>
    );
};

/** Named region `thumbnail_container` of IroRoomDetailsFramedLayout - configured through the parent's `thumbnailContainer` prop. */
export interface IroRoomDetailsFramedLayoutThumbnailContainerProps {
    addThumbnailRegion?: IroRoomDetailsFramedLayoutAddThumbnailRegionProps;
    layout?: BoxLayout;
    tags?: string[];
    thumbnailEdges?: IroRoomDetailsFramedLayoutThumbnailEdgesProps;
}

export const IroRoomDetailsFramedLayoutThumbnailContainer = ({ addThumbnailRegion, layout, tags, thumbnailEdges }: IroRoomDetailsFramedLayoutThumbnailContainerProps) => {
    return (
        <Region
            name="thumbnail_container"
            tags={tags}
            layout={{ position: 'absolute', left: 1, width: 227, top: 140, height: 114, ...layout }}
        >
            <IroRoomDetailsFramedLayoutThumbnailEdges {...thumbnailEdges} />
            <IroRoomDetailsFramedLayoutAddThumbnailRegion {...addThumbnailRegion} />
        </Region>
    );
};

/** Named region `room_details` of IroRoomDetailsFramedLayout - configured through the parent's `roomDetails` prop. */
export interface IroRoomDetailsFramedLayoutRoomDetailsProps {
    captionRoomDesc?: string;
    captionRoomName?: string;
    favouriteRegion?: IroRoomDetailsFramedLayoutFavouriteRegionProps;
    layout?: BoxLayout;
    makeFavouriteRegion?: IroRoomDetailsFramedLayoutMakeFavouriteRegionProps;
    makeHomeRegion?: IroRoomDetailsFramedLayoutMakeHomeRegionProps;
    ownerNameCont?: IroRoomDetailsFramedLayoutOwnerNameContProps;
    paddingCont?: IroRoomDetailsFramedLayoutPaddingContProps;
    rankingCont?: IroRoomDetailsFramedLayoutRankingContProps;
    ratingCont?: IroRoomDetailsFramedLayoutRatingContProps;
    removeRightsRegion?: IroRoomDetailsFramedLayoutRemoveRightsRegionProps;
    srcHome?: string;
    tags?: string[];
    tags2?: IroRoomDetailsFramedLayoutTagsProps;
    thumbnailContainer?: IroRoomDetailsFramedLayoutThumbnailContainerProps;
}

export const IroRoomDetailsFramedLayoutRoomDetails = ({ captionRoomDesc, captionRoomName, favouriteRegion, layout, makeFavouriteRegion, makeHomeRegion, ownerNameCont, paddingCont, rankingCont, ratingCont, removeRightsRegion, srcHome, tags, tags2, thumbnailContainer }: IroRoomDetailsFramedLayoutRoomDetailsProps) => {
    return (
        <Region
            name="room_details"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 230, top: 0, height: 256, ...layout }}
        >
            <IroRoomDetailsFramedLayoutRemoveRightsRegion {...removeRightsRegion} />
            <IroRoomDetailsFramedLayoutMakeHomeRegion {...makeHomeRegion} />
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 185, width: 18, top: 1, height: 18 }}
            >
                <ThemeImage
                    name="home"
                    src={srcHome}
                    layout={{ position: 'absolute', left: 185, width: 18, top: 1, height: 18 }}
                />
            </Region>
            <IroRoomDetailsFramedLayoutFavouriteRegion {...favouriteRegion} />
            <IroRoomDetailsFramedLayoutMakeFavouriteRegion {...makeFavouriteRegion} />
            <Region
                name="room_name"
                layout={{ position: 'absolute', left: 5, width: 153, top: 3, height: 31, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRoomName ?? 'Room name placeholder. Diipa daapi dipaa.'}
                    textStyle="text-style-u-bold"
                    textOptions={{ wordWrap: true, wordWrapWidth: 153 }}
                />
            </Region>
            <IroRoomDetailsFramedLayoutOwnerNameCont {...ownerNameCont} />
            <IroRoomDetailsFramedLayoutTags {...tags2} />
            <Region
                name="room_desc"
                layout={{ position: 'absolute', left: 5, width: 220, top: 52, height: 82, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRoomDesc ?? 'PH Room Desc: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit'}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 220 }}
                />
            </Region>
            <IroRoomDetailsFramedLayoutRatingCont {...ratingCont} />
            <IroRoomDetailsFramedLayoutRankingCont {...rankingCont} />
            <IroRoomDetailsFramedLayoutPaddingCont {...paddingCont} />
            <IroRoomDetailsFramedLayoutThumbnailContainer {...thumbnailContainer} />
        </Region>
    );
};

/** Named region `buttons_cont` of IroRoomDetailsFramedLayout - configured through the parent's `buttonsCont` prop. */
export interface IroRoomDetailsFramedLayoutButtonsContProps {
    layout?: BoxLayout;
    onFloorPlanEditorButton?: () => void;
    onRoomFilterButton?: () => void;
    onRoomMuteallButton?: () => void;
    onRoomReportButton?: () => void;
    onRoomSettingsButton?: () => void;
    onStaffPickButton?: () => void;
    tags?: string[];
}

export const IroRoomDetailsFramedLayoutButtonsCont = ({ layout, onFloorPlanEditorButton, onRoomFilterButton, onRoomMuteallButton, onRoomReportButton, onRoomSettingsButton, onStaffPickButton, tags }: IroRoomDetailsFramedLayoutButtonsContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="buttons_cont"
            tags={tags}
            layout={{ position: 'absolute', left: 5, width: 220, top: 261, height: 29, ...layout }}
        >
            <Button
                variant="3"
                name="room_settings_button"
                onPointerTap={onRoomSettingsButton}
                layout={{ position: 'absolute', left: 0, width: 220, top: 0, height: 29, minWidth: 220, maxWidth: 220 }}
            >
                {t('navigator.roomsettings')}
            </Button>
            <Button
                variant="3"
                name="room_filter_button"
                onPointerTap={onRoomFilterButton}
                layout={{ position: 'absolute', left: 0, width: 220, top: 0, height: 29, minWidth: 220, maxWidth: 220 }}
            >
                {t('navigator.roomsettings.roomfilter')}
            </Button>
            <Button
                variant="3"
                name="staff_pick_button"
                onPointerTap={onStaffPickButton}
                layout={{ position: 'absolute', left: 0, width: 220, top: 0, height: 29, minWidth: 220, maxWidth: 220 }}
            >
                filledByTheServer
            </Button>
            <Button
                variant="3"
                name="floor_plan_editor_button"
                onPointerTap={onFloorPlanEditorButton}
                layout={{ position: 'absolute', left: 0, width: 220, top: 0, height: 29, minWidth: 220, maxWidth: 220 }}
            >
                {t('open.floor.plan.editor')}
            </Button>
            <ContainerButton
                variant="100"
                name="room_report_button"
                onPointerTap={onRoomReportButton}
                layout={{ position: 'absolute', left: 0, width: 218, top: 0, height: 55 }}
            >
                <ThemeImage
                    src={layoutImage('icons_panic.png')}
                    layout={{ position: 'absolute', left: 11, width: 39, top: 16, height: 25 }}
                />
                <ThemeImage
                    src={layoutImage('illumina_light_border_center_left.png')}
                    layout={{ position: 'absolute', left: 47, width: 7, top: 17, height: 20 }}
                />
                <Region layout={{ position: 'absolute', left: 56, width: 151, top: 18, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('create.room.report')}
                        textStyle="text-style-il-heading-1"
                    />
                </Region>
            </ContainerButton>
            <Button
                variant="3"
                name="room_muteall_button"
                onPointerTap={onRoomMuteallButton}
                layout={{ position: 'absolute', left: 0, width: 220, top: 48, height: 29, minWidth: 220, maxWidth: 220 }}
            >
                {t('navigator.muteall')}
            </Button>
        </Region>
    );
};
