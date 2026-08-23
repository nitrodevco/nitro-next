import { IObjectData } from '../room';
import { IPurchasableOffer } from './IPurchasableOffer';

export interface IPurchaseOptions {
    offer: IPurchasableOffer | undefined;
    quantity: number;
    extraData: string;
    extraParamRequired: boolean;
    objectData: IObjectData | undefined;
}
