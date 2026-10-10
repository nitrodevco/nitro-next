import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { useConfigValue, useTranslation } from '#base/context/system';
import { useFurnitureImageTexture } from '#base/hooks';
import { findTemplateChild, LayoutImage, TemplateBindings, TemplateItem, TemplateWindow, TemplateWindows, ThemeImage, useTemplate } from '#base/theme';
import { GetFriendlyTime } from '#base/utils';
import { LimitedItemPreviewOverlayView } from '#base/views/shared/LimitedItemPreviewOverlayView';

/** `PickupMode` values the pickup button reads. */
const PICKUP_NONE = 0;
const PICKUP_FULL = 2;

/** `setImage`: the picture's window is at most this high; no picture is a blank this high (`height_min` lifts it to 45). */
const MAX_IMAGE_HEIGHT = 200;
const NO_IMAGE_HEIGHT = 40;

/** `set isNft`: `nft_indicator` is this high while it shows, and 0 while it does not. */
const NFT_INDICATOR_HEIGHT = 22;

/**
 * `InfoStandFurniView.update`: the border's `color` and the spacers' by who the furni belongs to -
 * a Builders Club furni, a temporary one, or anyone's. The border is tinted (`0xRRGGBB`); a spacer is a
 * background-filled window whose colour is `0xAARRGGBB`, as `set spacerColor` passes it - without the
 * alpha byte it would be filled fully transparent.
 */
const KIND_COLORS = {
    builders_club: { border: 0x331c00, spacer: 0xff543d18 },
    temporary: { border: 0x142b44, spacer: 0xff2f4c6b },
    user: { border: 0x3d3d3d, spacer: 0xff333333 },
};

/** The spacers `set spacerColor` colours. */
const SPACERS = [ 'images_spacer', 'owner_spacer', 'group_details_spacer', 'furni_details_spacer' ];

/**
 * Which furni view `InfoStandWidget.onFurniInfo` selects, by the furni's extra param: the jukebox
 * (`RWEIEP_JUKEBOX`), a song disk (`RWEIEP_SONGDISK`), a crackable (`RWEIEP_CRACKABLE_FURNI`), or
 * any other furni - each on a layout of its own.
 */
export type InfostandFurniVariant = 'furni' | 'jukebox' | 'songdisk' | 'crackable';

const VARIANT_TEMPLATES: Record<InfostandFurniVariant, string> = {
    furni: 'habbo-room-ui-com/furni_view',
    jukebox: 'habbo-room-ui-com/jukebox_view',
    songdisk: 'habbo-room-ui-com/songdisk_view',
    crackable: 'habbo-room-ui-com/crackable_furni_view',
};

/** `createAdElement`'s layout: one branding key and its value. */
const BRANDING_ELEMENT_TEMPLATE = 'habbo-room-ui-com/furni_view_branding_element';

/** Everything the furni infostand shows, worked out by its component. */
export interface InfostandFurniDetails {
    variant: InfostandFurniVariant;
    name: string;
    className: string;
    colorIndex: number;
    isNft: boolean;
    /** Builders club and temporary furni name their catalogue rather than a person. */
    ownerKind: 'user' | 'builders_club' | 'temporary';
    ownerId: number;
    ownerName: string;
    /** Seconds left on your own rental, or -1. */
    expiration: number;
    group: { name: string; badge: string } | undefined;
    uniqueSerial: { number: number; series: number } | undefined;
    chest: { name: string; contents: string; isCoins: boolean; isWiredEnabled: boolean; isLocked: boolean } | undefined;
    /** `custom_variables`, which `createWindow` disposes without `hasSecurity(5)` - `undefined` then. */
    customVariables: { name: string; value: string }[] | undefined;
    /** Staff see the object id and a branded furni's settings. */
    staffDetails: { id: number; branding: { key: string; value: string }[] } | undefined;
    crackable: { hits: number; target: number } | undefined;
    jukebox: { playing: boolean; songName: string; creator: string } | undefined;
    songDisk: { songName: string; creator: string } | undefined;
    /** `bc_place_button`: another of it can be placed from the Builders Club. */
    canPlaceMore: boolean;
    canBuy: boolean;
    canRent: boolean;
    /** `extend_button`: your own rental whose type's rent offer can extend it. */
    canExtend: boolean;
    /** `buyout_button`: your own rental whose type's purchase offer can buy it out. */
    canBuyout: boolean;
}

