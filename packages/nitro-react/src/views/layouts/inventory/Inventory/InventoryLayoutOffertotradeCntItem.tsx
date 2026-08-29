import { useState } from 'react';

import { BoxLayout, TextInput } from '#base/theme';

/** Row template `offertotrade_cnt` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutOffertotradeCntItemProps {
    layout?: BoxLayout;
}

export const InventoryLayoutOffertotradeCntItem = ({ layout }: InventoryLayoutOffertotradeCntItemProps) => {
    const [ offertotradeCntValue, setOffertotradeCntValue ] = useState('');

    return (
        <TextInput
            value={offertotradeCntValue}
            onChange={setOffertotradeCntValue}
            layout={{ width: 50, height: 19, flexShrink: 0, minWidth: 50, maxWidth: 50, ...layout }}
        />
    );
};
