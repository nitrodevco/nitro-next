/**
 * `HabbiconView` - the habbicon hub, `habbicon_view.xml` (560x570, style 3, `#418db0`, content
 * margins 3,36,3,3): the `album_background`, the album header, the three tabs over a 1px white
 * `tabs_bg`, the all sets tab (the set rail and the selected set's page) or the tray of the owned /
 * favourited tab, and the item popup's layer over all of it.
 *
 * The album is `buildAlbumFromController` over the controller's shop data. How the hub follows the
 * controller's events (`onControllerDataUpdated`):
 * - a change naming a habbicon (`refreshChangedHabbicon`) refreshes the album in place, keeping
 *   the popup open on its tile in the all sets tab; in the other tabs it hides the popup and fills
 *   the tray again. A habbicon whose set the hub does not show yet rebuilds the whole album.
 * - any other change rebuilds the whole album while it has no sets, and otherwise only refreshes
 *   the progress (`refreshProgressFromController`) - so the rail keeps the sets it was built with.
 * - a whole rebuild (`refreshWholeAlbum`) hides the popup, rebuilds the rail and snaps every bar;
 *   the selected set is kept while it still exists, else the first set is selected.
 * Where Flash patched only the changed parts of the old model (and left the tiles of a bulk shop
 * refresh as they were), the hub here draws every part from the current data; the two agree once
 * each change has been applied.
 *
 * Flash builds the view once and keeps it; the store keeps its tab and set (`HabbiconHubSlice`).
 * Opening it again after it was closed starts from a whole rebuild, which is where a set added
 * while it was closed shows up at once rather than on the next rebuild.
 *
 * A tile click (`onTileClicked`) marks the tile active, asks for the habbicon's info when it is a
 * set habbicon the user neither owns nor can claim (`getHabbiconInfo`), and opens the popup on it.
 * The popup's action claims, favourites or unfavourites; its buy button opens the purchase
 * confirmation and hides the popup (`onPopupBuyClicked`).
 */
import { GetRenderer } from '@nitrodevco/nitro-renderer';
import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

import { claimHabbicon, favoriteHabbicon, getHabbiconInfo, openHabbiconPurchaseConfirmation, unfavoriteHabbicon } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { buildHabbiconAlbum, findHabbiconEntryByHabbiconId, findHabbiconSetByCollectionId, HabbiconAlbumModel, HabbiconEntryModel, HabbiconPopupMode, HabbiconPopupModeName, HabbiconSetModel, HabbiconTabMode, HabbiconTabModeName, hasHabbiconPrice, useHabbiconHubActions, useHabbiconsStore } from '#base/context/habbicons';
import { useTranslation } from '#base/context/system';
import { Border, Frame, getGlobalRect, Region, TabButton, TabContext } from '#base/theme';

import { HabbiconAlbumHeaderView } from './HabbiconAlbumHeaderView';
import { HabbiconCollectionTrayView } from './HabbiconCollectionTrayView';
import { getHabbiconPopupHeight, placeHabbiconPopup } from './habbiconPopupPlacement';
import { HabbiconPopupView } from './HabbiconPopupView';
import { HabbiconSetPageView } from './HabbiconSetPageView';
import { HabbiconSetRailView } from './HabbiconSetRailView';

/** The popup ignores presses this soon after it opened (`showForTile`'s `getTimer() + 75`). */
const POPUP_PRESS_GRACE_MS = 75;

interface HabbiconPopupState {
    /** The active tile's entry id. */
    tileId: string;
    /** The tile's rect relative to the popup layer, when it was clicked. */
    tile: { x: number; y: number; width: number; height: number };
    shownAt: number;
}

/** The entry a tile shows, by its id - a set's habbicons, then its reward. */
const findEntryById = (album: HabbiconAlbumModel, id: string): HabbiconEntryModel | undefined => {
    for (const set of album.sets) {
        const entry = set.habbicons.find(habbicon => habbicon.id === id) ?? ((set.rewardHabbicon?.id === id) ? set.rewardHabbicon : undefined);

        if (entry) return entry;
    }

    return undefined;
};

/** Screen coordinates of a press, in the canvas's space - as `useOutsideClick` converts them. */
const canvasPoint = (event: PointerEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();

    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
};

