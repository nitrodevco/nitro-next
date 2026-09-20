/**
 * The condition boxes - Flash's `conditions.ConditionTypes`, the holder `UserDefinedRoomEventsCtrl` asks for the
 * element serving a `ConditionDefinition`'s code (`getElementByCode`, which also answers to an element's
 * `negativeCode`). One `defineWiredElement(definition, View)` per Flash element class, in the
 * order ConditionTypes pushes them; an element with `INPUTS_TYPE_NONE` is registered without a view.
 *
 * A code with no entry here opens nothing, the way Flash's `createWindow` gives up on a null element.
 *
 * This file imports views, so it is kept out of the `#base/wired` barrel (see
 * `WiredElementRegistry`); inside `src/wired`, import by relative path.
 */
import { ActorHasHandItemView } from '#base/views/wired-setup/elements/condition/ActorHasHandItemView';
import { ActorIsGroupMemberView } from '#base/views/wired-setup/elements/condition/ActorIsGroupMemberView';
import { ActorIsInTeamView } from '#base/views/wired-setup/elements/condition/ActorIsInTeamView';
import { ActorIsWearingBadgeView } from '#base/views/wired-setup/elements/condition/ActorIsWearingBadgeView';
import { ActorIsWearingEffectView } from '#base/views/wired-setup/elements/condition/ActorIsWearingEffectView';
import { ChestHasAmountView } from '#base/views/wired-setup/elements/condition/ChestHasAmountView';
import { ClockTimeMatchesView } from '#base/views/wired-setup/elements/condition/ClockTimeMatchesView';
import { DateMatchesView } from '#base/views/wired-setup/elements/condition/DateMatchesView';
import { DateRangeActiveView } from '#base/views/wired-setup/elements/condition/DateRangeActiveView';
import { DontHaveStackedFurnisView } from '#base/views/wired-setup/elements/condition/DontHaveStackedFurnisView';
import { FurniHasAltitudeView } from '#base/views/wired-setup/elements/condition/FurniHasAltitudeView';
import { FurnisHaveAvatarsView } from '#base/views/wired-setup/elements/condition/FurnisHaveAvatarsView';
import { FurnisHaveNoAvatarsView } from '#base/views/wired-setup/elements/condition/FurnisHaveNoAvatarsView';
import { HasStackedFurnisView } from '#base/views/wired-setup/elements/condition/HasStackedFurnisView';
import { HasVariableView } from '#base/views/wired-setup/elements/condition/HasVariableView';
import { InputSourceQuantityView } from '#base/views/wired-setup/elements/condition/InputSourceQuantityView';
import { LevelMatchesView } from '#base/views/wired-setup/elements/condition/LevelMatchesView';
import { PerformingActionView } from '#base/views/wired-setup/elements/condition/PerformingActionView';
import { StatesMatchView } from '#base/views/wired-setup/elements/condition/StatesMatchView';
import { TeamHasScoreView } from '#base/views/wired-setup/elements/condition/TeamHasScoreView';
import { TeamIsWinningView } from '#base/views/wired-setup/elements/condition/TeamIsWinningView';
import { TimeElapsedLessView } from '#base/views/wired-setup/elements/condition/TimeElapsedLessView';
import { TimeElapsedMoreView } from '#base/views/wired-setup/elements/condition/TimeElapsedMoreView';
import { TimeMatchesView } from '#base/views/wired-setup/elements/condition/TimeMatchesView';
import { TriggererMatchesView } from '#base/views/wired-setup/elements/condition/TriggererMatchesView';
import { UserCountInView } from '#base/views/wired-setup/elements/condition/UserCountInView';
import { UserDirectionView } from '#base/views/wired-setup/elements/condition/UserDirectionView';
import { VariableAgeView } from '#base/views/wired-setup/elements/condition/VariableAgeView';
import { VariableValueView } from '#base/views/wired-setup/elements/condition/VariableValueView';

