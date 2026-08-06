import { GetCreditsInfoComposer, GetNftCreditsComposer } from "@nitrodevco/nitro-shared";
import type { ReactNode } from "react";
import { useEffect } from "react";

import { useWallet, useWebSocketContext } from "#base/context";

import { WalletContext } from "./WalletContext";

type WalletComponentProps = {
    children: ReactNode;
}

export const WalletComponent = ({ children }: WalletComponentProps) => {
    const currency = useWallet();
    const { send } = useWebSocketContext();

    useEffect(() => {
        send(new GetCreditsInfoComposer({}));
        send(new GetNftCreditsComposer({}));
    }, []);

    return (
        <WalletContext value={{ currency }}>
            {children}
        </WalletContext>
    );
}
