// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IWiredVariableStorageParameter } from './IWiredVariableStorageParameter';

/** Flash `WiredUserVariablesElement`: one holder of the variable a `IWiredUserVariablesPage` is about. */
export interface IWiredUserVariablesElement {
    /** `RoomObjectUserType` as a number: 1 user, 2 pet, 4 bot. */
    entityType: number;
    entityId: number;
    entityName: string;
    storage: IWiredVariableStorageParameter;
}
