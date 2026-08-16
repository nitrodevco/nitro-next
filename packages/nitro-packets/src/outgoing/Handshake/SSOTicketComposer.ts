import type { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SSOTicketComposerType = {
    ssoTicket: string;
    elapsedMilliseconds: number;
};

export class SSOTicketComposer implements IOutgoingPacket<SSOTicketComposerType> {
    public constructor(private params: SSOTicketComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.ssoTicket,
            this.params.elapsedMilliseconds,
        ];
    }
}
