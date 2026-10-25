/**
 * The bottom bar - `toolbar/BottomBackgroundBorder`, its `bottom_background_border` template stretched
 * across the desktop, and over it `toolbar/BottomBarLeft`, drawn from its `bottom_bar_left` template:
 * the collapse arrows, then `toolbar_items` - the icon regions and the divider `line` - and the
 * friend bar (`FriendBarView`) at the right-hand end. The me menu and progression buttons open
 * `ToolbarExtendedMenu` (`MeMenuNewController` / `ProgMenuController`).
 *
 * Which icons show is `setToolbarState`: every `TOGGLE` window of the layout is tagged with the
 * states it shows in - `VISIBLE_HOTEL` on the hotel view, `VISIBLE_ROOM` in a room,
 * `VISIBLE_COLLAPSED` collapsed - and some ask more: stories (`toolbar.stories.enabled`) and Builders
 * Club (`builders.club.enabled`) unless collapsed, games (`games_icon_enabled`), and the camera
 * (`camera.launch.ui.position` of `bottom-icons` and the `CAMERA` perk) and wired menu
 * (`showToolbarMenuButton`) only in a room or collapsed from one. `checkSize` makes the window
 * `45 * (visible toggles + 1) + 160` wide and shows the left arrow expanded, the right one collapsed;
 * the toolbar's area, which the chat bar fits itself beside, is the `line`'s x in the window - or 185
 * collapsed (`computeToolbarAreaWidth`).
 *
 * Collapsing slides rather than switches (`onCollapseToolsBar` -> `startCollapseAnimation`,
 * `onAnimationTimer`): the layouts of both states are taken, and over 140 ms, eased `1 - (1 - t)^3`,
 * every toggle shown in either moves from its x in one to its x in the other
 * (`applyAnimatedToggleLayout`) - fading out if only the old state shows it, in if only the new one
 * does - while the window and the toolbar area narrow or widen with them. The state itself, and with
 * it the arrows (`checkSize`), changes when the run ends. A press while it runs is ignored.
 *
 * The icons' counts are the window manager's counter at the region's top right (`getUnseenItemCounter`):
 * the inventory's unseen items, the daily tasks done and track prizes to claim on progression, unread mini mail on the me
 * menu. The me menu's own picture is the user's face (`useMeMenuIcon`).
 *
 * The inventory icon's bitmap and the me menu region are what `animateToIcon` flies pictures into
 * (`createTransitionToIcon`), and what bounces as one lands: `Queue(Wait(duration + 8),
 * DropBounce(icon, 400, 12))` lifts it 12 px and lets it fall back with a bounce.
 *
 * The navigator, me menu, inventory and catalogue icons are registered as hint targets under their
 * icon names (`NAVIGATOR`, `MEMENU`, `INVENTORY`, `CATALOGUE`), which the server's element pointer
 * and the `toolbar/highlight/<icon>` link point the hint arrow at; a click on an icon takes the arrow
 * off it (`onIconClick`'s `hideMatchingHint`).
 *
 * Not Flash's: the icons client modules add (`toolbar.add`) follow the `line`, a region's width and
 * `ITEM_SPACING` apart, while the bar is expanded; the window and the toolbar area widen by them as
 * by any shown toggle, and they fade with the collapse run. The me menu shows the modules' entries
 * after its own (`meMenu.add`), each a clone of `profile` with its own caption.
 */
import { CatalogTypeEnum, NoobnessLevelEnum, RoomDoorModeEnum, RoomObjectCategoryEnum } from '@nitrodevco/nitro-api';
import { GetTicker } from '@nitrodevco/nitro-renderer';
import { Container as PixiContainer, FederatedPointerEvent, Ticker } from 'pixi.js';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

