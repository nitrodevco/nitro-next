import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `chest_item_count` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutChestItemCountItemProps {
    captionChestItemCount?: string;
    layout?: BoxLayout;
    visibleChestItemCount?: boolean;
}

export const FurniViewLayoutChestItemCountItem = ({ captionChestItemCount, layout, visibleChestItemCount }: FurniViewLayoutChestItemCountItemProps) => {
    return (
        (visibleChestItemCount ?? false) && (
            <ThemeText
                text={captionChestItemCount ?? 'Items:'}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
                name="chest_item_count"
                verticalAlign="top"
                layout={{ width: 170, height: 13, flexShrink: 0, ...layout }}
            />
        )
    );
};
