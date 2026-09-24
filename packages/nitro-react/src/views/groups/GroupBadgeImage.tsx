import { useConfigValue } from '#base/context/system';
import { BoxLayout, Region, useTextureFromUrl } from '#base/theme';

export interface GroupBadgeImageProps {
    /** The group's badge data string, as the details and member packets carry it. */
    badgeCode: string | undefined;
    /** `badge_image:zoom_x` / `zoom_y` - the details window draws the 39x39 badge at twice its size. */
    zoom?: number;
    tooltip?: string;
    onPress?: () => void;
    layout?: BoxLayout;
}

/**
 * A group's badge - the `badge_image` widget with `badge_image:type` `group`, drawn from
 * `badge.asset.group.url`. Every group window has one, and they all come from the same url, so the
 * texture cache draws each badge once however many windows name it.
 */
export const GroupBadgeImage = ({ badgeCode, zoom = 1, tooltip, onPress, layout }: GroupBadgeImageProps) => {
    const groupBadgeUrl = useConfigValue<string>('badge.asset.group.url') ?? '';
    const texture = useTextureFromUrl(badgeCode?.length ? groupBadgeUrl.replace('%badgedata%', badgeCode) : undefined);

    return (
        <Region
            tooltip={tooltip}
            cursor={onPress ? 'pointer' : undefined}
            onPointerTap={onPress}
            layout={{ alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            {texture && (
                <pixiSprite
                    texture={texture}
                    layout={{ width: texture.width * zoom, height: texture.height * zoom }}
                />
            )}
        </Region>
    );
};
