/**
 * The variable boxes - Flash's `variables.VariableTypes`, the holder `UserDefinedRoomEventsCtrl` asks for the
 * element serving a `VariableDefinition`'s code (`getElementByCode`, which also answers to an element's
 * `negativeCode`). One `defineWiredElement(definition, View)` per Flash element class, in the
 * order VariableTypes pushes them; an element with `INPUTS_TYPE_NONE` is registered without a view.
 *
 * A code with no entry here opens nothing, the way Flash's `createWindow` gives up on a null element.
 *
 * This file imports views, so it is kept out of the `#base/wired` barrel (see
 * `WiredElementRegistry`); inside `src/wired`, import by relative path.
 */
import { ContextVariableView } from '#base/views/wired-setup/elements/variable/ContextVariableView';
import { DailyTaskVariableView } from '#base/views/wired-setup/elements/variable/DailyTaskVariableView';
import { EchoVariableView } from '#base/views/wired-setup/elements/variable/EchoVariableView';
import { FurniVariableView } from '#base/views/wired-setup/elements/variable/FurniVariableView';
import { GlobalVariableView } from '#base/views/wired-setup/elements/variable/GlobalVariableView';
import { QuestChainVariableView } from '#base/views/wired-setup/elements/variable/QuestChainVariableView';
import { QuestVariableView } from '#base/views/wired-setup/elements/variable/QuestVariableView';
import { ReferenceVariableView } from '#base/views/wired-setup/elements/variable/ReferenceVariableView';
import { UserVariableView } from '#base/views/wired-setup/elements/variable/UserVariableView';

import { defineWiredElement, type WiredElementEntry } from '../../WiredElement';
import { contextVariable } from './ContextVariable';
import { dailyTaskVariable } from './DailyTaskVariable';
import { echoVariable } from './EchoVariable';
import { furniVariable } from './FurniVariable';
import { globalVariable } from './GlobalVariable';
import { questChainVariable } from './QuestChainVariable';
import { questVariable } from './QuestVariable';
import { referenceVariable } from './ReferenceVariable';
import { userVariable } from './UserVariable';

export const variableElements: WiredElementEntry[] = [
    defineWiredElement(furniVariable, FurniVariableView),
    defineWiredElement(userVariable, UserVariableView),
    defineWiredElement(globalVariable, GlobalVariableView),
    defineWiredElement(contextVariable, ContextVariableView),
    defineWiredElement(referenceVariable, ReferenceVariableView),
    defineWiredElement(questVariable, QuestVariableView),
    defineWiredElement(questChainVariable, QuestChainVariableView),
    defineWiredElement(echoVariable, EchoVariableView),
    defineWiredElement(dailyTaskVariable, DailyTaskVariableView),
];
