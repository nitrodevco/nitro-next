import { ICatalogNode, IMessageDataWrapper, ParseArray, ParseInts } from "@nitrodevco/nitro-api";

export const CatalogNodeParser = (wrapper: IMessageDataWrapper): ICatalogNode => {
    return {
        depth: 0,
        parent: undefined,
        isOpen: false,
        isActive: false,
        visible: wrapper.readBoolean(),
        icon: wrapper.readInt(),
        pageId: wrapper.readInt(),
        pageName: wrapper.readString(),
        localization: wrapper.readString(),
        offerIds: ParseInts(wrapper),
        children: ParseArray(wrapper, CatalogNodeParser)
    }
}