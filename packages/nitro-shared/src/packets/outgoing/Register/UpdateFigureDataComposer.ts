import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UpdateFigureDataComposerType = object;

export class UpdateFigureDataComposer implements IOutgoingPacket<UpdateFigureDataComposerType> {
    public constructor(private params: UpdateFigureDataComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
