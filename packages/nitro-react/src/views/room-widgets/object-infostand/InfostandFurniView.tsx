import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { ReactNode, useState } from 'react';

import { useConfigValue, useTranslation } from '#base/context/system';
import { Border, Box, Button, CloseButton, ContainerButton, Icon, LayoutImage, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { GetFriendlyTime } from '#base/utils';

import { useFurnitureImageTexture } from '../../catalog/useFurnitureImageTexture';
import { InfostandBadgeView } from './InfostandBadgeView';
import { UniqueItemPlaqueView } from './UniqueItemPlaqueView';

/** `PickupMode` values the pickup button reads. */
const PICKUP_NONE = 0;
const PICKUP_FULL = 2;

/** Every row of `infostand_element_list` is this wide; its `spacing` is 5. */
const LIST_WIDTH = 170;

/** `setImage`: the picture's window is at most this high, and `height_min` keeps it at least 45. */
const MAX_IMAGE_HEIGHT = 200;
const MIN_IMAGE_HEIGHT = 45;

/**
 * `InfoStandFurniView.update`: the border's `color` and the spacers' by who the furni belongs to -
 * a Builders Club furni, a temporary one, or anyone's.
 */
const KIND_COLORS = {
    builders_club: { border: '#331c00', spacer: '#543d18' },
    temporary: { border: '#142b44', spacer: '#2f4c6b' },
    user: { border: '#3d3d3d', spacer: '#333333' },
};

/** Everything the furni infostand shows, worked out by its component. */
export interface InfostandFurniDetails {
    name: string;
    description: string;
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
    customVariables: { name: string; value: string }[];
    /** Staff see the object id and a branded furni's settings. */
    staffDetails: { id: number; branding: { key: string; value: string }[] } | undefined;
    crackable: { hits: number; target: number } | undefined;
    jukebox: { playing: boolean; songName: string; creator: string } | undefined;
    songDisk: { songName: string; creator: string } | undefined;
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
    onMove: () => void;
    onRotate: () => void;
    onPickup: () => void;
    onUse: () => void;
    onWiredInspect: () => void;
    onBuy: () => void;
    onRent: () => void;
    /** `onExtendButtonClicked` / `onBuyoutButtonClicked`: the rent confirmation (`HabboCatalog.openRentConfirmationWindow`). */
    onExtend: () => void;
    onBuyout: () => void;
    onOpenOwner: () => void;
    onOpenGroup: () => void;
    onSaveBranding: (values: { key: string; value: string }[]) => void;
    onClose: () => void;
}

/** A white `word_wrap` text of the list, `textHeight + 5` high - the bitmap and one pixel. */
const ListText = ({ text, bold = false, name }: { text: string; bold?: boolean; name?: string }) => (
    <ThemeText
        text={text}
        textOptions={{ fill: '#ffffff', fontFamily: bold ? 'VolterBold' : undefined, wordWrap: true, wordWrapWidth: LIST_WIDTH - 4 }}
        flashFormat={{ antiAliasType: 'advanced' }}
        name={name}
        verticalAlign="top"
        layout={{ marginBottom: 1, flexShrink: 0 }}
    />
);

/**
 * The furniture infostand - `InfoStandFurniView` on the `furni_view` layout: the name (and a
 * chest's own name), the picture - in its glass case for a limited edition - with the NFT mark,
 * who owns it and which group it belongs to, the rent expiry, the catalogue buttons, the staff
 * details, the `custom_variables` panel and the move / rotate / pick up / branding / use / wired
 * inspect row underneath.
 *
 * The rows are `infostand_element_list` (an `itemlist` at 10,10, `spacing` 5) and the border is
 * that list's height plus 20 (`updateWindow`), so the list is a column here. The picture's
 * window is its height (at most 200, at least 45) and, through `reflect_vertical_resize_to_parent`,
 * the `image_container` is that plus 10 - the glass case's pieces stretch or stay at its bottom
 * with it.
 *
 * `furni_view` has no `description_text`, so `set description` finds nothing and Flash shows no
 * description; neither does this. What the port does not draw, and why:
 * - `bc_place_button` of `purchase_buttons`, and the `custom_variables` panel's `set_values`:
 *   the port has no command behind them;
 * - `rarity_item_overlay_widget`: the theme has no `rarity_item_overlay_preview` widget;
 * - the crackable, jukebox and song disk lines come from `InfoStandCrackableFurniView`,
 *   `InfoStandJukeboxView` and `InfoStandSongDiskView`, which have layouts of their own; here
 *   they are plain rows under the picture.
 */
export const InfostandFurniView = ({ details, canMove, canRotate, canUse, canWiredInspect, pickupMode, canSaveBranding, onMove, onRotate, onPickup, onUse, onWiredInspect, onBuy, onRent, onExtend, onBuyout, onOpenOwner, onOpenGroup, onSaveBranding, onClose }: InfostandFurniViewProps) => {
    const t = useTranslation();
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const { texture, height } = useFurnitureImageTexture(details.className, details.colorIndex, 2, RoomGeometryScaleType.ZoomedIn);
    // Branding edits are kept per staff details id, so another furni starts from its own values.
    const [ branding, setBranding ] = useState<{ id: number; values: { key: string; value: string }[] } | undefined>(undefined);
    // `onOwnerRegion`: `owner_link` is icon style 21, and 22 while the pointer is over the region.
    const [ ownerHovered, setOwnerHovered ] = useState(false);

    const brandingValues = (details.staffDetails && (branding?.id === details.staffDetails.id)) ? branding.values : (details.staffDetails?.branding ?? []);
    // `update`: `button_list.visible = move || rotate || pickupMode != 0 || use`.
    const hasButtons = canMove || canRotate || (pickupMode !== PICKUP_NONE) || canUse;
    const colors = KIND_COLORS[details.ownerKind];
    // `setImage`: no picture is a 40-high blank, and `height_min` lifts that to 45.
    const imageHeight = Math.max(MIN_IMAGE_HEIGHT, Math.min(texture ? height : 40, MAX_IMAGE_HEIGHT));
    const containerHeight = imageHeight + 10;

    const spacer = (
        <Region
            backgroundColor={colors.spacer}
            layout={{ width: LIST_WIDTH, height: 1, flexShrink: 0 }}
        />
    );

    const ownerName = (details.ownerKind === 'builders_club')
        ? t('builder.catalog.title')
        : ((details.ownerKind === 'temporary') ? t('temp.catalog.title') : details.ownerName);

    const purchaseButtons: ReactNode[] = [];

    if (details.canBuy) {
        purchaseButtons.push(
            // `catalog_button`: its `itemlist_horizontal` at x 2 widens the button with its text.
            <ContainerButton
                key="catalog_button"
                variant="0"
                name="catalog_button"
                onPointerTap={onBuy}
                layout={{ height: 23, flexShrink: 0, flexDirection: 'row', paddingLeft: 2, paddingRight: 6 }}
            >
                <ThemeImage
                    name="icon"
                    src={LayoutImage('room-ui/infostand_furni_shop.png')}
                    bitmap={{ pivot: 'center', stretchedX: false, stretchedY: false }}
                    layout={{ width: 20, height: 18, marginTop: 3, flexShrink: 0 }}
                />
                <ThemeText
                    text={t('infostand.button.buy')}
                    textStyle="regular"
                    flashFormat={{ antiAliasType: 'advanced' }}
                    verticalAlign="top"
                    layout={{ marginTop: 4, flexShrink: 0 }}
                />
            </ContainerButton>,
        );
    }

    if (details.canRent) {
        purchaseButtons.push(
            <Button
                key="rent_button"
                variant="0"
                name="rent_button"
                onPointerTap={onRent}
                layout={{ height: 23, flexShrink: 0 }}
            >
                {t('infostand.button.rent')}
            </Button>,
        );
    }

    if (details.canExtend) {
        purchaseButtons.push(
            <Button
                key="extend_button"
                variant="0"
                name="extend_button"
                onPointerTap={onExtend}
                layout={{ height: 23, flexShrink: 0 }}
            >
                {t('infostand.button.extend')}
            </Button>,
        );
    }

    if (details.canBuyout) {
        purchaseButtons.push(
            <Button
                key="buyout_button"
                variant="0"
                name="buyout_button"
                onPointerTap={onBuyout}
                layout={{ height: 23, flexShrink: 0 }}
            >
                {t('infostand.button.buyout')}
            </Button>,
        );
    }

    return (
        <Box layout={{ flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
            <Border
                variant="2"
                name="info_border"
                tintColor={colors.border}
                layout={{ width: 190, flexShrink: 0, paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }}
            >
                <CloseButton
                    variant="1"
                    onPointerTap={onClose}
                    layout={{ position: 'absolute', left: 168, top: 6, width: 18, height: 16 }}
                />
                <Box layout={{ flexDirection: 'column', width: LIST_WIDTH, gap: 5 }}>
                    <ThemeText
                        text={details.name}
                        textOptions={{ fill: '#ffffff', fontFamily: 'VolterBold', wordWrap: true, wordWrapWidth: 155 }}
                        flashFormat={{ antiAliasType: 'advanced' }}
                        name="name_text"
                        verticalAlign="top"
                        layout={{ width: 159, marginBottom: 1, flexShrink: 0 }}
                    />
                    {!!details.chest?.name.length && (
                        <ThemeText
                            text={details.chest.name}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 155 }}
                            flashFormat={{ antiAliasType: 'advanced' }}
                            name="name_extra_text"
                            clip
                            verticalAlign="top"
                            layout={{ width: 159, height: 12, flexShrink: 0 }}
                        />
                    )}
                    {spacer}
                    {details.chest?.isWiredEnabled && (
                        <Box layout={{ flexDirection: 'row', height: 15, marginLeft: 137, gap: 3, flexShrink: 0 }}>
                            {details.chest.isLocked && (
                                <ThemeImage
                                    name="locked_icon"
                                    src={LayoutImage('shared/forum_forum_locked.png')}
                                    bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                                    layout={{ marginTop: -3, flexShrink: 0 }}
                                />
                            )}
                            <ThemeImage
                                name="wired_icon"
                                src={`${imageLibraryUrl}catalogue/icon_80.png`}
                                bitmap={{ pivot: 'center', stretchedX: false, stretchedY: false }}
                                layout={{ width: 15, height: 15, flexShrink: 0 }}
                            />
                        </Box>
                    )}
                    <Box layout={{ width: LIST_WIDTH, height: containerHeight, flexShrink: 0 }}>
                        {details.uniqueSerial && (
                            <>
                                <ThemeImage
                                    src={LayoutImage('room-ui/unique_item_large_iron.png')}
                                    bitmap={{ stretchedX: false, stretchedY: false }}
                                    layout={{ position: 'absolute', left: 8, top: -1, width: 5, height: 9 }}
                                />
                                <ThemeImage
                                    src={LayoutImage('room-ui/unique_item_large_iron.png')}
                                    bitmap={{ stretchedX: false, stretchedY: false }}
                                    layout={{ position: 'absolute', left: 155, top: -1, width: 5, height: 9 }}
                                />
                                <ThemeImage
                                    src={LayoutImage('room-ui/unique_item_large_glass_mid.png')}
                                    bitmap={{}}
                                    layout={{ position: 'absolute', left: 0, top: 5, width: LIST_WIDTH, height: containerHeight - 10 }}
                                />
                                <ThemeImage
                                    src={LayoutImage('room-ui/unique_item_large_glass_top.png')}
                                    bitmap={{}}
                                    layout={{ position: 'absolute', left: 0, top: 0, width: LIST_WIDTH, height: 5 }}
                                />
                                <ThemeImage
                                    src={LayoutImage('room-ui/unique_item_large_glass_bottom.png')}
                                    bitmap={{}}
                                    layout={{ position: 'absolute', left: 0, top: containerHeight - 5, width: LIST_WIDTH, height: 5 }}
                                />
                                <ThemeImage
                                    src={LayoutImage('room-ui/unique_item_large_iron.png')}
                                    bitmap={{ stretchedX: false, stretchedY: false }}
                                    layout={{ position: 'absolute', left: 8, top: containerHeight - 7, width: 5, height: 9 }}
                                />
                                <ThemeImage
                                    src={LayoutImage('room-ui/unique_item_large_iron.png')}
                                    bitmap={{ stretchedX: false, stretchedY: false }}
                                    layout={{ position: 'absolute', left: 155, top: containerHeight - 7, width: 5, height: 9 }}
                                />
                            </>
                        )}
                        {texture && (
                            <ThemeImage
                                name="image"
                                texture={texture}
                                bitmap={{ pivot: 'center', stretchedX: false, stretchedY: false }}
                                layout={{ position: 'absolute', left: 5, top: 5, width: 140, height: imageHeight }}
                            />
                        )}
                        {details.uniqueSerial && (
                            <>
                                <ThemeImage
                                    src={LayoutImage('room-ui/unique_item_large_glass_shine.png')}
                                    bitmap={{}}
                                    layout={{ position: 'absolute', left: 0, top: 5, width: LIST_WIDTH, height: containerHeight - 10 }}
                                />
                                <UniqueItemPlaqueView
                                    serialNumber={details.uniqueSerial.number}
                                    seriesSize={details.uniqueSerial.series}
                                    layout={{ left: 128, top: 6 }}
                                />
                            </>
                        )}
                    </Box>
                    {details.isNft && (
                        // `set isNft`: `nft_indicator` is 22 high with the 18x18 `icon_nft` at its top left.
                        <Box layout={{ width: LIST_WIDTH, height: 22, flexShrink: 0 }}>
                            <ThemeImage
                                name="nft_icon"
                                src={LayoutImage('room-ui/icon_nft.png')}
                                bitmap={{ stretchedX: false, stretchedY: false }}
                                layout={{ position: 'absolute', left: 0, top: 0, width: 18, height: 18 }}
                            />
                        </Box>
                    )}
                    {details.crackable && (
                        <ListText text={t('infostand.crackable_furni.hits_remaining', '', { hits: String(details.crackable.hits), target: String(details.crackable.target) })} />
                    )}
                    {details.jukebox && (
                        <>
                            <ListText
                                text={t(details.jukebox.playing ? 'infostand.jukebox.text.now.playing' : 'infostand.jukebox.text.not.playing')}
                                bold
                            />
                            {details.jukebox.playing && !!details.jukebox.songName.length && <ListText text={details.jukebox.songName} />}
                            {details.jukebox.playing && !!details.jukebox.creator.length && <ListText text={details.jukebox.creator} />}
                        </>
                    )}
                    {details.songDisk && (
                        <>
                            {!!details.songDisk.songName.length && (
                                <ListText
                                    text={details.songDisk.songName}
                                    bold
                                />
                            )}
                            {!!details.songDisk.creator.length && <ListText text={details.songDisk.creator} />}
                        </>
                    )}
                    {(details.ownerId !== 0) && (
                        <>
                            {spacer}
                            <Region
                                tooltip={(details.ownerKind === 'user') ? t('infostand.profile.link.tooltip') : undefined}
                                tooltipDelay={100}
                                cursor={(details.ownerKind === 'user') ? 'pointer' : undefined}
                                onPointerTap={(details.ownerKind === 'user') ? onOpenOwner : undefined}
                                onPointerOver={() => setOwnerHovered(true)}
                                onPointerOut={() => setOwnerHovered(false)}
                                layout={{ width: LIST_WIDTH, height: 17, flexShrink: 0 }}
                            >
                                {(details.ownerKind === 'user') && (
                                    <Icon
                                        variant={ownerHovered ? 22 : 21}
                                        name="owner_link"
                                        layout={{ position: 'absolute', left: 0, top: 2 }}
                                    />
                                )}
                                {(details.ownerKind === 'builders_club') && (
                                    <ThemeImage
                                        name="bcw_icon"
                                        src={`${imageLibraryUrl}/catalogue/icon_193.png`}
                                        bitmap={{ fitSizeToContents: true }}
                                        layout={{ position: 'absolute', left: 0, top: 0 }}
                                    />
                                )}
                                <ThemeText
                                    text={ownerName}
                                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 146 }}
                                    flashFormat={{ antiAliasType: 'advanced' }}
                                    clip
                                    name="owner_name"
                                    verticalAlign="top"
                                    layout={{ position: 'absolute', left: 20, top: 0, width: 150, height: 15 }}
                                />
                                {(details.ownerKind === 'temporary') && (
                                    <ThemeImage
                                        name="temp_icon"
                                        src={`${imageLibraryUrl}catalogue/icon_80.png`}
                                        bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                                        layout={{ position: 'absolute', left: 0, top: 0 }}
                                    />
                                )}
                            </Region>
                        </>
                    )}
                    {details.group && (
                        <>
                            {spacer}
                            <Region
                                tooltip={t('infostand.group.link.tooltip')}
                                tooltipDelay={100}
                                cursor="pointer"
                                onPointerTap={onOpenGroup}
                                layout={{ width: LIST_WIDTH, height: 40, flexShrink: 0, overflow: 'hidden' }}
                            >
                                {!!details.group.badge.length && (
                                    <InfostandBadgeView
                                        code={details.group.badge}
                                        group
                                        layout={{ position: 'absolute', left: 0, top: 0, width: 40, height: 40 }}
                                    />
                                )}
                                {!!details.group.name.length && (
                                    <ThemeText
                                        text={details.group.name}
                                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 124 }}
                                        flashFormat={{ antiAliasType: 'advanced' }}
                                        clip
                                        name="group_name"
                                        verticalAlign="top"
                                        layout={{ position: 'absolute', left: 45, top: 10, width: 128, height: 37 }}
                                    />
                                )}
                            </Region>
                        </>
                    )}
                    {(details.expiration >= 0) && (
                        // `expiration_text`: 170x23, the text `margin_top` 6 down and cut at the field.
                        <Box layout={{ width: LIST_WIDTH, height: 23, flexShrink: 0, overflow: 'hidden' }}>
                            <ThemeText
                                text={t('infostand.rent.expiration', '', { time: GetFriendlyTime(t, details.expiration) })}
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: LIST_WIDTH - 4 }}
                                flashFormat={{ antiAliasType: 'advanced' }}
                                name="expiration_text"
                                verticalAlign="top"
                                layout={{ marginTop: 6 }}
                            />
                        </Box>
                    )}
                    {!!purchaseButtons.length && (
                        <Box layout={{ flexDirection: 'row', width: LIST_WIDTH, height: 23, gap: 5, flexShrink: 0, overflow: 'hidden' }}>
                            {purchaseButtons}
                        </Box>
                    )}
                    {details.staffDetails && spacer}
                    {details.chest && (
                        <ThemeText
                            text={t(details.chest.isCoins ? 'infostand.chest_contents.coin' : 'infostand.chest_contents.furni', '', { amount: details.chest.contents })}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: LIST_WIDTH - 4 }}
                            flashFormat={{ antiAliasType: 'advanced' }}
                            name="chest_item_count"
                            verticalAlign="top"
                            layout={{ flexShrink: 0 }}
                        />
                    )}
                    {details.staffDetails && (
                        <>
                            <ThemeText
                                text={`id: ${details.staffDetails.id}`}
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: LIST_WIDTH - 4 }}
                                flashFormat={{ antiAliasType: 'advanced' }}
                                name="furni_details_text"
                                verticalAlign="top"
                                layout={{ flexShrink: 0 }}
                            />
                            {brandingValues.map((entry, index) => (
                                // `createAdElement`: a `furni_view_branding_element` (180x65, a style 1 border) per key.
                                <Border
                                    key={entry.key}
                                    variant="1"
                                    name="element_border"
                                    layout={{ width: 180, height: 65, flexShrink: 0 }}
                                >
                                    <ThemeText
                                        text={entry.key}
                                        textOptions={{ fill: '#ffffff', fontFamily: 'VolterBold', wordWrap: true, wordWrapWidth: 156 }}
                                        clip
                                        name="element_name"
                                        verticalAlign="top"
                                        layout={{ position: 'absolute', left: 0, top: 0, width: 160, height: 12 }}
                                    />
                                    <TextInput
                                        value={entry.value}
                                        onChange={value => setBranding({ id: details.staffDetails!.id, values: brandingValues.map((other, i) => ((i === index) ? { ...other, value } : other)) })}
                                        textColor="#ffffff"
                                        flashPlacement
                                        border="#ffffff"
                                        alwaysShowSelection
                                        backgroundColor={null}
                                        focusedBackgroundColor={null}
                                        layout={{ position: 'absolute', left: 0, top: 13, width: 160, height: 40 }}
                                    />
                                </Border>
                            ))}
                        </>
                    )}
                </Box>
            </Border>
            {/* `createWindow` disposes `custom_variables` unless the user has security level 5 - the staff details' gate. */}
            {details.staffDetails && !!details.customVariables.length && (
                // `custom_variables`: a row of `variable_list` per variable, the panel growing with the list.
                <Border
                    variant="2"
                    name="custom_variables"
                    tintColor="#999999"
                    layout={{ width: 190, height: 36 + (26 * details.customVariables.length), flexShrink: 0 }}
                >
                    <Border
                        variant="3"
                        tintColor="#333333"
                        layout={{ position: 'absolute', left: 3, top: 3, width: 184, height: 30 + (26 * details.customVariables.length), overflow: 'hidden' }}
                    >
                        <Box layout={{ position: 'absolute', left: 0, top: 32, flexDirection: 'column' }}>
                            {details.customVariables.map(variable => (
                                <Box
                                    key={variable.name}
                                    layout={{ width: 183, height: 26, flexShrink: 0 }}
                                >
                                    <ThemeText
                                        text={variable.name}
                                        textOptions={{ fill: '#ffffff' }}
                                        name="name"
                                        verticalAlign="top"
                                        layout={{ position: 'absolute', left: 1, top: 2, width: 41, height: 17 }}
                                    />
                                    <TextInput
                                        value={variable.value}
                                        onChange={() => {}}
                                        editable={false}
                                        flashPlacement
                                        backgroundColor={null}
                                        focusedBackgroundColor={null}
                                        layout={{ position: 'absolute', left: 80, top: 2, width: 100, height: 17 }}
                                    />
                                    <Border
                                        variant="3"
                                        tintColor="#cccccc"
                                        layout={{ position: 'absolute', left: 80, top: 0, width: 100, height: 20 }}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Border>
                </Border>
            )}
            {hasButtons && (
                <Box layout={{ flexDirection: 'row', height: 25, gap: 10 }}>
                    {canMove && (
                        <Button
                            variant="1"
                            name="move"
                            onPointerTap={onMove}
                            layout={{ height: 25, flexShrink: 0 }}
                        >
                            {t('infostand.button.move')}
                        </Button>
                    )}
                    {canRotate && (
                        <Button
                            variant="1"
                            name="rotate"
                            onPointerTap={onRotate}
                            layout={{ height: 25, flexShrink: 0 }}
                        >
                            {t('infostand.button.rotate')}
                        </Button>
                    )}
                    {(pickupMode !== PICKUP_NONE) && (
                        <Button
                            variant="1"
                            name="pickup"
                            onPointerTap={onPickup}
                            layout={{ height: 25, flexShrink: 0 }}
                        >
                            {t((pickupMode === PICKUP_FULL) ? 'infostand.button.pickup' : 'infostand.button.eject')}
                        </Button>
                    )}
                    {canSaveBranding && !!brandingValues.length && (
                        <Button
                            variant="1"
                            name="save_branding_configuration"
                            onPointerTap={() => onSaveBranding(brandingValues)}
                            layout={{ height: 25, flexShrink: 0 }}
                        >
                            {t('infostand.button.savebranding')}
                        </Button>
                    )}
                    {canUse && (
                        <Button
                            variant="1"
                            name="use"
                            onPointerTap={onUse}
                            layout={{ height: 25, flexShrink: 0 }}
                        >
                            {t('infostand.button.use')}
                        </Button>
                    )}
                    {canWiredInspect && (
                        <Button
                            variant="1"
                            name="wired_inspect"
                            onPointerTap={onWiredInspect}
                            layout={{ height: 25, flexShrink: 0 }}
                        >
                            {t('infostand.button.wired_inspect')}
                        </Button>
                    )}
                </Box>
            )}
        </Box>
    );
};
