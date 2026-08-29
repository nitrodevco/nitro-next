import { BoxLayout, Region } from '#base/theme';

/** Row template `and_text` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutAndTextItemProps {
    captionAndText?: string;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutAndTextItem = ({ captionAndText, layout }: InventoryTradingWiredLayoutAndTextItemProps) => {
    return (
        <Region
            name="and_text"
            layout={{ width: 12, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionAndText ?? '&'}
        </Region>
    );
};
