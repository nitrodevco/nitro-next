import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { GetGuestRoomComposer, RateFlatComposer, SetUIFlagsComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useConfigValue, useRoomContext, useTranslation, useWebSocketContext } from '#base/context';
import { createLinkEvent } from '#base/hooks';
import { NitroIcon, useTooltip } from '#base/theme';


/*
 * RoomToolsWidget / RoomToolsToolbarCtrl — the collapsible panel on the room's left
 * edge (room_tools_toolbar, 165x229, bg #24231E): zoom row, then 25px button rows
 * (achievements / settings / chat history / like / camera / share) and the visit
 * history back/open/forward buttons. Row gates are 1:1: settings always, like only
 * while canRate, camera behind the CAMERA perk, chat history behind the free-flow
 * chat widget and achievements behind wired achievements (the latter two do not
 * exist here yet, so those rows stay hidden by their own gates).
 */

export const RoomToolsWidget = () => {
    const { send } = useWebSocketContext();
    const room = useRoomContext(x => x.room);
    const userHash = useConfigValue<string>('user.hash') ?? '';
    const urlPrefix = useConfigValue<string>('url.prefix') ?? '';
    const t = useTranslation();
    const tooltip = useTooltip();

    const collapsed = useRoomContext(x => x.roomToolsCollapsed);
    const uiFlags = useRoomContext(x => x.uiFlags);
    const setUiFlags = useRoomContext(x => x.setUiFlags);
    const [likeDisabledFor, setLikeDisabledFor] = useState(-1);
    const [historyOpen, setHistoryOpen] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);
    const [zoomedIn, setZoomedIn] = useState(true);
    /*
     * the entry packets (GetGuestRoomResult enterRoom, RoomRating) arrive while the
     * room engine is still loading, before this widget mounts — useRoomToolsHandler
     * records them into the room store from RoomHandlers, which lives through it
     */
    const canRate = useRoomContext(x => x.toolsCanRate);
    const currentRoomId = useRoomContext(x => x.toolsRoomId);
    const visitHistory = useRoomContext(x => x.visitHistory);
    const visitHistoryIndex = useRoomContext(x => x.visitHistoryIndex);
    const visitHistoryGo = useRoomContext(x => x.visitHistoryGo);
    const canGoBack = visitHistoryIndex > 0 && visitHistory.length > 0;
    const canGoForward = visitHistoryIndex >= 0 && visitHistoryIndex < visitHistory.length - 1;

    /* getHistoryView — newest occurrence wins, deduped by flatId */
    const historyView = () => {
        const seen = new Set<number>();
        const view: { flatId: number; roomName: string }[] = [];

        for (let i = visitHistory.length - 1; i >= 0; i--) {
            if (seen.has(visitHistory[i].flatId)) continue;

            seen.add(visitHistory[i].flatId);
            view.unshift(visitHistory[i]);
        }

        return view;
    };

    if (!room) return null;

    const goToPrivateRoom = (flatId: number) => send(new GetGuestRoomComposer({ roomId: flatId, enterRoom: false, roomForward: true }));

    /*
     * RoomDesktop.zoomRoomCanvas — the SWF steps through 6 canvas scales; our
     * geometry supports the two RoomGeometryScaleType steps, so in/out toggle those
     */
    const zoom = (direction: number) => {
        const canvas = room.canvas;

        if (!canvas) return;

        room.resizeRoomCanvas(canvas.width, canvas.height, direction > 0 ? RoomGeometryScaleType.ZoomedIn : RoomGeometryScaleType.ZoomedOut);
        setZoomedIn(direction > 0);
    };

    /* button_like disables after rating until the next room entry */
    const likeDisabled = likeDisabledFor === currentRoomId;
    /* setRoomToolsState — bit 2 of uiFlags persists the expanded state server-side */
    const toggleCollapsed = (nextCollapsed: boolean) => {
        const nextFlags = nextCollapsed ? (uiFlags & ~2) : (uiFlags | 2);

        setUiFlags(nextFlags);

        if (nextFlags !== uiFlags) send(new SetUIFlagsComposer({ flags: nextFlags }));
    };

    const rateRoom = () => {
        send(new RateFlatComposer({ rating: 1 }));
        setLikeDisabledFor(currentRoomId);
    };

    const embedSrc = t('navigator.embed.src', '', { roomType: 'private', embedCode: userHash, roomId: `${currentRoomId}` });
    const directLink = `${urlPrefix}/room/${currentRoomId}`;

    const share = () => {
        if (shareOpen) {
            setShareOpen(false);

            return;
        }

        setShareOpen(true);
        navigator.clipboard?.writeText(embedSrc).catch(() => { /* clipboard denied */ });
    };

    const rows: { name: string; icon: string; label: string; tip: string; onClick: () => void; disabled?: boolean }[] = [
        { name: 'settings', icon: 'icon-roomtools-gear', label: t('room.settings.button.text'), tip: t('room.settings.button.tooltip'), onClick: () => createLinkEvent('navigator/roominfo') },
        ...(canRate ? [{ name: 'like', icon: 'icon-roomtools-like', label: t('room.like.button.text'), tip: t('room.like.button.tooltip'), onClick: rateRoom, disabled: likeDisabled }] : []),
        { name: 'share', icon: 'icon-roomtools-weblink', label: t('navigator.embed.caption'), tip: '', onClick: share }
    ];

    /*
     * updatePosition — the panel sits at (-5, desktopHeight - 55 - height): flush
     * against the left edge, 55px above the bottom, its height the sum of the
     * visible rows (zoom 30 + 25 per button row + history 43). Collapsing slides
     * window_bg from x=1 to x=(19 - 164 - 1) over 140ms with a cubic ease-out
     * (1-(1-t)^3); the expand bar stays put at x=0.
     */
    const rowsHeight = 30 + rows.length * 25 + 43;
    const panelHeight = 6 + rowsHeight + 6;
    const ETCH = '[filter:drop-shadow(0_1px_0_rgba(0,0,0,0.28))]';

    return (
        <div className="absolute pointer-events-auto" style={{ left: -5, bottom: 55, width: 165, height: panelHeight }}>
            {/* window_bg + contents — slides as one block like window_bg.x = 1 + offset */}
            <div
                className="absolute top-0 [transition:transform_140ms_cubic-bezier(0.33,1,0.68,1)]"
                style={{ left: 1, width: 164, height: panelHeight, transform: collapsed ? 'translateX(-146px)' : undefined }}>
                <div className="absolute inset-0 rounded-[5px] bg-[#24231E]" />
                {/* itemlist_buttons at (24,6) relative to the window, 140 wide */}
                <div className="absolute" style={{ left: 23, top: 6, width: 140 }}>
                    {/* zoom row — 130x30: 11px #cccccc text (6,4), 50% #707070 separator (3,26), buttons at 87/107 */}
                    <div className="relative" style={{ width: 130, height: 30 }}>
                        <span className="absolute font-ubuntu text-[11px] text-[#CCCCCC] whitespace-nowrap" style={{ left: 6, top: 2 }}>
                            {t('room.zoom.text', undefined, { zoom_level: zoomedIn ? '1' : '0' })}
                        </span>
                        <div
                            className={`absolute cursor-pointer hover:brightness-125 ${ETCH} ${zoomedIn ? 'opacity-40' : ''}`}
                            style={{ left: 87, top: 3 }}
                            {...tooltip(t('room.zoom.zoom_in.tooltip'))}
                            onClick={() => zoom(1)}>
                            <NitroIcon icon="icon-roomtools-zoom-in" />
                        </div>
                        <div
                            className={`absolute cursor-pointer hover:brightness-125 ${ETCH} ${!zoomedIn ? 'opacity-40' : ''}`}
                            style={{ left: 107, top: 3 }}
                            {...tooltip(t('room.zoom.zoom_out.tooltip'))}
                            onClick={() => zoom(-1)}>
                            <NitroIcon icon="icon-roomtools-zoom-out" />
                        </div>
                        <div className="absolute bg-[#707070] opacity-50" style={{ left: 3, top: 26, width: 125, height: 1 }} />
                    </div>
                    {/* button rows — 130x25; hover brightens the icon (brightness_and_shadow_under),
                        no background; text Ubuntu 11 #cccccc underlined at x36 */}
                    {rows.map(row => (
                        <div
                            key={row.name}
                            className={`group relative cursor-pointer ${row.disabled ? 'opacity-40 pointer-events-none' : ''}`}
                            style={{ width: 130, height: 25 }}
                            {...(row.tip !== '' ? tooltip(row.tip) : {})}
                            onClick={row.onClick}>
                            <div className={`absolute flex items-center justify-center group-hover:brightness-125 ${ETCH}`} style={{ left: 0, top: 0, width: 28, height: 25 }}>
                                <NitroIcon icon={row.icon} />
                            </div>
                            <span className="absolute font-ubuntu text-[11px] text-[#CCCCCC] underline whitespace-nowrap" style={{ left: 36, top: 3 }}>{row.label}</span>
                        </div>
                    ))}
                    {/* cnt_history (3,+) 115x43 — bgs tinted 0x44a88d; the back button's bg is
                        the forward bg mirrored (zoom_x -1); hover brightens the whole button */}
                    <div className="relative" style={{ left: 3, width: 115, height: 43 }}>
                        <div
                            className={`absolute cursor-pointer hover:brightness-125 ${canGoBack ? '' : 'opacity-40 pointer-events-none'}`}
                            style={{ left: 0, top: 3, width: 37, height: 34 }}
                            {...tooltip(t('room.history.button.back.tooltip'))}
                            onClick={() => { const entry = visitHistoryGo(-1); if (entry) goToPrivateRoom(entry.flatId); }}>
                            <NitroIcon className={`absolute -scale-x-100 ${ETCH}`} icon="icon-roomtools-history-nav-bg-teal" style={{ left: 3, top: 2 }} />
                            <NitroIcon className={ETCH} icon="icon-roomtools-history-back" style={{ position: 'absolute', left: 16, top: 12 }} />
                        </div>
                        {/* button_history disables while roomHistory.length <= 1 */}
                        <div
                            className={`absolute cursor-pointer hover:brightness-125 ${visitHistory.length > 1 ? '' : 'opacity-40 pointer-events-none'}`}
                            style={{ left: 38, top: 0, width: 35, height: 38 }}
                            {...tooltip(t('room.history.button.tooltip'))}
                            onClick={() => setHistoryOpen(x => !x)}>
                            <NitroIcon className={ETCH} icon="icon-roomtools-history-open-bg-teal" style={{ position: 'absolute', left: 1, top: 1 }} />
                            <NitroIcon className={ETCH} icon="icon-roomtools-history-open" style={{ position: 'absolute', left: 9, top: 11 }} />
                        </div>
                        <div
                            className={`absolute cursor-pointer hover:brightness-125 ${canGoForward ? '' : 'opacity-40 pointer-events-none'}`}
                            style={{ left: 74, top: 5, width: 34, height: 32 }}
                            {...tooltip(t('room.history.button.forward.tooltip'))}
                            onClick={() => { const entry = visitHistoryGo(1); if (entry) goToPrivateRoom(entry.flatId); }}>
                            <NitroIcon className={ETCH} icon="icon-roomtools-history-nav-bg-teal" style={{ position: 'absolute', left: 0, top: 0 }} />
                            <NitroIcon className={ETCH} icon="icon-roomtools-history-forward" style={{ position: 'absolute', left: 14, top: 10 }} />
                        </div>
                    </div>
                </div>
            </div>
            {/* side_bar_collapse — a SIBLING of window_bg fixed at x=0: only the bg
                slides, the strip stays stationary and swaps for the expand strip */}
            {!collapsed && (
                <div
                    className="absolute cursor-pointer rounded-r-[5px] bg-[#3B3933] flex items-center justify-end"
                    style={{ left: 0, top: 0, width: 19, height: panelHeight }}
                    onClick={() => toggleCollapsed(true)}>
                    <div className="icon-tools-collapse-left" />
                </div>
            )}
            {/* side_bar_expand — fixed at x=0, visible while collapsed */}
            {collapsed && (
                <div
                    className="absolute cursor-pointer rounded-r-[5px] bg-[#3B3933] flex items-center justify-end"
                    style={{ left: 0, top: 0, width: 19, height: panelHeight }}
                    onClick={() => toggleCollapsed(false)}>
                    <div className="icon-tools-collapse-right" />
                </div>
            )}
            {/* room_tools_history — 152x97 above the panel, right edges aligned */}
            {historyOpen && !collapsed && (
                <div
                    className="absolute rounded-[5px] bg-[#24231E] overflow-y-auto p-0.5"
                    style={{ left: 165 - 152, bottom: panelHeight + 2, width: 152, height: 97 }}>
                    {historyView().map(entry => (
                        <div
                            key={entry.flatId}
                            className="flex items-center px-1.5 cursor-pointer"
                            style={{ height: 24 }}
                            onClick={() => { setHistoryOpen(false); goToPrivateRoom(entry.flatId); }}>
                            <span className="truncate font-ubuntu text-[11px] text-[#CCCCCC] underline">{entry.roomName}</span>
                        </div>
                    ))}
                </div>
            )}
            {/* share_room (457x196) — embed + direct link, copied to the clipboard on open */}
            {shareOpen && (
                <div className="absolute bg-[#EAECE8] border border-black p-3 z-40" style={{ left: 170, bottom: 0, width: 457 }}>
                    <div className="flex items-center justify-between">
                        <span className="text-style-u-bold">{t('navigator.embed.headline')}</span>
                        <span className="cursor-pointer text-style-u-bold" onClick={() => setShareOpen(false)}>X</span>
                    </div>
                    <span className="block mt-1 text-style-regular break-words">{t('navigator.embed.info')}</span>
                    <input
                        readOnly
                        className="w-full mt-1 h-4.75 px-1 bg-white border border-black text-style-regular"
                        type="text"
                        value={embedSrc}
                        onFocus={event => event.currentTarget.select()} />
                    <span className="block mt-1.5 text-style-regular break-words">{t('navigator.embed.direct.info')}</span>
                    <input
                        readOnly
                        className="w-full mt-1 h-4.75 px-1 bg-white border border-black text-style-regular"
                        type="text"
                        value={directLink}
                        onFocus={event => event.currentTarget.select()} />
                </div>
            )}
        </div>
    );
}
