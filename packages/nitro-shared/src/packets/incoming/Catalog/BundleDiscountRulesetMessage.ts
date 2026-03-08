import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(BundleDiscountRuleset: BundleDiscountRulesetSnapshot): Unknown type 'BundleDiscountRulesetSnapshot'. Add override mapping.

export type BundleDiscountRulesetMessageType = {
  bundleDiscountRuleset: any;
};

export class BundleDiscountRulesetMessage implements IIncomingPacket<BundleDiscountRulesetMessageType>
{
  public parse(wrapper: IMessageDataWrapper): BundleDiscountRulesetMessageType
  {

    const packet: BundleDiscountRulesetMessageType = {
      bundleDiscountRuleset: undefined as any, // Unknown type 'BundleDiscountRulesetSnapshot'. Add override mapping.
    };

    return packet;
  }
}
