import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type VersionCheckComposerType = {
    clientID: number;
    clientURL: string;
    externalVariablesURL: string;
};

export class VersionCheckComposer implements IOutgoingPacket<VersionCheckComposerType> {
    public constructor(private params: VersionCheckComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.clientID,
            this.params.clientURL,
            this.params.externalVariablesURL,
        ];
    }
}
