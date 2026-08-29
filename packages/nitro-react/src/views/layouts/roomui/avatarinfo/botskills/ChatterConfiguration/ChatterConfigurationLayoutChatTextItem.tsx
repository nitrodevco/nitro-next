import { useState } from 'react';

import { BoxLayout, TextInput } from '#base/theme';

/** Row template `chat_text` of ChatterConfigurationLayout - pass real rows through its `items…` slot. */
export interface ChatterConfigurationLayoutChatTextItemProps {
    layout?: BoxLayout;
}

export const ChatterConfigurationLayoutChatTextItem = ({ layout }: ChatterConfigurationLayoutChatTextItemProps) => {
    const [ chatTextValue, setChatTextValue ] = useState('');

    return (
        <TextInput
            value={chatTextValue}
            onChange={setChatTextValue}
            maxLength={1000}
            multiline
            textColor="#ffffff"
            layout={{ width: 246, height: 178, flexShrink: 0, ...layout }}
        />
    );
};
