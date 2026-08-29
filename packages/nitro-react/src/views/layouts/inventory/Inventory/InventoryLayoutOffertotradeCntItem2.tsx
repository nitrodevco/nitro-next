import { useState } from 'react';

import { BoxLayout, TextInput } from '#base/theme';

/** Row template `offertotrade_cnt` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutOffertotradeCntItem2Props {
    layout?: BoxLayout;
}

export const InventoryLayoutOffertotradeCntItem2 = ({ layout }: InventoryLayoutOffertotradeCntItem2Props) => {
    const [ offertotradeCntValue, setOffertotradeCntValue ] = useState('');

    return (
        <TextInput
            value={offertotradeCntValue}
            onChange={setOffertotradeCntValue}
            layout={{ width: 30, height: 19, flexShrink: 0, minWidth: 30, maxWidth: 30, ...layout }}
        />
    );
};
