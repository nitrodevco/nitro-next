/**
 * The action boxes - Flash's `actiontypes.ActionTypes`, the holder `UserDefinedRoomEventsCtrl`
 * asks for the element serving an `ActionDefinition`'s code (`getElementByCode`, which also
 * answers to an element's `negativeCode`). One `defineWiredElement(definition, View)` per Flash
 * element class, in the order `ActionTypes` pushes them; an element with `INPUTS_TYPE_NONE` is
 * registered without a view.
 *
 * A code with no entry here opens nothing, the way Flash's `createWindow` gives up on a null element.
 *
 * This file imports views, so it is kept out of the `#base/wired` barrel (see
 * `WiredElementRegistry`); inside `src/wired`, import by relative path.
 */
import { AdjustClockView } from '#base/views/wired-setup/elements/action/AdjustClockView';
import { BotChangeFigureView } from '#base/views/wired-setup/elements/action/BotChangeFigureView';
import { BotFollowAvatarView } from '#base/views/wired-setup/elements/action/BotFollowAvatarView';
import { BotGiveHandItemView } from '#base/views/wired-setup/elements/action/BotGiveHandItemView';
import { BotMoveView } from '#base/views/wired-setup/elements/action/BotMoveView';
import { BotTalkDirectToAvatarView } from '#base/views/wired-setup/elements/action/BotTalkDirectToAvatarView';
import { BotTalkView } from '#base/views/wired-setup/elements/action/BotTalkView';
import { BotTeleportView } from '#base/views/wired-setup/elements/action/BotTeleportView';
import { ChangeVariableView } from '#base/views/wired-setup/elements/action/ChangeVariableView';
import { ChatView } from '#base/views/wired-setup/elements/action/ChatView';
import { CancelTransactionView } from '#base/views/wired-setup/elements/action/chests/CancelTransactionView';
import { GiveCurrencyFromChestView } from '#base/views/wired-setup/elements/action/chests/GiveCurrencyFromChestView';
import { GiveItemsFromChestView } from '#base/views/wired-setup/elements/action/chests/GiveItemsFromChestView';
import { InitiateTransactionView } from '#base/views/wired-setup/elements/action/chests/InitiateTransactionView';
import { ClickSettingsView } from '#base/views/wired-setup/elements/action/ClickSettingsView';
import { ControlClockView } from '#base/views/wired-setup/elements/action/ControlClockView';
import { FreezeUserView } from '#base/views/wired-setup/elements/action/FreezeUserView';
import { GiveEffectView } from '#base/views/wired-setup/elements/action/GiveEffectView';
import { GiveRewardView } from '#base/views/wired-setup/elements/action/GiveRewardView';
import { GiveScoreToPredefinedTeamView } from '#base/views/wired-setup/elements/action/GiveScoreToPredefinedTeamView';
import { GiveScoreView } from '#base/views/wired-setup/elements/action/GiveScoreView';
import { GiveVariableView } from '#base/views/wired-setup/elements/action/GiveVariableView';
import { JoinTeamView } from '#base/views/wired-setup/elements/action/JoinTeamView';
import { KickFromRoomView } from '#base/views/wired-setup/elements/action/KickFromRoomView';
import { MoveAsGroupView } from '#base/views/wired-setup/elements/action/MoveAsGroupView';
import { MoveFurniToView } from '#base/views/wired-setup/elements/action/MoveFurniToView';
import { MoveFurniView } from '#base/views/wired-setup/elements/action/MoveFurniView';
import { MoveToDirectionView } from '#base/views/wired-setup/elements/action/MoveToDirectionView';
import { MoveUserToFurniView } from '#base/views/wired-setup/elements/action/MoveUserToFurniView';
import { MoveUserView } from '#base/views/wired-setup/elements/action/MoveUserView';
import { MuteUserView } from '#base/views/wired-setup/elements/action/MuteUserView';
import { OverrideHeightView } from '#base/views/wired-setup/elements/action/OverrideHeightView';
import { PlaceFurniView } from '#base/views/wired-setup/elements/action/PlaceFurniView';
import { ProgressAchievementView } from '#base/views/wired-setup/elements/action/ProgressAchievementView';
import { ProgressRewardTrackView } from '#base/views/wired-setup/elements/action/ProgressRewardTrackView';
import { RelativeFurniMoveView } from '#base/views/wired-setup/elements/action/RelativeFurniMoveView';
import { RemoveVariableView } from '#base/views/wired-setup/elements/action/RemoveVariableView';
import { ResetRewardTrackView } from '#base/views/wired-setup/elements/action/ResetRewardTrackView';
import { SendSignalView } from '#base/views/wired-setup/elements/action/SendSignalView';
import { SetFurniAltitudeView } from '#base/views/wired-setup/elements/action/SetFurniAltitudeView';
import { SetFurniStateToView } from '#base/views/wired-setup/elements/action/SetFurniStateToView';
import { TeleportView } from '#base/views/wired-setup/elements/action/TeleportView';
import { ToggleFurniStateView } from '#base/views/wired-setup/elements/action/ToggleFurniStateView';
import { WriteToLogsView } from '#base/views/wired-setup/elements/action/WriteToLogsView';

