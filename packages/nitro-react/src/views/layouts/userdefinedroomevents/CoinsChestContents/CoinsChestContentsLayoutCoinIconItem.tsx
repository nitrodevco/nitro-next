import { BoxLayout, Icon } from '#base/theme';

/** Row template `coin_icon` of CoinsChestContentsLayout - pass real rows through its `items…` slot. */
export interface CoinsChestContentsLayoutCoinIconItemProps {
    layout?: BoxLayout;
}

export const CoinsChestContentsLayoutCoinIconItem = ({ layout }: CoinsChestContentsLayoutCoinIconItemProps) => {
    return (
        <Icon
            variant="35"
            name="coin_icon"
            layout={{ width: 13, height: 15, flexShrink: 0, ...layout }}
        />
    );
};
