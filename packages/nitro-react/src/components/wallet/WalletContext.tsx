import { createContext } from "react";

import type { selectCurrencyData } from "#base/stores";

export type WalletContextValue = {
    currency: ReturnType<typeof selectCurrencyData>;
}

export const WalletContext = createContext<WalletContextValue | undefined>(undefined);
