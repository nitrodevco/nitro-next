/**
 * A tab's `loading_contents` in `collectible_view.xml`: the 113 x 116 style 2 border (`#a4a49f`)
 * and the 75 x 75 `loading` bitmap over it, turning at 90 degrees a second while the tab is not
 * ready (`update`'s `§_-S2D§`). The shop's is 5 further right, as its container starts at -5.
 */
import { Border, LayoutImage, Region } from '#base/theme';

import { CollectiblesRotatingImage } from './CollectiblesRotatingImage';

/** `CollectionsTab.§_-S2D§`: the loading icon's degrees a second. */
export const COLLECTIBLES_LOADING_ROTATE_SPEED = 90;

export const CollectiblesLoadingView = ({ left = 0 }: { left?: number }) => (
    <Region
        name="loading_contents"
        layout={{ position: 'absolute', left, width: 485, top: 0, height: 429 }}
    >
        <Border
            variant="2"
            tintColor="#a4a49f"
            layout={{ position: 'absolute', left: 185, width: 113, top: 155, height: 116 }}
        />
        <CollectiblesRotatingImage
            src={LayoutImage('catalog/loading.png')}
            speed={COLLECTIBLES_LOADING_ROTATE_SPEED}
            active
            stretched
            left={205}
            top={175}
            width={75}
            height={75}
        />
    </Region>
);
