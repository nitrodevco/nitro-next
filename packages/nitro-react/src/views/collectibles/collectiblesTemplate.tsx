/**
 * What the collectibles windows' code does to `collectible_view.xml`, shared by its tabs: the
 * loading view and the turning star (`update`), the previewer windows (`CollectibleProductPreviewer`),
 * the time bars, the item grid renderers (`AbstractCollectibleItemRenderer` and its subclasses) and
 * the navigation list nodes (`CollectionsNavigationNodeRenderer` / `ShopNavigationNodeRenderer`).
 */
import { useState } from 'react';

import { getCollectiblePreviewIcon } from '#base/commands';
import { CollectiblePreview, CollectibleProductInfo, getCollectionProgressColor } from '#base/context/collectibles';
import { LayoutImage, TemplateBindings, TemplateItem, TemplateWindows } from '#base/theme';
import { CollectiblesPreviewSlots, CollectiblesProductPreview } from '#base/views/shared/CollectiblesProductPreview';

import { CollectiblesRotatingImage } from './CollectiblesRotatingImage';

/** The hub's layout. */
export const COLLECTIBLES_TEMPLATE = 'habbo-catalog-com/collectible_view_xml';

/** `CollectionsTab.BG_STAR_ROTATE_SPEED` / `CollectiblesRewardBoxView.BG_STAR_ROTATE_SPEED`. */
export const COLLECTIBLES_BG_STAR_ROTATE_SPEED = 20;
/** `CollectionsTab.§_-S2D§`: the loading icon's degrees a second. */
const LOADING_ROTATE_SPEED = 90;

/** The effect previewers' temporary rooms: one per previewer that can be up at once. */
const HUB_PREVIEW_ROOM_ID = 1001;

/**
 * A static bitmap the tab's `update` turns (`rotation += speed * delta`): the template draws no face
 * for it, and the port's sprite turns in its place. `blend` is the layout's: a window drawn into its
 * parent's graphic context fades only its own face, which the sprite now is.
 */
export const rotatingBitmapBinding = (src: string, size: number, speed: number, active: boolean, stretched: boolean, blend = 1): TemplateBindings[string] => ({
    asset: '',
    children: (
        <CollectiblesRotatingImage
            src={src}
            speed={speed}
            active={active}
            stretched={stretched}
            alpha={blend}
            left={0}
            top={0}
            width={size}
            height={size}
        />
    ),
});

/**
 * A tab's `setReady` / `updateReadyState`: `loaded_content` or `loading_contents`, whose
 * `loading_icon` turns while the tab waits. `loaded` is what else decides `loaded_content` (the
 * rewards tab shows it only with claims).
 */
export const collectiblesLoadingBindings = (ready: boolean, loaded = true): TemplateBindings => ({
    loaded_content: { visible: ready && loaded },
    loading_contents: { visible: !ready },
    loading_icon: rotatingBitmapBinding(LayoutImage('habbo-window-manager-com/loading.png'), 75, LOADING_ROTATE_SPEED, !ready, true),
});

/** A preview's `bg_star` (`stretched` off, blend 0.35), turning while the tab is ready. */
export const collectiblesStarBinding = (active: boolean): TemplateBindings[string] => rotatingBitmapBinding(LayoutImage('habbo-window-manager-com/bg_star_300x300.png'), 300, COLLECTIBLES_BG_STAR_ROTATE_SPEED, active, false, 0.35);

/**
 * A `CollectibleProductPreviewer` over a layout's windows. `clearPreviewer` hides them all and each
 * result shows one: the static bitmaps (`unknown_image`, `placeholder_image`) are the layout's own,
 * and what the others show - a furni or icon in the bitmap, a badge, pet, avatar or effect widget -
 * the port draws in `host`, the bitmap window, with `slots` placed from it.
 */
export interface CollectiblesPreviewer {
    /** The bitmap window (`product_preview`, a grid item's `BITMAP`), shown to hold the port's preview. */
    host: string;
    slots: CollectiblesPreviewSlots;
    /** The widget windows the layout has, hidden: the port draws theirs in `host`. */
    widgets: readonly string[];
    /** `setUnknownImage`'s and `setPlaceholder`'s windows, where the previewer has them. */
    unknown?: string;
    placeholder?: string;
}

