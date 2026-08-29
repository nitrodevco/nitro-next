import { useState } from 'react';

import { BoxLayout, TextInput } from '#base/theme';

/** Row template `message_input` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutMessageInputItemProps {
    layout?: BoxLayout;
}

export const RoomtoolFrameLayoutMessageInputItem = ({ layout }: RoomtoolFrameLayoutMessageInputItemProps) => {
    const [ messageInputValue, setMessageInputValue ] = useState('');

    return (
        <TextInput
            value={messageInputValue}
            onChange={setMessageInputValue}
            backgroundColor="#ffffff"
            layout={{ width: 227, height: 45, flexShrink: 0, ...layout }}
        />
    );
};
