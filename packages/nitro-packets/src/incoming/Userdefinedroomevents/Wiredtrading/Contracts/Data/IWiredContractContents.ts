// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { ITradeRequirementRulesDefinition } from '../../Data/ITradeRequirementRulesDefinition';
import { WiredContractType } from './WiredContractType';

/**
 * What a wired contract holds - the fields of the Flash contents parser (`_-42y._-02m`), and
 * exactly what `AbstractContract.addContentsToComposer` sends back, so `WiredContractContentsMessage`
 * and `WiredUpdateContractComposer` share it. A trade contract has the definition alone.
 */
export interface IWiredContractContents {
    contractId: number;
    contractType: WiredContractType;
    definition: ITradeRequirementRulesDefinition;
    /** Payment only: the radio choice `wiredcontracts.payment_contract.mode.<0|1>`; 1 enables the receive text. */
    paymentMode?: number;
    /** Payment only. */
    receiveText?: string;
    /** Payment only: `generic` or `games` (`PaymentContract.LAYOUT_TYPES`). */
    layoutType?: string;
    /** Reward only: the earnings category chosen in the dropdown. */
    rewardCategory?: number;
    /** Reward only: show the reward dialog without being asked. */
    showDialog?: boolean;
    /** Reward only. */
    rewardText?: string;
}
