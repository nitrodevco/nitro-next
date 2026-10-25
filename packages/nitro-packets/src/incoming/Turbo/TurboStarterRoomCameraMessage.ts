import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TurboStarterRoomCameraMessageType = {
    /** The room whose picture to take: the one the user is in. */
    roomId: number;
};

/**
 * Not Habbo's: Turbo's `starter.rooms` extension - open the starter room camera (`:starterroom add`
 * or `picture`). See Turbo's `docs/client-capabilities.md`.
 */
export class TurboStarterRoomCameraMessage implements IIncomingPacket<TurboStarterRoomCameraMessageType> {
    public parse(wrapper: IMessageDataWrapper): TurboStarterRoomCameraMessageType {
        return { roomId: wrapper.readInt() };
    }
}
