/**
 * The room info panel behind the tool column's settings button - `RoomInfoViewCtrl` on the
 * `habbo-navigator-com/iro_room_details_framed_xml` layout (`_navigator.getXmlWindow("iro_room_details_framed")`,
 * opened `center()`ed): what the room is, who owns it, how it is rated, and whatever the viewer is
 * allowed to do about any of that.
 *
 * `refresh` hides every child of the frame's content (`Util.hideChildren`), so `public_space_details`
 * stays hidden and `embed_info` shows only while `refreshEmbed` puts it back; the bindings are what
 * `prepareWindow`, `refreshRoomDetails`, `refreshEmbed` and `refreshButtons` set, and `arrange` is
 * their geometry in the order the AS3 does it:
 *
 * - `prepareWindow`: `Util.layoutChildrenInArea(owner_name_cont, 1000, 10, 2, 5)` lays the owner
 *   caption, its eye and the name in a row from x 5, 2 apart; `setupLabelAndValue` sizes the rating
 *   and ranking captions to their `textWidth` and puts each value 3 after its caption
 *   (`Util.moveChildrenToRow`). `HabboNavigator.refreshButton` gives each corner button its
 *   `getButtonImage` bitmap and sizes the bitmap - not the region - to it (`prepareButton`), so
 *   `remove_rights` (17x22) sits in its 18x22 region and `make_home` (19x14) in its 18x16 one.
 * - `refreshRoomDetails`: `room_name` and `room_desc` as high as `textHeight + 5`, the rate region 5
 *   after the rating, the tags (`TagRenderer.refreshTags`), `Util.moveChildrenToColumn(room_details,
 *   [room_name, owner_name_cont, rating_cont, ranking_cont, padding_cont, tags, room_desc,
 *   thumbnail_container], room_name.y, 0)` and `room_details` as high as its lowest point.
 * - `refreshEmbed` (with `embed.showInRoomInfo`): "Link to this room" and its `icon_weblink`; a click
 *   on it (`onEmbedInfo`) opens or folds the `navigator.embed.info` text and the field with the
 *   room's link (`getEmbedData`: `navigator.embed.src` with `roomId`). `prepareWindow` sizes the
 *   text to `textHeight + 5` and puts the field 2 under it; `refreshEmbed` makes the container its
 *   lowest point plus 5 without the region, and the region as high as the field's y while open, or
 *   the whole container while folded.
 * - `layoutButtons`: the visible buttons of `buttons_cont` stacked 3 apart in their order, the
 *   container hidden when none shows and as high as its lowest point; `layoutContent` stacks
 *   `room_details` and `buttons_cont` 3 apart and makes the window the content's lowest point plus 45.
 *
 * On your home room `refreshRoomDetails` hides `make_home_region` and shows the plain `home` bitmap
 * (19x14, no region, no tooltip). The layout's `thumb_up` bitmap in `rating_region` is one nothing
 * ever fills, so the rate button is an invisible 18x16 click area with the `navigator.rateroom`
 * tooltip. `RoomDetailsCtrl.onEntry` swaps the owner's eye (`icon_eye_off` / `icon_eye_over`,
 * `setUserInfoState`) under the pointer.
 *
 * Each tag is `TagRenderer.refreshTag` on an `iro_tag_xml` clone added to `tags`: `#tag` in `txt`,
 * `txt` `textWidth + 5` wide and the tag 3 wider; `refreshTags` packs them 14 high across the
 * content's width from the container's x (`layoutChildrenInArea(tags, width - tags.x, 14)`) and
 * `tagProcedure` swaps `bg_l` / `bg_m` / `bg_r` for `tag_<piece>_reactive` under the pointer.
 * `prepareWindow` shows `thumbnail_container` only with the `NAVIGATOR_ROOM_THUMBNAIL_CAMERA` perk,
 * and its `add_thumbnail_region` to whoever may edit the room's settings: a click opens the room
 * thumbnail camera (`onAddRoomThumbnail`: `roomThumbnailCamera/open`) and closes this window.
 *
 * `GuildInfoCtrl.refresh` adds a `guild_info_xml` clone named `guild_info` to the content: in a
 * group's room it shows the group's badge and `navigator.guildbase` with the group's name, and a
 * click on it asks for the group's details (`GetHabboGroupDetailsMessageComposer(groupId, true)`),
 * which open the group's window; in any other room it is hidden. `layoutContent` puts it at x 11.
 *
 * `layoutButtons` stacks seven buttons: `room_settings_button`, `raid_protection_settings_button`,
 * `room_filter_button`, `floor_plan_editor_button`, `staff_pick_button`, `room_report_button`,
 * `room_muteall_button`. The port shows the six whose windows it has - settings, raid protection,
 * the room filter, the floor plan editor, staff pick and mute all. `raid_protection_settings_button`
 * (`refreshRaidProtectionButton`) shows while the hotel has `raid.protection.enabled` and the server
 * said the user may manage the room (`RaidProtectionSettingsController.canManage`); a click opens
 * `navigator/raidprotection/<roomId>` and closes this window. `room_filter_button` shows to whoever
 * may edit the room's settings while the hotel has `room.custom.filter.enabled`, and opens the
 * room's word filter (`roomFilterCtrl.startRoomFilterEdit`) and closes this window.
 * `room_report_button` shows while the hotel has `room.report.enabled` and reports the room
 * (`onRoomReport`: `habboHelp.reportRoom`), closing this window.
 */
