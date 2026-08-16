import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type EventLogComposerType = {
    event: string;
    data: string;
    action: string;
    extraString: string;
    extraInt: number;
};

export class EventLogComposer implements IOutgoingPacket<EventLogComposerType> {
    public constructor(private params: EventLogComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.event,
            this.params.data,
            this.params.action,
            this.params.extraString,
            this.params.extraInt,
        ];
    }
}
