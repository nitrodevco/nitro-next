import type { RoomStore } from "../RoomStore";

export const selectUserBadges = (state: RoomStore) => state.userBadges;