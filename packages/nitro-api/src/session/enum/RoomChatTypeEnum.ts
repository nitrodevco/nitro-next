/**
 * The chat "types" the Flash `RoomSessionChatEvent` carried (its `CHAT_TYPE_*` constants) - the kind
 * of bubble a message renders as. Checked against that class by `scripts/drift/enums.py`.
 */
export enum RoomChatTypeEnum {
    Speak = 0,
    Whisper = 1,
    Shout = 2,
    Respect = 3,
    PetRespect = 4,
    HandItem = 5,
    PetTreat = 6,
    PetRevive = 7,
    PetRebreed = 8,
    PetSpeed = 9,
    MuteRemaining = 10,
    Ping = 11,
    SpecialSystem = 12,
}
