import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { Border, Box, Button, CloseButton, Region, TextInput, TextStyleKey, ThemeText } from '#base/theme';
import { GetFriendlyTime } from '#base/utils';

import { useFurnitureImageTexturePixi } from '../../catalog/useFurnitureImageTexturePixi';
import { InfostandBadgeView } from './InfostandBadgeView';

/** `PickupMode` values the pickup button reads. */
const PICKUP_NONE = 0;
const PICKUP_FULL = 2;

const PANEL_WIDTH = 190;

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
    pickupMode: number;
    canSaveBranding: boolean;
    onMove: () => void;
    onRotate: () => void;
    onPickup: () => void;
    onUse: () => void;
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
 * the catalogue buttons, and the move / rotate / pick up / use row underneath.
 */
export const InfostandFurniView = ({ details, canMove, canRotate, canUse, pickupMode, canSaveBranding, onMove, onRotate, onPickup, onUse, onBuy, onRent, onOpenOwner, onOpenGroup, onSaveBranding, onClose }: InfostandFurniViewProps) => {
    const t = useTranslation();
    const { texture, width, height } = useFurnitureImageTexturePixi(details.className, details.colorIndex, 2, RoomGeometryScaleType.ZoomedIn);
    // Branding edits are kept per staff details id, so another furni starts from its own values.
    const [ branding, setBranding ] = useState<{ id: number; values: { key: string; value: string }[] } | undefined>(undefined);

    const brandingValues = (details.staffDetails && (branding?.id === details.staffDetails.id)) ? branding.values : (details.staffDetails?.branding ?? []);
    const hasButtons = canMove || canRotate || (pickupMode !== PICKUP_NONE) || canUse;

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
                {details.isNft && text(t('infostand.nft.indicator', 'NFT'), 'text-style-bold', '#ffd700')}
                {divider}
                <Box layout={{ flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center', paddingTop: 5, paddingBottom: 5 }}>
                    {texture && (
                        <pixiSprite
                            texture={texture}
                            layout={{ width, height: Math.min(height, 200) }}
                        />
                    )}
                    {details.uniqueSerial && (
                        <Border
                            variant="0"
                            tintColor="#1b1b1b"
                            layout={{ flexDirection: 'row', gap: 4, paddingLeft: 6, paddingRight: 6, paddingTop: 2, paddingBottom: 2, marginTop: 4 }}
                        >
                            {text(`#${details.uniqueSerial.number}`, 'text-style-bold')}
                            {text(`/ ${details.uniqueSerial.series}`)}
                        </Border>
                    )}
                </Box>
                {!!details.description.length && text(details.description)}
                {details.chest && (
                    <>
                        {divider}
                        {text(details.chest.name, 'text-style-bold')}
                        {text(t(details.chest.isCoins ? 'infostand.chest_contents.coin' : 'infostand.chest_contents.furni', '', { amount: details.chest.contents }))}
                        {details.chest.isLocked && text(t('infostand.chest.locked', 'Locked'))}
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
                </Box>
            )}
        </Box>
    );
};
