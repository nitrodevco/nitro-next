// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { TradeRequirementRulesDefinitionParser } from '../Data/TradeRequirementRulesDefinitionParser';
import { IWiredContractContents } from './Data/IWiredContractContents';
import { WiredContractType } from './Data/WiredContractType';

export type WiredContractContentsMessageType = IWiredContractContents;

/** Flash parser `_-42y._-02m`: the contract type is a short, and the payment and reward contracts each add three fields. */
export class WiredContractContentsMessage implements IIncomingPacket<WiredContractContentsMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredContractContentsMessageType {
        const contractId = wrapper.readInt();
        const contractType: WiredContractType = wrapper.readShort();
        const definition = TradeRequirementRulesDefinitionParser(wrapper);
        const packet: WiredContractContentsMessageType = { contractId, contractType, definition };

        if (contractType === WiredContractType.Payment) {
            packet.paymentMode = wrapper.readShort();
            packet.receiveText = wrapper.readString();
            packet.layoutType = wrapper.readString();
        }

        if (contractType === WiredContractType.Reward) {
            packet.rewardCategory = wrapper.readShort();
            packet.showDialog = wrapper.readBoolean();
            packet.rewardText = wrapper.readString();
        }

        return packet;
    }
}
