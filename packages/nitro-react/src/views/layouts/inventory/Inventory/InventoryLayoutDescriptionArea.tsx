import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, WidgetSlot } from '#base/theme';

import { InventoryLayoutBadgeDetailsList, InventoryLayoutBadgeDetailsListProps } from './InventoryLayoutBadgeDetailsList';

/** Named region `descriptionArea` of InventoryLayout - configured through the parent's `descriptionArea` prop. */
export interface InventoryLayoutDescriptionAreaProps {
    badgeDetailsList?: InventoryLayoutBadgeDetailsListProps;
    badgeImage?: ReactNode;
    layout?: BoxLayout;
    onWearBadgeButton?: () => void;
}

export const InventoryLayoutDescriptionArea = ({ badgeDetailsList, badgeImage, layout, onWearBadgeButton }: InventoryLayoutDescriptionAreaProps) => {
    const t = useTranslation();

    return (
        <Region
            name="descriptionArea"
            layout={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 78, ...layout }}
        >
            <Border
                variant="3"
                name="badge_desc_bg_box"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="badge_image"
                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 9, width: 50, top: 14, height: 50 }}
            >
                {badgeImage}
            </WidgetSlot>
            <InventoryLayoutBadgeDetailsList {...badgeDetailsList} />
            <Button
                variant="3"
                name="wearBadge_button"
                onPointerTap={onWearBadgeButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', right: 7, width: 179, top: 40, height: 28 }}
            >
                {t('inventory.badges.wearbadge')}
            </Button>
        </Region>
    );
};
