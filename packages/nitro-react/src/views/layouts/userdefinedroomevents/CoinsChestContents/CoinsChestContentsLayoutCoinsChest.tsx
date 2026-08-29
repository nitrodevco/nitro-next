import { BoxLayout, Region } from '#base/theme';

import { CoinsChestContentsLayoutMovingContainer, CoinsChestContentsLayoutMovingContainerProps } from './CoinsChestContentsLayoutMovingContainer';

/** Named region `coins_chest` of CoinsChestContentsLayout - configured through the parent's `coinsChest` prop. */
export interface CoinsChestContentsLayoutCoinsChestProps {
    layout?: BoxLayout;
    movingContainer?: CoinsChestContentsLayoutMovingContainerProps;
}

export const CoinsChestContentsLayoutCoinsChest = ({ layout, movingContainer }: CoinsChestContentsLayoutCoinsChestProps) => {
    return (
        <Region
            name="coins_chest"
            layout={{ position: 'absolute', left: 0, width: 413, top: 0, height: 263, justifyContent: 'center', ...layout }}
        >
            <CoinsChestContentsLayoutMovingContainer {...movingContainer} />
        </Region>
    );
};
