import { useState } from 'react';

import { BoxLayout, TextInput } from '#base/theme';

/** Row template `withdraw_input` of CoinsChestContentsLayout - pass real rows through its `items…` slot. */
export interface CoinsChestContentsLayoutWithdrawInputItemProps {
    layout?: BoxLayout;
}

export const CoinsChestContentsLayoutWithdrawInputItem = ({ layout }: CoinsChestContentsLayoutWithdrawInputItemProps) => {
    const [ withdrawInputValue, setWithdrawInputValue ] = useState('');

    return (
        <TextInput
            value={withdrawInputValue}
            onChange={setWithdrawInputValue}
            layout={{ width: 27, height: 19, flexShrink: 0, minWidth: 27, maxWidth: 27, ...layout }}
        />
    );
};
