import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ApplySnapshotComposerType = {
    id: number;
};

export class ApplySnapshotComposer implements IOutgoingPacket<ApplySnapshotComposerType> {
    public constructor(private params: ApplySnapshotComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.id,
        ];
    }
}
