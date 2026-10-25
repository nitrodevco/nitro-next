// Body filled by hand from the AS3 composer (`NewUserExperienceGetGiftsMessageComposer`): the count of
// the ints that follow - three per pick, not the number of picks - then each pick.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** `NewUserExperienceGetGiftsSelection`: a step of the offer by its day and index, and the gift picked in it. */
export interface INewUserExperienceGiftSelection {
    dayIndex: number;
    stepIndex: number;
    giftIndex: number;
}

export type NewUserExperienceGetGiftsComposerType = {
    selections: INewUserExperienceGiftSelection[];
};

export class NewUserExperienceGetGiftsComposer implements IOutgoingPacket<NewUserExperienceGetGiftsComposerType> {
    public constructor(private params: NewUserExperienceGetGiftsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.selections.length * 3,
            ...this.params.selections.flatMap(selection => [ selection.dayIndex, selection.stepIndex, selection.giftIndex ]),
        ];
    }
}