export const HabbiconView = ({ onClose }: { onClose: () => void }) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const tab = useHabbiconsStore(x => x.hubTab);
    const collectionId = useHabbiconsStore(x => x.hubCollectionId);
    const collections = useHabbiconsStore(x => x.shopCollections);
    const nameKeys = useHabbiconsStore(x => x.nameKeys);
    const collectionIcons = useHabbiconsStore(x => x.collectionIcons);
    const change = useHabbiconsStore(x => x.change);
    const { setHubTab, setHubCollectionId } = useHabbiconHubActions();
    const album = buildHabbiconAlbum(collections, { nameKeys, collectionIcons, localize: (key, fallback) => t(key, fallback) });

    // `refreshWholeAlbum` - the sets the rail was built with, and how many times it was.
    const [ railCollectionIds, setRailCollectionIds ] = useState(() => album.sets.map(set => set.collectionId));
    const [ albumRevision, setAlbumRevision ] = useState(0);
    const [ seenChangeSeq, setSeenChangeSeq ] = useState(change.seq);
    const [ trayRevision, setTrayRevision ] = useState(0);
    const [ popup, setPopup ] = useState<HabbiconPopupState | undefined>(undefined);
    const layerRef = useRef<PixiContainer | null>(null);
    const popupNodeRef = useRef<PixiContainer | null>(null);
    const tileNodeRef = useRef<PixiContainer | null>(null);

    if (change.seq !== seenChangeSeq) {
        setSeenChangeSeq(change.seq);

        if (change.type !== 'recent') {
            const railKnows = (id: number) => railCollectionIds.includes(id);
            let wholeRefresh = false;

            if (change.habbiconId > 0) {
                // `refreshChangedHabbicon`.
                const entry = findHabbiconEntryByHabbiconId(album, change.habbiconId);
                const changedSet = ((change.collectionId > 0) ? findHabbiconSetByCollectionId(album, change.collectionId) : undefined)
                    ?? (entry ? findHabbiconSetByCollectionId(album, entry.collectionId) : undefined);

                if (!changedSet || !railKnows(changedSet.collectionId)) {
                    wholeRefresh = true;
                } else if (tab !== HabbiconTabMode.ALL_SETS) {
                    setPopup(undefined);
                    setTrayRevision(revision => revision + 1);
                }
            } else if (!railCollectionIds.length) {
                wholeRefresh = true;
            }

            if (wholeRefresh) {
                setPopup(undefined);
                setRailCollectionIds(album.sets.map(set => set.collectionId));
                setAlbumRevision(revision => revision + 1);
                setTrayRevision(revision => revision + 1);
            }
        }
    }

    const railSets = railCollectionIds.map(id => findHabbiconSetByCollectionId(album, id)).filter((set): set is HabbiconSetModel => !!set);
    const selectedSet = railSets.find(set => set.collectionId === collectionId) ?? railSets[0];
    const popupEntry = popup ? findEntryById(album, popup.tileId) : undefined;

    const hidePopup = () => setPopup(undefined);

    // `attachToDesktop`: a press outside the popup and its tile, or any wheel, hides it.
    useEffect(() => {
        if (!popup) return;

        const onPointerDown = (event: PointerEvent) => {
            const canvas = GetRenderer().canvas;

            if (!canvas || (performance.now() <= (popup.shownAt + POPUP_PRESS_GRACE_MS))) return;

            const point = canvasPoint(event, canvas);
            const inside = (node: PixiContainer | null) => !!node && node.getBounds().containsPoint(point.x, point.y);

            if (!inside(popupNodeRef.current) && !inside(tileNodeRef.current)) setPopup(undefined);
        };
        const onWheel = () => setPopup(undefined);

        window.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('wheel', onWheel, { capture: true });

        return () => {
            window.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('wheel', onWheel, { capture: true });
        };
    }, [ popup ]);

    /** `onTileClicked`. */
    const onTileClick = (entry: HabbiconEntryModel, event: FederatedPointerEvent) => {
        const tileNode = event.currentTarget;
        const layer = layerRef.current;

        if (!layer) return;

        if (!entry.isReward && !entry.owned && !entry.claimable) getHabbiconInfo(send, entry.habbiconId);

        const tileRect = getGlobalRect(tileNode);
        const layerRect = getGlobalRect(layer);

        tileNodeRef.current = tileNode;
        setPopup({ tileId: entry.id, tile: { x: tileRect.x - layerRect.x, y: tileRect.y - layerRect.y, width: tileRect.width, height: tileRect.height }, shownAt: performance.now() });
    };

    /** `onPopupActionClicked`. */
    const onPopupAction = (entry: HabbiconEntryModel, mode: HabbiconPopupModeName) => {
        switch (mode) {
            case HabbiconPopupMode.CLAIM:
                if (entry.claimable) claimHabbicon(send, entry.habbiconId);
                break;
            case HabbiconPopupMode.ADD_FAVORITE:
                if (entry.owned) favoriteHabbicon(send, entry.habbiconId);
                break;
            case HabbiconPopupMode.REMOVE_FAVORITE:
                if (entry.favorite) unfavoriteHabbicon(send, entry.habbiconId);
                break;
        }
    };

    /** `onPopupBuyClicked`. */
    const onPopupBuy = (entry: HabbiconEntryModel) => {
        if (!entry.purchasable || !hasHabbiconPrice(entry)) return;

        openHabbiconPurchaseConfirmation(entry);
        hidePopup();
    };

    /** `onTabChanged`: the same tab again does nothing (`HabbiconTabView.onTabSelected`). */
    const selectTab = (next: HabbiconTabModeName) => {
        if (next === tab) return;

        setHubTab(next);
        hidePopup();
        setTrayRevision(revision => revision + 1);
    };

    /** `selectSet`. */
    const selectSet = (set: HabbiconSetModel) => {
        setHubCollectionId(set.collectionId);
        hidePopup();
    };

    const allSets = (tab === HabbiconTabMode.ALL_SETS);
    const popupPosition = (popup && popupEntry) ? placeHabbiconPopup(popup.tile, getHabbiconPopupHeight(popupEntry)) : undefined;

    return (
        <Frame
            variant="3"
            id="habbicon-hub"
            caption={t('habbicon_book.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            resizeDirection="none"
            centered
            onClose={onClose}
            margins={[ 3, 36, 3, 3 ]}
            layout={{ position: 'absolute', width: 560, height: 570 }}
        >
            <Border
                variant="3"
                tintColor="#d7d1be"
                layout={{ position: 'absolute', left: 0, top: 0, width: 554, height: 530 }}
            />
            <HabbiconAlbumHeaderView
                stats={album.stats}
                animate
                resetKey={String(albumRevision)}
            />
            <Region
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 7, top: 144, width: 540, height: 1 }}
            />
            <TabContext
                variant="3"
                tintColor="#0fffff"
                layout={{ position: 'absolute', left: 7, top: 113, width: 540, height: 33 }}
            >
                <TabButton
                    variant="3"
                    selected={allSets}
                    onPointerTap={() => selectTab(HabbiconTabMode.ALL_SETS)}
                    layout={{ position: 'absolute', left: 0, top: 0, width: 64, height: 32 }}
                >
                    {t('habbicon_book.tab.all_sets')}
                </TabButton>
                <TabButton
                    variant="3"
                    selected={tab === HabbiconTabMode.OWNED}
                    onPointerTap={() => selectTab(HabbiconTabMode.OWNED)}
                    layout={{ position: 'absolute', left: 64, top: 0, width: 64, height: 32 }}
                >
                    {t('habbicon_book.tab.owned')}
                </TabButton>
                <TabButton
                    variant="3"
                    selected={tab === HabbiconTabMode.FAVOURITED}
                    onPointerTap={() => selectTab(HabbiconTabMode.FAVOURITED)}
                    layout={{ position: 'absolute', left: 128, top: 0, width: 82, height: 32 }}
                >
                    {t('habbicon_book.tab.favourited')}
                </TabButton>
            </TabContext>
            {allSets && (
                <Region layout={{ position: 'absolute', left: 7, top: 146, width: 540, height: 380 }}>
                    <HabbiconSetRailView
                        sets={railSets}
                        activeCollectionId={selectedSet?.collectionId ?? 0}
                        animate
                        resetKey={String(albumRevision)}
                        onSelect={selectSet}
                    />
                    <HabbiconSetPageView
                        set={selectedSet}
                        animate
                        resetKey={`${albumRevision}:${selectedSet?.collectionId ?? 0}`}
                        activeTileId={popup?.tileId}
                        onTileClick={onTileClick}
                    />
                </Region>
            )}
            {!allSets && (
                <HabbiconCollectionTrayView
                    tab={tab}
                    groups={(tab === HabbiconTabMode.FAVOURITED) ? album.favouriteGroups : album.ownedGroups}
                    resetKey={`${tab}:${trayRevision}`}
                    activeTileId={popup?.tileId}
                    onTileClick={onTileClick}
                />
            )}
            <Region
                ref={layerRef}
                layout={{ position: 'absolute', left: 0, top: 102, width: 560, height: 428 }}
            >
                {popupEntry && popupPosition && (
                    <HabbiconPopupView
                        entry={popupEntry}
                        x={popupPosition.x}
                        y={popupPosition.y}
                        onAction={onPopupAction}
                        onBuy={onPopupBuy}
                        popupRef={(node) => {
                            popupNodeRef.current = node;
                        }}
                    />
                )}
            </Region>
        </Frame>
    );
};
