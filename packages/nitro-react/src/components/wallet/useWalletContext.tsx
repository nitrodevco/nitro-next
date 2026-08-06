import { useContext } from "react";

import { WalletContext } from "./WalletContext";

export const useWalletContext = () => {
    const ctx = useContext(WalletContext);

    if (!ctx) throw new Error("useWalletContext must be used within WalletComponent");

    return ctx;
}
