import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type NewUserExperienceScriptProceedComposerType = object;

export class NewUserExperienceScriptProceedComposer implements IOutgoingPacket<NewUserExperienceScriptProceedComposerType> {
    public constructor(private params: NewUserExperienceScriptProceedComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
