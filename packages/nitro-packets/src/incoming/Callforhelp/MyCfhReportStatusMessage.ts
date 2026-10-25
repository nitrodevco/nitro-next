// Body filled by hand from the AS3 (the report status parser and its `SanctionStatusMessageParser` items).
import { IIncomingPacket, IMessageDataWrapper, ReadLong } from '@nitrodevco/nitro-api';

/** `SanctionStatusMessageParser.appealStatus`: none, appealed, appeal decided with action, without. */
export const CFH_APPEAL_STATUS_NONE = 0;
export const CFH_APPEAL_STATUS_APPEALED = 1;
export const CFH_APPEAL_STATUS_ACTION = 2;
export const CFH_APPEAL_STATUS_NO_ACTION = 3;

/** One report: `SanctionStatusMessageParser`, its times in ms since the epoch and -1 for none. */
export interface IMyCfhReportStatus {
    id: number;
    creationTime: number;
    userMessage: string;
    userCategory: number;
    reportedAccountName: string;
    closeTime: number;
    sanctioned: boolean;
    sanctionGivenByAutoModeration: boolean;
    appealStatus: number;
    appealCreationTime: number;
    appealResolutionTime: number;
}

export type MyCfhReportStatusMessageType = {
    reports: IMyCfhReportStatus[];
};

export class MyCfhReportStatusMessage implements IIncomingPacket<MyCfhReportStatusMessageType> {
    public parse(wrapper: IMessageDataWrapper): MyCfhReportStatusMessageType {
        const reports: IMyCfhReportStatus[] = [];
        let count = wrapper.readInt();

        while (count-- > 0) {
            reports.push({
                id: ReadLong(wrapper),
                creationTime: ReadLong(wrapper),
                userMessage: wrapper.readString(),
                userCategory: wrapper.readInt(),
                reportedAccountName: wrapper.readString(),
                closeTime: ReadLong(wrapper),
                sanctioned: wrapper.readBoolean(),
                sanctionGivenByAutoModeration: wrapper.readBoolean(),
                appealStatus: wrapper.readByte(),
                appealCreationTime: ReadLong(wrapper),
                appealResolutionTime: ReadLong(wrapper),
            });
        }

        return { reports };
    }
}
