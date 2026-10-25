import { RoomObjectLogicFactory } from './RoomObjectLogicFactory';

const roomObjectLogicFactory = new RoomObjectLogicFactory();

/** The one `RoomObjectLogicFactory` the room engine builds its objects' logics with. */
export const GetRoomObjectLogicFactory = () => roomObjectLogicFactory;
