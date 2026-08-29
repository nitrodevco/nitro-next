import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `furni_name` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutFurniNameItemProps {
    captionFurniName?: string;
    layout?: BoxLayout;
}

export const InventoryLayoutFurniNameItem = ({ captionFurniName, layout }: InventoryLayoutFurniNameItemProps) => {
    return (
        <Region
            name="furni_name"
            layout={{ width: 190, height: 17, flexShrink: 0, minWidth: 190, maxWidth: 190, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionFurniName ?? 'name'}
                textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
            />
        </Region>
    );
};
