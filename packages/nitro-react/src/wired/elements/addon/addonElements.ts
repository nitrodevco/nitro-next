/**
 * The addon boxes - Flash's `addons.AddonTypes`, the holder `UserDefinedRoomEventsCtrl` asks for the
 * element serving a `AddonDefinition`'s code (`getElementByCode`, which also answers to an element's
 * `negativeCode`). One `defineWiredElement(definition, View)` per Flash element class, in the
 * order AddonTypes pushes them; an element with `INPUTS_TYPE_NONE` is registered without a view.
 * The six variable fx boxes (`addons/variablefx`: `§_-U2p§`, `§_-F2n§`, `§_-t1W§`, `§_-H2Q§`,
 * `§_-zZ§`, `§_-N1s§`) come between the time util and the global placeholder.
 *
 * A code with no entry here opens nothing, the way Flash's `createWindow` gives up on a null element.
 *
 * This file imports views, so it is kept out of the `#base/wired` barrel (see
 * `WiredElementRegistry`); inside `src/wired`, import by relative path.
 */
import { AchievementEnablerView } from '#base/views/wired-setup/elements/addon/AchievementEnablerView';
import { AnimationTimeView } from '#base/views/wired-setup/elements/addon/AnimationTimeView';
import { CarryUsersView } from '#base/views/wired-setup/elements/addon/CarryUsersView';
import { ChestItemTypeScannerView } from '#base/views/wired-setup/elements/addon/chests/ChestItemTypeScannerView';
import { CustomContractView } from '#base/views/wired-setup/elements/addon/chests/CustomContractView';
import { ConditionEvaluationView } from '#base/views/wired-setup/elements/addon/ConditionEvaluationView';
import { ExecutionLimitView } from '#base/views/wired-setup/elements/addon/ExecutionLimitView';
import { FurniNamePlaceholderView } from '#base/views/wired-setup/elements/addon/FurniNamePlaceholderView';
import { GlobalPlaceholderAddonView } from '#base/views/wired-setup/elements/addon/GlobalPlaceholderAddonView';
import { JumpStrengthView } from '#base/views/wired-setup/elements/addon/JumpStrengthView';
import { MovePhysicsView } from '#base/views/wired-setup/elements/addon/MovePhysicsView';
import { ProjectileView } from '#base/views/wired-setup/elements/addon/ProjectileView';
import { RandomEffectView } from '#base/views/wired-setup/elements/addon/RandomEffectView';
import { SelectorFilterView } from '#base/views/wired-setup/elements/addon/SelectorFilterView';
import { UsernamePlaceholderView } from '#base/views/wired-setup/elements/addon/UsernamePlaceholderView';
import { VariableCapturerView } from '#base/views/wired-setup/elements/addon/VariableCapturerView';
import { VariableFilterView } from '#base/views/wired-setup/elements/addon/VariableFilterView';
import { VariableFxLevellingProgressView } from '#base/views/wired-setup/elements/addon/variablefx/VariableFxLevellingProgressView';
import { VariableFxView } from '#base/views/wired-setup/elements/addon/variablefx/VariableFxView';
import { VariableLevelUpView } from '#base/views/wired-setup/elements/addon/VariableLevelUpView';
import { VariablePlaceholderView } from '#base/views/wired-setup/elements/addon/VariablePlaceholderView';
import { VariablesWebApiAddonView } from '#base/views/wired-setup/elements/addon/VariablesWebApiAddonView';
import { VariableTextConverterView } from '#base/views/wired-setup/elements/addon/VariableTextConverterView';
import { VariableTimeUtilView } from '#base/views/wired-setup/elements/addon/VariableTimeUtilView';