import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { LayoutImage, LayoutWindow, TemplateBindings, TemplateItem, TemplateWindow, TemplateWindows, useTemplate, useTemplateFrame } from '#base/theme';
import { getLowestPoint, layoutChildrenInArea } from '#base/views/shared/flashWindowUtils';

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
    /** `NAVIGATOR_ROOM_THUMBNAIL_CAMERA`: without the perk `prepareWindow` hides the thumbnail. */
    showThumbnail: boolean;
    /** The perk and `canEditRoomSettings`: `add_thumbnail_region` shows. */
    canAddThumbnail: boolean;
    onAddThumbnail: () => void;
    /** `embed.showInRoomInfo`. */
    showEmbed: boolean;
    /** `getEmbedData`: the room's link. */
    embedSrc: string;
    /** `GuestRoomData.habboGroupId`, under 1 for a room with no group. */
    groupId: number;
    groupName: string;
    /** The group badge's image url. */
    groupBadgeUrl: string;
    onGroupInfo: () => void;
    isHome: boolean;
    isFavourite: boolean;
    /** Your own rooms are never favourited, so neither button is offered on them. */
    canFavourite: boolean;
    canRate: boolean;
    /** Owner or room controller: the settings and floor-plan entries only appear for them. */
    canEditRoomSettings: boolean;
    /** `canEditRoomSettings && room.custom.filter.enabled`. */
    canEditRoomFilter: boolean;
    /** Staff only. */
    canStaffPick: boolean;
    isStaffPicked: boolean;
    canMuteAll: boolean;
    allInRoomMuted: boolean;
    /** `roomSession.roomControllerLevel >= 1` - anyone with rights in the room may edit its floor plan. */
    canEditFloorPlan: boolean;
    /** `refreshRaidProtectionButton`: the feature is on and the server let the user manage the room. */
    canManageRaidProtection: boolean;
    /** `room.report.enabled`. */
    canReport: boolean;
    /** Only offered where rights were given rather than owned. */
    canRemoveRights: boolean;
    onOpenOwnerProfile: () => void;
    onSelectTag: (tag: string) => void;
    onRate: () => void;
    onToggleFavourite: () => void;
    onMakeHome: () => void;
    onRemoveRights: () => void;
    onRoomSettings: () => void;
    onRaidProtection: () => void;
    onRoomFilter: () => void;
    onReport: () => void;
    onFloorPlanEditor: () => void;
    onToggleStaffPick: () => void;
    onMuteAll: () => void;
    onClose: () => void;
}

const LIBRARY = 'habbo-navigator-com';

/** `layoutContent`: the window is the content's lowest point plus this. */
const WINDOW_EXTRA_HEIGHT = 45;

/** `layoutContent`: `guild_info.x = 11`. */
const GUILD_INFO_X = 11;

/** `layoutContent` / `layoutButtons`: `moveChildrenToColumn(..., 3)`. */
const COLUMN_SPACING = 3;

/** `TagRenderer.refreshTags`: four tags at most, packed in rows this high. */
const MAX_TAGS = 4;
const TAG_ROW_HEIGHT = 14;

