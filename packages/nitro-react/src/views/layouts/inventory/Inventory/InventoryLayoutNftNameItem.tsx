import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `nft_name` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutNftNameItemProps {
    captionNftName?: string;
    layout?: BoxLayout;
}

export const InventoryLayoutNftNameItem = ({ captionNftName, layout }: InventoryLayoutNftNameItemProps) => {
    return (
        <Region
            name="nft_name"
            layout={{ width: 190, height: 17, flexShrink: 0, minWidth: 190, maxWidth: 190, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionNftName ?? 'name '}
                textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
            />
        </Region>
    );
};
