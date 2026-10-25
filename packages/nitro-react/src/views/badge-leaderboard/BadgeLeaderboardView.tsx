/**
 * The badge leaderboard window - `BadgeLeaderboardView` over `habbo-groups-com/badge_leaderboard_view`
 * (`buildFromXML(xml, 1)`, centred on the desktop each time it is shown), driven by
 * `BadgeLeaderboardController`.
 *
 * - `createWindow`: `entry_template` is taken out of `ranking_list` and cloned 10 times, each clone
 *   hidden until a page puts an entry in it; a clone's `region_profile` opens that user's profile.
 * - `updateChrome`: the frame's style by the board (`getFrameStyle`), the hidden drop menu's
 *   entries and selection, the title in its five texts (four shadows and the text), the info
 *   emblem and text, the emblem moved by `getHeaderAssetYOffset` from its layout place, and the
 *   pager's buttons.
 * - `renderEntries`: each row's even or uneven ground by its place on the board, its rank (`--` for
 *   none) on a border gold, silver or bronze for the first three, its name, score and the board's
 *   emblem; the own entry in `own_container`, which shows only when there is one. A row's face is
 *   `HabboFaceFocuser.focusUserFace(head, direction 2)`, set into its `canvas` at the face's size.
 * - `dropdown_region` (or its arrow) opens the hidden drop menu (`openDropdownMenu`); picking an
 *   entry shows that board from page 0.
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';
import type { IBadgeLeaderboardEntryData } from '@nitrodevco/nitro-packets';

import {
    BADGE_LEADERBOARD_PAGE_SIZE, canBadgeLeaderboardGoNext, canBadgeLeaderboardGoPrevious, getBadgeLeaderboardDropdownOptions, getBadgeLeaderboardDropdownSelection, getBadgeLeaderboardFrameStyle, getBadgeLeaderboardHeaderAsset,
    getBadgeLeaderboardHeaderYOffset, getBadgeLeaderboardInfo, getBadgeLeaderboardRankBorderColor, getBadgeLeaderboardRankText, getBadgeLeaderboardRowAsset, getBadgeLeaderboardTitle, hideBadgeLeaderboard, openBadgeLeaderboardDropdown,
    openBadgeLeaderboardProfile, selectBadgeLeaderboardOption, showBadgeLeaderboardNextPage, showBadgeLeaderboardPreviousPage,
} from '#base/commands';
import { AVATAR_FACE_SIZE, AvatarFaceImage } from '#base/components';
import { useBadgeLeaderboardStore } from '#base/context/badge-leaderboard';
import { useWebSocketContext } from '#base/context/communication';
import { useSystemStore } from '#base/context/system';
import { Box, TemplateBindings, TemplateItem, TemplateWindow, TemplateWindows, useTemplateFrame } from '#base/theme';

const TEMPLATE = 'habbo-groups-com/badge_leaderboard_view';

/** The window manager's bitmaps, as the layout's `asset_uri`s name them. */
const asset = (name: string) => `habbo-window-manager-com-${name}`;

/** `titleTexts`. */
const TITLE_TEXTS = [ 'title_txt_shadow_0', 'title_txt_shadow_1', 'title_txt_shadow_2', 'title_txt_shadow_3', 'title_txt' ];

/** `rank_type_extended_img`'s layout `y` (`§_-P2r§`), which the offset is added to. */
const HEADER_IMAGE_Y = 1;

/** `focusUserFace(image, "head", 2, 1)`. */
const FACE_DIRECTION = 2;

/** `setFaceBitmap`: the canvas takes the face's size, kept centred where the layout put it (its `align` params). */
const arrangeCanvas = (path: string) => ({ find }: TemplateWindows) => {
    const canvas = find(path);

    if (!canvas) return;

    canvas.setWidth(AVATAR_FACE_SIZE);
    canvas.setHeight(AVATAR_FACE_SIZE);
};

/** One row's bindings over `entry_template` or `own_container`, by `BadgeLeaderboardEntryView`'s names. */
const entryBindings = (prefix: string, rankName: string, entry: IBadgeLeaderboardEntryData, rowAsset: string, onProfile: () => void): TemplateBindings => ({
    [`${prefix}${rankName}`]: { caption: getBadgeLeaderboardRankText(entry.rank) },
    [`${prefix}rank_border`]: { color: getBadgeLeaderboardRankBorderColor(entry.rank) },
    [`${prefix}username_txt`]: { caption: entry.userName, setCaptionAfterBuild: true },
    [`${prefix}score_txt`]: { caption: String(entry.score), setCaptionAfterBuild: true },
    [`${prefix}rank_type_img`]: { asset: asset(rowAsset) },
    [`${prefix}region_profile`]: { onPointerTap: onProfile },
    [`${prefix}canvas`]: {
        children: !!entry.figureString && (
            <Box layout={{ position: 'absolute', left: 0, top: 0 }}>
                <AvatarFaceImage
                    figure={entry.figureString}
                    gender={AvatarGenderType.Male}
                    direction={FACE_DIRECTION}
                />
            </Box>
        ),
    },
});

