// Body filled by hand from the Flash parser (`_-Q2t._-e18`) - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** `typeCode` of a floor item; anything else is a wall item. */
export const BUILDERS_CLUB_PLACEMENT_FLOOR = 0;

/** `typeCode` of a wall item. */
export const BUILDERS_CLUB_PLACEMENT_WALL = 1;

/**
 * A Builders Club placement the server holds back until the user agrees to it (a trial member
 * building alone, whose room goes off the navigator): the placement as it was asked for, to be sent
 * again with `confirmed` set. A floor item carries its tile and direction, a wall item its location.
 */
export type BuildersClubPlacementWarningMessageType = {
    typeCode: number;
    pageId: number;
    offerId: number;
    extraParam: string;
    x: number;
    y: number;
    direction: number;
    wallLocation: string;
};

export class BuildersClubPlacementWarningMessage implements IIncomingPacket<BuildersClubPlacementWarningMessageType> {
    public parse(wrapper: IMessageDataWrapper): BuildersClubPlacementWarningMessageType {
        const typeCode = wrapper.readInt();
        const pageId = wrapper.readInt();
        const offerId = wrapper.readInt();
        const extraParam = wrapper.readString();
        const floor = (typeCode === BUILDERS_CLUB_PLACEMENT_FLOOR);

        return {
            typeCode,
            pageId,
            offerId,
            extraParam,
            x: floor ? wrapper.readInt() : 0,
            y: floor ? wrapper.readInt() : 0,
            direction: floor ? wrapper.readInt() : 0,
            wallLocation: floor ? '' : wrapper.readString(),
        };
    }
}
