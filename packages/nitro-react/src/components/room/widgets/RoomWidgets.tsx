import { Box } from '#base/theme';
import { RoomChatInputView } from '#base/views/room-widgets/chat-input/RoomChatInputView';

import { RoomChatWidget } from './chat/RoomChatWidget';
import { RoomDoorbellWidget } from './doorbell/RoomDoorbellWidget';
import { RoomEffectsWidget } from './effects/RoomEffectsWidget';
import { RoomFriendRequestWidget } from './friend-request/RoomFriendRequestWidget';
import { RoomFurnitureWidgets } from './furniture';
import { RoomObjectInfostandWidget } from './object-infostand';
import { RoomObjectMenuWidget } from './object-menu';
import { RoomPollWidget } from './poll/RoomPollWidget';
import { RoomQuizWidget } from './quiz/RoomQuizWidget';
import { RoomInfoWidget } from './room-info/RoomInfoWidget';
import { RoomSettingsWidget } from './room-settings/RoomSettingsWidget';
import { RoomToolsWidget } from './room-tools/RoomToolsWidget';

export const RoomWidgets = () => {
    return (
        <>
            <RoomChatWidget />
            <RoomObjectMenuWidget />
            <RoomFurnitureWidgets />
            <RoomToolsWidget />
            <RoomDoorbellWidget />
            <RoomPollWidget />
            <RoomQuizWidget />
            <RoomFriendRequestWidget />
            <RoomEffectsWidget />
            <RoomInfoWidget />
            <RoomSettingsWidget />
            <Box layout={{ position: 'absolute', right: 4, bottom: 58 }}>
                <RoomObjectInfostandWidget />
            </Box>
            <RoomChatInputView />
        </>
    );
};
