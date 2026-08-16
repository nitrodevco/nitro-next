import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetMannequinFigureComposerType = object;

export class SetMannequinFigureComposer implements IOutgoingPacket<SetMannequinFigureComposerType> {
    public constructor(private params: SetMannequinFigureComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
