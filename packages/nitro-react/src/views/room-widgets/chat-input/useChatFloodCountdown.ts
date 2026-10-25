import { useEffect, useState } from 'react';

import { useRoomStore } from '#base/context/room';

/**
 * `RoomChatInputView.showFloodBlocking`'s countdown: the seconds left of the server's flood-control
 * block, 0 once it has passed.
 */
export const useChatFloodCountdown = () => {
    const floodBlockSeconds = useRoomStore(x => x.floodBlockSeconds);
    const floodBlockStamp = useRoomStore(x => x.floodBlockStamp);
    const [ floodRemaining, setFloodRemaining ] = useState(0);

    // Flood control: swap the field for the countdown until the server's seconds have passed.
    useEffect(() => {
        if (!floodBlockSeconds || !floodBlockStamp) return;

        const endsAt = floodBlockStamp + (floodBlockSeconds * 1000);
        const tick = () => setFloodRemaining(Math.max(0, Math.ceil((endsAt - Date.now()) / 1000)));

        tick();

        const interval = setInterval(tick, 1000);

        return () => clearInterval(interval);
    }, [ floodBlockSeconds, floodBlockStamp ]);

    return floodRemaining;
};
