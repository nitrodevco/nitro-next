/**
 * `HabbiconTileView` - one habbicon cell, a clone of `habbicon_view.xml`'s `tile_template` (the set
 * grid) or `tray_tile_template` (a tray group's grid): the `tile_background` fill, the `tile_border`,
 * the 40x40 `bitmap`, the `locked_overlay`, the `favorite_icon` and the `claimable_icon`.
 *
 * `refresh`: a habbicon the user has neither owned nor can claim draws its preview through
 * `_colorTransform` (the asset slice's dimmed copy) under the locked overlay; an owned favourite
 * shows the star, a claimable one the corner badge. With no preview loaded Flash draws an empty
 * 40x40 bitmap. `updateLook` tints the fill and the border by owned / not owned and idle /
 * hovered / active (the tile the popup is open on).
 *
 * `HabbiconSetPageView.addEmptySlots` fills the set grid up with `empty_tile_template` clones.
 */
import { FederatedPointerEvent, Texture } from 'pixi.js';

import { HabbiconEntryModel } from '#base/context/habbicons';
import { TemplateItem, ThemeImage } from '#base/theme';

/** `HabbiconTileView`'s `updateLook` colours: `[ idle, hover, active ]`, fill then outline. */
const OWNED_BASE = [ 0xc3d3a7, 0xcddfb2, 0xd4e4b9 ] as const;
const OWNED_OUTLINE = [ 0x99c176, 0xbcd89f, 0xd3e8bd ] as const;
const NOT_OWNED_BASE = [ 0xe0d6c2, 0xe8dec9, 0xebdfcb ] as const;
const NOT_OWNED_OUTLINE = [ 0xd4c6ad, 0xe6dcc8, 0xeadfcd ] as const;

export interface HabbiconTileItemOptions {
    /** The prototype: `tile_template` or `tray_tile_template`. */
    from: 'tile_template' | 'tray_tile_template';
    entry: HabbiconEntryModel;
    /** The preview `refresh` draws: the dimmed one for a locked habbicon. */
    texture: Texture | undefined;
    active: boolean;
    hovered: boolean;
    /** `_onClick`, with the tile's own window - the popup is placed over it. */
    onClick: (entry: HabbiconEntryModel, event: FederatedPointerEvent) => void;
    /** `WME_OVER` / `WME_OUT`: the tile hovered, or no longer. */
    onHover: (entry: HabbiconEntryModel, hovered: boolean) => void;
}

/** One tile, keyed by its entry. */
export const habbiconTileItem = ({ from, entry, texture, active, hovered, onClick, onHover }: HabbiconTileItemOptions): TemplateItem => {
    const unlocked = entry.owned || entry.claimable;
    const look = active ? 2 : (hovered ? 1 : 0);

    return {
        key: `habbicon-${entry.id}`,
        from,
        bindings: {
            '': {
                onPointerTap: event => onClick(entry, event),
                onPointerOver: () => onHover(entry, true),
                onPointerOut: () => onHover(entry, false),
            },
            tile_background: { color: (0xff000000 | (entry.owned ? OWNED_BASE : NOT_OWNED_BASE)[look]) >>> 0 },
            tile_border: { color: (0xff000000 | (entry.owned ? OWNED_OUTLINE : NOT_OWNED_OUTLINE)[look]) >>> 0 },
            bitmap: {
                children: texture && (
                    <ThemeImage
                        texture={texture}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                        layout={{ position: 'absolute', left: 0, top: 0, width: 40, height: 40 }}
                    />
                ),
            },
            locked_overlay: { visible: !unlocked },
            favorite_icon: { visible: entry.owned && entry.favorite },
            claimable_icon: { visible: entry.claimable && !entry.owned },
        },
    };
};

/** `addEmptySlots`: one `empty_tile_template` clone. */
export const habbiconEmptyTileItem = (slot: number): TemplateItem => ({ key: `empty-${slot}`, from: 'empty_tile_template' });