import { defineWiredElement, type WiredElementEntry } from '../../WiredElement';
import { adjustClockAction } from './AdjustClock';
import { botChangeFigureAction } from './BotChangeFigure';
import { botFollowAvatarAction } from './BotFollowAvatar';
import { botGiveHandItemAction } from './BotGiveHandItem';
import { botMoveAction } from './BotMove';
import { botTalkAction } from './BotTalk';
import { botTalkDirectToAvatarAction } from './BotTalkDirectToAvatar';
import { botTeleportAction } from './BotTeleport';
import { callAnotherStackAction } from './CallAnotherStack';
import { changeVariableAction } from './ChangeVariable';
import { chaseAction } from './Chase';
import { chatAction } from './Chat';
import { cancelTransactionAction } from './chests/CancelTransaction';
import { giveCurrencyFromChestAction } from './chests/GiveCurrencyFromChest';
import { giveItemsFromChestAction } from './chests/GiveItemsFromChest';
import { initiateTransactionAction } from './chests/InitiateTransaction';
import { clickSettingsAction } from './ClickSettings';
import { controlClockAction } from './ControlClock';
import { fleeAction } from './Flee';
import { freezeUserAction } from './FreezeUser';
import { giveEffectAction } from './GiveEffect';
import { giveRewardAction } from './GiveReward';
import { giveScoreAction } from './GiveScore';
import { giveScoreToPredefinedTeamAction } from './GiveScoreToPredefinedTeam';
import { giveVariableAction } from './GiveVariable';
import { joinTeamAction } from './JoinTeam';
import { kickFromRoomAction } from './KickFromRoom';
import { leaveTeamAction } from './LeaveTeam';
import { moveAsGroupAction } from './MoveAsGroup';
import { moveFurniAction } from './MoveFurni';
import { moveFurniToAction } from './MoveFurniTo';
import { moveFurniToFurniAction } from './MoveFurniToFurni';
import { moveFurniToUserAction } from './MoveFurniToUser';
import { moveToDirectionAction } from './MoveToDirection';
import { moveUserAction } from './MoveUser';
import { moveUserToFurniAction } from './MoveUserToFurni';
import { muteUserAction } from './MuteUser';
import { overrideHeightAction } from './OverrideHeight';
import { placeFurniAction } from './PlaceFurni';
import { progressAchievementAction } from './ProgressAchievement';
import { progressRewardTrackAction } from './ProgressRewardTrack';
import { relativeFurniMoveAction } from './RelativeFurniMove';
import { removeFurniAction } from './RemoveFurni';
import { removeVariableAction } from './RemoveVariable';
import { resetRewardTrackAction } from './ResetRewardTrack';
import { resetTimersAction } from './ResetTimers';
import { sendSignalAction } from './SendSignal';
import { setFurniAltitudeAction } from './SetFurniAltitude';
import { setFurniStateToAction } from './SetFurniStateTo';
import { teleportAction } from './Teleport';
import { teleportToRoomAction } from './TeleportToRoom';
import { toggleFurniStateAction } from './ToggleFurniState';
import { toggleToRandomStateAction } from './ToggleToRandomState';
import { unfreezeUserAction } from './UnfreezeUser';
import { writeToLogsAction } from './WriteToLogs';

