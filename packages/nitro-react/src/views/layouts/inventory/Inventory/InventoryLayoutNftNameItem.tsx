import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `nft_name` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutNftNameItemProps {
    captionNftName?: string;
    layout?: BoxLayout;
}

export const InventoryLayoutNftNameItem = ({ captionNftName, layout }: InventoryLayoutNftNameItemProps) => {
    return (
        <ThemeText
            text={captionNftName ?? 'name '}
            textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
            name="nft_name"
            verticalAlign="top"
            layout={{ width: 190, height: 17, flexShrink: 0, minWidth: 190, maxWidth: 190, ...layout }}
        />
    );
};
