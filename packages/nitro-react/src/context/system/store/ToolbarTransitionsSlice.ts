/**
 * The pictures flying into a toolbar icon - `BottomBarLeft.animateToIcon` (`IHabboToolbar.createTransitionToIcon`),
 * which `HabboCatalog.onPurchaseOK` and `RoomEngine.disposeObjectFurniture` / `disposeObjectWallItem`
 * start - and the icons they fly into.
 *
 * `toolbarIconNodes` are the toolbar's `getIconName` windows (`icons_toolbar_inventory`, `MEMENU`)
 * as the toolbar mounts them: `animateToIcon` reads the target's global rectangle when it starts,
 * and drops the picture when the toolbar does not show the icon. `toolbarTransitions` are the
 * `ToolBarTransition` windows on desktop 2, each a picture, where it starts and how far and long it
 * jumps. `toolbarIconBounces` are the `ToolBarBouncing[ <icon> ]` motions: the wait before the icon's
 * `DropBounce`, by icon - one per icon at a time, as `Motions.getMotionByTag` allows.
 */
import { Container as PixiContainer, Texture } from 'pixi.js';
import { StateCreator } from 'zustand';

/** The `HabboToolbarIconEnum` values a transition is aimed at in this client. */
export type ToolbarTransitionIcon = 'HTIE_ICON_INVENTORY' | 'HTIE_ICON_MEMENU';

export interface ToolbarTransition {
    readonly id: number;
    readonly texture: Texture;
    /** A picture made for the transition is destroyed with it (`disposesBitmap`); a shared asset texture is not. */
    readonly ownsTexture: boolean;
    /** The picture's top-left on the screen as it starts. */
    readonly x: number;
    readonly y: number;
    /** `JumpBy`'s delta: to the icon's top-left, 20 to the right of it. */
    readonly deltaX: number;
    readonly deltaY: number;
    readonly durationMs: number;
}

export interface ToolbarTransitionsSlice {
    toolbarIconNodes: Partial<Record<ToolbarTransitionIcon, PixiContainer>>;
    toolbarTransitions: ToolbarTransition[];
    /** The wait before each bouncing icon's drop, in ms. */
    toolbarIconBounces: Partial<Record<ToolbarTransitionIcon, number>>;
    setToolbarIconNode: (icon: ToolbarTransitionIcon, node: PixiContainer | null) => void;
    addToolbarTransition: (transition: Omit<ToolbarTransition, 'id'>) => void;
    removeToolbarTransition: (id: number) => void;
    setToolbarIconBounce: (icon: ToolbarTransitionIcon, waitMs: number | undefined) => void;
}

let nextTransitionId = 1;

export const createToolbarTransitionsSlice: StateCreator<ToolbarTransitionsSlice, [], [], ToolbarTransitionsSlice> = set => ({
    toolbarIconNodes: {},
    toolbarTransitions: [],
    toolbarIconBounces: {},
    setToolbarIconNode: (icon, node) => set(state => ({ toolbarIconNodes: { ...state.toolbarIconNodes, [icon]: node ?? undefined } })),
    addToolbarTransition: transition => set(state => ({ toolbarTransitions: [ ...state.toolbarTransitions, { ...transition, id: nextTransitionId++ } ] })),
    removeToolbarTransition: id => set(state => ({ toolbarTransitions: state.toolbarTransitions.filter(transition => transition.id !== id) })),
    setToolbarIconBounce: (icon, waitMs) => set(state => ({ toolbarIconBounces: { ...state.toolbarIconBounces, [icon]: waitMs } })),
});
