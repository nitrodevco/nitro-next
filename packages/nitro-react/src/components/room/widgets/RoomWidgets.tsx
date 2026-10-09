import { Box } from '#base/theme';

import { RoomBotSkillConfigurationWidget } from './bot-skills/RoomBotSkillConfigurationWidget';
import { RoomChatWidget } from './chat/RoomChatWidget';
import { RoomFurniChooserWidget } from './chooser/RoomFurniChooserWidget';
import { RoomUserChooserWidget } from './chooser/RoomUserChooserWidget';
import { RoomDoorbellWidget } from './doorbell/RoomDoorbellWidget';
import { FloorPlanEditorWidget } from './floor-plan-editor/FloorPlanEditorWidget';
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
import { RoomAdWidget } from './room-ad/RoomAdWidget';
import { RoomInfoWidget } from './room-info/RoomInfoWidget';
import { RoomThumbnailCameraWidget } from './room-thumbnail-camera/RoomThumbnailCameraWidget';
import { RoomToolsWidget } from './room-tools/RoomToolsWidget';
import { RoomSpectatorModeWidget } from './spectator/RoomSpectatorModeWidget';

/**
 * Every widget mounted over the room canvas while a room is open. Each returns null until it
 * has something to show.
 */
export const RoomWidgets = () => {
    return (
        <>
            {/* Under everything else: the frame `createRoomView` adds to the room view itself. */}
            <RoomSpectatorModeWidget />
            <RoomChatWidget />
            <RoomObjectMenuWidget />
            <RoomFurnitureWidgets />
            <RoomToolsWidget />
            <RoomDoorbellWidget />
            <RoomPollWidget />
            <RoomQuizWidget />
            <RoomFriendRequestWidget />
            <RoomInfoWidget />
            <RoomThumbnailCameraWidget />
            <FloorPlanEditorWidget />
            <RoomBotSkillConfigurationWidget />
            <RoomPetBreedMenuWidget />
            <RoomPlantBreedingWidget />
            <RoomNestBreedingWidget />
            <RoomBreedingResultWidget />
            <RoomNestBreedingSuccessWidget />
            <RoomAdWidget />
            <RoomUserChooserWidget />
            <RoomFurniChooserWidget />
            <Box layout={{ position: 'absolute', right: 4, bottom: 58 }}>
                <RoomObjectInfostandWidget />
            </Box>
        </>
    );
};
