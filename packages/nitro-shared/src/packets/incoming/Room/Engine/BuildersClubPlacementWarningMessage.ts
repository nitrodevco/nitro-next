import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type BuildersClubPlacementWarningMessageType = {
    // no fields

};

export class BuildersClubPlacementWarningMessage implements IIncomingPacket<BuildersClubPlacementWarningMessageType> {
    public parse(wrapper: IMessageDataWrapper): BuildersClubPlacementWarningMessageType {

        const packet: BuildersClubPlacementWarningMessageType = {
        };

        return packet;
    }
}
