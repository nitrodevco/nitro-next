import { useConfigValue, useTranslation } from '#base/context/system';
import { BoxLayout, Region, useTextureFromUrl } from '#base/theme';

export interface InfostandBadgeViewProps {
    /** A badge code, or for a group badge the badge data string. */
    code: string | undefined;
    group?: boolean;
    /** Owners of the badge, shown in the details for badges few people have. */
    ownerCount?: number;
    onPress?: () => void;
    layout?: BoxLayout;
}

/**
 * One badge slot of the infostand - the `badge_image` widget. A user badge is drawn from
 * `badge.asset.url`, a group badge from `badge.asset.group.url`; hovering names it, as
 * `InfoStandUserView.showBadgeInfo` did.
 */
export const InfostandBadgeView = ({ code, group = false, ownerCount, onPress, layout }: InfostandBadgeViewProps) => {
    const badgeUrl = useConfigValue<string>('badge.asset.url') ?? '';
    const groupBadgeUrl = useConfigValue<string>('badge.asset.group.url') ?? '';
    const t = useTranslation();

    const url = !code?.length
        ? undefined
        : (group ? groupBadgeUrl.replace('%badgedata%', code) : badgeUrl.replace('%badgename%', code));
    const texture = useTextureFromUrl(url);

    const tooltip = (code && !group)
        ? [ t(`badge_name_${code}`, code), t(`badge_desc_${code}`, ''), (ownerCount && (ownerCount > 0)) ? t('badge.owner.count', '', { count: String(ownerCount) }) : '' ].filter(line => line.length).join('\n')
        : undefined;

    return (
        <Region
            tooltip={tooltip}
            cursor={onPress ? 'pointer' : undefined}
            onPointerTap={onPress}
            layout={{ width: 42, height: 42, alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            {texture && (
                <pixiSprite
                    texture={texture}
                    layout={{ width: texture.width, height: texture.height }}
                />
            )}
        </Region>
    );
};
