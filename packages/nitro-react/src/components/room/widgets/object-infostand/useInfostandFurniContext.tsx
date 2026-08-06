import { useContext } from "react";

import { InfostandFurniContext } from "./InfostandFurniContext";

export const useInfostandFurniContext = () => {
    const ctx = useContext(InfostandFurniContext);

    if (!ctx) throw new Error("useInfostandFurniContext must be used within InfostandFurni");

    return ctx;
}
