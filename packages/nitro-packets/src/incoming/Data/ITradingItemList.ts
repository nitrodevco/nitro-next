// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { ITradingItemListData } from './ITradingItemListData';

/** The fields of Flash `TradingItemListParser`: what each side of a trade has put in. */
export interface ITradingItemList {
    firstUserID: number;
    firstUserItemArray: ITradingItemListData[];
    firstUserNumItems: number;
    firstUserNumCredits: number;
    secondUserID: number;
    secondUserItemArray: ITradingItemListData[];
    secondUserNumItems: number;
    secondUserNumCredits: number;
}
