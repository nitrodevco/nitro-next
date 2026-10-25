import { IPrizeMessageSubProduct } from '../../../Data/PrizeMessageSubProductParser';

/**
 * Flash `PrizeMessageData`: one product (`productItemType` `s`, `i` or `chat_style`, and its type
 * id) or, when its product count is above one (`isDeal`), a deal of `subProducts`.
 */
export interface IPrizeMessageData {
    productCode: string;
    productCount: number;
    isDeal: boolean;
    productItemType: string;
    productItemTypeId: number;
    subProducts: IPrizeMessageSubProduct[];
}
