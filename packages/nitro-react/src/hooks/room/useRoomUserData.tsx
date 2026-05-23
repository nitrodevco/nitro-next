import type { IRoomUserData } from "@nitrodevco/nitro-api";
import { useState } from "react"

export const useRoomUserData = () => {
    const [usersByIndex, setUsersByIndex] = useState<{ [key: number]: IRoomUserData }>({});


}