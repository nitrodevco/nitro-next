// Body filled by hand from the AS3 (`SanctionStatusEvent`'s parser) - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** A sanction type as the parser's `readSanctionType` reads it. */
export interface ISanctionStatusType {
    name: string;
    sanctionLengthHours: number;
    /** The third integer; `SanctionInfo` never reads it. */
    unknownValue: number;
}

/** One sanction of the list. */
export interface ISanctionStatusEntry {
    sanctionType: ISanctionStatusType;
    /** The text `SanctionInfo` shows for the sanction. */
    description: string;
    /** Whether the sanction is gradual: `SanctionInfo` then adds the probation and the next sanction. */
    gradual: boolean;
    probationHoursLeft: number;
    nextSanctionType: ISanctionStatusType;
}

export type SanctionStatusEventMessageType = {
    sanctions: ISanctionStatusEntry[];
};

const readSanctionType = (wrapper: IMessageDataWrapper): ISanctionStatusType => ({
    name: wrapper.readString(),
    sanctionLengthHours: wrapper.readInt(),
    unknownValue: wrapper.readInt(),
});

export class SanctionStatusEventMessage implements IIncomingPacket<SanctionStatusEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): SanctionStatusEventMessageType {
        const sanctions: ISanctionStatusEntry[] = [];
        let count = wrapper.readInt();

        while (count-- > 0) {
            const sanctionType = readSanctionType(wrapper);
            const description = wrapper.readString();
            const gradual = wrapper.readBoolean();
            const probationHoursLeft = wrapper.readInt();
            const nextSanctionType = readSanctionType(wrapper);

            sanctions.push({ sanctionType, description, gradual, probationHoursLeft, nextSanctionType });
        }

        return { sanctions };
    }
}
