import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ShoutComposerType = {
    text: string;
    styleId: number;
};

/** Flash `_Str_12180`: `[text, styleId]`. */
export class ShoutComposer implements IOutgoingPacket<ShoutComposerType> {
    public constructor(private params: ShoutComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.text,
            this.params.styleId,
        ];
    }
}
