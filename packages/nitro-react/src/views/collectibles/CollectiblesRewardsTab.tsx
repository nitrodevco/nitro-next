/**
 * The rewards tab - `tabs/RewardClaimsTab` in `rewardsContainer` of `collectible_view.xml`: while
 * the wallets' claims are being asked for, `loading_contents`; then `loaded_content` - the claims
 * in `itemlist`, one `item_template` each (`renderer/RewardCollectibleItemRenderer`), and the
 * "claim all" button - or, with nothing to claim, `no_content_container`'s Frank.
 *
 * Each claim shows the item's icon and name, how many are left to claim (`x<limit - claimed>`),
 * its collection (`collectibles.set.<setId>`), its expiry (`dd/MM/yyyy` of `validTo`) and the
 * wallet it is for; the renderer colours its border as it is hovered. The layout's
 * `pet_image_widget` is a `badge_image` widget, so a pet claim shows no image - as in Flash.
 */
import type { INftClaim } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { claimAllRewards, getCollectiblePreviewIcon, getCollectibleProductName } from '#base/commands';
import { formatCollectiblesDate, useCollectiblesStore, wrapBaseItem } from '#base/context/collectibles';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { Border, Button, LayoutImage, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

import { getCollectibleItemColoring, toCollectiblesCssColor } from './collectiblesColors';
import { CollectiblesLoadingView } from './CollectiblesLoadingView';
import { CollectiblesProductPreview } from './CollectiblesProductPreview';

/** One claim's `item_template`. */
const CollectiblesRewardItem = ({ claim }: { claim: INftClaim }) => {
    const t = useTranslation();
    const [ hovered, setHovered ] = useState(false);
    const info = wrapBaseItem(claim.claimItem);
    const [ background, outline ] = getCollectibleItemColoring(false, hovered, false);
    const collectionName = t(`collectibles.set.${claim.claimItem.setId}`, '');

    return (
        <Region
            name="item_template"
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            cursor="pointer"
            layout={{ width: 466, height: 50, flexShrink: 0 }}
        >
            <Border
                variant="2"
                tintColor="#a1a19b"
                layout={{ position: 'absolute', left: 0, width: 466, top: 0, height: 50 }}
            >
                <Border
                    variant="3"
                    name="border_outline"
                    tintColor={toCollectiblesCssColor(outline)}
                    layout={{ position: 'absolute', left: 0, width: 466, top: 0, height: 50 }}
                >
                    <Border
                        variant="3"
                        name="border_background"
                        tintColor={toCollectiblesCssColor(background)}
                        layout={{ position: 'absolute', left: 1, width: 464, top: 1, height: 48 }}
                    />
                </Border>
            </Border>
            <Border
                variant="3"
                name="item_border"
                tintColor="#8f9db1"
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
            >
                <Border
                    variant="3"
                    tintColor="#c8cdd3"
                    layout={{ position: 'absolute', left: 1, width: 48, top: 1, height: 48 }}
                />
            </Border>
            <Border
                variant="3"
                name="name_border"
                tintColor="#8f9db1"
                layout={{ position: 'absolute', left: 54, width: 408, top: 4, height: 16 }}
            >
                <ThemeText
                    text={getCollectibleProductName(info)}
                    textStyle="u_bold"
                    textOptions={{ fill: '#ffffff' }}
                    clip
                    name="item_name"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 1, width: 405, top: 0, height: 14 }}
                />
            </Border>
            <CollectiblesProductPreview
                preview={getCollectiblePreviewIcon(info)}
                slots={{
                    productPreview: { left: 10, top: 9, width: 32, height: 32 },
                    badge: { left: 10, top: 9, width: 32, height: 32, zoom: 1 },
                    unknown: { left: 10, top: 9, width: 32, height: 32, src: LayoutImage('catalog/avatar_editor_avatar_editor_download_icon.png'), stretched: false },
                }}
            />
            <ThemeText
                text={claim.wallet}
                textStyle="u_regular"
                textOptions={{ fill: '#8f9db1', fontSize: 10, align: 'right' }}
                name="wallet_text"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 204, width: 260, top: 34 }}
            />
            <ThemeText
                text={`<b>${t('collectibles.claim.collection', '')}</b> ${collectionName}`}
                textStyle="u_regular"
                textOptions={{ fontSize: 10 }}
                markup
                clip
                name="collection_text"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 52, width: 340, top: 20, height: 14 }}
            />
            <ThemeText
                text={`<b>${t('collectibles.claim.expiration', '')}</b> ${formatCollectiblesDate(claim.validTo)}`}
                textStyle="u_regular"
                textOptions={{ fontSize: 10 }}
                markup
                clip
                name="expires_text"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 52, width: 340, top: 33, height: 14 }}
            />
            <Region
                name="amount_container"
                layout={{ position: 'absolute', left: 27, width: 20, top: 34, height: 16 }}
            >
                <Border
                    variant="3"
                    tintColor="#8f9db1"
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 14 }}
                />
                <ThemeText
                    text={`x${claim.claimLimit - claim.claimedAmount}`}
                    textStyle="u_regular"
                    textOptions={{ fill: '#ffffff', fontSize: 10, align: 'center' }}
                    name="amount_text"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0 }}
                />
            </Region>
        </Region>
    );
};

