import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type AvatarEffectActivatedMessageType = {
    type: number;
    duration: number;
    isPermanent: boolean;
};

export class AvatarEffectActivatedMessage implements IIncomingPacket<AvatarEffectActivatedMessageType> {
    public parse(wrapper: IMessageDataWrapper): AvatarEffectActivatedMessageType {
        const packet: AvatarEffectActivatedMessageType = {
            type: wrapper.readInt(),
            duration: wrapper.readInt(),
            isPermanent: wrapper.readBoolean(),
        };

        return packet;
    }
}
