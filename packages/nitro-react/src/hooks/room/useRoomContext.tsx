import { useContext } from 'react';

import { RoomContext } from '#base/context';

export const useRoomContext = () => {
    const ctx = useContext(RoomContext);

    if (!ctx) throw new Error('useRoomContext must be used within AppProvider');

    return ctx;
};
