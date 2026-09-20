// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { Byte, IOutgoingPacket, Short } from '@nitrodevco/nitro-api';

import { IWiredContractContents } from '../../../../incoming/Userdefinedroomevents/Wiredtrading/Contracts/Data/IWiredContractContents';
import { WiredContractType } from '../../../../incoming/Userdefinedroomevents/Wiredtrading/Contracts/Data/WiredContractType';
import { ITradeRequirementRule } from '../../../../incoming/Userdefinedroomevents/Wiredtrading/Data/ITradeRequirementRule';
import { TradeRequirementNodeType } from '../../../../incoming/Userdefinedroomevents/Wiredtrading/Data/TradeRequirementNodeType';

/** The contract exactly as `WiredContractContentsMessage` delivers it, edited. */
export type WiredUpdateContractComposerType = IWiredContractContents;

type Value = number | string | boolean | Byte | Short;

/** Flash `TradeRequirementRule.addToComposer`, with `TradeRequirementNode.addToComposer` and `ChestItemType.addToComposer` inside it. */
const composeRule = (rule: ITradeRequirementRule): Value[] => {
    const data: Value[] = [ rule.nodes.length ];

    for (const node of rule.nodes) {
        data.push(new Byte(node.type), node.amount);

        if ((node.type === TradeRequirementNodeType.Furni) && node.itemType) data.push(node.itemType.isWallItem, node.itemType.typeId, node.itemType.legacyPosterId);
    }

    return data;
};

/**
 * Flash `_-EC.WiredUpdateContractMessageComposer` takes a ready-made array; what goes into it is
 * `AbstractContract.addContentsToComposer` plus the payment and reward overrides, and mirrors
 * `WiredContractContentsMessage` field for field:
 *
 *   contractId, contractType (short), definition,
 *   [payment] paymentMode (short), receiveText, layoutType
 *   [reward]  rewardCategory (short), showDialog, rewardText
 *
 * The definition is `TradeRequirementRulesDefinition.addToComposer`: a flag and the list of "you
 * give" rules, a flag and the "you get" rule, each rule a node count and its nodes, each node a
 * byte type, an amount and - for furni - the item type. Answered by `WiredContractUpdateResultMessage`.
 */
export class WiredUpdateContractComposer implements IOutgoingPacket<WiredUpdateContractComposerType> {
    public constructor(private params: WiredUpdateContractComposerType) { }

    public compose(): Value[] {
        const { contractId, contractType, definition } = this.params;
        const data: Value[] = [ contractId, new Short(contractType) ];

        data.push(!!definition.youGiveRule);

        if (definition.youGiveRule) {
            data.push(definition.youGiveRule.length);

            for (const rule of definition.youGiveRule) data.push(...composeRule(rule));
        }

        data.push(!!definition.youGetRule);

        if (definition.youGetRule) data.push(...composeRule(definition.youGetRule));

        if (contractType === WiredContractType.Payment) data.push(new Short(this.params.paymentMode ?? 0), this.params.receiveText ?? '', this.params.layoutType ?? 'generic');

        if (contractType === WiredContractType.Reward) data.push(new Short(this.params.rewardCategory ?? 0), this.params.showDialog ?? false, this.params.rewardText ?? '');

        return data;
    }
}
