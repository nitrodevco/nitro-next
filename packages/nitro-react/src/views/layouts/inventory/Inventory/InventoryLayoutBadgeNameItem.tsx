import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `badgeName` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutBadgeNameItemProps {
    captionBadgeName?: string;
    layout?: BoxLayout;
}

export const InventoryLayoutBadgeNameItem = ({ captionBadgeName, layout }: InventoryLayoutBadgeNameItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="badgeName"
            layout={{ width: 211, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionBadgeName ?? t('inventory.badges.defaultdescription')}
                textStyle="text-style-u-headline-small"
            />
        </Region>
    );
};
