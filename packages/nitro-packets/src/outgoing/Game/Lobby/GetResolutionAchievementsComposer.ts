// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetResolutionAchievementsComposerType = {
    /** The resolution trophy being opened. */
    objectId: number;
    /** Which achievement to preselect, or 0 for whatever the furni is already set to. */
    selectedAchievementId: number;
};

export class GetResolutionAchievementsComposer implements IOutgoingPacket<GetResolutionAchievementsComposerType> {
    public constructor(private params: GetResolutionAchievementsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
            this.params.selectedAchievementId,
        ];
    }
}
