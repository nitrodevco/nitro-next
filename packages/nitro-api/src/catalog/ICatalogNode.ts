export interface ICatalogNode {
    depth: number;
    parent: ICatalogNode | undefined;
    isOpen: boolean;
    isActive: boolean;
    readonly visible: boolean;
    readonly icon: number;
    readonly pageId: number;
    readonly pageName: string;
    readonly localization: string;
    readonly offerIds: number[];
    readonly children: ICatalogNode[];
}
