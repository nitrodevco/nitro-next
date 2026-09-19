// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IRoomInfo } from './RoomSettingsParser';

export interface IOfficialRoomsData3r {
    code: string;
    leaderFigure: string;
    bestRoom: IRoomInfo;
    rooms: unknown[];
}
