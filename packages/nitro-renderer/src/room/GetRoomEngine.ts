import { GetRoomManager } from './GetRoomManager';
import { RoomEngine } from './RoomEngine';

const roomEngine = new RoomEngine(GetRoomManager());

export const GetRoomEngine = () => roomEngine;
