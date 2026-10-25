// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IWiredVariableStorageParameter } from './IWiredVariableStorageParameter';

/**
 * Flash `WiredUserPermanentVariablesList`: every permanent variable one user, pet or bot holds.
 * Flash also keeps a dictionary of the ids in `variableStorage`; derive it where it is needed.
 */
export interface IWiredUserPermanentVariablesList {
    /** `RoomObjectUserType` as a number: 1 user, 2 pet, 4 bot. */
    entityType: number;
    entityId: number;
    entityName: string;
    entityFigure: string;
    /** The three owner fields come with anything but a user (`entityType != 1`). */
    ownerId?: number;
    ownerName?: string;
    ownerFigure?: string;
    variableStorage: IWiredVariableStorageParameter[];
}
