import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CloseIssueDefaultActionComposerType = object;

export class CloseIssueDefaultActionComposer implements IOutgoingPacket<CloseIssueDefaultActionComposerType> {
    public constructor(private params: CloseIssueDefaultActionComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
