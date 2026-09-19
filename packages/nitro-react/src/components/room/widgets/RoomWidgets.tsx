import { Box } from '#base/theme';

import { RoomBotSkillConfigurationWidget } from './bot-skills/RoomBotSkillConfigurationWidget';
import { RoomChatWidget } from './chat/RoomChatWidget';
import { RoomDoorbellWidget } from './doorbell/RoomDoorbellWidget';
import { RoomEffectsWidget } from './effects/RoomEffectsWidget';
import { RoomFriendRequestWidget } from './friend-request/RoomFriendRequestWidget';
import { RoomFurnitureWidgets } from './furniture';
import { RoomObjectInfostandWidget } from './object-infostand';
import { RoomObjectMenuWidget } from './object-menu';
import { RoomBreedingResultWidget } from './pets/RoomBreedingResultWidget';
import { RoomNestBreedingSuccessWidget } from './pets/RoomNestBreedingSuccessWidget';
import { RoomNestBreedingWidget } from './pets/RoomNestBreedingWidget';
import { RoomPetBreedMenuWidget } from './pets/RoomPetBreedMenuWidget';
import { RoomPlantBreedingWidget } from './pets/RoomPlantBreedingWidget';
import { RoomPollWidget } from './poll/RoomPollWidget';
import { RoomQuizWidget } from './quiz/RoomQuizWidget';
import { RoomInfoWidget } from './room-info/RoomInfoWidget';
import { RoomSettingsWidget } from './room-settings/RoomSettingsWidget';
import { RoomToolsWidget } from './room-tools/RoomToolsWidget';

/**
 * Every widget mounted over the room canvas while a room is open. Each returns null until it
 * has something to show.
 */
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
            <RoomBotSkillConfigurationWidget />
            <RoomPetBreedMenuWidget />
            <RoomPlantBreedingWidget />
            <RoomNestBreedingWidget />
            <RoomBreedingResultWidget />
            <RoomNestBreedingSuccessWidget />
            <Box layout={{ position: 'absolute', right: 4, bottom: 58 }}>
                <RoomObjectInfostandWidget />
            </Box>
        </>
    );
};
