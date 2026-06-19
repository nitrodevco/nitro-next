import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CustomizeAvatarWithFurniComposerType = object;

export class CustomizeAvatarWithFurniComposer implements IOutgoingPacket<CustomizeAvatarWithFurniComposerType> {
    public constructor(private params: CustomizeAvatarWithFurniComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
