import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText, WidgetSlot } from '#base/theme';

/** Row template `group_details_container` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutGroupDetailsContainerItemProps {
    captionGroupName?: string;
    groupBadgeImage?: ReactNode;
    layout?: BoxLayout;
    onGroupDetailsContainer?: () => void;
    visibleGroupBadgeImage?: boolean;
    visibleGroupName?: boolean;
}

export const FurniViewLayoutGroupDetailsContainerItem = ({ captionGroupName, groupBadgeImage, layout, onGroupDetailsContainer, visibleGroupBadgeImage, visibleGroupName }: FurniViewLayoutGroupDetailsContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="group_details_container"
            tooltip={t('infostand.group.link.tooltip')}
            onPointerTap={onGroupDetailsContainer}
            cursor="pointer"
            layout={{ width: 170, height: 40, flexShrink: 0, ...layout }}
        >
            {(visibleGroupBadgeImage ?? true) && (
                <WidgetSlot
                    widgetType="badge_image"
                    name="group_badge_image"
                    options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
                >
                    {groupBadgeImage}
                </WidgetSlot>
            )}
            {(visibleGroupName ?? true) && (
                <Region
                    name="group_name"
                    layout={{ position: 'absolute', left: 45, width: 128, top: 10, height: 37, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionGroupName ?? ''}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 128 }}
                    />
                </Region>
            )}
        </Region>
    );
};
