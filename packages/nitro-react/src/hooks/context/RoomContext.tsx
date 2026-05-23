import type { IRoom } from '@nitrodevco/nitro-api';
import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

export interface RoomContextType {
    roomId: number | undefined;
    room: IRoom | undefined;
    setRoom: Dispatch<SetStateAction<IRoom | undefined>>;
}

export const RoomContext = createContext<RoomContextType | undefined>(undefined);
