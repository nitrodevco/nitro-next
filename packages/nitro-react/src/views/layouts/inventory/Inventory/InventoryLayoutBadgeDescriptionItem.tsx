import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `badgeDescription` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutBadgeDescriptionItemProps {
    captionBadgeDescription?: string;
    layout?: BoxLayout;
    visibleBadgeDescription?: boolean;
}

export const InventoryLayoutBadgeDescriptionItem = ({ captionBadgeDescription, layout, visibleBadgeDescription }: InventoryLayoutBadgeDescriptionItemProps) => {
    return (
        (visibleBadgeDescription ?? false) && (
            <ThemeText
                text={captionBadgeDescription ?? ''}
                textOptions={{ wordWrap: true, wordWrapWidth: 271 }}
                name="badgeDescription"
                verticalAlign="top"
                layout={{ width: 271, height: 4, flexShrink: 0, maxHeight: 28, ...layout }}
            />
        )
    );
};