import { defineWiredElement, type WiredElementEntry } from '../../WiredElement';
import { actorHasHandItemCondition } from './ActorHasHandItem';
import { actorIsGroupMemberCondition } from './ActorIsGroupMember';
import { actorIsInTeamCondition } from './ActorIsInTeam';
import { actorIsWearingBadgeCondition } from './ActorIsWearingBadge';
import { actorIsWearingEffectCondition } from './ActorIsWearingEffect';
import { canPerformMoveCondition } from './CanPerformMove';
import { chestHasAmountCondition } from './ChestHasAmount';
import { chestHasItemTypesCondition } from './ChestHasItemTypes';
import { clockTimeMatchesCondition } from './ClockTimeMatches';
import { dateMatchesCondition } from './DateMatches';
import { dateRangeActiveCondition } from './DateRangeActive';
import { dontHaveStackedFurnisCondition } from './DontHaveStackedFurnis';
import { furniHasAltitudeCondition } from './FurniHasAltitude';
import { furnisHaveAvatarsCondition } from './FurnisHaveAvatars';
import { furnisHaveNoAvatarsCondition } from './FurnisHaveNoAvatars';
import { hasStackedFurnisCondition } from './HasStackedFurnis';
import { hasVariableCondition } from './HasVariable';
import { inputSourceQuantityCondition } from './InputSourceQuantity';
import { levelMatchesCondition } from './LevelMatches';
import { performingActionCondition } from './PerformingAction';
import { statesMatchCondition } from './StatesMatch';
import { stuffTypeMatchesCondition } from './StuffTypeMatches';
import { teamHasScoreCondition } from './TeamHasScore';
import { teamIsWinningCondition } from './TeamIsWinning';
import { timeElapsedLessCondition } from './TimeElapsedLess';
import { timeElapsedMoreCondition } from './TimeElapsedMore';
import { timeMatchesCondition } from './TimeMatches';
import { triggererIsOnFurniCondition } from './TriggererIsOnFurni';
import { triggererMatchesCondition } from './TriggererMatches';
import { userCountInCondition } from './UserCountIn';
import { userDirectionCondition } from './UserDirection';
import { variableAgeCondition } from './VariableAge';
import { variableValueCondition } from './VariableValue';

export const conditionElements: WiredElementEntry[] = [
    defineWiredElement(triggererIsOnFurniCondition),
    defineWiredElement(furnisHaveAvatarsCondition, FurnisHaveAvatarsView),
    defineWiredElement(furnisHaveNoAvatarsCondition, FurnisHaveNoAvatarsView),
    defineWiredElement(statesMatchCondition, StatesMatchView),
    defineWiredElement(timeElapsedMoreCondition, TimeElapsedMoreView),
    defineWiredElement(timeElapsedLessCondition, TimeElapsedLessView),
    defineWiredElement(userCountInCondition, UserCountInView),
    defineWiredElement(actorIsInTeamCondition, ActorIsInTeamView),
    defineWiredElement(hasStackedFurnisCondition, HasStackedFurnisView),
    defineWiredElement(stuffTypeMatchesCondition),
    defineWiredElement(actorIsGroupMemberCondition, ActorIsGroupMemberView),
    defineWiredElement(actorIsWearingBadgeCondition, ActorIsWearingBadgeView),
    defineWiredElement(actorIsWearingEffectCondition, ActorIsWearingEffectView),
    defineWiredElement(dontHaveStackedFurnisCondition, DontHaveStackedFurnisView),
    defineWiredElement(dateRangeActiveCondition, DateRangeActiveView),
    defineWiredElement(actorHasHandItemCondition, ActorHasHandItemView),
    defineWiredElement(triggererMatchesCondition, TriggererMatchesView),
    defineWiredElement(timeMatchesCondition, TimeMatchesView),
    defineWiredElement(dateMatchesCondition, DateMatchesView),
    defineWiredElement(teamIsWinningCondition, TeamIsWinningView),
    defineWiredElement(performingActionCondition, PerformingActionView),
    defineWiredElement(teamHasScoreCondition, TeamHasScoreView),
    defineWiredElement(clockTimeMatchesCondition, ClockTimeMatchesView),
    defineWiredElement(furniHasAltitudeCondition, FurniHasAltitudeView),
    defineWiredElement(userDirectionCondition, UserDirectionView),
    defineWiredElement(inputSourceQuantityCondition, InputSourceQuantityView),
    defineWiredElement(canPerformMoveCondition),
    defineWiredElement(hasVariableCondition, HasVariableView),
    defineWiredElement(variableValueCondition, VariableValueView),
    defineWiredElement(variableAgeCondition, VariableAgeView),
    defineWiredElement(levelMatchesCondition, LevelMatchesView),
    defineWiredElement(chestHasAmountCondition, ChestHasAmountView),
    defineWiredElement(chestHasItemTypesCondition, ChestHasAmountView),
];
