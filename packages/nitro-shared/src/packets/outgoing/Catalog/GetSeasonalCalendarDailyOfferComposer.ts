import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetSeasonalCalendarDailyOfferComposerType = object;

export class GetSeasonalCalendarDailyOfferComposer implements IOutgoingPacket<GetSeasonalCalendarDailyOfferComposerType> {
    public constructor(private params: GetSeasonalCalendarDailyOfferComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
