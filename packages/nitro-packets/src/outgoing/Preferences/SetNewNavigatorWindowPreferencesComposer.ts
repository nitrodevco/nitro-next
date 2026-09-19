// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetNewNavigatorWindowPreferencesComposerType = {
    x: number;
    y: number;
    width: number;
    height: number;
    openSavedSearches: boolean;
    resultsMode: number;
};

export class SetNewNavigatorWindowPreferencesComposer implements IOutgoingPacket<SetNewNavigatorWindowPreferencesComposerType> {
    public constructor(private params: SetNewNavigatorWindowPreferencesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.x,
            this.params.y,
            this.params.width,
            this.params.height,
            this.params.openSavedSearches,
            this.params.resultsMode,
        ];
    }
}
