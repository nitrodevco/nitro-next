import { IPrizeMessageData } from './IPrizeMessageData';

/** Flash `PrizeLevelMessageData`: one level of the prize table and its odds (1 in `probabilityDenominator`). */
export interface IPrizeLevelMessageData {
    prizeLevelId: number;
    probabilityDenominator: number;
    prizes: IPrizeMessageData[];
}
