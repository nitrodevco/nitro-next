import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetChestPreferencesComposerType = {
    chestId: number;
    name: string;
    description: string;
    isLocked: boolean;
    isWiredEnabled: boolean;
    option1: number;
    option2: number;
    option3: number;
    flag: boolean;
};

export class SetChestPreferencesComposer implements IOutgoingPacket<SetChestPreferencesComposerType> {
    public constructor(private params: SetChestPreferencesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.chestId,
            this.params.name,
            this.params.description,
            this.params.isLocked,
            this.params.isWiredEnabled,
            this.params.option1,
            this.params.option2,
            this.params.option3,
            this.params.flag,
        ];
    }
}
