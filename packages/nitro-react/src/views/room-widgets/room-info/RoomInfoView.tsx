import { useTranslation } from '#base/context/system';
import { Border, Box, Button, Frame, Icon, LayoutImage, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

export interface RoomInfoViewProps {
    roomName: string;
    description: string;
    ownerName: string;
    /** A public room hides its owner and shows its own blurb in place of one. */
    showOwner: boolean;
    tags: string[];
    rating: number;
    /** Zero when the room has no place in the rankings yet. */
    ranking: number;
    thumbnailUrl: string;
    isHome: boolean;
    isFavourite: boolean;
    /** Your own rooms are never favourited, so neither button is offered on them. */
    canFavourite: boolean;
    canRate: boolean;
    /** Owner or room controller: the settings and floor-plan entries only appear for them. */
    canEditRoomSettings: boolean;
    /** Staff only. */
    canStaffPick: boolean;
    isStaffPicked: boolean;
    canMuteAll: boolean;
    allInRoomMuted: boolean;
    /** Only offered where rights were given rather than owned. */
    canRemoveRights: boolean;
    onOpenOwnerProfile: () => void;
    onSelectTag: (tag: string) => void;
    onRate: () => void;
    onToggleFavourite: () => void;
    onMakeHome: () => void;
    onRemoveRights: () => void;
    onRoomSettings: () => void;
    onToggleStaffPick: () => void;
    onMuteAll: () => void;
    onClose: () => void;
}

/**
 * The room info panel behind the tool column's settings button, on the `iro_room_details_framed`
 * layout (236 wide): what the room is, who owns it, how it is rated, and whatever the viewer is
 * allowed to do about any of that.
 *
 * Flash grew the window to whatever its visible rows needed (`Util.moveChildrenToColumn` then
 * `getLowestPoint`), so the body is a column here rather than the layout's fixed 411.
 */
export const RoomInfoView = ({
    roomName, description, ownerName, showOwner, tags, rating, ranking, thumbnailUrl,
    isHome, isFavourite, canFavourite, canRate, canEditRoomSettings, canStaffPick, isStaffPicked,
    canMuteAll, allInRoomMuted, canRemoveRights,
    onOpenOwnerProfile, onSelectTag, onRate, onToggleFavourite, onMakeHome, onRemoveRights,
    onRoomSettings, onToggleStaffPick, onMuteAll, onClose,
}: RoomInfoViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="room-info"
            caption={t('navigator.roomsettings.roominfo')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            defaultPosition={{ x: 180, y: 70 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 236, height: 411 }}
        >
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                contentLayout={{ position: 'relative', width: '100%', flexDirection: 'column', gap: 3, padding: 3 }}
            >
                <Region layout={{ width: 224, flexDirection: 'row', alignItems: 'flex-start', gap: 4, flexShrink: 0 }}>
                    <ThemeText
                        text={roomName}
                        textStyle="text-style-u-bold"
                        textOptions={{ wordWrap: true, wordWrapWidth: 153 }}
                        name="room_name"
                        verticalAlign="top"
                        layout={{ width: 153, minHeight: 17 }}
                    />
                    <Box layout={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                        {canRemoveRights && (
                            <Region
                                name="remove_rights_region"
                                tooltip={t('navigator.roominfo.removerights.tooltip')}
                                onPointerTap={onRemoveRights}
                                cursor="pointer"
                                layout={{ width: 18, height: 22 }}
                            >
                                <ThemeImage src={LayoutImage('extended_profile_block_icon.png')} />
                            </Region>
                        )}
                        {!isHome && (
                            <Region
                                name="make_home_region"
                                tooltip={t('navigator.roominfo.makehome.tooltip')}
                                onPointerTap={onMakeHome}
                                cursor="pointer"
                                layout={{ width: 18, height: 16 }}
                            >
                                <ThemeImage src={LayoutImage('extended_profile_rooms.png')} />
                            </Region>
                        )}
                        {canFavourite && (
                            <Region
                                name={isFavourite ? 'favourite_region' : 'make_favourite_region'}
                                tooltip={t(isFavourite ? 'navigator.favourite.tooltip' : 'navigator.makefavourite.tooltip')}
                                onPointerTap={onToggleFavourite}
                                cursor="pointer"
                                layout={{ width: 18, height: 16 }}
                            >
                                <ThemeImage src={LayoutImage(isFavourite ? 'extended_profile_clear_favourite.png' : 'extended_profile_make_favourite.png')} />
                            </Region>
                        )}
                    </Box>
                </Region>
                {showOwner && (
                    <Region
                        name="owner_name_cont"
                        tooltip={t('infostand.profile.link.tooltip')}
                        onPointerTap={onOpenOwnerProfile}
                        cursor="pointer"
                        layout={{ width: 224, height: 17, flexDirection: 'row', alignItems: 'center', gap: 4, flexShrink: 0 }}
                    >
                        <ThemeText
                            text={t('navigator.roomownercaption')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#777777' }}
                            name="owner_caption"
                        />
                        <Icon
                            variant="21"
                            name="icon_eye_off"
                            layout={{ width: 15, height: 11 }}
                        />
                        <ThemeText
                            text={ownerName}
                            textStyle="text-style-u-regular"
                            name="owner_name"
                        />
                    </Region>
                )}
                {!!tags.length && (
                    <Region
                        name="tags"
                        layout={{ width: 224, flexDirection: 'row', flexWrap: 'wrap', gap: 4, flexShrink: 0 }}
                    >
                        {tags.map(tag => (
                            <Border
                                key={tag}
                                variant="3"
                                tintColor="#1c2935"
                                layout={{ height: 15, flexShrink: 0 }}
                            >
                                <Region
                                    onPointerTap={() => onSelectTag(tag)}
                                    cursor="pointer"
                                    layout={{ paddingLeft: 3, paddingRight: 3, height: 15, flexDirection: 'row', alignItems: 'center' }}
                                >
                                    <ThemeText
                                        text={`#${tag}`}
                                        textOptions={{ fill: '#1b79ab' }}
                                    />
                                </Region>
                            </Border>
                        ))}
                    </Region>
                )}
                {!!description.length && (
                    <ThemeText
                        text={description}
                        textStyle="text-style-u-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 220 }}
                        name="room_desc"
                        verticalAlign="top"
                        layout={{ width: 220, flexShrink: 0 }}
                    />
                )}
                <Region
                    name="rating_cont"
                    layout={{ width: 220, height: 17, flexDirection: 'row', alignItems: 'center', gap: 5, flexShrink: 0 }}
                >
                    <ThemeText
                        text={t('navigator.roomrating')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#777777' }}
                        name="rating_caption"
                    />
                    <ThemeText
                        text={String(rating)}
                        textStyle="text-style-u-regular"
                        name="rating_txt"
                    />
                    {canRate && (
                        <Region
                            name="rating_region"
                            tooltip={t('navigator.rateroom')}
                            onPointerTap={onRate}
                            cursor="pointer"
                            layout={{ width: 18, height: 16 }}
                        >
                            <ThemeImage src={LayoutImage('roomtools_like.png')} />
                        </Region>
                    )}
                </Region>
                {ranking > 0 && (
                    <Region
                        name="ranking_cont"
                        layout={{ width: 220, height: 17, flexDirection: 'row', alignItems: 'center', gap: 5, flexShrink: 0 }}
                    >
                        <ThemeText
                            text={t('navigator.roomranking')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#777777' }}
                            name="ranking_caption"
                        />
                        <ThemeText
                            text={String(ranking)}
                            textStyle="text-style-u-regular"
                            name="ranking_txt"
                        />
                    </Region>
                )}
                <Region
                    name="thumbnail_container"
                    layout={{ width: 224, height: 114, alignItems: 'center', flexShrink: 0 }}
                >
                    <Region
                        name="thumbnail_edges"
                        backgroundColor="#000000"
                        layout={{ width: 112, height: 112 }}
                    >
                        <ThemeImage
                            name="thumbnail_image"
                            src={thumbnailUrl.length ? thumbnailUrl : LayoutImage('newnavigator_default_room.png')}
                            layout={{ position: 'absolute', left: 1, width: 110, top: 1, height: 110 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="buttons_cont"
                    layout={{ width: 220, flexDirection: 'column', gap: 3, flexShrink: 0 }}
                >
                    {canEditRoomSettings && (
                        <Button
                            variant="3"
                            name="room_settings_button"
                            onPointerTap={onRoomSettings}
                            layout={{ width: 220, height: 29 }}
                        >
                            {t('navigator.roomsettings')}
                        </Button>
                    )}
                    {canStaffPick && (
                        <Button
                            variant="3"
                            name="staff_pick_button"
                            onPointerTap={onToggleStaffPick}
                            layout={{ width: 220, height: 29 }}
                        >
                            {t(isStaffPicked ? 'navigator.staffpicks.unpick' : 'navigator.staffpicks.pick')}
                        </Button>
                    )}
                    {canMuteAll && (
                        <Button
                            variant="3"
                            name="room_muteall_button"
                            onPointerTap={onMuteAll}
                            layout={{ width: 220, height: 29 }}
                        >
                            {t(allInRoomMuted ? 'navigator.muteall_on' : 'navigator.muteall_off')}
                        </Button>
                    )}
                </Region>
            </ScrollArea>
        </Frame>
    );
};