export const collectiblesPreviewerBindings = (previewer: CollectiblesPreviewer, preview: CollectiblePreview): TemplateBindings => ({
    ...Object.fromEntries(previewer.widgets.map(name => [ name, { visible: false } ])),
    ...(previewer.unknown && { [previewer.unknown]: { visible: preview.kind === 'unknown' } }),
    ...(previewer.placeholder && { [previewer.placeholder]: { visible: preview.kind === 'placeholder' } }),
    [previewer.host]: {
        visible: true,
        children: (
            <CollectiblesProductPreview
                preview={preview}
                slots={previewer.slots}
            />
        ),
    },
});

/**
 * The previewer of a tab's `preview_container` (`collection_preview_bg`): every window but the
 * minting tab's, which has only the bitmap, the avatar and the placeholder. The slots are the
 * windows' rects from `product_preview`, at (-5, -20).
 */
export const collectiblesHubPreviewer = (mint = false): CollectiblesPreviewer => ({
    host: 'preview_container/product_preview',
    slots: mint
        ? { productPreview: { left: 0, top: 0, width: 300, height: 300 }, avatar: { left: 105, top: 73, width: 90, height: 130 } }
        : {
                productPreview: { left: 0, top: 0, width: 300, height: 300 },
                badge: { left: 110, top: 110, width: 80, height: 80, zoom: 2 },
                pet: { left: 58, top: 80, width: 180, height: 140, zoom: 2, shrinkOnOverflow: true },
                avatar: { left: 105, top: 73, width: 90, height: 130 },
                effect: { left: 98, top: 20, width: 100, height: 260, roomId: HUB_PREVIEW_ROOM_ID },
            },
    widgets: [ 'avatar_image_widget', 'badge_image_widget', 'pet_image_widget', 'effect_image_widget' ].map(name => `preview_container/${name}`),
    unknown: mint ? undefined : 'preview_container/unknown_image',
    placeholder: 'preview_container/placeholder_image',
});

/** The previewer of a grid item (`bitmapWindow`, `badgeImageWindow`, `petImageWindow`, `unknownImageWindow`): the `BITMAP` at (2, 4). */
const GRID_ITEM_PREVIEWER: CollectiblesPreviewer = {
    host: 'bitmap',
    slots: {
        productPreview: { left: 0, top: 0, width: 46, height: 40 },
        badge: { left: 3, top: 0, width: 40, height: 40, zoom: 1 },
        pet: { left: 3, top: 0, width: 40, height: 40, zoom: 1, shrinkOnOverflow: true },
    },
    widgets: [ 'badge_image_widget', 'pet_image_widget' ],
    unknown: 'unknown_image',
};

/**
 * A reward claim's previewer: its `BITMAP` at (10, 9) and the badge widget over it. The layout's
 * `pet_image_widget` is a `badge_image` widget, so a pet claim shows no image - as in Flash.
 */
const REWARD_ITEM_PREVIEWER: CollectiblesPreviewer = {
    host: 'bitmap',
    slots: {
        productPreview: { left: 0, top: 0, width: 32, height: 32 },
        badge: { left: 0, top: 0, width: 32, height: 32, zoom: 1 },
    },
    widgets: [ 'badge_image_widget', 'pet_image_widget' ],
    unknown: 'unknown_image',
};

/**
 * A time bar - `progress_bar`, whose `progress_bar_top` / `progress_bar_bottom` halves the tab
 * widens to `fill` of `progress_padded_bar` and colours, under `progress_bar_text`. The halves are
 * `background` containers, so a colour with no alpha byte fills nothing.
 */
export interface CollectiblesTimeBar {
    fill: number;
    topColor?: number;
    bottomColor?: number;
    text: string;
}

export const collectiblesTimeBarBindings = (bar: CollectiblesTimeBar): TemplateBindings => ({
    progress_bar_top: { color: bar.topColor },
    progress_bar_bottom: { color: bar.bottomColor },
    progress_bar_text: { caption: bar.text },
});

