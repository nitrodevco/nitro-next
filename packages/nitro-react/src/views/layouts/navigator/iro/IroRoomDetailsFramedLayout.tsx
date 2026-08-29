import { useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ContainerButton, Frame, Icon, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2999_iro_room_details_framed_xml` (layout "roominfo", 236x411) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IroRoomDetailsFramedLayoutProps {
    buttonsCont?: IroRoomDetailsFramedLayoutButtonsContProps;
    captionEmbedInfoTxt?: string;
    captionPublicSpaceDesc?: string;
    captionPublicSpaceName?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onEmbedInfoRegion?: () => void;
    onPublicSpaceDetails?: () => void;
    roomDetails?: IroRoomDetailsFramedLayoutRoomDetailsProps;
    srcIconWeblink?: string;
    visibleEmbedInfo?: boolean;
    visiblePublicSpaceDetails?: boolean;
}

export const IroRoomDetailsFramedLayout = ({ buttonsCont, captionEmbedInfoTxt, captionPublicSpaceDesc, captionPublicSpaceName, layout, onClose, onEmbedInfoRegion, onPublicSpaceDetails, roomDetails, srcIconWeblink, visibleEmbedInfo, visiblePublicSpaceDetails }: IroRoomDetailsFramedLayoutProps) => {
    const t = useTranslation();
    const [ embedSrcTxtValue, setEmbedSrcTxtValue ] = useState('');

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
            {(visibleEmbedInfo ?? false) && (
                <Region
                    name="embed_info"
                    layout={{ position: 'absolute', left: 0, width: 230, top: 0, height: 79 }}
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
                    <Region
                        name="embed_info_region"
                        onPointerTap={onEmbedInfoRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 230, top: 0, height: 79 }}
                    />
                </Region>
            )}
            {(visiblePublicSpaceDetails ?? false) && (
                <Region
                    name="public_space_details"
                    onPointerTap={onPublicSpaceDetails}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 230, top: 0, height: 100 }}
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
            )}
            <IroRoomDetailsFramedLayoutRoomDetails {...roomDetails} />
            <IroRoomDetailsFramedLayoutButtonsCont {...buttonsCont} />
        </Frame>
    );
};

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
    srcFavourite?: string;
    srcHome?: string;
    srcMakeFavourite?: string;
    srcMakeHome?: string;
    srcRemoveRights?: string;
    srcThumbnailImage?: string;
    srcThumbUp?: string;
    visibleHome?: boolean;
}

export const IroRoomDetailsFramedLayoutRoomDetails = ({ captionOwnerCaption, captionOwnerName, captionRankingCaption, captionRankingTxt, captionRatingCaption, captionRatingTxt, captionRoomDesc, captionRoomName, layout, onAddThumbnailRegion, onFavouriteRegion, onMakeFavouriteRegion, onMakeHomeRegion, onOwnerNameCont, onRankingCont, onRatingCont, onRatingRegion, onRemoveRightsRegion, onTags, srcFavourite, srcHome, srcMakeFavourite, srcMakeHome, srcRemoveRights, srcThumbnailImage, srcThumbUp, visibleHome }: IroRoomDetailsFramedLayoutRoomDetailsProps) => {
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
                    layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
                />
            </Region>
            {(visibleHome ?? false) && (
                <ThemeImage
                    name="home"
                    src={srcHome}
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
                    layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
                />
            </Region>
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
            <Region
                name="owner_name_cont"
                tooltip={t('infostand.profile.link.tooltip')}
                onPointerTap={onOwnerNameCont}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 230, top: 34, height: 16 }}
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
            <Region
                name="tags"
                onPointerTap={onTags}
                cursor="pointer"
                layout={{ position: 'absolute', left: 5, width: 220, top: 37, height: 100 }}
            />
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
                    layout={{ position: 'absolute', right: 202, width: 18, top: 0, height: 16 }}
                >
                    <ThemeImage
                        name="thumb_up"
                        src={srcThumbUp}
                        layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 16 }}
                    />
                </Region>
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
            <Region
                name="ranking_cont"
                onPointerTap={onRankingCont}
                cursor="pointer"
                layout={{ position: 'absolute', left: 5, width: 220, top: 125, height: 16 }}
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
            <Region
                name="padding_cont"
                layout={{ position: 'absolute', left: 5, width: 220, top: 185, height: 10 }}
            />
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

/** Named region `buttons_cont` of IroRoomDetailsFramedLayout - configured through the parent's `buttonsCont` prop. */
export interface IroRoomDetailsFramedLayoutButtonsContProps {
    layout?: BoxLayout;
    onFloorPlanEditorButton?: () => void;
    onRoomFilterButton?: () => void;
    onRoomMuteallButton?: () => void;
    onRoomReportButton?: () => void;
    onRoomSettingsButton?: () => void;
    onStaffPickButton?: () => void;
}

export const IroRoomDetailsFramedLayoutButtonsCont = ({ layout, onFloorPlanEditorButton, onRoomFilterButton, onRoomMuteallButton, onRoomReportButton, onRoomSettingsButton, onStaffPickButton }: IroRoomDetailsFramedLayoutButtonsContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="buttons_cont"
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
