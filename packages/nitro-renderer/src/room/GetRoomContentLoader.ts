import { RoomContentLoader } from './RoomContentLoader';

const roomContentLoader = new RoomContentLoader();

/** The one `RoomContentLoader` the room engine loads furniture, pet and effect libraries with. */
export const GetRoomContentLoader = () => roomContentLoader;