export const arrangeCollectiblesTimeBar = ({ find }: TemplateWindows, bar: CollectiblesTimeBar) => {
    find('progress_bar_top')?.setWidth(bar.fill);
    find('progress_bar_bottom')?.setWidth(bar.fill);
};

/** `AbstractCollectibleItemRenderer.incompleteColoring` / `completeColoring`: `[ background, outline ]`. */
const COLLECTIBLE_ITEM_COLORING = {
    incomplete: { active: [ 15132390, 16777215 ], hovered: [ 14409183, 16119544 ], normal: [ 13159891, 9412017 ] },
    complete: { active: [ 14872032, 16777215 ], hovered: [ 14346200, 16119544 ], normal: [ 13820623, 8823170 ] },
} as const;

/** `updateColoring`: hovered over active over normal. */
const itemColoringBindings = (complete: boolean, hovered: boolean, active: boolean): TemplateBindings => {
    const coloring = complete ? COLLECTIBLE_ITEM_COLORING.complete : COLLECTIBLE_ITEM_COLORING.incomplete;
    const [ background, outline ] = hovered ? coloring.hovered : (active ? coloring.active : coloring.normal);

    return { border_outline: { color: outline }, border_background: { color: background } };
};

/** `updateVisuals`' amount border: green once held, grey before. */
const AMOUNT_BORDER_COMPLETE = 3374080;
const AMOUNT_BORDER_INCOMPLETE = 7441834;

/**
 * Which item, and the pointer over it - one per grid or list, as only one item is under the pointer
 * (`WME_OVER` / `WME_OUT`).
 */
export const useCollectiblesHover = () => {
    const [ hovered, setHovered ] = useState<string | null>(null);

    return {
        isHovered: (key: string) => hovered === key,
        handlers: (key: string) => ({
            onPointerOver: () => setHovered(key),
            onPointerOut: () => setHovered(value => ((value === key) ? null : value)),
        }),
    };
};

export type CollectiblesHover = ReturnType<typeof useCollectiblesHover>;

export interface CollectibleGridItemOptions {
    key: string;
    /** The grid's `item_template`, by path in the tab's container. */
    from: string;
    /** `CollectibleItemRenderer`, `MintInventoryItemRenderer` or `ShopCollectibleItemRenderer`. */
    kind: 'collection' | 'mint' | 'shop';
    info: CollectibleProductInfo;
    active: boolean;
    hover: CollectiblesHover;
    /** The shop's price (`emeraldPrice`). */
    price?: number;
    onSelect: () => void;
}

/**
 * One grid item, a clone of the grid's `item_template` with its renderer: the product's icon
 * (`CollectiblesController.previewIcon`), the colouring - from the complete or incomplete palette by
 * whether any are held, the minting grid's incomplete either way - and `updateVisuals`: the amount
 * held and its border, and the checkmark once held (`CollectibleItemRenderer`); `x<amount>` or `-`
 * (`MintInventoryItemRenderer`); the emerald price (`ShopCollectibleItemRenderer`).
 */
export const collectibleGridItem = ({ key, from, kind, info, active, hover, price, onSelect }: CollectibleGridItemOptions): TemplateItem => {
    const complete = info.amount > 0;
    const counted = (kind !== 'shop');

    return {
        key,
        from,
        bindings: {
            '': { onPointerTap: onSelect, ...hover.handlers(key) },
            ...itemColoringBindings((kind === 'mint') ? false : complete, hover.isHovered(key), active),
            ...collectiblesPreviewerBindings(GRID_ITEM_PREVIEWER, getCollectiblePreviewIcon(info)),
            number: { caption: counted ? (((kind === 'mint') && !complete) ? '-' : `x${info.amount}`) : String(price ?? 0) },
            ...(counted && { text_border: { color: complete ? AMOUNT_BORDER_COMPLETE : AMOUNT_BORDER_INCOMPLETE } }),
            ...((kind === 'collection') && { checkmark_icon: { visible: complete } }),
        },
    };
};

/**
 * One reward claim, a clone of `itemlist`'s `item_template` with its `RewardCollectibleItemRenderer`:
 * the item's icon and name, how many are left to claim, its collection, its expiry and the wallet
 * it is for, coloured as it is hovered. A click does nothing.
 */
