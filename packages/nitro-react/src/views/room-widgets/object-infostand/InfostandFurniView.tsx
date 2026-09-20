import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { Border, Box, Button, CloseButton, LayoutImage, Region, TextInput, TextStyleKey, ThemeImage, ThemeText } from '#base/theme';
import { GetFriendlyTime } from '#base/utils';

import { useFurnitureImageTexturePixi } from '../../catalog/useFurnitureImageTexturePixi';
import { InfostandBadgeView } from './InfostandBadgeView';
import { UniqueItemPlaqueView } from './UniqueItemPlaqueView';

/** `PickupMode` values the pickup button reads. */
const PICKUP_NONE = 0;
const PICKUP_FULL = 2;

const PANEL_WIDTH = 190;

/** `image_container`: the glass case a limited edition is shown in. */
const CASE_WIDTH = 170;
const CASE_HEIGHT = 130;

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
    chest: { name: string; contents: string; isCoins: boolean; isLocked: boolean } | undefined;
    customVariables: { name: string; value: string }[];
    /** Staff see the object id and a branded furni's settings. */
    staffDetails: { id: number; branding: { key: string; value: string }[] } | undefined;
    crackable: { hits: number; target: number } | undefined;
    jukebox: { playing: boolean; songName: string; creator: string } | undefined;
    songDisk: { songName: string; creator: string } | undefined;
    canBuy: boolean;
    canRent: boolean;
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
    onOpenOwner: () => void;
    onOpenGroup: () => void;
    onSaveBranding: (values: { key: string; value: string }[]) => void;
    onClose: () => void;
}

/**
 * The furniture infostand - `InfoStandFurniView` and the `infostand_furni_view` family of layouts:
 * the object's picture and texts, who owns it and which group it belongs to, the limited edition
 * plaque, chest contents, custom variables and staff details, the song a jukebox or disk carries,
 * the catalogue buttons, and the move / rotate / pick up / use / wired inspect row underneath.
 *
 * An NFT and a locked chest are marked by icons, not text: `InfoStandFurniView.isNft` fills the
 * layout's `nft_icon` with the `icon_nft` bitmap and `showChestData` shows `locked_icon`
 * (`forum_forum_locked`) beside the chest name; `furni_view` gives neither a caption.
 */
