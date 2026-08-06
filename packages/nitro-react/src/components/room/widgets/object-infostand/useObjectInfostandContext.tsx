import { useContext } from "react";

import { ObjectInfostandContext } from "./ObjectInfostandContext";

export const useObjectInfostandContext = () => {
    const ctx = useContext(ObjectInfostandContext);

    if (!ctx) throw new Error("useObjectInfostandContext must be used within RoomObjectInfostandWidget");

    return ctx;
}
