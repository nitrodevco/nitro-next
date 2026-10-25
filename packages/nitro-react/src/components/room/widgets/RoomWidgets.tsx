import { Box } from '#base/theme';

import { RoomBotSkillConfigurationWidget } from './bot-skills/RoomBotSkillConfigurationWidget';
import { RoomChatWidget } from './chat/RoomChatWidget';
import { RoomFurniChooserWidget } from './chooser/RoomFurniChooserWidget';
import { RoomUserChooserWidget } from './chooser/RoomUserChooserWidget';
import { CustomUserNotificationWidget } from './custom-user-notification/CustomUserNotificationWidget';
import { RoomDoorbellWidget } from './doorbell/RoomDoorbellWidget';
import { FloorPlanEditorWidget } from './floor-plan-editor/FloorPlanEditorWidget';
import { RoomFriendRequestWidget } from './friend-request/RoomFriendRequestWidget';
import { RoomFurnitureWidgets } from './furniture';
import { FurnitureLabelWidget } from './furniture-label';
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
import { StarterRoomCameraWidget } from './starter-room-camera/StarterRoomCameraWidget';
import { VariableLeaderboardWidget } from './variable-leaderboard';

/**
 * Every widget mounted over the room canvas while a room is open. Each returns null until it
 * has something to show.
 */
export const RoomWidgets = () => {
    return (
        <>
            {/* Under everything else: the frame `createRoomView` adds to the room view itself. */}
            <RoomSpectatorModeWidget />
            {/* The WIRED leaderboard panels, which `VariableLeaderboardController` adds to the same background widgets
                (`attachToBackgroundLayer`). */}
            <VariableLeaderboardWidget />
            {/* `RWE_FURNITURE_LABEL`: the WIRED labels over their furni, in the desktop's background widgets under
                the rest of the room UI (1318 `DesktopLayoutManager.as` 95). */}
            <FurnitureLabelWidget />
            <RoomChatWidget />
            <RoomObjectMenuWidget />
            <RoomFurnitureWidgets />
            <RoomToolsWidget />
            <RoomDoorbellWidget />
            <RoomPollWidget />
            <RoomQuizWidget />
            <CustomUserNotificationWidget />
            <RoomFriendRequestWidget />
            <RoomInfoWidget />
            <RoomThumbnailCameraWidget />
            <StarterRoomCameraWidget />
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
