import { useUserContext } from "../../useUserContext";

export const useFriendsSelector = () => useUserContext(x => x.friends);