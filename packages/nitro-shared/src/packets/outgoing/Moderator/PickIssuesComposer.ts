import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PickIssuesComposerType = object;

export class PickIssuesComposer implements IOutgoingPacket<PickIssuesComposerType> {
    public constructor(private params: PickIssuesComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
