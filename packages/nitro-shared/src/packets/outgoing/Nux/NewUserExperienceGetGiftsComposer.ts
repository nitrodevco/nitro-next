import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type NewUserExperienceGetGiftsComposerType = object;

export class NewUserExperienceGetGiftsComposer implements IOutgoingPacket<NewUserExperienceGetGiftsComposerType> {
    public constructor(private params: NewUserExperienceGetGiftsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
