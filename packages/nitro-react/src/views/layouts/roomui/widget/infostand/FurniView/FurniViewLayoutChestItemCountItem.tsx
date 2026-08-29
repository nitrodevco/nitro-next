import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `chest_item_count` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutChestItemCountItemProps {
    captionChestItemCount?: string;
    layout?: BoxLayout;
    visibleChestItemCount?: boolean;
}

export const FurniViewLayoutChestItemCountItem = ({ captionChestItemCount, layout, visibleChestItemCount }: FurniViewLayoutChestItemCountItemProps) => {
    return (
        (visibleChestItemCount ?? false) && (
            <Region
                name="chest_item_count"
                layout={{ width: 170, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
            >
                <ThemeText
                    text={captionChestItemCount ?? 'Items:'}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
                />
            </Region>
        )
    );
};
