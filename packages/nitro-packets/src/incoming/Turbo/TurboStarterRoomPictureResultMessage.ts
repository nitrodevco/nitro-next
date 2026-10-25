import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TurboStarterRoomPictureResultMessageType = {
    roomId: number;
    /** The picture was drawn and the room picker points at it. */
    ok: boolean;
};

/** Not Habbo's: Turbo's `starter.rooms` answer to `TurboStarterRoomPictureComposer`. */
export class TurboStarterRoomPictureResultMessage implements IIncomingPacket<TurboStarterRoomPictureResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): TurboStarterRoomPictureResultMessageType {
        const roomId = wrapper.readInt();
        const ok = wrapper.readBoolean();

        return { roomId, ok };
    }
}
