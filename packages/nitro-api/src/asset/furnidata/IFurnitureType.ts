export interface IFurnitureType {
    id: number;
    classname: string;
    revision: number;
    /** Null on some entries (e.g. newer NFT/diamond items) */
    category: string | null;
    defaultdir: number;
    xdim: number;
    ydim: number;
    /** Only present on a subset of items (~5078/17091 in this dataset) */
    partcolors?: {
        color: string[];
    };
    name: string | null;
    description: string | null;
    adurl: null;
    offerid: number;
    buyout: boolean;
    rentofferid: number;
    rentbuyout: boolean;
    bc: boolean;
    excludeddynamic: boolean;
    bcofferid: number;
    /** Colon-delimited coordinate/rotation strings, or a plain numeric string flag, or null */
    customparams: string | null;
    specialtype: number;
    canstandon: boolean;
    cansiton: boolean;
    canlayon: boolean;
    canputstuffon: boolean;
    height: number;
    furniline: string | null;
    environment: string | null;
    rare: boolean;
    tradeable: boolean;
    recyclable: boolean;
}
