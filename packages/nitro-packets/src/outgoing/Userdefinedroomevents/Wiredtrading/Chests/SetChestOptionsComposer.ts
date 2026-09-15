import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetChestOptionsComposerType = {
    chestId: number;
    isLocked: boolean;
    isWiredEnabled: boolean;
    option: number;
};

export class SetChestOptionsComposer implements IOutgoingPacket<SetChestOptionsComposerType> {
    public constructor(private params: SetChestOptionsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.chestId,
            this.params.isLocked,
            this.params.isWiredEnabled,
            this.params.option,
        ];
    }
}