export interface InfostandFurniViewProps {
    details: InfostandFurniDetails;
    canMove: boolean;
    canRotate: boolean;
    canUse: boolean;
    /** The `wired_inspect` button: the wired menu's inspection of this furni. */
    canWiredInspect: boolean;
    pickupMode: number;
    canSaveBranding: boolean;
    /** `button_list.visible`: what `update` works out from the buttons it shows. */
    buttonsVisible: boolean;
    onMove: () => void;
    onRotate: () => void;
    onPickup: () => void;
    onUse: () => void;
    onWiredInspect: () => void;
    onPlaceMore: () => void;
    onBuy: () => void;
    onRent: () => void;
    /** `onExtendButtonClicked` / `onBuyoutButtonClicked`: the rent confirmation (`HabboCatalog.openRentConfirmationWindow`). */
    onExtend: () => void;
    onBuyout: () => void;
    onOpenOwner: () => void;
    onOpenGroup: () => void;
    onSaveBranding: (values: { key: string; value: string }[]) => void;
    /** `customVarsWindowProcedure`'s `set_values`: every variable's value as its field holds it. */
    onSetCustomVariables: (values: { name: string; value: string }[]) => void;
    onClose: () => void;
}

/**
 * The furniture infostand - `InfoStandFurniView` and its jukebox, song disk and crackable
 * variants, drawn from their Flash templates (`furni_view`, `jukebox_view`, `songdisk_view`,
 * `crackable_furni_view`): what the view's code does to the layout's named windows is bound here,
 * and `arrange` is its `updateWindow` - the element list sized to its items, the border 20 taller,
 * the window as wide as the wider of the border and the button row, both right aligned in it.
 *
 * The picture (`setImage`), the limited edition plaque (`limited_item_overlay_preview`) and the
 * jukebox icons are what the code puts into the layout, so they go into its windows; everything
 * else - borders, spacers, buttons, their art and text styles - is the template's. A variant's
 * layout has fewer windows (no place more button, custom variables, group or chest), and a binding
 * of a window it does not have binds nothing, as Flash's `findChildByName` finds nothing there.
 *
 * `furni_view` has no `description_text`, so `set description` finds nothing and Flash shows no
 * description; neither does this. The `rarity_item_overlay_widget` (`rarity_item_overlay_preview`)
 * is not drawn: the theme has no such widget, and its container stays hidden.
 */
