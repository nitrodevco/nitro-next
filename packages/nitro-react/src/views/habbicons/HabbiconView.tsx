/**
 * `HabbiconView` - the habbicon hub, `habbicon_view.xml` (centred when built): the album header,
 * the three tabs, the all sets tab (the set rail and the selected set's page) or the tray of the
 * owned / favourited tab, and the item popup's layer over all of it.
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
 * `HabbiconAlbumHeaderView.refresh`: the owned and completed counts, the album progress bar and
 * `habbicon_book.album_progress.count`. `HabbiconTabView`: the tab buttons, the same tab again
 * doing nothing (`onTabSelected`).
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
import { buildHabbiconAlbum, findHabbiconEntryByHabbiconId, findHabbiconSetByCollectionId, getHabbiconAlbumProgressRatio, HabbiconAlbumModel, HabbiconEntryModel, HabbiconPopupMode, HabbiconPopupModeName, HabbiconSetModel, HabbiconTabMode, HabbiconTabModeName, hasHabbiconPrice, resolveHabbiconPopupMode, useHabbiconHubActions, useHabbiconsStore } from '#base/context/habbicons';
import { useConfigData, useTranslation } from '#base/context/system';
import { Box, getGlobalRect, TemplateRect, TemplateWindow, useTemplateFrame } from '#base/theme';

import { arrangeHabbiconTrayGroups, habbiconCollectionTrayBindings } from './habbiconCollectionTrayBindings';
import { habbiconPopupBindings, placeHabbiconPopup } from './habbiconPopupBindings';
import { HabbiconProgressBarView } from './HabbiconProgressBarView';
import { habbiconSetPageBindings } from './habbiconSetPageBindings';
import { habbiconSetRailItems } from './habbiconSetRailItems';
import { HABBICON_VIEW_TEMPLATE, hideHabbiconProgressBar } from './habbiconTemplate';

/** The popup ignores presses this soon after it opened (`showForTile`'s `getTimer() + 75`). */
const POPUP_PRESS_GRACE_MS = 75;

interface HabbiconPopupState {
    /** The active tile's entry id. */
    tileId: string;
    /** The tile's own window, for the outside-press test (`isPointInsideAnyTile`). */
    tileNode: PixiContainer;
    /** The tile's rect relative to the popup layer, when it was clicked. */
    tile: { x: number; y: number; width: number; height: number };
    /** When it was shown, on `performance.now()`'s clock. */
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

const contains = (rect: { x: number; y: number; width: number; height: number }, point: { x: number; y: number }) => (point.x >= rect.x) && (point.y >= rect.y) && (point.x < (rect.x + rect.width)) && (point.y < (rect.y + rect.height));

export const HabbiconView = ({ onClose }: { onClose: () => void }) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const config = useConfigData();
    const tab = useHabbiconsStore(x => x.hubTab);
    const collectionId = useHabbiconsStore(x => x.hubCollectionId);
    const collections = useHabbiconsStore(x => x.shopCollections);
    const nameKeys = useHabbiconsStore(x => x.nameKeys);
    const collectionIcons = useHabbiconsStore(x => x.collectionIcons);
    const previews = useHabbiconsStore(x => x.previews);
    const lockedPreviews = useHabbiconsStore(x => x.lockedPreviews);
    const change = useHabbiconsStore(x => x.change);
    const { setHubTab, setHubCollectionId } = useHabbiconHubActions();
    const frame = useTemplateFrame({ id: 'HabbiconHub', centered: true, onClose });
    const album = buildHabbiconAlbum(collections, { nameKeys, collectionIcons, localize: (key, fallback) => t(key, fallback) });

    // `refreshWholeAlbum` - the sets the rail was built with, and how many times it was.
    const [ railCollectionIds, setRailCollectionIds ] = useState(() => album.sets.map(set => set.collectionId));
    const [ albumRevision, setAlbumRevision ] = useState(0);
    const [ seenChangeSeq, setSeenChangeSeq ] = useState(change.seq);
    const [ trayRevision, setTrayRevision ] = useState(0);
    const [ popup, setPopup ] = useState<HabbiconPopupState | undefined>(undefined);
    // `WME_OVER` / `WME_OUT`: the tile and the rail row under the pointer (`updateLook`).
    const [ hoveredTileId, setHoveredTileId ] = useState<string | undefined>(undefined);
    const [ hoveredCollectionId, setHoveredCollectionId ] = useState(0);
    // The popup layer's origin, and the popup's rect in it as `positionPopup` placed it.
    const [ layerNode, setLayerNode ] = useState<PixiContainer | null>(null);
    const popupRectRef = useRef<TemplateRect | undefined>(undefined);

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
            const popupRect = popupRectRef.current;

            if (layerNode && !layerNode.destroyed && popupRect) {
                const origin = getGlobalRect(layerNode);

                if (contains({ ...popupRect, x: origin.x + popupRect.x, y: origin.y + popupRect.y }, point)) return;
            }