import { goToHomeRoom, onGamesToolbarClick, openClientLink, openProfile, quitRoom, showOwnRooms, showQuests, startTakingPhoto, toggleCatalog, toggleNavigator, trackEventLog } from '#base/commands';
import { useClientModulesStore } from '#base/context/client-modules';
import { useWebSocketContext } from '#base/context/communication';
import { getUnseenDailyTasksCount, useDailyTasksStore } from '#base/context/daily-tasks';
import { useGroupStore } from '#base/context/groups';
import { useHintActions } from '#base/context/hints';
import { useInventoryStore, useInventoryUnseenTotalCount } from '#base/context/inventory';
import { useMessengerStore } from '#base/context/messenger';
import { useNavigatorStore } from '#base/context/navigator';
import { getRewardTrackClaimableCount, getRewardTrackTrackClaimableCount, useRewardTrackStore } from '#base/context/reward-track';
import { useOwnRoomObjectId } from '#base/context/room';
import { ToolbarTransitionIcon, useConfigBoolean, useConfigValue, useIsLandingViewVisible, useSystemActions, useSystemStore, useTranslation, useWindowActions } from '#base/context/system';
import { PerkCodes, useOwnPerkAllowed, useOwnUserFigure, useOwnUserGender, useOwnUserId, useUserStore } from '#base/context/user';
import { useWiredShowToolbarMenuButton } from '#base/context/wired';
import { easeOutCubic, useHintTarget, useRoomObjectSelect, useTween, useViewportSize } from '#base/hooks';
import { Box, findTemplateChild, Region, Template, TemplateBindings, TemplateElement, TemplateWindow, TemplateWindows, ThemeImage, useLayoutEvent, useTemplate } from '#base/theme';
import { configReader } from '#base/utils';
import { FriendBarView } from '#base/views/friend-bar/FriendBarView';
import { UnseenItemCounterView } from '#base/views/shared/UnseenItemCounterView';

import { ToolbarExtendedMenu } from './ToolbarExtendedMenu';
import { useMeMenuIcon } from './useMeMenuIcon';

const BAR_TEMPLATE = 'habbo-toolbar-com/bottom_bar_left_xml';

/** `bottom_background_border`: 54 high, 3 of it below the desktop (`updatePosition`). */
const BACKGROUND_HEIGHT = 54;
/** The space between `toolbar_items`' items. */
const ITEM_SPACING = 8;
/** `computeToolbarAreaWidth` while collapsed. */
const COLLAPSED_AREA_WIDTH = 185;
/** `BottomBarLeft.COLLAPSE_ANIMATION_DURATION_MS`. */
const COLLAPSE_ANIMATION_DURATION_MS = 140;
/** `animateToIcon`'s `DropBounce(icon, 400, 12)`. */
const BOUNCE_DURATION_MS = 400;
const BOUNCE_HEIGHT = 12;
/**
 * `me_menu_new_view`'s height after `toggleVisibility`'s `setGuideToolVisibility`: `profile.bottom + 5`, the guide's
 * being the same. Only with `guides.enabled`: otherwise the last word is the window's resize to accommodate its
 * children (hiding mini mail rearranges the box sizer), its layout height.
 */
const ME_MENU_GUIDE_HEIGHT = 55;

/** A client module's icon: the size of the layout's `CATALOGUE` region. */
const MODULE_ICON_WIDTH = 45;
const MODULE_ICON_HEIGHT = 41;

/** The me menu's item list: the unnamed list in the unnamed window under `buttons`. */
const ME_MENU_LIST = '@0/@0';
/** The me menu entry a client module's entry is a clone of. */
const ME_MENU_MODULE_FROM = 'profile';

/** `ProgMenuController.REWARD_TRACK_ITEM_PREFIX`: a reward track's item in the progression menu. */
const REWARD_TRACK_ITEM_PREFIX = 'rewardtrack_';

/** `DropBounce.getBounceOffset`: how far down the drop is, 0 to 1, bouncing as it lands. */
const getBounceOffset = (progress: number): number => {
    if (progress < 0.364) return 7.5625 * progress * progress;

    if (progress < 0.727) {
        const k = progress - 0.545;

        return (7.5625 * k * k) + 0.75;
    }

    if (progress < 0.909) {
        const k = progress - 0.9091;

        return (7.5625 * k * k) + 0.9375;
    }

    const k = progress - 0.955;

    return (7.5625 * k * k) + 0.984375;
};

/**
 * A transition target: registers its window for `createTransitionToIcon` to aim at, and answers
 * how far up the `ToolBarBouncing[ <icon> ]` motion holds it - nothing through the wait, the full
 * 12 px as the `DropBounce` starts, nothing again (`stop()`) once it ends.
 */