export const CollectiblesRewardsTab = () => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const ready = useCollectiblesStore(x => x.claimsReady);
    const claims = useCollectiblesStore(x => x.claims);
    const buttonEnabled = useCollectiblesStore(x => x.claimsButtonEnabled);
    const hasClaims = claims.length > 0;

    return (
        <Region
            name="rewardsContainer"
            layout={{ position: 'absolute', left: 0, width: 485, top: 125, height: 429 }}
        >
            {ready && hasClaims && (
                <Region
                    name="loaded_content"
                    layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429, overflow: 'hidden' }}
                >
                    <Region
                        name="item_container"
                        layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 374 }}
                    >
                        <ScrollArea
                            orientation="vertical"
                            variant="3"
                            layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 374 }}
                        >
                            <Region
                                name="itemlist"
                                layout={{ flexDirection: 'column', gap: 2, width: '100%' }}
                            >
                                {claims.map(claim => (
                                    <CollectiblesRewardItem
                                        key={`${claim.wallet}:${claim.claimId}`}
                                        claim={claim}
                                    />
                                ))}
                            </Region>
                        </ScrollArea>
                    </Region>
                    <Border
                        variant="3"
                        name="bottom_container"
                        tintColor="#bac3cd"
                        layout={{ position: 'absolute', left: 0, width: 486, top: 380, height: 50 }}
                    >
                        <Button
                            variant="5"
                            name="claim_button"
                            tintColor="#2095d4"
                            disabled={!buttonEnabled}
                            onPointerTap={() => claimAllRewards(send)}
                            layout={{ position: 'absolute', left: 180, width: 137, top: 10, height: 30, minWidth: 100 }}
                        >
                            {t('collectibles.claim_all')}
                        </Button>
                    </Border>
                </Region>
            )}
            {ready && !hasClaims && (
                <Region
                    name="no_content_container"
                    layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429, overflow: 'hidden' }}
                >
                    <Region
                        name="headercontainer"
                        layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 100 }}
                    >
                        <ThemeText
                            text={t('collectibles.no_claims')}
                            textStyle="u_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 446, align: 'center' }}
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 19, width: 450, top: 28, minWidth: 450, maxWidth: 450, minHeight: 17, maxHeight: 200 }}
                        />
                    </Region>
                    <Region
                        name="image_container"
                        layout={{ position: 'absolute', left: 0, width: 485, top: 100, height: 332 }}
                    >
                        <ThemeImage
                            src={LayoutImage('catalog/image_frank_dont_know.png')}
                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                            layout={{ position: 'absolute', left: 0, width: 485, top: 50, height: 176 }}
                        />
                    </Region>
                </Region>
            )}
            {!ready && <CollectiblesLoadingView />}
        </Region>
    );
};