/** `getButtonImage(name)`'s bitmap sizes, which `prepareButton` sizes each corner button to. */
const BUTTON_IMAGES: Record<string, { width: number; height: number }> = {
    remove_rights: { width: 17, height: 22 },
    make_home: { width: 19, height: 14 },
    home: { width: 19, height: 14 },
    favourite: { width: 18, height: 16 },
    make_favourite: { width: 18, height: 16 },
};

const ROOM_DETAILS_COLUMN = [ 'room_name', 'owner_name_cont', 'rating_cont', 'ranking_cont', 'padding_cont', 'tags', 'room_desc', 'thumbnail_container' ];
const BUTTONS_COLUMN = [ 'room_settings_button', 'raid_protection_settings_button', 'room_filter_button', 'floor_plan_editor_button', 'staff_pick_button', 'room_report_button', 'room_muteall_button' ];
const CONTENT_COLUMN = [ 'room_details', 'public_space_details', 'guild_info', 'embed_info', 'buttons_cont' ];

const childNamed = (window: LayoutWindow, name: string) => window.children.find(child => child.element?.name === name);

/** `Util.moveChildrenToColumn`: the named visible children with a height, from `y` down, `spacing` apart. */
const moveChildrenToColumn = (window: LayoutWindow, names: readonly string[], y: number, spacing: number) => {
    for (const name of names) {
        const child = childNamed(window, name);

        if (!child || !child.visible || child.height <= 0) continue;

        child.setY(y);
        y += child.height + spacing;
    }
};

/** `Util.moveChildrenToRow`: the named visible children from `x` across, at `y`, `spacing` apart. */
const moveChildrenToRow = (window: LayoutWindow, names: readonly string[], x: number, y: number, spacing: number) => {
    for (const name of names) {
        const child = childNamed(window, name);

        if (!child || !child.visible) continue;

        child.setX(x);
        child.setY(y);
        x += child.width + spacing;
    }
};

/** `HabboNavigator.prepareButton`: the bitmap sized to its image. */
const prepareButton = (find: TemplateWindows['find'], name: string) => {
    const bitmap = find(name);
    const image = BUTTON_IMAGES[name];

    if (!bitmap || !image) return;

    bitmap.setWidth(image.width);
    bitmap.setHeight(image.height);
};

/** `setupLabelAndValue`: the caption as wide as its text, the value 3 after it. */
const setupLabelAndValue = (find: TemplateWindows['find'], container: string, caption: string, value: string) => {
    const box = find(container);
    const label = find(`${container}/${caption}`);

    if (!box || !label) return;

    label.setWidth(label.textWidth);
    moveChildrenToRow(box, [ caption, value ], label.x, label.y, 3);
};

/** `TagRenderer.refreshBgPiece`: `tag_<piece>`, or `tag_<piece>_reactive` while hovered. */
const tagPiece = (piece: 'l' | 'm' | 'r', hovered: boolean) => LayoutImage(`${LIBRARY}/tag_${piece}${hovered ? '_reactive' : ''}.png`);

