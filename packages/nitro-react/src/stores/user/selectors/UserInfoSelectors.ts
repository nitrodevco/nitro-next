import type { UserStore } from "../UserStore";

export const selectOwnUserId = (state: UserStore) => state.userId;