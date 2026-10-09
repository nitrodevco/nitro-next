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
 * the inventory's unseen items, the unseen achievements on progression, unread mini mail on the me
 * menu. The me menu's own picture is the user's face (`useMeMenuIcon`).
 *
 * The inventory icon's bitmap and the me menu region are what `animateToIcon` flies pictures into
 * (`createTransitionToIcon`), and what bounces as one lands: `Queue(Wait(duration + 8),
 * DropBounce(icon, 400, 12))` lifts it 12 px and lets it fall back with a bounce.
 */
import { CatalogTypeEnum, RoomObjectCategoryEnum } from '@nitrodevco/nitro-api';
import { QuitComposer } from '@nitrodevco/nitro-packets';
import { GetTicker } from '@nitrodevco/nitro-renderer';
import { Container as PixiContainer, Ticker } from 'pixi.js';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

import { goToHomeRoom, openClientLink, openProfile, showOwnRooms, showQuests, startTakingPhoto, toggleCatalog } from '#base/commands';
import { unseenSkipped, useAchievementsStore } from '#base/context/achievements';
import { useWebSocketContext } from '#base/context/communication';
import { getUnseenDailyTasksCount, useDailyTasksStore } from '#base/context/daily-tasks';
import { useGroupStore } from '#base/context/groups';
import { inventoryStore, useInventoryUnseenTotalCount } from '#base/context/inventory';
import { useMessengerStore } from '#base/context/messenger';
import { getRewardTrackClaimableCount, useRewardTrackStore } from '#base/context/reward-track';
import { useOwnRoomObjectId } from '#base/context/room';
import { ToolbarTransitionIcon, useConfigValue, useIsLandingViewVisible, useSystemActions, useSystemStore, useTranslation } from '#base/context/system';
import { PerkCodes, useOwnPerkAllowed, useOwnUserFigure, useOwnUserGender, useOwnUserId } from '#base/context/user';
import { useWiredShowToolbarMenuButton } from '#base/context/wired';
import { easeOutCubic, useRoomObjectSelect, useTween, useViewportSize } from '#base/hooks';
import { Box, Region, Template, TemplateBindings, TemplateElement, TemplateWindow, TemplateWindows, useLayoutEvent, useTemplate } from '#base/theme';
import { FriendBarView } from '#base/views/friend-bar/FriendBarView';
import { UnseenItemCounterView } from '#base/views/system/UnseenItemCounterView';

import { ToolbarExtendedMenu } from './ToolbarExtendedMenu';
import { useMeMenuIcon } from './useMeMenuIcon';

const BAR_TEMPLATE = 'habbo-toolbar-com/bottom_bar_left_xml';

/** `bottom_background_border`: 54 high, 3 of it below the desktop (`updatePosition`). */
const BACKGROUND_HEIGHT = 54;
/** `bottom_bar_left`: the window's height, and so its distance from the desktop's bottom (`checkSize`). */
const BAR_HEIGHT = 46;
/** `toolbar_items`' x in the window, and the space between its items. */
const ITEMS_X = 19;
const ITEM_SPACING = 8;
/** `computeToolbarAreaWidth` while collapsed. */
const COLLAPSED_AREA_WIDTH = 185;
/** `BottomBarLeft.COLLAPSE_ANIMATION_DURATION_MS`. */
const COLLAPSE_ANIMATION_DURATION_MS = 140;
/** `animateToIcon`'s `DropBounce(icon, 400, 12)`. */
const BOUNCE_DURATION_MS = 400;
const BOUNCE_HEIGHT = 12;
/** `me_menu_new_view`'s height after `setGuideToolVisibility`: `profile.bottom + 5`, the guide's being the same. */
const ME_MENU_HEIGHT = 55;

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

/** A `TOGGLE` window of the layout: its name and tags, and whether it is one of `toolbar_items`. */
interface ToolbarToggle {
    name: string;
    tags: readonly string[];
    width: number;
    inItems: boolean;
}