export const collectibleRewardItem = (key: string, info: CollectibleProductInfo, texts: { name: string; amount: string; collection: string; expires: string; wallet: string }, hover: CollectiblesHover): TemplateItem => ({
    key,
    from: 'itemlist/item_template',
    bindings: {
        '': hover.handlers(key),
        ...itemColoringBindings(false, hover.isHovered(key), false),
        ...collectiblesPreviewerBindings(REWARD_ITEM_PREVIEWER, getCollectiblePreviewIcon(info)),
        '#NAME_TITLE': { caption: texts.name },
        '#AMOUNT_TITLE': { caption: texts.amount },
        collection_text: { caption: texts.collection },
        expires_text: { caption: texts.expires },
        wallet_text: { caption: texts.wallet },
    },
});

/**
 * The navigation list's nodes' looks. Active or hovered, a node shows its `SELECTION_HILIGHT` and
 * its title turns white with the layout's etching; otherwise the highlight is hidden and the title
 * takes its layout colour back with no etching (`setInactiveLook` writes `etchingColor = 0`, so a
 * node keeps the layout's etching only until its look is first updated - hovered, left, activated
 * or deactivated). The nodes are made anew whenever the list is filled (`list`), with their
 * layout's etching back.
 */
export const useCollectiblesNavigationLooks = (list: unknown, activeKey: string | null) => {
    const hover = useCollectiblesHover();
    const [ looks, setLooks ] = useState({ list, activeKey, updated: new Set<string>() });
    let current = looks;

    if (current.list !== list) current = { list, activeKey, updated: new Set() };
    else if (current.activeKey !== activeKey) current = { list, activeKey, updated: new Set([ ...current.updated, ...[ current.activeKey, activeKey ].filter((key): key is string => key !== null) ]) };

    if (current !== looks) setLooks(current);

    return {
        hover,
        handlers: (key: string) => ({
            onPointerOver: () => {
                hover.handlers(key).onPointerOver();
                setLooks(value => ({ ...value, updated: new Set([ ...value.updated, key ]) }));
            },
            onPointerOut: () => {
                hover.handlers(key).onPointerOut();
                setLooks(value => ({ ...value, updated: new Set([ ...value.updated, key ]) }));
            },
        }),
        isUpdated: (key: string) => current.updated.has(key),
    };
};

export type CollectiblesNavigationLooks = ReturnType<typeof useCollectiblesNavigationLooks>;

export interface CollectiblesNavigationNodeOptions {
    key: string;
    title: string;
    active: boolean;
    looks: CollectiblesNavigationLooks;
    /** A collection's `collectedItemCount` / `totalItemCount`; a shop category has none. */
    progress?: { collected: number; total: number };
    onSelect: () => void;
}

/**
 * One node, a clone of `navigationList`'s `item_template`. A collection's node also shows how far
 * the set is (`setProgressLook`): the `progress_color_hint` strip at its left once anything is
 * collected, and while hovered the `progress_container` percentage in the set's progress colour.
 */
export const collectiblesNavigationNode = ({ key, title, active, looks, progress, onSelect }: CollectiblesNavigationNodeOptions): TemplateItem => {
    const hovered = looks.hover.isHovered(key);
    const highlighted = active || hovered;
    const collected = progress?.collected ?? 0;
    const color = progress ? getCollectionProgressColor(progress.collected, progress.total) : 0;

    return {
        key,
        from: 'navigationList/item_template',
        bindings: {
            '': { onPointerTap: onSelect, ...looks.handlers(key) },
            '#SELECTION_HILIGHT': { visible: highlighted },
            '#ITEM_TITLE': {
                caption: title,
                ...(highlighted && { color: 0xFFFFFF }),
                ...(!highlighted && looks.isUpdated(key) && { etchingColor: 0 }),
            },
            ...(progress && {
                progress_container: { visible: (collected > 0) && hovered },
                progress_color_hint: { visible: collected > 0, color: (color | 0xFF000000) >>> 0 },
                'progress_container/progress_color': { color },
                'progress_container/progress_text': { caption: `${Math.trunc((collected * 100) / progress.total)}%` },
            }),
        },
    };
};
