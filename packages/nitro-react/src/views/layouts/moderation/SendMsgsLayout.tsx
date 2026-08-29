import { useState } from 'react';

import { BoxLayout, Button, Dropmenu, Frame, Region, TextInput } from '#base/theme';

/** Generated from `1114_send_msgs_xml` (layout "start_panel", 212x168) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SendMsgsLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onMsgTemplatesSelect?: () => void;
    onSendMessageBut?: () => void;
}

export const SendMsgsLayout = ({ layout, onClose, onMsgTemplatesSelect, onSendMessageBut }: SendMsgsLayoutProps) => {
    const [ messageInputValue, setMessageInputValue ] = useState('');

    return (
        <Frame
            variant="0"
            caption="Msg to:"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 212, height: 168, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Dropmenu
                    variant="0"
                    name="msgTemplatesSelect"
                    onPointerTap={onMsgTemplatesSelect}
                    layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 20 }}
                >
                    Select from message templates
                </Dropmenu>
                <TextInput
                    value={messageInputValue}
                    onChange={setMessageInputValue}
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 0, width: 199, top: 25, height: 58 }}
                />
                <Button
                    variant="0"
                    name="send_message_but"
                    onPointerTap={onSendMessageBut}
                    layout={{ position: 'absolute', left: 0, width: 200, top: 115, height: 21, minWidth: 200, maxWidth: 200 }}
                >
                    Send message
                </Button>
            </Region>
        </Frame>
    );
};
