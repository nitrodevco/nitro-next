// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ApproveNameComposerType = {
    /** The name to check - a pet's name from the catalogue's pet pages. */
    name: string;
    /** What is being named: `HabboCatalog.approveName(name, 1)` for a pet. */
    type: number;
};

/** Flash `ApproveNameMessageComposer(name, type)`; answered by `ApproveNameMessage`. */
export class ApproveNameComposer implements IOutgoingPacket<ApproveNameComposerType> {
    public constructor(private params: ApproveNameComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.name,
            this.params.type,
        ];
    }
}
