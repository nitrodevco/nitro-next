import { Container as PixiContainer } from 'pixi.js';
import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { Box, Button, Frame, Icon, LayoutImage, Region, ThemeImage, ThemeText, useLayoutSize } from '#base/theme';

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
    /** `roomSession.roomControllerLevel >= 1` - anyone with rights in the room may edit its floor plan. */
    canEditFloorPlan: boolean;
    /** Only offered where rights were given rather than owned. */
    canRemoveRights: boolean;
    onOpenOwnerProfile: () => void;
    onSelectTag: (tag: string) => void;
    onRate: () => void;
    onToggleFavourite: () => void;
    onMakeHome: () => void;
    onRemoveRights: () => void;
    onRoomSettings: () => void;
    onFloorPlanEditor: () => void;
    onToggleStaffPick: () => void;
    onMuteAll: () => void;
    onClose: () => void;
}

/** `RoomInfoViewCtrl.layoutContent`: the window is the content's lowest point plus this. */
const WINDOW_EXTRA_HEIGHT = 45;

/** The captions of `rating_cont` / `ranking_cont` and `owner_name_cont`: `u_bold` `0x777777`. */
const CAPTION_COLOR = '#777777';

/**
 * The room info panel behind the tool column's settings button - `RoomInfoViewCtrl` on the
 * `iro_room_details_framed` layout (236 wide, frame style 3 tinted `0xff418db0`, content at
 * 3,36): what the room is, who owns it, how it is rated, and whatever the viewer is allowed to do
 * about any of that.
 *
 * Flash lays it out by hand: `refreshRoomDetails` stacks `room_name`, `owner_name_cont`,
 * `rating_cont`, `ranking_cont`, `padding_cont`, `tags`, `room_desc` and `thumbnail_container`
 * from y 3 with no spacing (`Util.moveChildrenToColumn`), each at its layout x, a text as high as
 * `textHeight + 5`; `layoutContent` puts `buttons_cont` 3 under `room_details`; and the window is
 * the content's lowest point plus 45. So the content is a measured column here and the frame
 * takes its height from it. `setupLabelAndValue` sizes a caption to its `textWidth` - the bitmap
 * less its 4px gutter - and puts the value 3 after it; the rating's thumb follows the value by 5.
 *
 * The corner buttons are `HabboNavigator.refreshButton` on the layout's empty bitmaps:
 * `prepareButton` gives each its `getButtonImage` bitmap and sizes the bitmap - not the region -
 * to it, so `remove_rights` (17x22) sits in its 18x22 region, `make_home` (19x14) in its 18x16
 * region, cut at the region's edge, and `favourite` / `make_favourite` (18x16) fill theirs. On
 * your home room `refreshButtons` hides `make_home_region` and shows the plain `home` bitmap
 * (19x14, no region, no tooltip) at the same 185,1. The layout's `thumb_up` bitmap in
 * `rating_region` is one nothing ever fills - no `refreshButton` names it - so Flash's rate
 * button is an invisible 18x16 click area with the `navigator.rateroom` tooltip, and so is this
 * one. None of these has a hover state.
 *
 * Each tag is `TagRenderer.refreshTag` on an `iro_tag`: `bg_l` (4 wide), `bg_m` stretched from 4
 * to 6 short of the right and `bg_r` (5 wide) anchored 1 in from it, under the `u_small` text at
 * 1,0 whose width is `textWidth + 5`, the tag 3 wider. `tagProcedure` swaps the three pieces for
 * `tag_<piece>_reactive` under the pointer (`RoomInfoTag`).
 * `add_thumbnail_region` (the camera, with the `NAVIGATOR_ROOM_THUMBNAIL_CAMERA` perk) and
 * `guild_info` are not drawn: neither has anything behind it in the port.
 *
 * `RoomInfoViewCtrl.layoutButtons` stacks seven buttons in this order: `room_settings_button`,
 * `raid_protection_settings_button`, `room_filter_button`, `floor_plan_editor_button`,
 * `staff_pick_button`, `room_report_button`, `room_muteall_button`. The port renders the four
 * whose windows it has - settings, the floor plan editor, staff pick and mute all - in that
 * relative order. The three it leaves out, and what each still needs:
 *
 * - `raid_protection_settings_button` (`${raid.protection.settings.button}`, new in
 *   WIN63-202609091217-117204808) opens `navigator/raidprotection/<roomId>`, and
 *   `RoomInfoViewCtrl.refreshRaidProtectionButton` shows it only while
 *   `RaidProtectionSettingsController.isFeatureEnabled` (config `raid.protection.enabled`) and
 *   `canManage(flatId)` - the latter true only after a `RaidProtectionCapabilityMessage` for the
 *   live current room said so. The window behind it is the `raid_protection_settings` layout
 *   (430 x 488: a warning card, an enable checkbox with detection-sensitivity/action/ban-duration
 *   dropmenus, a guard card with duration and sensitivity, the incident status line, cancel and
 *   save), driven by `RaidProtectionSettingsController` and `RaidProtectionSettingsData`.
 *   `nitro-packets` has the five headers (`IncomingHeader.RaidProtectionCapabilityMessage` 734,
 *   `RaidProtectionSettingsMessage` 3553, `RaidProtectionSettingsResultMessage` 3620,
 *   `OutgoingHeader.GetRaidProtectionSettingsComposer` 206,
 *   `SaveRaidProtectionSettingsComposer` 2687) but none of the five classes, so nothing can set
 *   the capability and the button could only ever be hidden. It is ported when those exist.
 * - `room_filter_button` (`canEditRoomSettings && room.custom.filter.enabled`) needs the room
 *   word-filter window, which is not ported.
 * - `room_report_button` (hidden unless `room.report.enabled`) needs report/help, which is not
 *   ported.
 */