const useToolbarTransitionTarget = (icon: ToolbarTransitionIcon) => {
    const { setToolbarIconNode, setToolbarIconBounce } = useSystemActions();
    const waitMs = useSystemStore(x => x.toolbarIconBounces[icon]);
    const [ lift, setLift ] = useState(0);

    const attachTarget = useCallback((node: PixiContainer | null) => setToolbarIconNode(icon, node), [ icon, setToolbarIconNode ]);

    useEffect(() => {
        if (waitMs === undefined) return;

        let elapsed = 0;

        const tick = (ticker: Ticker) => {
            elapsed += ticker.deltaMS;

            if (elapsed < waitMs) return;

            const progress = (elapsed - waitMs) / BOUNCE_DURATION_MS;

            if (progress < 1) {
                setLift(Math.round(BOUNCE_HEIGHT - (getBounceOffset(progress) * BOUNCE_HEIGHT)));

                return;
            }

            setToolbarIconBounce(icon, undefined);
        };

        GetTicker().add(tick);

        return () => {
            GetTicker().remove(tick);
            setLift(0);
        };
    }, [ icon, waitMs, setToolbarIconBounce ]);

    return { attachTarget, lift };
};

/** A `TOGGLE` window of the layout: its name, tags and size, and whether it is one of `toolbar_items`. */
interface ToolbarToggle {
    name: string;
    tags: readonly string[];
    width: number;
    height: number;
    inItems: boolean;
}

/** `groupChildrenWithTag("TOGGLE")`, and `toolbar_items`' children in their order. */
const readToggles = (template: Template): ToolbarToggle[] => {
    const toggles: ToolbarToggle[] = [];
    const walk = (element: TemplateElement, inItems: boolean) => {
        if (element.tags?.includes('TOGGLE') && element.name) toggles.push({ name: element.name, tags: element.tags, width: element.width, height: element.height, inItems });

        for (const child of element.children) walk(child, inItems || (element.name === 'toolbar_items'));
    };

    template.elements.forEach(element => walk(element, false));

    return toggles;
};

/** `captureToggleLayout` of one state: what shows, every item's x, and the window's and the area's widths. */
interface ToolbarLayout {
    visible: Set<string>;
    x: Record<string, number>;
    lineX: number;
    width: number;
    areaWidth: number;
}

