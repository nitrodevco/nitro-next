import { GetCreditsInfoComposer, GetNftCreditsComposer } from '@nitrodevco/nitro-packets';
import { useEffect } from 'react';

import { useWallet, useWebSocketContext } from '#base/context';

export const WalletComponent = () => {
    const currency = useWallet();
    const { send } = useWebSocketContext();

    useEffect(() => {
        send(new GetCreditsInfoComposer({}));
        send(new GetNftCreditsComposer({}));
    }, []);

    return null;
};
