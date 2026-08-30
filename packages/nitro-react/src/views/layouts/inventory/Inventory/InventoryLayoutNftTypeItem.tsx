import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `nft_type` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutNftTypeItemProps {
    captionNftType?: string;
    layout?: BoxLayout;
}

export const InventoryLayoutNftTypeItem = ({ captionNftType, layout }: InventoryLayoutNftTypeItemProps) => {
    return (
        <ThemeText
            text={captionNftType ?? 'Type: furni fdgfgdf'}
            textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
            name="nft_type"
            verticalAlign="top"
            layout={{ width: 190, height: 17, flexShrink: 0, minWidth: 190, maxWidth: 190, maxHeight: 45, ...layout }}
        />
    );
};