/** One `iro_tag` (`TagRenderer.refreshTag`), its three pieces swapped for the `_reactive` art while hovered (`tagProcedure`). */
const RoomInfoTag = ({ tag, index, onSelect }: { tag: string; index: number; onSelect: (tag: string) => void }) => {
    const [ hovered, setHovered ] = useState(false);

    return (
        <Region
            name={`tag.${index}`}
            onPointerTap={() => onSelect(tag)}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            cursor="pointer"
            // `refreshTag`: the text 1 in and `textWidth + 5` wide, the tag 3 wider.
            layout={{ height: 14, flexDirection: 'row', paddingLeft: 1, paddingRight: 2, flexShrink: 0 }}
        >
            <ThemeImage
                name="bg_l"
                src={hovered ? LayoutImage('navigator/tag_l_reactive.png') : LayoutImage('navigator/tag_l.png')}
                layout={{ position: 'absolute', left: 0, top: 0, width: 4, height: 14 }}
            />
            <ThemeImage
                name="bg_m"
                src={hovered ? LayoutImage('navigator/tag_m_reactive.png') : LayoutImage('navigator/tag_m.png')}
                bitmap={{}}
                layout={{ position: 'absolute', left: 4, right: 6, top: 0, height: 14 }}
            />
            <ThemeImage
                name="bg_r"
                src={hovered ? LayoutImage('navigator/tag_r_reactive.png') : LayoutImage('navigator/tag_r.png')}
                layout={{ position: 'absolute', right: 1, top: 0, width: 5, height: 14 }}
            />
            <ThemeText
                text={`#${tag}`}
                textStyle="u_small"
                textOptions={{ fill: '#0e3139' }}
                flashFormat={{ gridFitType: 'subpixel' }}
                name="txt"
                verticalAlign="top"
                layout={{ marginRight: 1 }}
            />
        </Region>
    );
};