export const InfostandFurniView = ({ details, canMove, canRotate, canUse, canWiredInspect, pickupMode, canSaveBranding, buttonsVisible, onMove, onRotate, onPickup, onUse, onWiredInspect, onPlaceMore, onBuy, onRent, onExtend, onBuyout, onOpenOwner, onOpenGroup, onSaveBranding, onSetCustomVariables, onClose }: InfostandFurniViewProps) => {
    const t = useTranslation();
    const groupBadgeUrl = useConfigValue<string>('badge.asset.group.url') ?? '';
    const { texture, height } = useFurnitureImageTexture(details.className, details.colorIndex, 2, RoomGeometryScaleType.ZoomedIn);
    const template = useTemplate(VARIANT_TEMPLATES[details.variant]);
    const brandingTemplate = useTemplate(BRANDING_ELEMENT_TEMPLATE);
    // Branding and custom variable edits are kept per furni id, so another furni starts from its own values.
    const [ branding, setBranding ] = useState<{ id: number; values: { key: string; value: string }[] } | undefined>(undefined);
    const [ customValues, setCustomValues ] = useState<{ id: number; values: Record<string, string> } | undefined>(undefined);
    // `onOwnerRegion`: `owner_link` is icon style 21, and 22 while the pointer is over the region.
    const [ ownerHovered, setOwnerHovered ] = useState(false);

    const staffId = details.staffDetails?.id ?? -1;
    const brandingValues = (details.staffDetails && (branding?.id === staffId)) ? branding.values : (details.staffDetails?.branding ?? []);
    const editedValues = (customValues?.id === staffId) ? customValues.values : {};
    const customVariables = (details.customVariables ?? []).map(variable => ({ name: variable.name, value: editedValues[variable.name] ?? variable.value }));
    const colors = KIND_COLORS[details.ownerKind];
    const imageHeight = texture ? Math.min(height, MAX_IMAGE_HEIGHT) : NO_IMAGE_HEIGHT;
    // `setOwnerInfo`: a builders club or temporary furni always names its catalogue; no owner hides the region.
    const showsOwner = (details.ownerKind !== 'user') || (details.ownerId !== 0);
    const ownerName = (details.ownerKind === 'builders_club')
        ? t('builder.catalog.title')
        : ((details.ownerKind === 'temporary') ? t('temp.catalog.title') : details.ownerName);
    // `updatePurchaseButtonVisibility`: the row shows when any of its buttons does.
    const showsPurchaseButtons = details.canPlaceMore || details.canBuy || details.canRent || details.canExtend || details.canBuyout;
    const isStaff = !!details.staffDetails;
    const hasBranding = isStaff && !!brandingValues.length;

    // `variable_list`'s first row is the prototype `createWindow` takes out; `updateCustomVarsWindow` clones it per variable.
    const variableRow = template ? findTemplateChild(template.elements, 'variable_list')?.children[0] : undefined;
    const variableItems: TemplateItem[] = variableRow
        ? customVariables.map(variable => ({
                key: variable.name,
                from: variableRow,
                bindings: {
                    name: { caption: variable.name },
                    value: {
                        caption: variable.value,
                        onChange: value => setCustomValues({ id: staffId, values: { ...editedValues, [variable.name]: value } }),
                    },
                },
            }))
        : [];

    // `showAdFurnitureDetails` -> `createAdElement`: a `furni_view_branding_element` per key, added to the list.
    const brandingItems: TemplateItem[] = (brandingTemplate && hasBranding)
        ? brandingValues.map((entry, index) => ({
                key: `branding_${entry.key}`,
                from: brandingTemplate,
                bindings: {
                    element_name: { caption: entry.key },
                    element_value: {
                        caption: entry.value,
                        onChange: value => setBranding({ id: staffId, values: brandingValues.map((other, i) => ((i === index) ? { ...other, value } : other)) }),
                    },
                },
            }))
        : [];

    const track = details.jukebox
        ? { name: details.jukebox.playing ? details.jukebox.songName : '', creator: details.jukebox.playing ? details.jukebox.creator : '' }
        : (details.songDisk ? { name: details.songDisk.songName, creator: details.songDisk.creator } : undefined);

    const bindings: TemplateBindings = {
        info_border: { color: colors.border },
        'info_border/#close': { onPointerTap: onClose },
        name_text: { caption: details.name },
        // `showChestData`: a chest's own name, its wired lock and its contents.
        name_extra_text: { visible: !!details.chest?.name.length, caption: details.chest?.name ?? '' },
        wired_chest_elements: { visible: !!details.chest?.isWiredEnabled },
        locked_icon: { visible: !!details.chest?.isLocked },
        chest_item_count: {
            visible: !!details.chest,
            caption: details.chest ? t(details.chest.isCoins ? 'infostand.chest_contents.coin' : 'infostand.chest_contents.furni', '', { amount: details.chest.contents }) : '',
        },
        image: {
            children: texture && (
                <ThemeImage
                    texture={texture}
                    bitmap={{ pivot: 'center', stretchedX: false, stretchedY: false }}
                    layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
                />
            ),
        },
        // `showLimitedItem`: the glass case round the picture, and the plaque over it.
        unique_item_background_container: { visible: !!details.uniqueSerial },
        unique_item_overlay_container: { visible: !!details.uniqueSerial },
        unique_item_plaque_widget: {
            children: details.uniqueSerial && (
                <LimitedItemPreviewOverlayView
                    serialNumber={details.uniqueSerial.number}
                    seriesSize={details.uniqueSerial.series}
                    layout={{ left: 0, top: 0 }}
                />
            ),
        },
        rarity_item_overlay_container: { visible: false },
        nft_indicator: { visible: details.isNft },
        nft_icon: { asset: LayoutImage('habbo-room-ui-com/icon_nft.png') },
        owner_spacer: { visible: showsOwner },
        owner_region: {
            visible: showsOwner,
            tooltip: (details.ownerKind === 'user') ? t('infostand.profile.link.tooltip') : '',
            onPointerTap: onOpenOwner,
            onPointerOver: () => setOwnerHovered(true),
            onPointerOut: () => setOwnerHovered(false),
        },
        owner_link: { visible: details.ownerKind === 'user', style: ownerHovered ? '22' : '21' },
        bcw_icon: { visible: details.ownerKind === 'builders_club' },
        temp_icon: { visible: details.ownerKind === 'temporary' },
        owner_name: { caption: ownerName },
        // `showGroupInfo`: the badge and the name show once the group's details are in.
        group_details_spacer: { visible: !!details.group },
        group_details_container: { visible: !!details.group, onPointerTap: onOpenGroup },
        group_badge_image: { visible: !!details.group?.badge.length, asset: details.group?.badge.length ? groupBadgeUrl.replace('%badgedata%', details.group.badge) : undefined },
        group_name: { visible: !!details.group?.name.length, caption: details.group?.name ?? '' },
        // `set expiration`: your own running rental.
        expiration_text: {
            visible: details.expiration >= 0,
            caption: t('infostand.rent.expiration', '', { time: GetFriendlyTime(t, Math.max(0, details.expiration)) }),
        },
        purchase_buttons: { visible: showsPurchaseButtons },
        bc_place_button: { visible: details.canPlaceMore, onPointerTap: onPlaceMore },
        catalog_button: { visible: details.canBuy, onPointerTap: onBuy },
        rent_button: { visible: details.canRent, onPointerTap: onRent },
        extend_button: { visible: details.canExtend, onPointerTap: onExtend },
        buyout_button: { visible: details.canBuyout, onPointerTap: onBuyout },
        // `showAdFurnitureDetails`: staff see the furni's id and its branding keys.
        furni_details_spacer: { visible: isStaff },
        furni_details_text: { visible: isStaff, caption: `id: ${staffId}` },
        infostand_element_list: { added: brandingItems },
        custom_variables: { visible: !!customVariables.length },
        variable_list: { items: variableItems },
        set_values: { onPointerTap: () => onSetCustomVariables(customVariables) },
        button_list: { visible: buttonsVisible },
        move: { visible: canMove, onPointerTap: onMove },
        rotate: { visible: canRotate, onPointerTap: onRotate },
        // `localizePickupButton`: eject someone else's furni.
        pickup: { visible: pickupMode !== PICKUP_NONE, caption: t((pickupMode === PICKUP_FULL) ? 'infostand.button.pickup' : 'infostand.button.eject'), onPointerTap: onPickup },
        save_branding_configuration: { visible: canSaveBranding && hasBranding, onPointerTap: () => onSaveBranding(brandingValues) },
        use: { visible: canUse, onPointerTap: onUse },
        wired_inspect: { visible: canWiredInspect, onPointerTap: onWiredInspect },
        // The crackable's hits, and the jukebox's and the song disk's track (`set trackName` / `set authorName`).
        hits_remaining: { visible: !!details.crackable, caption: details.crackable ? t('infostand.crackable_furni.hits_remaining', '', { hits: String(details.crackable.hits), target: String(details.crackable.target) }) : '' },
        now_playing_text: { caption: t(details.jukebox?.playing ? 'infostand.jukebox.text.now.playing' : 'infostand.jukebox.text.not.playing') },
        icon_disc: { asset: LayoutImage('habbo-room-ui-com/jb_icon_disc.png') },
        icon_composer: { asset: LayoutImage('habbo-room-ui-com/jb_icon_composer.png') },
        ...(track && {
            track_name_text: { caption: track.name },
            track_creator_text: { caption: track.creator },
        }),
    };

    for (const spacer of SPACERS) bindings[spacer] = { ...bindings[spacer], color: colors.spacer };

    // A variant's layout lacks some of these windows; the code's `findChildByName` finds nothing there and does nothing.
    const elements = template?.elements ?? [];
    const layoutBindings = Object.fromEntries(Object.entries(bindings).filter(([ key ]) => key.includes('/') || !!findTemplateChild(elements, key)));

    // `set name`, `setImage`, `set isNft`, the track setters, then `updateWindow`.
    const arrange = ({ find, root }: TemplateWindows) => {
        const fitText = (key: string) => {
            const text = find(key);

            text?.setHeight(text.textHeight + 5);
        };

        fitText('name_text');

        if (track) {
            fitText('track_name_text');
            fitText('track_creator_text');
        }

        find('image')?.setHeight(imageHeight);
        find('nft_indicator')?.setHeight(details.isNft ? NFT_INDICATOR_HEIGHT : 0);

        const window = root();
        const border = find('info_border');
        const list = find('infostand_element_list');
        const buttonList = find('button_list');

        if (!window || !border || !list || !buttonList) return;

        buttonList.setWidth(buttonList.scrollableRegion.width);
        list.setHeight(list.scrollableRegion.height);
        border.setHeight(list.height + 20);
        window.setWidth(Math.max(border.width, buttonList.width));
        window.setHeight(window.scrollableRegion.height);

        if (border.width < buttonList.width) {
            border.setX(window.width - border.width);
            buttonList.setX(0);
        } else {
            buttonList.setX(window.width - buttonList.width);
            border.setX(0);
        }

        find('custom_variables')?.setX(border.x);
    };

    return (
        <TemplateWindow
            id={VARIANT_TEMPLATES[details.variant]}
            bindings={layoutBindings}
            arrange={arrange}
        />
    );
};
