import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UpdateGuildColorsComposerType = object;

export class UpdateGuildColorsComposer implements IOutgoingPacket<UpdateGuildColorsComposerType> {
    public constructor(private params: UpdateGuildColorsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
