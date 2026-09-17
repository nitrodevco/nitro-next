import { GetCreditsInfoComposer, GetNftCreditsComposer } from '@nitrodevco/nitro-packets';
import { useEffect } from 'react';

import { useWebSocketContext } from '#base/context/communication';

export const WalletComponent = () => {
    const { send } = useWebSocketContext();

    useEffect(() => {
        send(new GetCreditsInfoComposer({}));
        send(new GetNftCreditsComposer({}));
    }, []);

    return null;
};
