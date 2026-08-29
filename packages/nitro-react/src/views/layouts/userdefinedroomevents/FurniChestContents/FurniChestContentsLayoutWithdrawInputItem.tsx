import { useState } from 'react';

import { BoxLayout, TextInput } from '#base/theme';

/** Row template `withdraw_input` of FurniChestContentsLayout - pass real rows through its `items…` slot. */
export interface FurniChestContentsLayoutWithdrawInputItemProps {
    layout?: BoxLayout;
}

export const FurniChestContentsLayoutWithdrawInputItem = ({ layout }: FurniChestContentsLayoutWithdrawInputItemProps) => {
    const [ withdrawInputValue, setWithdrawInputValue ] = useState('');

    return (
        <TextInput
            value={withdrawInputValue}
            onChange={setWithdrawInputValue}
            layout={{ width: 30, height: 19, flexShrink: 0, minWidth: 30, maxWidth: 30, ...layout }}
        />
    );
};
