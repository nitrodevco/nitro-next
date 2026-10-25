// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetGuildEditorDataComposerType = object;

/** Asks for the badge parts and colour palettes - `HabboGroupsManager.requestGuildEditorData`, once per session. */
export class GetGuildEditorDataComposer implements IOutgoingPacket<GetGuildEditorDataComposerType> {
    public constructor(private params: GetGuildEditorDataComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
