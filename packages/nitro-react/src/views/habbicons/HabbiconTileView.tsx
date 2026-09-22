/**
 * `HabbiconTileView` - one habbicon cell: `habbicon_view.xml`'s `tile_template` (the set grid)
 * and `tray_tile_template` (the tray groups), the same 50x50 region either way. A 48x48
 * `tile_background` fill, the style 2 `tile_border`, the 40x40 `bitmap` (the preview centred,
 * unscaled), the `locked_overlay`, the 14x14 `favorite_icon` and the 18x18 `claimable_icon`.
 *
 * `refresh`: a habbicon the user has neither owned nor can claim draws its preview through
 * `_colorTransform` (the asset slice's dimmed copy) under the locked overlay; an owned
 * favourite shows the star, a claimable one the corner badge. With no preview loaded Flash draws
 * an empty 40x40 bitmap. `updateLook` tints the fill and the border by owned / not owned and
 * idle / hovered / active (the tile the popup is open on).
 */
import { FederatedPointerEvent } from 'pixi.js';
import { useState } from 'react';

import { HabbiconEntryModel, useHabbiconsStore } from '#base/context/habbicons';
import { Border, LayoutImage, Region, ThemeImage } from '#base/theme';

/** `HabbiconTileView`'s `updateLook` colours: `[ idle, hover, active ]`, fill then outline. */
const OWNED_BASE = [ '#c3d3a7', '#cddfb2', '#d4e4b9' ] as const;
const OWNED_OUTLINE = [ '#99c176', '#bcd89f', '#d3e8bd' ] as const;
const NOT_OWNED_BASE = [ '#e0d6c2', '#e8dec9', '#ebdfcb' ] as const;
const NOT_OWNED_OUTLINE = [ '#d4c6ad', '#e6dcc8', '#eadfcd' ] as const;

export interface HabbiconTileViewProps {
    entry: HabbiconEntryModel;
    active: boolean;
    /** `_onClick`, with the tile's own window - the popup is placed over it. */
    onClick: (entry: HabbiconEntryModel, event: FederatedPointerEvent) => void;
}

export const HabbiconTileView = ({ entry, active, onClick }: HabbiconTileViewProps) => {
    const [ hovered, setHovered ] = useState(false);
    const unlocked = entry.owned || entry.claimable;
    const texture = useHabbiconsStore(x => (unlocked ? x.previews[entry.habbiconId] : x.lockedPreviews[entry.habbiconId]));
    const look = active ? 2 : (hovered ? 1 : 0);

    return (
        <Region
            cursor="pointer"
            onPointerTap={event => onClick(entry, event)}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            layout={{ width: 50, height: 50, flexShrink: 0 }}
        >
            <Region
                backgroundColor={(entry.owned ? OWNED_BASE : NOT_OWNED_BASE)[look]}
                layout={{ position: 'absolute', left: 1, top: 1, width: 48, height: 48 }}
            />
            <Border
                variant="2"
                tintColor={(entry.owned ? OWNED_OUTLINE : NOT_OWNED_OUTLINE)[look]}
                layout={{ position: 'absolute', left: 0, top: 0, width: 50, height: 50 }}
            />
            {texture && (
                <ThemeImage
                    texture={texture}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    layout={{ position: 'absolute', left: 5, top: 5, width: 40, height: 40 }}
                />
            )}
            {!unlocked && (
                <Region
                    backgroundColor="#ffffff"
                    backgroundAlpha={0.2}
                    layout={{ position: 'absolute', left: 0, top: 0, width: 50, height: 50 }}
                />
            )}
            {entry.owned && entry.favorite && (
                <ThemeImage
                    src={LayoutImage('catalog/icon_habbicon_fav.png')}
                    bitmap={{}}
                    layout={{ position: 'absolute', left: 2, top: 2, width: 14, height: 14 }}
                />
            )}
            {entry.claimable && !entry.owned && (
                <ThemeImage
                    src={LayoutImage('catalog/icon_notification_corner_mid.png')}
                    bitmap={{ stretchedX: false, stretchedY: false }}
                    layout={{ position: 'absolute', left: 31, top: 1, width: 18, height: 18 }}
                />
            )}
        </Region>
    );
};

/** `empty_tile_template`: the set grid's placeholder cells, a style 2 border at blend 0.2. */
export const HabbiconEmptyTileView = () => (
    <Region layout={{ width: 50, height: 50, flexShrink: 0 }}>
        <Border
            variant="2"
            tintColor="#c8be8d"
            blend={0.2}
            layout={{ position: 'absolute', left: 0, top: 0, width: 50, height: 50 }}
        />
    </Region>
);
