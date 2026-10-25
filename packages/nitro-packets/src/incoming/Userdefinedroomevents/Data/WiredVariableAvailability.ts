// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
/**
 * Flash `_-YB._-J1E` (and its twin `_-ZI`, which differs only in `NOT_APPLICABLE` being 999 instead
 * of 0): how long a wired variable's value lives - `IWiredVariable.availabilityType`. The member
 * names are obfuscated in the client. They are named here after the radio choices the variable
 * furni offer (`variables.availability.<n>`: a user variable 0, 10, 11; a furni variable 1, 10; a
 * global variable 1, 10, 11) and the Turbo server's `WiredAvailabilityType`; nothing in the client
 * says what 21 is.
 */
export enum WiredVariableAvailability {
    /** `_-G19`: while the user is in the room. Also `_-J1E.NOT_APPLICABLE`. */
    UserActive = 0,
    /** `_-H2u`: while the room is loaded. */
    RoomActive = 1,
    /** `_-1p` */
    Persistent = 10,
    /** `_-d12`: persistent, and shared with other rooms. */
    Shared = 11,
    /** `_-w1z`: a variable another room shares with this one. */
    Reference = 20,
    /** `_-QH` */
    Unknown21 = 21,
}

/** Flash `WiredVariable.isPersisted`: 10, 11 or 20. */
export const isWiredVariablePersisted = (availabilityType: WiredVariableAvailability): boolean =>
    (availabilityType === WiredVariableAvailability.Persistent)
    || (availabilityType === WiredVariableAvailability.Shared)
    || (availabilityType === WiredVariableAvailability.Reference);