/** `groupChildrenWithTag("TOGGLE")`, and `toolbar_items`' children in their order. */
const readToggles = (template: Template): ToolbarToggle[] => {
    const toggles: ToolbarToggle[] = [];
    const walk = (element: TemplateElement, inItems: boolean) => {
        if (element.tags?.includes('TOGGLE') && element.name) toggles.push({ name: element.name, tags: element.tags, width: element.width, inItems });

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
    const [ openMenu, setOpenMenu ] = useState<'me' | 'progression' | undefined>(undefined);
    const [ collapsed, setCollapsed ] = useState(false);
    // 0 expanded, 1 collapsed, and in between while `onAnimationTimer` runs.
    const collapseProgress = useTween(collapsed ? 1 : 0, COLLAPSE_ANIMATION_DURATION_MS, easeOutCubic);
    const running = collapseProgress !== (collapsed ? 1 : 0);
    const ownFigure = useOwnUserFigure();
    const ownGender = useOwnUserGender();
    const ownUserId = useOwnUserId();
    const meMenuIcon = useMeMenuIcon(ownFigure, ownGender);
    const { toggleWindow, endRoomSession, setToolbarWidths } = useSystemActions();
    const { width: viewportWidth } = useViewportSize();
    const [ rightGroup, setRightGroup ] = useState<PixiContainer | null>(null);
    const [ rightWidth, setRightWidth ] = useState(0);
    const landingViewVisible = useIsLandingViewVisible();
    // `setToolbarState`'s `_local_4`: a room state, or collapsed from one.
    const inRoom = !landingViewVisible;
    const buildersClubEnabled = useConfigValue<boolean>('builders.club.enabled') === true;
    const storiesEnabled = useConfigValue<boolean>('toolbar.stories.enabled') === true;
    const gamesEnabled = useConfigValue<boolean>('games_icon_enabled') === true;
    const showWiredMenuButton = useWiredShowToolbarMenuButton();
    const cameraLaunchPosition = useConfigValue<string>('camera.launch.ui.position');
    const cameraAllowed = useOwnPerkAllowed(PerkCodes.Camera);
    const { send } = useWebSocketContext();
    const t = useTranslation();
    // `MeMenuNewController`: the guide (`guides.enabled` and the perk), talents (`talent.track.enabled`)
    // and collectibles (both hub flags) buttons; mini mail is always hidden.
    const guidesEnabled = useConfigValue<boolean>('guides.enabled') === true;
    const guideAllowed = useOwnPerkAllowed(PerkCodes.UseGuideTool);
    const talentTrackEnabled = useConfigValue<boolean>('talent.track.enabled') === true;
    const classicCollectiblesHubEnabled = useConfigValue<boolean>('classic.collectibles.hub.enabled') === true;
    const collectiblesHubEnabled = useConfigValue<boolean>('collectibles.hub.enabled') === true;
    // `ProgMenuController`: quests unless `toolbar.hide.quests`, daily tasks with `dailytasks.enabled`.
    const hideQuests = useConfigValue<boolean>('toolbar.hide.quests') === true;
    const dailyTasksEnabled = useConfigValue<boolean>('dailytasks.enabled') === true;
    const unseenInventoryCount = useInventoryUnseenTotalCount();
    const unseenMiniMailCount = useMessengerStore(x => x.miniMailUnreadCount);
    const unreadForumsCount = useGroupStore(x => x.unreadForumsCount);
    const skippedBadges = useConfigValue<string>('toolbar.unseen_notification.skipped_badge_ids');
    // `broadcastUnseenAchievementsCount`: unseen entries whose badge is not skipped.
    // `UnseenDailyTasksCountUpdateEvent`: the tasks done and not claimed.
    const unseenDailyTasks = useDailyTasksStore(x => getUnseenDailyTasksCount(x.tasks));
    const unseenAchievements = useAchievementsStore(x => x.unseen.filter(entry => !unseenSkipped(entry.badgeId, skippedBadges === undefined ? [] : skippedBadges.split(','))).length);
    // `UnseenRewardTrackRewardsCountUpdateEvent`: the reward tracks' prizes that can be claimed.
    const claimableRewardTrackPrizes = useRewardTrackStore(x => getRewardTrackClaimableCount(x.tracks));
    const { attachTarget: attachInventoryTarget, lift: inventoryLift } = useToolbarTransitionTarget('HTIE_ICON_INVENTORY');
    const { attachTarget: attachMeMenuTarget, lift: meMenuLift } = useToolbarTransitionTarget('HTIE_ICON_MEMENU');

    useLayoutEvent(rightGroup, () => setRightWidth(Math.ceil(rightGroup?.layout?.computedLayout.width ?? rightGroup?.width ?? 0)));

    /** `setToolbarState` then `checkSize`, for the expanded or the collapsed bar. */
    const layoutOf = (isCollapsed: boolean, toggles: ToolbarToggle[]): ToolbarLayout => {
        const state = isCollapsed ? 'VISIBLE_COLLAPSED' : (inRoom ? 'VISIBLE_ROOM' : 'VISIBLE_HOTEL');
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

        return {
            visible,
            x,
            lineX: next,
            width: (45 * (visible.size + 1)) + 10 + 150,
            areaWidth: isCollapsed ? COLLAPSED_AREA_WIDTH : (ITEMS_X + next),
        };
    };

    const toggles = template ? readToggles(template) : [];
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
        send(new QuitComposer({}));
        endRoomSession();
    };

    const ownRoomObjectId = useOwnRoomObjectId();
    const { selectObject } = useRoomObjectSelect();
    const simpleMeMenu = useConfigValue<boolean>('simple.memenu.enabled') === true;

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
        setOpenMenu(current => ((menu && (current !== menu)) ? menu : undefined));
        action?.();
    };

    const bindings: TemplateBindings = {
        collapse_left: { visible: !arrowsCollapsed },
        collapse_right: { visible: arrowsCollapsed },
        RECEPTION: { onPointerTap: iconClick(goToHotelView), tooltip: t('toolbar.icon.tooltip.exitroom.hotelview') },
        // HTIE_ICON_HOME -> `goToHomeRoom`: a room forward to the home room (its GetGuestRoomResult starts the session).
        HOME: { onPointerTap: iconClick(() => goToHomeRoom(send)) },
        NAVIGATOR: { onPointerTap: iconClick(() => toggleWindow('navigator')) },
        PROGRESSION: {
            onPointerTap: iconClick(undefined, 'progression'),
            children: (
                <UnseenItemCounterView
                    // `unseenProgMenuCount`: the achievements', the daily tasks' and the reward tracks' claimable prizes (`BottomBarLeft`).
                    count={unseenAchievements + unseenDailyTasks + claimableRewardTrackPrizes}
                    layout={{ position: 'absolute', right: 0, top: 0 }}
                />
            ),
        },
        GAMES: { onPointerTap: iconClick() },
        STORIES: { onPointerTap: iconClick() },
        CATALOGUE: { onPointerTap: iconClick(() => toggleCatalog(CatalogTypeEnum.Normal)) },
        BUILDER: { onPointerTap: iconClick(() => toggleCatalog(CatalogTypeEnum.BuildersClub)) },
        INVENTORY: {
            // `InventoryMainView.onHabboToolbarEvent`: the page it last showed.
            onPointerTap: iconClick(() => toggleWindow('inventory', { tab: inventoryStore.getState().lastPage })),
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

        bindings[toggle.name] = { ...bindings[toggle.name], visible: shown, alpha };
    }

    // `onCollapseToolsBar`: ignored while the run is on.
    const toggleCollapsed = () => {
        if (!running) setCollapsed(!collapsed);
    };

    bindings.collapse_left = { ...bindings.collapse_left, onPointerTap: toggleCollapsed };
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
                <Box layout={{ position: 'absolute', left: 0, top: BACKGROUND_HEIGHT - BAR_HEIGHT }}>
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
                    height={ME_MENU_HEIGHT}
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
                    ]}
                    onClose={() => setOpenMenu(undefined)}
                />
            )}
            {(openMenu === 'progression') && (
                <ToolbarExtendedMenu
                    templateId="habbo-toolbar-com/prog_menu_view_xml"
                    items={[
                        { name: 'dailytasks', visible: dailyTasksEnabled, action: () => openClientLink(send, 'dailytasks/open'), unseenCount: unseenDailyTasks },
                        // `onSubMenuItemClick('quests')`: `questEngine.showQuests()`.
                        { name: 'quests', visible: !hideQuests, action: () => showQuests(send) },
                        { name: 'achievements', visible: true, action: () => openClientLink(send, 'questengine/achievements'), unseenCount: unseenAchievements },
                        // `onSubMenuItemClick('leaderboards')`: the badge leaderboard's link (`groups/_-ge.getLink(0, -1, 0)`).
                        { name: 'leaderboards', visible: true, action: () => openClientLink(send, 'badge_leaderboard/0/-1/0') },
                        { name: 'introduction', visible: true, action: () => openClientLink(send, 'reward_track/open/introduction'), unseenCount: claimableRewardTrackPrizes },
                    ]}
                    onClose={() => setOpenMenu(undefined)}
                />
            )}
        </>
    );
};