export const actionElements: WiredElementEntry[] = [
    defineWiredElement(toggleFurniStateAction, ToggleFurniStateView),
    defineWiredElement(resetTimersAction),
    defineWiredElement(setFurniStateToAction, SetFurniStateToView),
    defineWiredElement(moveFurniAction, MoveFurniView),
    defineWiredElement(giveScoreAction, GiveScoreView),
    defineWiredElement(chatAction, ChatView),
    defineWiredElement(teleportAction, TeleportView),
    defineWiredElement(joinTeamAction, JoinTeamView),
    defineWiredElement(leaveTeamAction),
    defineWiredElement(chaseAction),
    defineWiredElement(fleeAction),
    defineWiredElement(moveToDirectionAction, MoveToDirectionView),
    defineWiredElement(giveScoreToPredefinedTeamAction, GiveScoreToPredefinedTeamView),
    defineWiredElement(toggleToRandomStateAction),
    defineWiredElement(moveFurniToAction, MoveFurniToView),
    defineWiredElement(giveRewardAction, GiveRewardView),
    defineWiredElement(callAnotherStackAction),
    defineWiredElement(kickFromRoomAction, KickFromRoomView),
    defineWiredElement(muteUserAction, MuteUserView),
    defineWiredElement(botTeleportAction, BotTeleportView),
    defineWiredElement(botMoveAction, BotMoveView),
    defineWiredElement(botTalkAction, BotTalkView),
    defineWiredElement(botGiveHandItemAction, BotGiveHandItemView),
    defineWiredElement(botFollowAvatarAction, BotFollowAvatarView),
    defineWiredElement(botChangeFigureAction, BotChangeFigureView),
    defineWiredElement(botTalkDirectToAvatarAction, BotTalkDirectToAvatarView),
    defineWiredElement(controlClockAction, ControlClockView),
    defineWiredElement(setFurniAltitudeAction, SetFurniAltitudeView),
    defineWiredElement(sendSignalAction, SendSignalView),
    defineWiredElement(freezeUserAction, FreezeUserView),
    defineWiredElement(unfreezeUserAction),
    defineWiredElement(relativeFurniMoveAction, RelativeFurniMoveView),
    defineWiredElement(moveFurniToFurniAction),
    defineWiredElement(moveFurniToUserAction),
    defineWiredElement(adjustClockAction, AdjustClockView),
    defineWiredElement(giveVariableAction, GiveVariableView),
    defineWiredElement(removeVariableAction, RemoveVariableView),
    defineWiredElement(changeVariableAction, ChangeVariableView),
    defineWiredElement(moveUserAction, MoveUserView),
    defineWiredElement(moveUserToFurniAction, MoveUserToFurniView),
    defineWiredElement(teleportToRoomAction),
    defineWiredElement(giveCurrencyFromChestAction, GiveCurrencyFromChestView),
    defineWiredElement(giveItemsFromChestAction, GiveItemsFromChestView),
    defineWiredElement(initiateTransactionAction, InitiateTransactionView),
    defineWiredElement(cancelTransactionAction, CancelTransactionView),
    defineWiredElement(writeToLogsAction, WriteToLogsView),
    defineWiredElement(progressAchievementAction, ProgressAchievementView),
    defineWiredElement(giveEffectAction, GiveEffectView),
    defineWiredElement(overrideHeightAction, OverrideHeightView),
    defineWiredElement(clickSettingsAction, ClickSettingsView),
    defineWiredElement(placeFurniAction, PlaceFurniView),
    defineWiredElement(removeFurniAction),
    defineWiredElement(moveAsGroupAction, MoveAsGroupView),
    defineWiredElement(progressRewardTrackAction, ProgressRewardTrackView),
    defineWiredElement(resetRewardTrackAction, ResetRewardTrackView),
];
