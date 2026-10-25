// Body filled by hand from the packet generator output - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** `com.sulake.habbo.userclassification.UserClassificationData`. */
export interface IUserClassificationData {
    userId: number;
    userName: string;
    classType: string;
}

export type UserClassificationMessageType = {
    users: IUserClassificationData[];
};

/**
 * Flash's `UserClassificationMessageEvent` parser: the users classified, in order. Its two maps
 * (`classifiedUsernameMap`, `classifiedUserTypeMap`) are keyed by user id and `Map.add` keeps the
 * first entry for an id, so a repeated id is read and dropped.
 */
export class UserClassificationMessage implements IIncomingPacket<UserClassificationMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserClassificationMessageType {
        const users: IUserClassificationData[] = [];
        const count = wrapper.readInt();

        for (let i = 0; i < count; i++) {
            const userId = wrapper.readInt();
            const userName = wrapper.readString();
            const classType = wrapper.readString();

            if (!users.some(x => x.userId === userId)) users.push({ userId, userName, classType });
        }

        return { users };
    }
}
