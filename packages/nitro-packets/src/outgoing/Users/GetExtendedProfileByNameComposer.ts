// Body filled by hand from the AS3 composer.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetExtendedProfileByNameComposerType = {
    userName: string;
};

/** `GetExtendedProfileByNameMessageComposer(name)`. */
export class GetExtendedProfileByNameComposer implements IOutgoingPacket<GetExtendedProfileByNameComposerType> {
    public constructor(private params: GetExtendedProfileByNameComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.userName,
        ];
    }
}
