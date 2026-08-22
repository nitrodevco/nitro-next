import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/* SetUIFlagsMessageComposer (3653) — the full flags int; bit 2 = room tools expanded */
export type SetUIFlagsComposerType = {
    flags: number;
};

export class SetUIFlagsComposer implements IOutgoingPacket<SetUIFlagsComposerType> {
    public constructor(private params: SetUIFlagsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.flags,
        ];
    }
}