            // `isPointInsideAnyTile`.
            if (!popup.tileNode.destroyed && contains(getGlobalRect(popup.tileNode), point)) return;

            setPopup(undefined);
        };
        const onWheel = () => setPopup(undefined);

        window.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('wheel', onWheel, { capture: true });

        return () => {
            window.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('wheel', onWheel, { capture: true });
        };
    }, [ popup, layerNode ]);

    /** `onTileClicked`. */
    const onTileClick = (entry: HabbiconEntryModel, event: FederatedPointerEvent) => {
        const tileNode = event.currentTarget;

        if (!layerNode) return;

        if (!entry.isReward && !entry.owned && !entry.claimable) getHabbiconInfo(send, entry.habbiconId);

        const tileRect = getGlobalRect(tileNode);
        const layerRect = getGlobalRect(layerNode);

        setPopup({ tileId: entry.id, tileNode, tile: { x: tileRect.x - layerRect.x, y: tileRect.y - layerRect.y, width: tileRect.width, height: tileRect.height }, shownAt: event.timeStamp });
    };

    const onTileHover = (entry: HabbiconEntryModel, hovered: boolean) => setHoveredTileId(current => (hovered ? entry.id : ((current === entry.id) ? undefined : current)));

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
    const tileCallbacks = { activeTileId: popup?.tileId, hoveredTileId, onTileClick, onTileHover };

    return (
        <TemplateWindow
            id={HABBICON_VIEW_TEMPLATE}
            frame={frame}
            bindings={{
                // `HabbiconAlbumHeaderView.refresh`.
                owned_habbicons_value: { caption: String(album.stats.ownedHabbicons) },
                sets_completed_value: { caption: String(album.stats.completedSets) },
                album_progress_bar: {
                    children: (
                        <HabbiconProgressBarView
                            part="album_progress_bar"
                            ratio={getHabbiconAlbumProgressRatio(album.stats)}
                            animate
                            resetKey={String(albumRevision)}
                        />
                    ),
                },
                ...hideHabbiconProgressBar('album_progress_bar'),
                album_progress_text: { caption: t('habbicon_book.album_progress.count', '', { collected: String(album.stats.collected), total: String(album.stats.total) }) },
                // `HabbiconTabView`.
                tab_all_sets: { selected: allSets, onPointerTap: () => selectTab(HabbiconTabMode.ALL_SETS) },
                tab_owned: { selected: tab === HabbiconTabMode.OWNED, onPointerTap: () => selectTab(HabbiconTabMode.OWNED) },
                tab_favourited: { selected: tab === HabbiconTabMode.FAVOURITED, onPointerTap: () => selectTab(HabbiconTabMode.FAVOURITED) },
                // `refreshActiveTabContent`.
                all_sets_container: { visible: allSets },
                tray_container: { visible: !allSets },
                ...(allSets && {
                    set_rail_list: {
                        items: habbiconSetRailItems({
                            sets: railSets,
                            activeCollectionId: selectedSet?.collectionId ?? 0,
                            hoveredCollectionId,
                            previews,
                            animate: true,
                            resetKey: String(albumRevision),
                            onSelect: selectSet,
                            onHover: (set, hovered) => setHoveredCollectionId(current => (hovered ? set.collectionId : ((current === set.collectionId) ? 0 : current))),
                        }),
                    },
                    ...habbiconSetPageBindings({
                        set: selectedSet,
                        t,
                        send,
                        config,
                        previews,
                        lockedPreviews,
                        animate: true,
                        resetKey: `${albumRevision}:${selectedSet?.collectionId ?? 0}`,
                        ...tileCallbacks,
                    }),
                }),
                ...(!allSets && habbiconCollectionTrayBindings({
                    tab,
                    groups: (tab === HabbiconTabMode.FAVOURITED) ? album.favouriteGroups : album.ownedGroups,
                    t,
                    previews,
                    lockedPreviews,
                    resetKey: `${tab}:${trayRevision}`,
                    ...tileCallbacks,
                })),
                habbicon_popup_layer: {
                    children: (
                        <Box
                            ref={setLayerNode}
                            pointerTransparent
                            layout={{ position: 'absolute', left: 0, top: 0, width: 0, height: 0 }}
                        />
                    ),
                },
                ...habbiconPopupBindings({
                    entry: popupEntry,
                    mode: resolveHabbiconPopupMode(popupEntry),
                    t,
                    config,
                    onAction: onPopupAction,
                    onBuy: onPopupBuy,
                }),
            }}
            arrange={(windows) => {
                arrangeHabbiconTrayGroups(windows);
                popupRectRef.current = (popup && popupEntry) ? placeHabbiconPopup(windows, popup.tile) : undefined;
            }}
        />
    );
};
