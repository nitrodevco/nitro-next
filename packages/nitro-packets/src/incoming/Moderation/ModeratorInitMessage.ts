import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IIssueMessageData, IssueMessageDataParser } from './Data/IssueMessageDataParser';

/** `ModeratorInitData` (1318 AS3 :37-72): what opens the moderation tool's start panel. */
export type ModeratorInitMessageType = {
    issues: IIssueMessageData[];
    messageTemplates: string[];
    cfhPermission: boolean;
    chatlogsPermission: boolean;
    alertPermission: boolean;
    kickPermission: boolean;
    banPermission: boolean;
    roomAlertPermission: boolean;
    roomKickPermission: boolean;
    roomMessageTemplates: string[];
};

const readStrings = (wrapper: IMessageDataWrapper): string[] => {
    const values: string[] = [];

    for (let count = wrapper.readInt(); count > 0; count--) values.push(wrapper.readString());

    return values;
};

export class ModeratorInitMessage implements IIncomingPacket<ModeratorInitMessageType> {
    public parse(wrapper: IMessageDataWrapper): ModeratorInitMessageType {
        const issues: IIssueMessageData[] = [];

        for (let count = wrapper.readInt(); count > 0; count--) issues.push(IssueMessageDataParser(wrapper));

        const messageTemplates = readStrings(wrapper);

        // A list ModeratorInitData reads and drops.
        readStrings(wrapper);

        return {
            issues,
            messageTemplates,
            cfhPermission: wrapper.readBoolean(),
            chatlogsPermission: wrapper.readBoolean(),
            alertPermission: wrapper.readBoolean(),
            kickPermission: wrapper.readBoolean(),
            banPermission: wrapper.readBoolean(),
            roomAlertPermission: wrapper.readBoolean(),
            roomKickPermission: wrapper.readBoolean(),
            roomMessageTemplates: readStrings(wrapper),
        };
    }
}
