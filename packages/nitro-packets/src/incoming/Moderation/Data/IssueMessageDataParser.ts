import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

/**
 * One call-for-help issue (`IssueInfoMessageParser.parse`, 1318 AS3 :26-48): eight ints, then
 * name, int, name, int, name, message, chat record id and the matched patterns. The read order is
 * the AS3's; the field names are inferred, its own being obfuscated.
 */
export interface IIssueMessageData {
    issueId: number;
    state: number;
    categoryId: number;
    reportedCategoryId: number;
    issueAgeInMilliseconds: number;
    priority: number;
    groupingId: number;
    reporterUserId: number;
    reporterUserName: string;
    reportedUserId: number;
    reportedUserName: string;
    pickerUserId: number;
    pickerUserName: string;
    message: string;
    chatRecordId: number;
    patterns: { pattern: string; startIndex: number; endIndex: number }[];
}

export const IssueMessageDataParser = (wrapper: IMessageDataWrapper): IIssueMessageData => {
    const data: IIssueMessageData = {
        issueId: wrapper.readInt(),
        state: wrapper.readInt(),
        categoryId: wrapper.readInt(),
        reportedCategoryId: wrapper.readInt(),
        issueAgeInMilliseconds: wrapper.readInt(),
        priority: wrapper.readInt(),
        groupingId: wrapper.readInt(),
        reporterUserId: wrapper.readInt(),
        reporterUserName: wrapper.readString(),
        reportedUserId: wrapper.readInt(),
        reportedUserName: wrapper.readString(),
        pickerUserId: wrapper.readInt(),
        pickerUserName: wrapper.readString(),
        message: wrapper.readString(),
        chatRecordId: wrapper.readInt(),
        patterns: [],
    };

    for (let count = wrapper.readInt(); count > 0; count--) {
        data.patterns.push({ pattern: wrapper.readString(), startIndex: wrapper.readInt(), endIndex: wrapper.readInt() });
    }

    return data;
};
