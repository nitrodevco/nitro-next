import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCfhStatusComposerType = {
    flag: boolean;
};

export class GetCfhStatusComposer implements IOutgoingPacket<GetCfhStatusComposerType> {
    public constructor(private params: GetCfhStatusComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.flag,
        ];
    }
}