export const InfostandFurniView = ({ details, canMove, canRotate, canUse, canWiredInspect, pickupMode, canSaveBranding, onMove, onRotate, onPickup, onUse, onWiredInspect, onBuy, onRent, onOpenOwner, onOpenGroup, onSaveBranding, onClose }: InfostandFurniViewProps) => {
    const t = useTranslation();
    const { texture, width, height } = useFurnitureImageTexturePixi(details.className, details.colorIndex, 2, RoomGeometryScaleType.ZoomedIn);
    // In the case the picture must clear the plaque on the right and the glass edges.
    const caseScale = Math.min(1, (CASE_WIDTH - 30) / Math.max(1, width), (CASE_HEIGHT - 10) / Math.max(1, height));
    // Branding edits are kept per staff details id, so another furni starts from its own values.
    const [ branding, setBranding ] = useState<{ id: number; values: { key: string; value: string }[] } | undefined>(undefined);

    const brandingValues = (details.staffDetails && (branding?.id === details.staffDetails.id)) ? branding.values : (details.staffDetails?.branding ?? []);
    const hasButtons = canMove || canRotate || (pickupMode !== PICKUP_NONE) || canUse || canWiredInspect;

    const text = (value: string, style: TextStyleKey = 'text-style-regular', color: string = '#ffffff') => (
        <ThemeText
            text={value}
            textStyle={style}
            textOptions={{ fill: color, wordWrap: true, wordWrapWidth: PANEL_WIDTH - 20 }}
        />
    );

    const divider = (
        <Region
            backgroundColor="#383838"
            layout={{ width: '100%', height: 1 }}
        />
    );

    const ownerLabel = (details.ownerKind === 'builders_club')
        ? t('builder.catalog.title')
        : ((details.ownerKind === 'temporary') ? t('temp.catalog.title') : t('furni.owner', '', { name: details.ownerName }));

    return (
        <Box layout={{ flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            <Border
                variant="1"
                layout={{ flexDirection: 'column', minWidth: PANEL_WIDTH, maxWidth: PANEL_WIDTH, gap: 5, padding: 10 }}
            >
                <Box layout={{ flexDirection: 'row', alignItems: 'center', width: '100%', gap: 8 }}>
                    <Box layout={{ flexDirection: 'column', flex: 1 }}>
                        {text(details.name, 'text-style-button-bold')}
                    </Box>
                    <CloseButton
                        variant="1"
                        onPointerTap={onClose}
                        layout={{ flexShrink: 0 }}
                    />
                </Box>
                {details.isNft && (
                    <ThemeImage
                        src={LayoutImage('room-ui/icon_nft.png')}
                        name="nft_icon"
                        layout={{ width: 18, height: 18 }}
                    />
                )}
                {divider}
                {details.uniqueSerial
                    ? (
                        /* `showLimitedItem`: a limited edition sits in its glass case, plaque top right. */
                            <Region layout={{ width: CASE_WIDTH, height: CASE_HEIGHT, alignSelf: 'center' }}>
                                <ThemeImage
                                    src={LayoutImage('room-ui/unique_item_large_glass_top.png')}
                                    stretch
                                    layout={{ position: 'absolute', left: 0, top: 0, width: CASE_WIDTH, height: 5 }}
                                />
                                <ThemeImage
                                    src={LayoutImage('room-ui/unique_item_large_glass_mid.png')}
                                    stretch
                                    layout={{ position: 'absolute', left: 0, top: 5, width: CASE_WIDTH, height: CASE_HEIGHT - 10 }}
                                />
                                <ThemeImage
                                    src={LayoutImage('room-ui/unique_item_large_glass_bottom.png')}
                                    stretch
                                    layout={{ position: 'absolute', left: 0, bottom: 0, width: CASE_WIDTH, height: 5 }}
                                />
                                {[ { left: 8, top: -1 }, { left: 155, top: -1 }, { left: 8, bottom: -2 }, { left: 155, bottom: -2 } ].map((rivet, index) => (
                                    <ThemeImage
                                        key={index}
                                        src={LayoutImage('room-ui/unique_item_large_iron.png')}
                                        layout={{ position: 'absolute', width: 5, height: 9, ...rivet }}
                                    />
                                ))}
                                <Region layout={{ position: 'absolute', left: 5, top: 5, width: CASE_WIDTH - 30, height: CASE_HEIGHT - 10, alignItems: 'center', justifyContent: 'center' }}>
                                    {texture && (
                                        <pixiSprite
                                            texture={texture}
                                            layout={{ width: width * caseScale, height: height * caseScale }}
                                        />
                                    )}
                                </Region>
                                <ThemeImage
                                    src={LayoutImage('room-ui/unique_item_large_glass_shine.png')}
                                    stretch
                                    layout={{ position: 'absolute', left: 0, top: 5, width: CASE_WIDTH, height: CASE_HEIGHT - 10 }}
                                />
                                <UniqueItemPlaqueView
                                    serialNumber={details.uniqueSerial.number}
                                    seriesSize={details.uniqueSerial.series}
                                    layout={{ left: 128, top: 6 }}
                                />
                            </Region>
                        )
                    : (
                            <Box layout={{ flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center', paddingTop: 5, paddingBottom: 5 }}>
                                {texture && (
                                    <pixiSprite
                                        texture={texture}
                                        layout={{ width, height: Math.min(height, 200) }}
                                    />
                                )}
                            </Box>
                        )}
                {!!details.description.length && text(details.description)}
                {details.chest && (
                    <>
                        {divider}
                        <Box layout={{ flexDirection: 'row', alignItems: 'center', width: '100%', gap: 3 }}>
                            <Box layout={{ flexDirection: 'column', flex: 1 }}>
                                {text(details.chest.name, 'text-style-bold')}
                            </Box>
                            {details.chest.isLocked && (
                                <ThemeImage
                                    src={LayoutImage('shared/forum_forum_locked.png')}
                                    name="locked_icon"
                                    layout={{ width: 13, height: 18, flexShrink: 0 }}
                                />
                            )}
                        </Box>
                        {text(t(details.chest.isCoins ? 'infostand.chest_contents.coin' : 'infostand.chest_contents.furni', '', { amount: details.chest.contents }))}
                    </>
                )}
                {details.crackable && text(t('infostand.crackable_furni.hits_remaining', '', { hits: String(details.crackable.hits), target: String(details.crackable.target) }))}
                {details.jukebox && (
                    <>
                        {divider}
                        {text(t(details.jukebox.playing ? 'infostand.jukebox.text.now.playing' : 'infostand.jukebox.text.not.playing'), 'text-style-bold')}
                        {details.jukebox.playing && !!details.jukebox.songName.length && text(details.jukebox.songName)}
                        {details.jukebox.playing && !!details.jukebox.creator.length && text(details.jukebox.creator)}
                    </>
                )}
                {details.songDisk && (
                    <>
                        {divider}
                        {!!details.songDisk.songName.length && text(details.songDisk.songName, 'text-style-bold')}
                        {!!details.songDisk.creator.length && text(details.songDisk.creator)}
                    </>
                )}
                {divider}
                {(details.ownerId !== 0) && (
                    <Region
                        tooltip={(details.ownerKind === 'user') ? t('infostand.profile.link.tooltip') : undefined}
                        cursor={(details.ownerKind === 'user') ? 'pointer' : undefined}
                        onPointerTap={(details.ownerKind === 'user') ? onOpenOwner : undefined}
                        layout={{ flexDirection: 'row', width: '100%' }}
                    >
                        {text(ownerLabel, 'text-style-button-bold')}
                    </Region>
                )}
                {(details.expiration >= 0) && text(t('infostand.rent.expiration', '', { time: GetFriendlyTime(t, details.expiration) }))}
                {details.group && (
                    <Region
                        cursor="pointer"
                        onPointerTap={onOpenGroup}
                        layout={{ flexDirection: 'row', alignItems: 'center', gap: 6, width: '100%' }}
                    >
                        <InfostandBadgeView
                            code={details.group.badge}
                            group
                        />
                        <Box layout={{ flex: 1 }}>
                            {text(details.group.name, 'text-style-u-bold')}
                        </Box>
                    </Region>
                )}
                {!!details.customVariables.length && (
                    <>
                        {divider}
                        {details.customVariables.map(variable => (
                            <Box
                                key={variable.name}
                                layout={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}
                            >
                                {text(variable.name, 'text-style-bold')}
                                {text(variable.value)}
                            </Box>
                        ))}
                    </>
                )}
                {details.staffDetails && (
                    <>
                        {divider}
                        {text(`id: ${details.staffDetails.id}`)}
                        {brandingValues.map((entry, index) => (
                            <Box
                                key={entry.key}
                                layout={{ flexDirection: 'column', gap: 2, width: '100%' }}
                            >
                                {text(entry.key, 'text-style-bold')}
                                <TextInput
                                    value={entry.value}
                                    onChange={value => setBranding({ id: details.staffDetails!.id, values: brandingValues.map((other, i) => ((i === index) ? { ...other, value } : other)) })}
                                    layout={{ height: 20 }}
                                />
                            </Box>
                        ))}
                        {canSaveBranding && !!brandingValues.length && (
                            <Button
                                onPointerTap={() => onSaveBranding(brandingValues)}
                                layout={{ height: 22 }}
                            >
                                {t('save')}
                            </Button>
                        )}
                    </>
                )}
                {(details.canBuy || details.canRent) && (
                    <Box layout={{ flexDirection: 'row', width: '100%', gap: 4 }}>
                        {details.canBuy && (
                            <Button
                                onPointerTap={onBuy}
                                layout={{}}
                            >
                                {t('infostand.button.buy')}
                            </Button>
                        )}
                        {details.canRent && (
                            <Button
                                onPointerTap={onRent}
                                layout={{}}
                            >
                                {t('infostand.button.rent')}
                            </Button>
                        )}
                    </Box>
                )}
            </Border>
            {hasButtons && (
                <Box layout={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
                    {canMove && (
                        <Button
                            variant="1"
                            onPointerTap={onMove}
                            layout={{}}
                        >
                            {t('infostand.button.move')}
                        </Button>
                    )}
                    {canRotate && (
                        <Button
                            variant="1"
                            onPointerTap={onRotate}
                            layout={{}}
                        >
                            {t('infostand.button.rotate')}
                        </Button>
                    )}
                    {(pickupMode !== PICKUP_NONE) && (
                        <Button
                            variant="1"
                            onPointerTap={onPickup}
                            layout={{}}
                        >
                            {t((pickupMode === PICKUP_FULL) ? 'infostand.button.pickup' : 'infostand.button.eject')}
                        </Button>
                    )}
                    {canUse && (
                        <Button
                            variant="1"
                            onPointerTap={onUse}
                            layout={{}}
                        >
                            {t('infostand.button.use')}
                        </Button>
                    )}
                    {canWiredInspect && (
                        <Button
                            variant="1"
                            onPointerTap={onWiredInspect}
                            layout={{}}
                        >
                            {t('infostand.button.wired_inspect')}
                        </Button>
                    )}
                </Box>
            )}
        </Box>
    );
};