export const BadgeLeaderboardView = () => {
    const shown = useBadgeLeaderboardStore(x => x.shown);
    const type = useBadgeLeaderboardStore(x => x.type);
    const rarity = useBadgeLeaderboardStore(x => x.rarity);
    const page = useBadgeLeaderboardStore(x => x.page);
    const pageData = useBadgeLeaderboardStore(x => x.pageData);
    const menuOpenRequest = useBadgeLeaderboardStore(x => x.menuOpenRequest);
    // The texts the chrome reads, so it follows them when they come in.
    useSystemStore(x => x.localizations);
    const { send } = useWebSocketContext();
    const frame = useTemplateFrame({ id: 'badge_leaderboard', centered: true, rememberPosition: false, resizeDirection: 'none', onClose: hideBadgeLeaderboard });

    if (!shown) return null;

    const title = getBadgeLeaderboardTitle(type, rarity);
    const rowAsset = getBadgeLeaderboardRowAsset(type, rarity);
    const entries = pageData?.entries ?? [];
    const ownEntry = pageData?.ownEntry;

    // `createWindow`'s 10 clones of `entry_template`, each hidden while the page has no entry for it.
    const rows: TemplateItem[] = Array.from({ length: BADGE_LEADERBOARD_PAGE_SIZE }, (_, index): TemplateItem => {
        const entry = entries[index] as IBadgeLeaderboardEntryData | undefined;

        if (!entry) return { key: String(index), from: 'entry_template', bindings: { '': { visible: false } } };

        const even = (((page * BADGE_LEADERBOARD_PAGE_SIZE) + index) % 2) === 0;

        return {
            key: String(index),
            from: 'entry_template',
            bindings: {
                entry_bg_even: { visible: even },
                entry_bg_uneven: { visible: !even },
                ...entryBindings('', 'rank_number', entry, rowAsset, () => openBadgeLeaderboardProfile(send, index)),
            },
            arrange: arrangeCanvas('canvas'),
        };
    });

    const bindings: TemplateBindings = {
        '': { style: String(getBadgeLeaderboardFrameStyle(type, rarity)) },
        ...Object.fromEntries(TITLE_TEXTS.map(name => [ name, { caption: title, setCaptionAfterBuild: true } ])),
        dropdown_region: { onPointerTap: openBadgeLeaderboardDropdown },
        // A drop menu 0 high: Flash draws none of it but the list `openMenu` opens.
        hidden_dropdown: {
            alpha: 0,
            options: getBadgeLeaderboardDropdownOptions(),
            selection: getBadgeLeaderboardDropdownSelection(type, rarity),
            openRequest: menuOpenRequest,
            onSelect: index => selectBadgeLeaderboardOption(send, index),
        },
        rank_type_extended_img: { asset: asset(getBadgeLeaderboardHeaderAsset(type, rarity)) },
        rank_type_info: { caption: getBadgeLeaderboardInfo(type, rarity), setCaptionAfterBuild: true },
        ranking_list: { items: rows },
        own_container: { visible: !!ownEntry },
        ...(ownEntry ? entryBindings('own_container/', 'rank_own', ownEntry, rowAsset, () => openBadgeLeaderboardProfile(send, -1)) : {}),
        previous_btn: { disabled: !canBadgeLeaderboardGoPrevious(page), onPointerTap: () => showBadgeLeaderboardPreviousPage(send) },
        next_btn: { disabled: !canBadgeLeaderboardGoNext(page, pageData), onPointerTap: () => showBadgeLeaderboardNextPage(send) },
    };

    const arrange = (windows: TemplateWindows) => {
        // `setRankTypeExtendedImageYOffset`.
        windows.find('rank_type_extended_img')?.setY(HEADER_IMAGE_Y + getBadgeLeaderboardHeaderYOffset(type, rarity));

        if (ownEntry) arrangeCanvas('own_container/canvas')(windows);
    };

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            bindings={bindings}
            arrange={arrange}
        />
    );
};
