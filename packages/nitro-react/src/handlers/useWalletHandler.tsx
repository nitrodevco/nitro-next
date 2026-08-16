import { CreditBalanceEventMessage, EmeraldBalanceMessage, HabboActivityPointNotificationMessage, SilverBalanceMessage } from "@nitrodevco/nitro-packets";

import { useUserWalletActions } from "#base/context";
import { useMessageListener } from "#base/hooks";

export const useWalletHandler = () => {
    const { setCredits, setEmeralds, setSilver, setActivityPoints } = useUserWalletActions();

    useMessageListener(CreditBalanceEventMessage, data => {
        setCredits(data.balance);
    });

    useMessageListener(EmeraldBalanceMessage, data => {
        setEmeralds(data.emeraldBalance);
    });

    useMessageListener(SilverBalanceMessage, data => {
        setSilver(data.silverBalance);
    });

    useMessageListener(HabboActivityPointNotificationMessage, data => {
        setActivityPoints(data.type, data.amount);
    });
}