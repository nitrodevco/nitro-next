import { useState } from 'react';

import { Border, BoxLayout, TextInput } from '#base/theme';

/** Row template `capacity_input_border` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutCapacityInputBorderItemProps {
    layout?: BoxLayout;
    visibleCapacityInput?: boolean;
}

export const ChestGenericLayoutCapacityInputBorderItem = ({ layout, visibleCapacityInput }: ChestGenericLayoutCapacityInputBorderItemProps) => {
    const [ capacityInputValue, setCapacityInputValue ] = useState('');

    return (
        <Border
            variant="4"
            name="capacity_input_border"
            layout={{ width: 65, height: 22, flexShrink: 0, ...layout }}
        >
            {(visibleCapacityInput ?? true) && (
                <TextInput
                    value={capacityInputValue}
                    onChange={setCapacityInputValue}
                    layout={{ position: 'absolute', left: 5, width: 55, top: 3, height: 17 }}
                />
            )}
        </Border>
    );
};