export const RoomInfoView = ({
    roomName, description, ownerName, showOwner, tags, rating, ranking, thumbnailUrl, showThumbnail, canAddThumbnail, onAddThumbnail, showEmbed, embedSrc, groupId, groupName, groupBadgeUrl, onGroupInfo,
    isHome, isFavourite, canFavourite, canRate, canEditRoomSettings, canStaffPick, isStaffPicked,
    canMuteAll, allInRoomMuted, canEditFloorPlan, canManageRaidProtection, canEditRoomFilter, canReport, canRemoveRights,
    onOpenOwnerProfile, onSelectTag, onRate, onToggleFavourite, onMakeHome, onRemoveRights,
    onRoomSettings, onRaidProtection, onRoomFilter, onReport, onFloorPlanEditor, onToggleStaffPick, onMuteAll, onClose,
}: RoomInfoViewProps) => {
    const t = useTranslation();
    const tagTemplate = useTemplate(`${LIBRARY}/iro_tag_xml`);
    const guildTemplate = useTemplate(`${LIBRARY}/guild_info_xml`);
    // `RoomDetailsCtrl.onEntry`: the owner's eye while the pointer is over the owner row.
    const [ ownerHovered, setOwnerHovered ] = useState(false);
    // `tagProcedure`: the tag under the pointer.
    const [ hoveredTag, setHoveredTag ] = useState(-1);
    // `_embedExpanded`.
    const [ embedExpanded, setEmbedExpanded ] = useState(false);
    // `prepareWindow`: `_window.center()`, once.
    const frame = useTemplateFrame({ id: 'room-info', centered: true, rememberPosition: false, resizeDirection: 'none', onClose });

    // `refreshTags`: a tag for each of the first four that has text.
    const shownTags = tags.slice(0, MAX_TAGS).map((tag, index) => ({ tag, index })).filter(({ tag }) => !!tag.length);

    const tagItems: TemplateItem[] = tagTemplate
        ? shownTags.map(({ tag, index }) => ({
                key: `tag.${index}`,
                from: tagTemplate,
                bindings: {
                    '': {
                        onPointerTap: () => onSelectTag(tag),
                        onPointerOver: () => setHoveredTag(index),
                        onPointerOut: () => setHoveredTag(current => (current === index ? -1 : current)),
                    },
                    txt: { caption: `#${tag}` },
                    bg_l: { asset: tagPiece('l', hoveredTag === index) },
                    bg_m: { asset: tagPiece('m', hoveredTag === index) },
                    bg_r: { asset: tagPiece('r', hoveredTag === index) },
                },
                // `refreshTag`: the text `textWidth + 5` wide, the tag 3 wider.
                arrange: ({ find, root }) => {
                    const text = find('txt');

                    if (!text) return;

                    text.setWidth(text.textWidth + 5);
                    root()?.setWidth(text.width + 3);
                },
            }))
        : [];

    // `GuildInfoCtrl.refresh`: added to the content once, shown in a group's room.
    const guildItems: TemplateItem[] = guildTemplate
        ? [ {
                key: 'guild_info',
                from: guildTemplate,
                bindings: {
                    '': { visible: groupId >= 1, onPointerTap: onGroupInfo },
                    guild_base_txt: { caption: t('navigator.guildbase', '', { groupName }) },
                    guild_badge: { asset: groupBadgeUrl },
                },
            } ]
        : [];

    const bindings: TemplateBindings = {
        event_window: { added: guildItems },
        // `refresh`: `Util.hideChildren(_window.content)`, and only the room details and buttons come back.
        // `refreshEmbed`.
        embed_info: { visible: showEmbed },
        icon_weblink: { asset: LayoutImage(`${LIBRARY}/icon_weblink.png`) },
        embed_info_txt: { visible: embedExpanded },
        embed_src_txt: { visible: embedExpanded, caption: embedSrc },
        embed_info_region: { onPointerTap: () => setEmbedExpanded(!embedExpanded) },
        public_space_details: { visible: false },

        // `refreshRoomDetails`.
        room_name: { caption: roomName },
        owner_name_cont: {
            visible: showOwner,
            onPointerTap: onOpenOwnerProfile,
            onPointerOver: () => setOwnerHovered(true),
            onPointerOut: () => setOwnerHovered(false),
        },
        icon_eye_off: { visible: !ownerHovered },
        icon_eye_over: { visible: ownerHovered },
        owner_name: { caption: ownerName },
        room_desc: { visible: !!description.length, caption: description },
        tags: { visible: !!shownTags.length, added: tagItems },
        rating_region: { visible: canRate, onPointerTap: onRate },
        rating_txt: { caption: String(rating) },
        ranking_cont: { visible: ranking > 0 },
        ranking_txt: { caption: String(ranking) },
        thumbnail_container: { visible: showThumbnail },
        thumbnail_image: thumbnailUrl.length ? { asset: thumbnailUrl } : {},
        add_thumbnail_region: { visible: canAddThumbnail, onPointerTap: onAddThumbnail },

        // `prepareWindow`'s and `refreshRoomDetails`' `refreshButton`s.
        remove_rights_region: { visible: canRemoveRights, onPointerTap: onRemoveRights },
        remove_rights: { asset: LayoutImage(`${LIBRARY}/remove_rights.png`) },
        make_home_region: { visible: !isHome, onPointerTap: onMakeHome },
        make_home: { asset: LayoutImage(`${LIBRARY}/make_home.png`) },
        home: { visible: isHome, asset: LayoutImage(`${LIBRARY}/home.png`) },
        favourite_region: { visible: canFavourite && isFavourite, onPointerTap: onToggleFavourite },
        favourite: { asset: LayoutImage(`${LIBRARY}/favourite.png`) },
        make_favourite_region: { visible: canFavourite && !isFavourite, onPointerTap: onToggleFavourite },
        make_favourite: { asset: LayoutImage(`${LIBRARY}/make_favourite.png`) },

        // `refreshButtons`; `layoutButtons` hides the container when none of them shows.
        buttons_cont: { visible: canEditRoomSettings || canManageRaidProtection || canEditRoomFilter || canEditFloorPlan || canStaffPick || canReport || canMuteAll },
        room_settings_button: { visible: canEditRoomSettings, onPointerTap: onRoomSettings },
        raid_protection_settings_button: { visible: canManageRaidProtection, onPointerTap: onRaidProtection },
        room_filter_button: { visible: canEditRoomFilter, onPointerTap: onRoomFilter },
        floor_plan_editor_button: { visible: canEditFloorPlan, onPointerTap: onFloorPlanEditor },
        staff_pick_button: {
            visible: canStaffPick,
            caption: t(isStaffPicked ? 'navigator.staffpicks.unpick' : 'navigator.staffpicks.pick'),
            onPointerTap: onToggleStaffPick,
        },
        room_report_button: { visible: canReport, onPointerTap: onReport },
        room_muteall_button: {
            visible: canMuteAll,
            caption: allInRoomMuted ? '${navigator.muteall_on}' : '${navigator.muteall_off}',
            onPointerTap: onMuteAll,
        },
    };

    const arrange = ({ find }: TemplateWindows) => {
        const window = find('event_window');
        const content = window?.children.find(child => child.frameContent);
        const details = find('room_details');

        if (!window || !content || !details) return;

        // `prepareWindow`.
        for (const name of Object.keys(BUTTON_IMAGES)) prepareButton(find, name);

        const owner = find('owner_name_cont');

        if (owner) layoutChildrenInArea(owner, 1000, 10, 2, 5);

        setupLabelAndValue(find, 'rating_cont', 'rating_caption', 'rating_txt');
        setupLabelAndValue(find, 'ranking_cont', 'ranking_caption', 'ranking_txt');

        // `refreshRoomDetails`.
        const name = find('room_name');

        if (name) name.setHeight(name.textHeight + 5);

        const tagsWindow = find('tags');

        if (tagsWindow) {
            layoutChildrenInArea(tagsWindow, details.width - tagsWindow.x, TAG_ROW_HEIGHT);
            tagsWindow.setHeight(getLowestPoint(tagsWindow));
        }

        const desc = find('room_desc');

        if (desc && desc.visible) desc.setHeight(desc.textHeight + 5);

        const ratingText = find('rating_txt');

        if (ratingText) find('rating_region')?.setX(ratingText.x + ratingText.width + 5);

        moveChildrenToColumn(details, ROOM_DETAILS_COLUMN, name?.y ?? 0, 0);
        details.setHeight(getLowestPoint(details));

        // `prepareWindow` and `refreshEmbed`.
        const embed = find('embed_info');
        const embedText = find('embed_info_txt');
        const embedSrcField = find('embed_src_txt');
        const embedRegion = find('embed_info_region');

        if (embed && embed.visible && embedText && embedSrcField && embedRegion) {
            embedText.setHeight(embedText.textHeight + 5);
            embedSrcField.setY(embedText.y + embedText.height + 2);
            embedRegion.visible = false;
            embed.setHeight(getLowestPoint(embed) + 5);
            embedRegion.visible = true;
            embedRegion.setHeight(embedExpanded ? embedSrcField.y : embed.height);
        }

        // `layoutButtons`.
        const buttons = find('buttons_cont');

        if (buttons) {
            moveChildrenToColumn(buttons, BUTTONS_COLUMN, 0, COLUMN_SPACING);
            buttons.setHeight(getLowestPoint(buttons));
        }

        // `layoutContent`.
        moveChildrenToColumn(content, CONTENT_COLUMN, 0, COLUMN_SPACING);
        find('guild_info')?.setX(GUILD_INFO_X);
        window.setHeight(getLowestPoint(content) + WINDOW_EXTRA_HEIGHT);
    };

    return (
        <TemplateWindow
            id={`${LIBRARY}/iro_room_details_framed_xml`}
            frame={frame}
            bindings={bindings}
            arrange={arrange}
        />
    );
};
