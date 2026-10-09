// Body filled by hand from the AS3 (the selected NFT wardrobe outfit parser) - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserNftWardrobeSelectionMessageType = {
    /** The NFT outfit worn, by token id; empty for none. */
    currentTokenId: string;
    /** The look to fall back to away from the NFT tab. */
    fallbackFigureString: string;
    fallbackFigureGender: string;
};

export class UserNftWardrobeSelectionMessage implements IIncomingPacket<UserNftWardrobeSelectionMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserNftWardrobeSelectionMessageType {
        return {
            currentTokenId: wrapper.readString(),
            fallbackFigureString: wrapper.readString(),
            fallbackFigureGender: wrapper.readString(),
        };
    }
}
