import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetBundleDiscountRulesetComposerType = object;

export class GetBundleDiscountRulesetComposer implements IOutgoingPacket<GetBundleDiscountRulesetComposerType> {
    public constructor(private params: GetBundleDiscountRulesetComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
