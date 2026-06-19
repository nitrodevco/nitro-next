import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CloseIssuesComposerType = object;

export class CloseIssuesComposer implements IOutgoingPacket<CloseIssuesComposerType> {
    public constructor(private params: CloseIssuesComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