export const ToolbarView = () => {
    const template = useTemplate(BAR_TEMPLATE);
    const openMenu = useSystemStore(x => x.toolbarMenu);
    const [ collapsed, setCollapsed ] = useState(false);
    // 0 expanded, 1 collapsed, and in between while `onAnimationTimer` runs.
    const collapseProgress = useTween(collapsed ? 1 : 0, COLLAPSE_ANIMATION_DURATION_MS, easeOutCubic);
    const running = collapseProgress !== (collapsed ? 1 : 0);
    const ownFigure = useOwnUserFigure();
    const ownGender = useOwnUserGender();
    const ownUserId = useOwnUserId();
    const meMenuIcon = useMeMenuIcon(ownFigure, ownGender);
    const { endRoomSession, setToolbarWidths, setToolbarMenu } = useSystemActions();
    const { toggleWindow } = useWindowActions();
    const { width: viewportWidth } = useViewportSize();
    const [ rightGroup, setRightGroup ] = useState<PixiContainer | null>(null);
    const [ rightWidth, setRightWidth ] = useState(0);
    const landingViewVisible = useIsLandingViewVisible();
    // `setToolbarState`'s `_local_4`: a room state, or collapsed from one.
    const inRoom = !landingViewVisible;
    const buildersClubEnabled = useConfigBoolean('builders.club.enabled');
    const storiesEnabled = useConfigBoolean('toolbar.stories.enabled');
    const gamesEnabled = useConfigBoolean('games_icon_enabled');
    const showWiredMenuButton = useWiredShowToolbarMenuButton();
    const cameraLaunchPosition = useConfigValue<string>('camera.launch.ui.position');
    const cameraAllowed = useOwnPerkAllowed(PerkCodes.Camera);
    // `RoomUI.defineToolbarState`: a new user in a new user lobby gets its `VISIBLE_NOOB` icons.
    const lobbiesEnabled = useSystemStore(x => configReader(x.config).configBoolean('nux.lobbies.enabled'));
    const realNoob = useUserStore(x => Number(x.noobnessLevel) === Number(NoobnessLevelEnum.RealNoob));
    const inNoobRoom = useNavigatorStore(x => Number(x.enteredRoom?.info.doorMode) === Number(RoomDoorModeEnum.NoobLobby));
    const roomState = (lobbiesEnabled && realNoob && inNoobRoom) ? 'VISIBLE_NOOB' : 'VISIBLE_ROOM';
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const inventoryLastPage = useInventoryStore(x => x.lastPage);
    // `MeMenuNewController`: the guide (`guides.enabled` and the perk), talents (`talent.track.enabled`)
    // and collectibles (both hub flags) buttons; mini mail is always hidden.
    const guidesEnabled = useConfigBoolean('guides.enabled');
    const guideAllowed = useOwnPerkAllowed(PerkCodes.UseGuideTool);
    const talentTrackEnabled = useConfigBoolean('talent.track.enabled');
    const classicCollectiblesHubEnabled = useConfigBoolean('classic.collectibles.hub.enabled');
    const collectiblesHubEnabled = useConfigBoolean('collectibles.hub.enabled');
    // `ProgMenuController`: quests unless `toolbar.hide.quests`, daily tasks with `dailytasks.enabled`.
    const hideQuests = useConfigBoolean('toolbar.hide.quests');
    const dailyTasksEnabled = useConfigBoolean('dailytasks.enabled');
    const unseenInventoryCount = useInventoryUnseenTotalCount();
    const unseenMiniMailCount = useMessengerStore(x => x.miniMailUnreadCount);
    const unreadForumsCount = useGroupStore(x => x.unreadForumsCount);
    // `UnseenDailyTasksCountUpdateEvent`: the tasks done and not claimed.
    const unseenDailyTasks = useDailyTasksStore(x => getUnseenDailyTasksCount(x.tasks));
    // `UnseenRewardTrackRewardsCountUpdateEvent`: the reward tracks' prizes that can be claimed.
    const claimableRewardTrackPrizes = useRewardTrackStore(x => getRewardTrackClaimableCount(x.tracks));
    // `trackCounts`: each track's, for its item in the progression menu.
    const rewardTracks = useRewardTrackStore(x => x.tracks);
    const rewardTrackCounts = new Map(rewardTracks.map(track => [ track.id, getRewardTrackTrackClaimableCount(track) ]));
    // The menu's track items, each where it was first added (`onRewardTracks`).
    const menuTrackIds = useRewardTrackStore(x => x.menuTrackIds);
    const { attachTarget: attachInventoryTarget, lift: inventoryLift } = useToolbarTransitionTarget('HTIE_ICON_INVENTORY');
    const { attachTarget: attachMeMenuTarget, lift: meMenuLift } = useToolbarTransitionTarget('HTIE_ICON_MEMENU');
    const { hideMatchingHint } = useHintActions();
    // `registerHintWindow(getIconName(...), icon)` for the navigator, me menu, inventory and catalogue icons.
    const navigatorHintTarget = useHintTarget('NAVIGATOR');
    const meMenuHintTarget = useHintTarget('MEMENU');
    const inventoryHintTarget = useHintTarget('INVENTORY');
    const catalogueHintTarget = useHintTarget('CATALOGUE');
    const moduleToolbarItems = useClientModulesStore(x => x.toolbarItems);
    const moduleMeMenuItems = useClientModulesStore(x => x.meMenuItems);
    // What the modules' icons add to the bar while it is expanded.
    const moduleIconsWidth = moduleToolbarItems.length * (MODULE_ICON_WIDTH + ITEM_SPACING);

    useLayoutEvent(rightGroup, () => setRightWidth(Math.ceil(rightGroup?.layout?.computedLayout.width ?? rightGroup?.width ?? 0)));

    /** `setToolbarState` then `checkSize`, for the expanded or the collapsed bar. */
    const layoutOf = (isCollapsed: boolean, toggles: ToolbarToggle[]): ToolbarLayout => {
        const state = isCollapsed ? 'VISIBLE_COLLAPSED' : (inRoom ? roomState : 'VISIBLE_HOTEL');
        const shows = ({ name, tags }: ToolbarToggle) => {
            if (!tags.includes(state)) return false;

            switch (name) {
                case 'STORIES': return isCollapsed || storiesEnabled;
                case 'BUILDER': return isCollapsed || buildersClubEnabled;
                case 'GAMES': return gamesEnabled;
                case 'CAMERA': return inRoom && (cameraLaunchPosition === 'bottom-icons') && cameraAllowed;
                case 'WIRED_MENU': return inRoom && showWiredMenuButton;
                default: return true;
            }
        };
        const visible = new Set(toggles.filter(shows).map(toggle => toggle.name));
        const x: Record<string, number> = {};
        let next = 0;

        // `toolbar_items` lays its shown items out left to right, `ITEM_SPACING` apart, the `line` last.
        for (const toggle of toggles) {
            if (!toggle.inItems || !visible.has(toggle.name)) continue;

            x[toggle.name] = next;
            next += toggle.width + ITEM_SPACING;
        }

        // The modules' icons count as shown toggles while expanded.
        const moduleIcons = isCollapsed ? 0 : moduleToolbarItems.length;

        return {
            visible,
            x,
            lineX: next,
            width: (45 * (visible.size + moduleIcons + 1)) + 10 + 150,
            areaWidth: isCollapsed ? COLLAPSED_AREA_WIDTH : (itemsX + next + moduleIconsWidth),
        };
    };

    const toggles = template ? readToggles(template) : [];
    // `bottom_bar_left`: the window's height, and so its distance from the desktop's bottom (`checkSize`).
    const barHeight = template?.height ?? 0;
    // `toolbar_items`' x in the window.
    const itemsX = (template && findTemplateChild(template.elements, 'toolbar_items')?.x) ?? 0;
    // A hint target box fills its icon's region.
    const sizeOf = (name: string) => {
        const toggle = toggles.find(entry => entry.name === name);

        return { width: toggle?.width ?? 0, height: toggle?.height ?? 0 };
    };
    const target = layoutOf(collapsed, toggles);
    const source = layoutOf(!collapsed, toggles);
    // How far the run is from the old state's layout to the new one's.
    const fraction = collapsed ? collapseProgress : (1 - collapseProgress);
    const lerp = (from: number, to: number) => Math.round(from + ((to - from) * fraction));
    const barWidth = running ? lerp(source.width, target.width) : target.width;
    const areaWidth = running ? lerp(source.areaWidth, target.areaWidth) : target.areaWidth;
    // The state, and `checkSize`'s arrows with it, is the old one until the run ends.
    const arrowsCollapsed = running ? !collapsed : collapsed;

    // `toolBarAreaWidth` / `friendBarWidth`: what the chat bar fits itself between.
    useLayoutEffect(() => setToolbarWidths(areaWidth, rightWidth), [ areaWidth, rightWidth, setToolbarWidths ]);

    // `HabboLandingView.onToolbarClick` HTIE_ICON_RECEPTION: quit and dispose the room session right away (RSE_ENDED shows the hotel view).
    const goToHotelView = () => {
        quitRoom(send);
        endRoomSession();
    };

    const ownRoomObjectId = useOwnRoomObjectId();
    const { selectObject } = useRoomObjectSelect();
    const simpleMeMenu = useConfigBoolean('simple.memenu.enabled');

    /*
     * `AvatarInfoWidgetHandler.onToolbarClicked`: every click on the me menu icon in a room, with
     * `simple.memenu.enabled`, selects your own avatar (`AvatarInfoWidget.selectOwnAvatar`) - its
     * menu opens over it as if it were clicked. Without the flag Flash asks for the own avatar info
     * instead (`dispatchOwnAvatarInfo`: the name bubble, or the minimized menu when the name can be
     * changed), which is not ported.
     */
    const selectOwnAvatar = () => {
        if (simpleMeMenu && (ownRoomObjectId >= 0)) selectObject(ownRoomObjectId, RoomObjectCategoryEnum.Unit);
    };

    // `AbstractSubMenuController.onToolbarClick`: the menu's own icon toggles it, any other icon hides it.
    const iconClick = (action?: () => void, menu?: 'me' | 'progression') => () => {
        setToolbarMenu((menu && (openMenu !== menu)) ? menu : undefined);
        action?.();
    };

    const bindings: TemplateBindings = {
        collapse_left: { visible: !arrowsCollapsed },
        collapse_right: { visible: arrowsCollapsed },
        RECEPTION: { onPointerTap: iconClick(goToHotelView), tooltip: t('toolbar.icon.tooltip.exitroom.hotelview') },
        // HTIE_ICON_HOME -> `goToHomeRoom`: a room forward to the home room (its GetGuestRoomResult starts the session).
        HOME: { onPointerTap: iconClick(() => goToHomeRoom(send)) },
        // HTIE_ICON_NAVIGATOR -> `HabboNewNavigator.toggle`: shown with its last search made again, or hidden.
        NAVIGATOR: {
            onPointerTap: iconClick(() => toggleNavigator(send)),
            children: (
                <Box
                    ref={navigatorHintTarget}
                    pointerTransparent
                    layout={{ position: 'absolute', left: 0, top: 0, ...sizeOf('NAVIGATOR') }}
                />
            ),
        },
        PROGRESSION: {
            onPointerTap: iconClick(undefined, 'progression'),
            children: (
                <UnseenItemCounterView
                    // `unseenProgMenuCount`: the daily tasks' and the reward tracks' claimable prizes (`BottomBarLeft`). Its
                    // achievements share stays 0: `broadcastUnseenAchievementsCount` counts and sends no event.
                    count={unseenDailyTasks + claimableRewardTrackPrizes}
                    layout={{ position: 'absolute', right: 0, top: 0 }}
                />
            ),
        },
        // `HabboGameManager.onToolbarClick`.
        GAMES: { onPointerTap: iconClick(() => onGamesToolbarClick(send)) },
        STORIES: { onPointerTap: iconClick() },
        CATALOGUE: {
            onPointerTap: iconClick(() => toggleCatalog(CatalogTypeEnum.Normal)),
            children: (
                <Box
                    ref={catalogueHintTarget}
                    pointerTransparent
                    layout={{ position: 'absolute', left: 0, top: 0, ...sizeOf('CATALOGUE') }}
                />
            ),
        },
        BUILDER: { onPointerTap: iconClick(() => toggleCatalog(CatalogTypeEnum.BuildersClub)) },
        INVENTORY: {
            // `InventoryMainView.onHabboToolbarEvent`: the page it last showed.
            onPointerTap: iconClick(() => toggleWindow('inventory', { tab: inventoryLastPage })),
            children: (
                <>
                    {/* `icons_toolbar_inventory`'s box: what transitions land on. */}
                    <Box
                        ref={attachInventoryTarget}
                        pointerTransparent
                        layout={{ position: 'absolute', left: 0, top: 0, width: 44, height: 41 }}
                    />
                    <UnseenItemCounterView
                        count={unseenInventoryCount}
                        layout={{ position: 'absolute', right: 0, top: 0 }}
                    />
                    <Box
                        ref={inventoryHintTarget}
                        pointerTransparent
                        layout={{ position: 'absolute', left: 0, top: 0, ...sizeOf('INVENTORY') }}
                    />
                </>
            ),
        },
        MEMENU: {
            onPointerTap: iconClick(selectOwnAvatar, 'me'),
            children: (
                <>
                    <Box
                        ref={attachMeMenuTarget}
                        pointerTransparent
                        layout={{ position: 'absolute', left: 0, top: 0, width: 45, height: 45 }}
                    />
                    {/* `setUnseenItemCount('HTIE_ICON_MEMENU', unseenMeMenuCount)`: unread mini mail and unread forums. */}
                    <UnseenItemCounterView
                        count={unseenMiniMailCount + unreadForumsCount}
                        layout={{ position: 'absolute', right: 0, top: 0 }}
                    />
                    <Box
                        ref={meMenuHintTarget}
                        pointerTransparent
                        layout={{ position: 'absolute', left: 0, top: 0, ...sizeOf('MEMENU') }}
                    />
                </>
            ),
        },
        icon_me_menu: meMenuIcon ? { asset: meMenuIcon } : { visible: false },
        WIRED_MENU: { onPointerTap: iconClick(() => toggleWindow('wired_menu')) },
        CAMERA: { onPointerTap: iconClick(startTakingPhoto) },
    };

    for (const toggle of toggles) {
        const inSource = source.visible.has(toggle.name);
        const inTarget = target.visible.has(toggle.name);
        // `applyAnimatedToggleLayout`: one state's item fades with the run, both states' stays.
        const alpha = (!running || (inSource && inTarget)) ? 1 : (inSource ? (1 - fraction) : fraction);
        const shown = running ? (inSource || inTarget) : inTarget;

        const binding = bindings[toggle.name];

        bindings[toggle.name] = {
            ...binding,
            visible: shown,
            alpha,
            // `onIconClick`: `toggleWindowVisibility(name)` - the icon's own action, then its EventLog - and `hideMatchingHint(name)`.
            ...(binding?.onPointerTap && {
                onPointerTap: (event: FederatedPointerEvent) => {
                    binding.onPointerTap?.(event);
                    trackEventLog(send, 'Toolbar', toggle.name, 'client.toolbar.clicked');
                    hideMatchingHint(toggle.name);
                },
            }),
        };
    }

    // `onCollapseToolsBar`: ignored while the run is on.
    const toggleCollapsed = () => {
        if (!running) setCollapsed(!collapsed);
    };

    bindings.collapse_left = { ...bindings.collapse_left, onPointerTap: toggleCollapsed };

    // The modules' icons, after the `line` wherever the run has it; gone once collapsed.
    if (moduleToolbarItems.length && (!collapsed || running)) {
        const lineX = running ? lerp(source.lineX, target.lineX) : target.lineX;

        bindings.toolbar_items = {
            children: (
                <Box
                    alpha={running ? (collapsed ? (1 - fraction) : fraction) : 1}
                    layout={{ position: 'absolute', left: lineX + 1 + ITEM_SPACING, top: 1, flexDirection: 'row', gap: ITEM_SPACING }}
                >
                    {moduleToolbarItems.map(item => (
                        <Box
                            key={item.key}
                            layout={{ width: MODULE_ICON_WIDTH, height: MODULE_ICON_HEIGHT, justifyContent: 'center', alignItems: 'center' }}
                        >
                            <ThemeImage
                                src={item.icon}
                                cursor="pointer"
                                tooltip={item.tooltip}
                                onPointerTap={iconClick(item.onClick)}
                            />
                        </Box>
                    ))}
                </Box>
            ),
        };
    }
    bindings.collapse_right = { ...bindings.collapse_right, onPointerTap: toggleCollapsed };

    const arrange = ({ find }: TemplateWindows) => {
        // `startCollapseAnimation`'s `setAutoRearrange(false)`, then `applyAnimatedToggleLayout`:
        // `toolbar_items` stops arranging itself and each item is placed between its x in the two
        // layouts. The windows are built afresh for every layout, so the next one after the run
        // arranges itself again (`clearAnimatedToggleLayout`'s `setAutoRearrange(true)`).
        if (running) {
            find('toolbar_items')?.setAutoRearrange(false);

            for (const toggle of toggles) {
                if (!toggle.inItems) continue;

                const from = source.x[toggle.name] ?? target.x[toggle.name];
                const to = target.x[toggle.name] ?? from;

                if (from !== undefined) find(toggle.name)?.setX(lerp(from, to));
            }

            find('line')?.setX(lerp(source.lineX, target.lineX));
        }

        // The `DropBounce` of a transition landing.
        if (inventoryLift) {
            const icon = find('icons_toolbar_inventory');

            icon?.setY(icon.y - inventoryLift);
        }

        if (meMenuLift) {
            const region = find('MEMENU');

            region?.setY(region.y - meMenuLift);
        }
    };

    return (
        <>
            <Region layout={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: BACKGROUND_HEIGHT }}>
                {/* `BottomBackgroundBorder.updatePosition`: x -10, `desktop.height - (height - 3)`, `desktop.width + 20` wide. */}
                <Box layout={{ position: 'absolute', left: -10, top: 3 }}>
                    <TemplateWindow
                        id="habbo-toolbar-com/bottom_background_border_xml"
                        width={viewportWidth + 20}
                    />
                </Box>
                <Box layout={{ position: 'absolute', left: 0, top: BACKGROUND_HEIGHT - barHeight }}>
                    <TemplateWindow
                        id={BAR_TEMPLATE}
                        width={barWidth}
                        bindings={bindings}
                        arrange={arrange}
                    />
                </Box>
                <FriendBarView ref={setRightGroup} />
            </Region>
            {(openMenu === 'me') && (
                <ToolbarExtendedMenu
                    templateId="habbo-toolbar-com/me_menu_new_view_xml"
                    height={guidesEnabled ? ME_MENU_GUIDE_HEIGHT : undefined}
                    items={[
                        { name: 'guide', visible: guidesEnabled && guideAllowed },
                        { name: 'talents', visible: talentTrackEnabled },
                        { name: 'minimail', visible: false },
                        { name: 'profile', visible: true, action: () => openProfile(send, ownUserId) },
                        // `onSubMenuItemClick('rooms')`: `navigator.showOwnRooms()`.
                        { name: 'rooms', visible: true, action: () => showOwnRooms(send) },
                        { name: 'clothes', visible: true, action: () => openClientLink(send, 'avatareditor/open') },
                        { name: 'forums', visible: true, action: () => openClientLink(send, 'groupforum/list/my'), unseenCount: unreadForumsCount },
                        { name: 'collectibles', visible: classicCollectiblesHubEnabled && collectiblesHubEnabled, action: () => openClientLink(send, 'collectibles/open') },
                        ...moduleMeMenuItems.map(item => ({ name: item.key, from: ME_MENU_MODULE_FROM, caption: item.caption, visible: true, action: item.onClick })),
                    ]}
                    listName={moduleMeMenuItems.length ? ME_MENU_LIST : undefined}
                    onClose={() => setToolbarMenu(undefined)}
                />
            )}
            {(openMenu === 'progression') && (
                <ToolbarExtendedMenu
                    templateId="habbo-toolbar-com/prog_menu_view_xml"
                    items={[
                        { name: 'dailytasks', visible: dailyTasksEnabled, action: () => openClientLink(send, 'dailytasks/open'), unseenCount: unseenDailyTasks },
                        // `onSubMenuItemClick('quests')`: `questEngine.showQuests()`.
                        { name: 'quests', visible: !hideQuests, action: () => showQuests(send) },
                        // No count: Habbo never sets `unseenAchievementsCount` (no `UnseenAchievementsCountUpdateEvent` is sent).
                        { name: 'achievements', visible: true, action: () => openClientLink(send, 'questengine/achievements') },
                        // `onSubMenuItemClick('leaderboards')`: the badge leaderboard's link (`groups/_-ge.getLink(0, -1, 0)`).
                        { name: 'leaderboards', visible: true, action: () => openClientLink(send, 'badge_leaderboard/0/-1/0') },
                        // `refreshRewardTrackUnseenCounts`: each track's item counts its own prizes (`trackCounts`).
                        { name: 'introduction', visible: true, action: () => openClientLink(send, 'reward_track/open/introduction'), unseenCount: rewardTrackCounts.get('introduction') },
                        // `onRewardTracks`: an `introduction` clone per other track, `rewardtrack_<id>`, opening the track.
                        ...menuTrackIds.map(trackId => ({
                            name: `${REWARD_TRACK_ITEM_PREFIX}${trackId}`,
                            from: 'introduction',
                            caption: `\${widget.progmenu.rewardtrack.${trackId}}`,
                            visible: true,
                            action: () => openClientLink(send, `reward_track/open/${trackId}`),
                            unseenCount: rewardTrackCounts.get(trackId),
                        })),
                    ]}
                    listName="menu_items"
                    onClose={() => setToolbarMenu(undefined)}
                />
            )}
        </>
    );
};