export const RoomInfoView = ({
    roomName, description, ownerName, showOwner, tags, rating, ranking, thumbnailUrl,
    isHome, isFavourite, canFavourite, canRate, canEditRoomSettings, canStaffPick, isStaffPicked,
    canMuteAll, allInRoomMuted, canEditFloorPlan, canRemoveRights,
    onOpenOwnerProfile, onSelectTag, onRate, onToggleFavourite, onMakeHome, onRemoveRights,
    onRoomSettings, onFloorPlanEditor, onToggleStaffPick, onMuteAll, onClose,
}: RoomInfoViewProps) => {
    const t = useTranslation();
    const [ contentNode, setContentNode ] = useState<PixiContainer | null>(null);
    const contentSize = useLayoutSize(contentNode);
    // `RoomDetailsCtrl.onEntry`: the owner's eye is icon style 22 while the pointer is over it.
    const [ ownerHovered, setOwnerHovered ] = useState(false);

    const hasButtons = canEditRoomSettings || canEditFloorPlan || canStaffPick || canMuteAll;

    return (
        <Frame
            variant="3"
            id="room-info"
            caption={t('navigator.roomsettings.roominfo')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            centered
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 3, 36, 3, 3 ]}
            layout={{ position: 'absolute', width: 236, height: contentSize.height + WINDOW_EXTRA_HEIGHT }}
        >
            <Box
                ref={setContentNode}
                layout={{ position: 'absolute', left: 0, top: 0, width: 230, flexDirection: 'column', gap: 3 }}
            >
                <Box layout={{ width: 230, flexDirection: 'column', paddingTop: 3, flexShrink: 0 }}>
                    <ThemeText
                        text={roomName}
                        textStyle="u_bold"
                        textOptions={{ wordWrap: true, wordWrapWidth: 149 }}
                        name="room_name"
                        verticalAlign="top"
                        layout={{ width: 153, marginLeft: 5, marginBottom: 1, flexShrink: 0 }}
                    />
                    {showOwner && (
                        <Region
                            name="owner_name_cont"
                            tooltip={t('infostand.profile.link.tooltip')}
                            tooltipDelay={100}
                            onPointerTap={onOpenOwnerProfile}
                            onPointerOver={() => setOwnerHovered(true)}
                            onPointerOut={() => setOwnerHovered(false)}
                            cursor="pointer"
                            // `layoutChildrenInArea(cont, 1000, 10, 2, 5)`: one row from x 5, 2 apart.
                            layout={{ width: 230, height: 16, flexDirection: 'row', paddingLeft: 5, gap: 2, flexShrink: 0 }}
                        >
                            <ThemeText
                                text={t('navigator.roomownercaption')}
                                textStyle="u_bold"
                                textOptions={{ fill: CAPTION_COLOR }}
                                name="owner_caption"
                                verticalAlign="top"
                            />
                            <Box layout={{ width: 15, height: 15, flexShrink: 0 }}>
                                <Icon
                                    variant={ownerHovered ? 22 : 21}
                                    name={ownerHovered ? 'icon_eye_over' : 'icon_eye_off'}
                                    layout={{ position: 'absolute', left: 0, top: 4 }}
                                />
                            </Box>
                            <ThemeText
                                text={ownerName}
                                textStyle="u_regular"
                                name="owner_name"
                                verticalAlign="top"
                            />
                        </Region>
                    )}
                    <Box layout={{ width: 220, height: 16, marginLeft: 5, flexDirection: 'row', flexShrink: 0 }}>
                        <ThemeText
                            text={t('navigator.roomrating')}
                            textStyle="u_bold"
                            textOptions={{ fill: CAPTION_COLOR }}
                            name="rating_caption"
                            verticalAlign="top"
                            layout={{ marginRight: -4 + 3 }}
                        />
                        <ThemeText
                            text={String(rating)}
                            textStyle="u_regular"
                            name="rating_txt"
                            verticalAlign="top"
                        />
                        {canRate && (
                            <Region
                                name="rating_region"
                                tooltip={t('navigator.rateroom')}
                                onPointerTap={onRate}
                                cursor="pointer"
                                layout={{ width: 18, height: 16, marginLeft: 5, flexShrink: 0 }}
                            />
                        )}
                    </Box>
                    {(ranking > 0) && (
                        <Box layout={{ width: 220, height: 16, marginLeft: 5, flexDirection: 'row', flexShrink: 0 }}>
                            <ThemeText
                                text={t('navigator.roomranking')}
                                textStyle="u_bold"
                                textOptions={{ fill: CAPTION_COLOR }}
                                name="ranking_caption"
                                verticalAlign="top"
                                layout={{ marginRight: -4 + 3 }}
                            />
                            <ThemeText
                                text={String(ranking)}
                                textStyle="u_regular"
                                name="ranking_txt"
                                verticalAlign="top"
                            />
                        </Box>
                    )}
                    {/* `padding_cont`. */}
                    <Box layout={{ width: 220, height: 10, marginLeft: 5, flexShrink: 0 }} />
                    {!!tags.length && (
                        // `TagRenderer.refreshTags`: the tags packed 14 high across the 225 from their x.
                        <Region
                            name="tags"
                            layout={{ width: 225, marginLeft: 5, flexDirection: 'row', flexWrap: 'wrap', flexShrink: 0 }}
                        >
                            {tags.slice(0, 4).map((tag, index) => (
                                <RoomInfoTag
                                    key={tag}
                                    tag={tag}
                                    index={index}
                                    onSelect={onSelectTag}
                                />
                            ))}
                        </Region>
                    )}
                    {!!description.length && (
                        <ThemeText
                            text={description}
                            textStyle="u_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 216 }}
                            name="room_desc"
                            verticalAlign="top"
                            layout={{ width: 220, marginLeft: 5, marginBottom: 1, flexShrink: 0 }}
                        />
                    )}
                    <Box layout={{ width: 227, height: 114, marginLeft: 1, flexShrink: 0 }}>
                        <Region
                            name="thumbnail_edges"
                            backgroundColor="#000000"
                            layout={{ position: 'absolute', left: 57, top: 1, width: 112, height: 112 }}
                        >
                            <ThemeImage
                                name="thumbnail_image"
                                src={thumbnailUrl.length ? thumbnailUrl : LayoutImage('shared/newnavigator_default_room.png')}
                                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                                layout={{ position: 'absolute', left: 1, width: 110, top: 1, height: 110 }}
                            />
                        </Region>
                    </Box>
                    {canRemoveRights && (
                        <Region
                            name="remove_rights_region"
                            tooltip={t('navigator.roominfo.removerights.tooltip')}
                            onPointerTap={onRemoveRights}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 163, top: 1, width: 18, height: 22, overflow: 'hidden' }}
                        >
                            <ThemeImage
                                name="remove_rights"
                                src={LayoutImage('navigator/remove_rights.png')}
                                layout={{ position: 'absolute', left: 0, top: 0, width: 17, height: 22 }}
                            />
                        </Region>
                    )}
                    {!isHome && (
                        <Region
                            name="make_home_region"
                            tooltip={t('navigator.roominfo.makehome.tooltip')}
                            onPointerTap={onMakeHome}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 185, top: 1, width: 18, height: 16, overflow: 'hidden' }}
                        >
                            <ThemeImage
                                name="make_home"
                                src={LayoutImage('navigator/make_home.png')}
                                layout={{ position: 'absolute', left: 0, top: 0, width: 19, height: 14 }}
                            />
                        </Region>
                    )}
                    {isHome && (
                        <ThemeImage
                            name="home"
                            src={LayoutImage('navigator/home.png')}
                            layout={{ position: 'absolute', left: 185, top: 1, width: 19, height: 14 }}
                        />
                    )}
                    {canFavourite && (
                        <Region
                            name={isFavourite ? 'favourite_region' : 'make_favourite_region'}
                            tooltip={t(isFavourite ? 'navigator.favourite.tooltip' : 'navigator.makefavourite.tooltip')}
                            onPointerTap={onToggleFavourite}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 206, top: 1, width: 18, height: 16 }}
                        >
                            <ThemeImage
                                name={isFavourite ? 'favourite' : 'make_favourite'}
                                src={LayoutImage(isFavourite ? 'navigator/favourite.png' : 'navigator/make_favourite.png')}
                                layout={{ position: 'absolute', left: 0, top: 0, width: 18, height: 16 }}
                            />
                        </Region>
                    )}
                </Box>
                {hasButtons && (
                    // `layoutButtons`: the visible buttons from y 0, 3 apart, at x 5.
                    <Box layout={{ width: 220, marginLeft: 5, flexDirection: 'column', gap: 3, flexShrink: 0 }}>
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
                        {canEditFloorPlan && (
                            <Button
                                variant="3"
                                name="floor_plan_editor_button"
                                onPointerTap={onFloorPlanEditor}
                                layout={{ width: 220, height: 29 }}
                            >
                                {t('open.floor.plan.editor')}
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
                    </Box>
                )}
            </Box>
        </Frame>
    );
};
