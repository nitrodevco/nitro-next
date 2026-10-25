import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AppealCfhComposerType = {
    reportId: number;
};

export class AppealCfhComposer implements IOutgoingPacket<AppealCfhComposerType> {
    public constructor(private params: AppealCfhComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.reportId,
        ];
    }
}
