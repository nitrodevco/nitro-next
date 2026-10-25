import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** One `RecolorUpdateData`: furni that now share one colour. */
export interface IFurniRecolorUpdate {
    objectIds: number[];
    red: number;
    green: number;
    blue: number;
}

export type FurniRecolorUpdateMessageType = {
    updates: IFurniRecolorUpdate[];
};

/**
 * Flash's obfuscated `_-X2a` + `RecolorUpdateData` (WIN63-202610121624): recolorable furni that
 * changed colour - per entry the furni ids, then each channel as a short.
 */
export class FurniRecolorUpdateMessage implements IIncomingPacket<FurniRecolorUpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): FurniRecolorUpdateMessageType {
        const updates: IFurniRecolorUpdate[] = [];
        let totalUpdates = wrapper.readInt();

        while (totalUpdates > 0) {
            const objectIds: number[] = [];
            let totalIds = wrapper.readInt();

            while (totalIds > 0) {
                objectIds.push(wrapper.readInt());

                totalIds--;
            }

            updates.push({ objectIds, red: wrapper.readShort(), green: wrapper.readShort(), blue: wrapper.readShort() });

            totalUpdates--;
        }

        return { updates };
    }
}
