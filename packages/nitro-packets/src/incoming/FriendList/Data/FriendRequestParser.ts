import { type IMessageDataWrapper } from "@nitrodevco/nitro-api";
import { IFriendRequest } from "./IFriendRequest";

export const FriendRequestParser = (wrapper: IMessageDataWrapper): IFriendRequest => {
    const packet = {
        playerId: wrapper.readInt(),
        name: wrapper.readString(),
        figure: wrapper.readString()
    } as IFriendRequest;

    wrapper.readInt();

    return packet;
}