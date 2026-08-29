import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `furni_extra` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutFurniExtraItemProps {
    captionFurniExtra?: string;
    layout?: BoxLayout;
}

export const InventoryLayoutFurniExtraItem = ({ captionFurniExtra, layout }: InventoryLayoutFurniExtraItemProps) => {
    return (
        <Region
            name="furni_extra"
            layout={{ width: 190, height: 17, flexShrink: 0, minWidth: 190, maxWidth: 190, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionFurniExtra ?? 'extra'}
                textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
            />
        </Region>
    );
};
