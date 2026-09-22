/**
 * One node of the collections and shop navigation lists - the `item_template` of `navigationList`
 * in `collectible_view.xml` with its renderer, `renderer/collections/CollectionsNavigationNodeRenderer`
 * or `ShopNavigationNodeRenderer`.
 *
 * Active or hovered, the node shows its `SELECTION_HILIGHT` (the `#b4b4ae` strip with the blue
 * highlight) and its title turns white over the layout's etching; otherwise the highlight is hidden
 * and the title takes its layout colour back with no etching (`setInactiveLook` writes
 * `etchingColor = 0`, so a node keeps the layout's etching only until it is first hovered or left).
 *
 * A collection node also shows how far the set is: the `progress_color_hint` strip at its left
 * once anything is collected, and while hovered the `progress_container` percentage in the set's
 * progress colour (`setProgressLook`).
 */
import { useState } from 'react';

import { getCollectionProgressColor } from '#base/context/collectibles';
import { Border, Region, ThemeText } from '#base/theme';

import { toCollectiblesCssColor } from './collectiblesColors';

/** `item_title`'s `etching_color`, which `setActiveLook` puts back. */
const TITLE_ETCHING = 0xFFB4B4AE;

export interface CollectiblesNavigationItemProps {
    title: string;
    active: boolean;
    /** A collection's `collectedItemCount` / `totalItemCount`; a shop category has none. */
    progress?: { collected: number; total: number };
    onSelect: () => void;
}

export const CollectiblesNavigationItem = ({ title, active, progress, onSelect }: CollectiblesNavigationItemProps) => {
    const [ hovered, setHovered ] = useState(false);
    // `updateLook` has run: the inactive look has no etching from then on.
    const [ lookUpdated, setLookUpdated ] = useState(false);
    const highlighted = active || hovered;

    // `active` changing also runs `updateLook` (`activate` / `deactivate`).
    const [ lastActive, setLastActive ] = useState(active);

    if (lastActive !== active) {
        setLastActive(active);
        setLookUpdated(true);
    }

    const collected = progress?.collected ?? 0;
    const progressColor = progress ? getCollectionProgressColor(progress.collected, progress.total) : 0;

    return (
        <Region
            name="item_template"
            onPointerTap={onSelect}
            onPointerOver={() => {
                setHovered(true);
                setLookUpdated(true);
            }}
            onPointerOut={() => {
                setHovered(false);
                setLookUpdated(true);
            }}
            cursor="pointer"
            layout={{ width: 180, height: 22, flexShrink: 0 }}
        >
            {highlighted && (
                <Region
                    backgroundColor="#b4b4ae"
                    layout={{ position: 'absolute', left: 1, width: 178, top: 0, height: 21 }}
                >
                    <Region
                        name="item_hilight_outer"
                        backgroundColor="#82d1ed"
                        layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 20 }}
                    >
                        <Region
                            name="item_hilight_inner"
                            backgroundColor="#63c5e9"
                            layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: 16 }}
                        />
                    </Region>
                </Region>
            )}
            <ThemeText
                text={title}
                textStyle="u_bold"
                textOptions={{ fill: highlighted ? '#ffffff' : '#666666' }}
                flashFormat={{ etchingColor: (highlighted || !lookUpdated) ? TITLE_ETCHING : 0, etchingPosition: 'top' }}
                name="item_title"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 7, top: 2 }}
            />
            {progress && (collected > 0) && hovered && (
                <Region
                    name="progress_container"
                    layout={{ position: 'absolute', left: 120, width: 36, top: 3, height: 15 }}
                >
                    <Border
                        variant="3"
                        name="progress_color"
                        tintColor={toCollectiblesCssColor(progressColor)}
                        layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 14 }}
                    />
                    <ThemeText
                        text={`${Math.trunc((collected * 100) / progress.total)}%`}
                        textStyle="u_regular"
                        textOptions={{ fill: '#ffffff', fontSize: 10, align: 'center' }}
                        name="progress_text"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 2, width: 32, top: 0 }}
                    />
                </Region>
            )}
            {progress && (collected > 0) && (
                <Region
                    name="progress_color_hint"
                    backgroundColor={toCollectiblesCssColor(progressColor)}
                    layout={{ position: 'absolute', left: 0, width: 4, top: 1, height: 19 }}
                />
            )}
        </Region>
    );
};
