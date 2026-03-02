import type { IRoom } from '@nitrodevco/nitro-api';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { RoomContext } from './RoomContext';

export const RoomContextProvider = ({ roomId, children }: { roomId: number; children: ReactNode }) => {
    const [room, setRoom] = useState<IRoom | undefined>(undefined);

    return <RoomContext.Provider value={{ roomId, room, setRoom }}>{children}</RoomContext.Provider>;
};