import { defineWiredElement, type WiredElementEntry } from '../../WiredElement';
import { achievementEnablerAddon } from './AchievementEnabler';
import { animationTimeAddon } from './AnimationTime';
import { carryUsersAddon } from './CarryUsers';
import { chestItemTypeScannerAddon } from './chests/ChestItemTypeScanner';
import { customContractAddon } from './chests/CustomContract';
import { conditionEvaluationAddon } from './ConditionEvaluation';
import { executeInOrderAddon } from './ExecuteInOrder';
import { executionLimitAddon } from './ExecutionLimit';
import { furniNamePlaceholderAddon } from './FurniNamePlaceholder';
import { furniSelectorFilterAddon } from './FurniSelectorFilter';
import { furniVariableFilterAddon } from './FurniVariableFilter';
import { globalPlaceholderAddon } from './GlobalPlaceholderAddon';
import { jumpStrengthAddon } from './JumpStrength';
import { movePhysicsAddon } from './MovePhysics';
import { noMoveAnimationAddon } from './NoMoveAnimation';
import { projectileAddon } from './Projectile';
import { randomEffectAddon } from './RandomEffect';
import { unseenEffectAddon } from './UnseenEffect';
import { usernamePlaceholderAddon } from './UsernamePlaceholder';
import { userSelectorFilterAddon } from './UserSelectorFilter';
import { userVariableFilterAddon } from './UserVariableFilter';
import { variableCapturerAddon } from './VariableCapturer';
import { variableFxBossBarAddon } from './variablefx/VariableFxBossBar';
import { variableFxHealthPointsAddon } from './variablefx/VariableFxHealthPoints';
import { variableFxLevellingProgressAddon } from './variablefx/VariableFxLevellingProgress';
import { variableFxNumberDisplayAddon } from './variablefx/VariableFxNumberDisplay';
import { variableFxProgressBarAddon } from './variablefx/VariableFxProgressBar';
import { variableFxStatusBarAddon } from './variablefx/VariableFxStatusBar';
import { variableLevelUpAddon } from './VariableLevelUp';
import { variablePlaceholderAddon } from './VariablePlaceholder';
import { variablesWebApiAddon } from './VariablesWebApiAddon';
import { variableTextConverterAddon } from './VariableTextConverter';
import { variableTimeUtilAddon } from './VariableTimeUtil';

export const addonElements: WiredElementEntry[] = [
    defineWiredElement(conditionEvaluationAddon, ConditionEvaluationView),
    defineWiredElement(randomEffectAddon, RandomEffectView),
    defineWiredElement(unseenEffectAddon),
    defineWiredElement(executionLimitAddon, ExecutionLimitView),
    defineWiredElement(noMoveAnimationAddon),
    defineWiredElement(movePhysicsAddon, MovePhysicsView),
    defineWiredElement(carryUsersAddon, CarryUsersView),
    defineWiredElement(animationTimeAddon, AnimationTimeView),
    defineWiredElement(furniSelectorFilterAddon, SelectorFilterView),
    defineWiredElement(userSelectorFilterAddon, SelectorFilterView),
    defineWiredElement(furniVariableFilterAddon, VariableFilterView),
    defineWiredElement(userVariableFilterAddon, VariableFilterView),
    defineWiredElement(usernamePlaceholderAddon, UsernamePlaceholderView),
    defineWiredElement(variablePlaceholderAddon, VariablePlaceholderView),
    defineWiredElement(variableCapturerAddon, VariableCapturerView),
    defineWiredElement(executeInOrderAddon),
    defineWiredElement(chestItemTypeScannerAddon, ChestItemTypeScannerView),
    defineWiredElement(furniNamePlaceholderAddon, FurniNamePlaceholderView),
    defineWiredElement(customContractAddon, CustomContractView),
    defineWiredElement(projectileAddon, ProjectileView),
    defineWiredElement(jumpStrengthAddon, JumpStrengthView),
    defineWiredElement(variableTextConverterAddon, VariableTextConverterView),
    defineWiredElement(variableLevelUpAddon, VariableLevelUpView),
    defineWiredElement(variableTimeUtilAddon, VariableTimeUtilView),
    defineWiredElement(variableFxHealthPointsAddon, VariableFxView),
    defineWiredElement(variableFxProgressBarAddon, VariableFxView),
    defineWiredElement(variableFxLevellingProgressAddon, VariableFxLevellingProgressView),
    defineWiredElement(variableFxStatusBarAddon, VariableFxView),
    defineWiredElement(variableFxBossBarAddon, VariableFxView),
    defineWiredElement(variableFxNumberDisplayAddon, VariableFxView),
    defineWiredElement(globalPlaceholderAddon, GlobalPlaceholderAddonView),
    defineWiredElement(achievementEnablerAddon, AchievementEnablerView),
    defineWiredElement(variablesWebApiAddon, VariablesWebApiAddonView),
];
