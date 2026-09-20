/**
 * The selector boxes - Flash's `selectors.SelectorTypes`, the holder `UserDefinedRoomEventsCtrl` asks for the
 * element serving a `SelectorDefinition`'s code (`getElementByCode`, which also answers to an element's
 * `negativeCode`). One `defineWiredElement(definition, View)` per Flash element class, in the
 * order SelectorTypes pushes them; an element with `INPUTS_TYPE_NONE` is registered without a view.
 *
 * A selector's "filter" and "invert" options, and the confirmation an inverted non-filtering
 * selector asks for on save, are the dialog's (`WiredSetupView`, `saveWired`), not the elements'.
 *
 * A code with no entry here opens nothing, the way Flash's `createWindow` gives up on a null element.
 *
 * This file imports views, so it is kept out of the `#base/wired` barrel (see
 * `WiredElementRegistry`); inside `src/wired`, import by relative path.
 */
import { FurniByTypeView } from '#base/views/wired-setup/elements/selector/FurniByTypeView';
import { FurniOnFurniView } from '#base/views/wired-setup/elements/selector/FurniOnFurniView';
import { FurniWithAltitudeView } from '#base/views/wired-setup/elements/selector/FurniWithAltitudeView';
import { InAreaView } from '#base/views/wired-setup/elements/selector/InAreaView';
import { InNeighborhoodView } from '#base/views/wired-setup/elements/selector/InNeighborhoodView';
import { RemoteSelectorView } from '#base/views/wired-setup/elements/selector/RemoteSelectorView';
import { UsersByNameView } from '#base/views/wired-setup/elements/selector/UsersByNameView';
import { UsersByTypeView } from '#base/views/wired-setup/elements/selector/UsersByTypeView';
import { UsersInGroupView } from '#base/views/wired-setup/elements/selector/UsersInGroupView';
import { UsersInTeamView } from '#base/views/wired-setup/elements/selector/UsersInTeamView';
import { UsersWithHanditemView } from '#base/views/wired-setup/elements/selector/UsersWithHanditemView';
import { WithVariableView } from '#base/views/wired-setup/elements/selector/WithVariableView';
import { PerformActionView } from '#base/views/wired-setup/elements/trigger/PerformActionView';

import { defineWiredElement, type WiredElementEntry } from '../../WiredElement';
import { furniByTypeSelector } from './FurniByType';
import { furniFromSignalSelector } from './FurniFromSignal';
import { furniInAreaSelector } from './FurniInArea';
import { furniInNeighborhoodSelector } from './FurniInNeighborhood';
import { furniOnFurniSelector } from './FurniOnFurni';
import { furniWithAltitudeSelector } from './FurniWithAltitude';
import { furniWithVariableSelector } from './FurniWithVariable';
import { remoteSelector } from './RemoteSelector';
import { selectedFurnisSelector } from './SelectedFurnis';
import { usersByNameSelector } from './UsersByName';
import { usersByTypeSelector } from './UsersByType';
import { usersFromSignalSelector } from './UsersFromSignal';
import { usersInAreaSelector } from './UsersInArea';
import { usersInGroupSelector } from './UsersInGroup';
import { usersInNeighborhoodSelector } from './UsersInNeighborhood';
import { usersInTeamSelector } from './UsersInTeam';
import { usersOnFurniSelector } from './UsersOnFurni';
import { usersPerformingActionSelector } from './UsersPerformingAction';
import { usersWithHanditemSelector } from './UsersWithHanditem';
import { usersWithVariableSelector } from './UsersWithVariable';

export const selectorElements: WiredElementEntry[] = [
    defineWiredElement(furniByTypeSelector, FurniByTypeView),
    defineWiredElement(selectedFurnisSelector),
    defineWiredElement(usersByTypeSelector, UsersByTypeView),
    defineWiredElement(usersInTeamSelector, UsersInTeamView),
    defineWiredElement(furniOnFurniSelector, FurniOnFurniView),
    defineWiredElement(furniFromSignalSelector),
    defineWiredElement(furniInNeighborhoodSelector, InNeighborhoodView),
    defineWiredElement(furniInAreaSelector, InAreaView),
    defineWiredElement(usersOnFurniSelector),
    defineWiredElement(usersPerformingActionSelector, PerformActionView),
    defineWiredElement(usersFromSignalSelector),
    defineWiredElement(usersByNameSelector, UsersByNameView),
    defineWiredElement(usersInNeighborhoodSelector, InNeighborhoodView),
    defineWiredElement(usersInAreaSelector, InAreaView),
    defineWiredElement(usersWithHanditemSelector, UsersWithHanditemView),
    defineWiredElement(usersInGroupSelector, UsersInGroupView),
    defineWiredElement(furniWithAltitudeSelector, FurniWithAltitudeView),
    defineWiredElement(furniWithVariableSelector, WithVariableView),
    defineWiredElement(usersWithVariableSelector, WithVariableView),
    defineWiredElement(remoteSelector, RemoteSelectorView),
];
