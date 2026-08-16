import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ReleaseIssuesComposerType = object;

export class ReleaseIssuesComposer implements IOutgoingPacket<ReleaseIssuesComposerType> {
    public constructor(private params: ReleaseIssuesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
