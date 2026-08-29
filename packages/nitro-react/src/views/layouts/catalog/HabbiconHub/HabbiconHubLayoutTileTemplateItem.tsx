import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `tile_template` of HabbiconHubLayout - pass real rows through its `items…` slot. */
export interface HabbiconHubLayoutTileTemplateItemProps {
    layout?: BoxLayout;
    lockedOverlay?: ReactNode;
    onTileTemplate?: () => void;
    srcBitmap?: string;
    srcClaimableIcon?: string;
    srcFavoriteIcon?: string;
    tileBackground?: ReactNode;
    tintBitmap?: string;
    visibleBitmap?: boolean;
    visibleClaimableIcon?: boolean;
    visibleFavoriteIcon?: boolean;
    visibleLockedOverlay?: boolean;
    visibleTileBackground?: boolean;
    visibleTileBorder?: boolean;
}

export const HabbiconHubLayoutTileTemplateItem = ({ layout, lockedOverlay, onTileTemplate, srcBitmap, srcClaimableIcon, srcFavoriteIcon, tileBackground, tintBitmap, visibleBitmap, visibleClaimableIcon, visibleFavoriteIcon, visibleLockedOverlay, visibleTileBackground, visibleTileBorder }: HabbiconHubLayoutTileTemplateItemProps) => {
    return (
        <Region
            name="tile_template"
            onPointerTap={onTileTemplate}
            cursor="pointer"
            layout={{ width: 50, height: 50, flexShrink: 0, ...layout }}
        >
            {(visibleTileBackground ?? true) && (
                <Region
                    name="tile_background"
                    backgroundColor="#f8ebd6"
                    layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1 }}
                >
                    {tileBackground}
                </Region>
            )}
            {(visibleTileBorder ?? true) && (
                <Border
                    variant="2"
                    name="tile_border"
                    tintColor="#c8be8d"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
            )}
            {(visibleBitmap ?? true) && (
                <ThemeImage
                    name="bitmap"
                    src={srcBitmap}
                    tint={tintBitmap}
                    layout={{ position: 'absolute', left: 5, width: 40, top: 5, height: 40, minWidth: 40, maxWidth: 40 }}
                />
            )}
            {(visibleLockedOverlay ?? false) && (
                <Region
                    name="locked_overlay"
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    {lockedOverlay}
                </Region>
            )}
            {(visibleFavoriteIcon ?? false) && (
                <ThemeImage
                    name="favorite_icon"
                    src={srcFavoriteIcon ?? layoutImage('icon_habbicon_fav.png')}
                    layout={{ position: 'absolute', left: 2, width: 14, top: 2, height: 14 }}
                />
            )}
            {(visibleClaimableIcon ?? false) && (
                <ThemeImage
                    name="claimable_icon"
                    src={srcClaimableIcon ?? layoutImage('icon_notification_corner_mid.png')}
                    layout={{ position: 'absolute', left: 31, width: 18, top: 1, height: 18 }}
                />
            )}
        </Region>
    );
};
