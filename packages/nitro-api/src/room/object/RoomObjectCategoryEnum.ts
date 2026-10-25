/**
 * Flash `RoomObjectCategoryEnum`. `Snowball` and `SnowSplash` are the snowwar game's objects:
 * nothing creates them until the game engine is ported, but the ids are the client's own.
 */
export enum RoomObjectCategoryEnum {
    Minimum = -2,
    Room = 0,
    Floor = 10,
    Wall = 20,
    Unit = 100,
    Cursor = 200,
    Snowball = 201,
    SnowSplash = 202,
}
