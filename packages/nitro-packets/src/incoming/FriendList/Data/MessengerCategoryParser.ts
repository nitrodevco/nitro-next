import { type IMessageDataWrapper } from "@nitrodevco/nitro-api";
import { IMessengerCategory } from "./IMessengerCategory";

export const MessengerCategoryParser = (wrapper: IMessageDataWrapper): IMessengerCategory => {
    return {
        categoryId: wrapper.readInt(),
        name: wrapper.readString()
    };
}