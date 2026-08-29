import { useState } from 'react';

import { BoxLayout, TextInput } from '#base/theme';

/** Row template `name_input` of NameConfigurationLayout - pass real rows through its `items…` slot. */
export interface NameConfigurationLayoutNameInputItemProps {
    layout?: BoxLayout;
}

export const NameConfigurationLayoutNameInputItem = ({ layout }: NameConfigurationLayoutNameInputItemProps) => {
    const [ nameInputValue, setNameInputValue ] = useState('');

    return (
        <TextInput
            value={nameInputValue}
            onChange={setNameInputValue}
            textColor="#ffffff"
            layout={{ width: 180, height: 18, flexShrink: 0, ...layout }}
        />
    );
};
