import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `furni_description` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutFurniDescriptionItemProps {
    captionFurniDescription?: string;
    layout?: BoxLayout;
}

export const InventoryLayoutFurniDescriptionItem = ({ captionFurniDescription, layout }: InventoryLayoutFurniDescriptionItemProps) => {
    return (
        <ThemeText
            text={captionFurniDescription ?? 'description lakjdsf lkjas dflkjalkjasdflkja sdlfkj asdf'}
            textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
            name="furni_description"
            verticalAlign="top"
            layout={{ width: 190, height: 30, flexShrink: 0, minWidth: 190, maxWidth: 190, maxHeight: 45, ...layout }}
        />
    );
};
