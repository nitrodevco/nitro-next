import { useState } from 'react';

import { BoxLayout, Region, ScrollArea, TextInput } from '#base/theme';

/** Row template `msg_item_list` of IssueHandlerLayout - pass real rows through its `items…` slot. */
export interface IssueHandlerLayoutMsgItemListItemProps {
    layout?: BoxLayout;
}

export const IssueHandlerLayoutMsgItemListItem = ({ layout }: IssueHandlerLayoutMsgItemListItemProps) => {
    const [ inputValue, setInputValue ] = useState('');

    return (
        <ScrollArea
            orientation="vertical"
            layout={{ width: 280, height: 70, flexShrink: 0, ...layout }}
        >
            <Region
                name="msg_item_list"
                backgroundColor="#ffffff"
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                <TextInput
                    value={inputValue}
                    onChange={setInputValue}
                    backgroundColor="#a2d6ea"
                    layout={{ width: 264, height: 49, flexShrink: 0 }}
                />
            </Region>
        </ScrollArea>
    );
};
