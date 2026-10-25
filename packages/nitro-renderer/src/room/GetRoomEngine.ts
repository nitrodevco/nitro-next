import { RoomEngine } from './RoomEngine';

const roomEngine = new RoomEngine();

/** The one `RoomEngine` of the client. */
export const GetRoomEngine = () => roomEngine;
