import { Box } from '#base/theme';
import { RoomChatInputView } from '#base/views/room-widgets/chat-input/RoomChatInputView';

import { RoomChatWidget } from './chat/RoomChatWidget';
import { RoomFurnitureWidgets } from './furniture';
import { RoomObjectInfostandWidget } from './object-infostand';
import { RoomObjectMenuWidget } from './object-menu';

export const RoomWidgets = () => {
    return (
        <>
            <RoomChatWidget />
            <RoomObjectMenuWidget />
            <RoomFurnitureWidgets />
            <Box layout={{ position: 'absolute', right: 4, bottom: 58 }}>
                <RoomObjectInfostandWidget />
            </Box>
            <RoomChatInputView />
        </>
    );
};
