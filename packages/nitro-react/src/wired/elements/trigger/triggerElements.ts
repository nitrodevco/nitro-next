/**
 * The trigger boxes - Flash's `triggerconfs.TriggerConfs`, the holder `UserDefinedRoomEventsCtrl` asks for the
 * element serving a `TriggerDefinition`'s code (`getElementByCode`, which also answers to an element's
 * `negativeCode`). One `defineWiredElement(definition, View)` per Flash element class, in the
 * order TriggerConfs pushes them; an element with `INPUTS_TYPE_NONE` is registered without a view.
 *
 * `TriggerConfs` pushes 27 classes; `§_-H1T§`, the second one returning AVATAR_CAUGHT, is never
 * found by `getByCode` (the first match wins) and has no entry - see `AvatarCaught`.
 *
 * A code with no entry here opens nothing, the way Flash's `createWindow` gives up on a null element.
 *
 * This file imports views, so it is kept out of the `#base/wired` barrel (see
 * `WiredElementRegistry`); inside `src/wired`, import by relative path.
 */
import { AvatarSaysSomethingView } from '#base/views/wired-setup/elements/trigger/AvatarSaysSomethingView';
import { ClockReachTimeView } from '#base/views/wired-setup/elements/trigger/ClockReachTimeView';
import { PerformActionView } from '#base/views/wired-setup/elements/trigger/PerformActionView';
import { PeriodicLongView } from '#base/views/wired-setup/elements/trigger/PeriodicLongView';
import { PeriodicShortView } from '#base/views/wired-setup/elements/trigger/PeriodicShortView';
import { ScoreAchievedView } from '#base/views/wired-setup/elements/trigger/ScoreAchievedView';
import { StateChangeView } from '#base/views/wired-setup/elements/trigger/StateChangeView';
import { TransactionCompletedView } from '#base/views/wired-setup/elements/trigger/TransactionCompletedView';
import { TransactionFailedView } from '#base/views/wired-setup/elements/trigger/TransactionFailedView';
import { TriggerBotNameView } from '#base/views/wired-setup/elements/trigger/TriggerBotNameView';
import { TriggerOnceView } from '#base/views/wired-setup/elements/trigger/TriggerOnceView';
import { TriggerPeriodicallyView } from '#base/views/wired-setup/elements/trigger/TriggerPeriodicallyView';
import { UserClicksUserView } from '#base/views/wired-setup/elements/trigger/UserClicksUserView';
import { VariableUpdateView } from '#base/views/wired-setup/elements/trigger/VariableUpdateView';

import { defineWiredElement, type WiredElementEntry } from '../../WiredElement';
import { avatarCaughtTrigger } from './AvatarCaught';
import { avatarClicksFurniTrigger } from './AvatarClicksFurni';
import { avatarEntersRoomTrigger } from './AvatarEntersRoom';
import { avatarLeavesRoomTrigger } from './AvatarLeavesRoom';
import { avatarSaysSomethingTrigger } from './AvatarSaysSomething';
import { botAvatarReachedTrigger } from './BotAvatarReached';
import { botDestinationReachedTrigger } from './BotDestinationReached';
import { clockReachTimeTrigger } from './ClockReachTime';
import { gameEndsTrigger } from './GameEnds';
import { gameStartsTrigger } from './GameStarts';
import { performActionTrigger } from './PerformAction';
import { periodicLongTrigger } from './PeriodicLong';
import { periodicShortTrigger } from './PeriodicShort';
import { receiveSignalTrigger } from './ReceiveSignal';
import { scoreAchievedTrigger } from './ScoreAchieved';
import { stateChangeTrigger } from './StateChange';
import { transactionCompletedTrigger } from './TransactionCompleted';
import { transactionFailedTrigger } from './TransactionFailed';
import { triggerOnceTrigger } from './TriggerOnce';
import { triggerPeriodicallyTrigger } from './TriggerPeriodically';
import { userClicksTileTrigger } from './UserClicksTile';
import { userClicksUserTrigger } from './UserClicksUser';
import { useStuffTrigger } from './UseStuff';
import { variableUpdateTrigger } from './VariableUpdate';
import { walksOffFurniTrigger } from './WalksOffFurni';
import { walksOnFurniTrigger } from './WalksOnFurni';

export const triggerElements: WiredElementEntry[] = [
    defineWiredElement(avatarSaysSomethingTrigger, AvatarSaysSomethingView),
    defineWiredElement(walksOnFurniTrigger),
    defineWiredElement(walksOffFurniTrigger),
    defineWiredElement(triggerOnceTrigger, TriggerOnceView),
    defineWiredElement(useStuffTrigger),
    defineWiredElement(triggerPeriodicallyTrigger, TriggerPeriodicallyView),
    defineWiredElement(avatarEntersRoomTrigger),
    defineWiredElement(gameStartsTrigger),
    defineWiredElement(gameEndsTrigger),
    defineWiredElement(scoreAchievedTrigger, ScoreAchievedView),
    defineWiredElement(avatarCaughtTrigger),
    defineWiredElement(periodicLongTrigger, PeriodicLongView),
    defineWiredElement(botDestinationReachedTrigger, TriggerBotNameView),
    defineWiredElement(botAvatarReachedTrigger, TriggerBotNameView),
    defineWiredElement(clockReachTimeTrigger, ClockReachTimeView),
    defineWiredElement(performActionTrigger, PerformActionView),
    defineWiredElement(receiveSignalTrigger),
    defineWiredElement(avatarClicksFurniTrigger),
    defineWiredElement(periodicShortTrigger, PeriodicShortView),
    defineWiredElement(stateChangeTrigger, StateChangeView),
    defineWiredElement(userClicksTileTrigger),
    defineWiredElement(variableUpdateTrigger, VariableUpdateView),
    defineWiredElement(avatarLeavesRoomTrigger),
    defineWiredElement(userClicksUserTrigger, UserClicksUserView),
    defineWiredElement(transactionCompletedTrigger, TransactionCompletedView),
    defineWiredElement(transactionFailedTrigger, TransactionFailedView),
];
