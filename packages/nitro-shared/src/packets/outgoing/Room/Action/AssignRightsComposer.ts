import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AssignRightsComposerType = object;

export class AssignRightsComposer implements IOutgoingPacket<AssignRightsComposerType> {
    public constructor(private params: AssignRightsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
