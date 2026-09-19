// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** The pet inside the package, as the naming dialog previews it. */
export interface IOpenPetPackageFigureData {
    typeId: number;
    paletteId: number;
    color: string;
    breedId: number;
    customParts: { layerId: number; partId: number; paletteId: number }[];
}

export type OpenPetPackageRequestedMessageType = {
    objectId: number;
    /** Absent when the server sends the object id alone. */
    figureData: IOpenPetPackageFigureData | undefined;
};

export class OpenPetPackageRequestedMessage implements IIncomingPacket<OpenPetPackageRequestedMessageType> {
    public parse(wrapper: IMessageDataWrapper): OpenPetPackageRequestedMessageType {
        const packet: OpenPetPackageRequestedMessageType = {
            objectId: wrapper.readInt(),
            figureData: undefined,
        };

        if (!wrapper.bytesAvailable) return packet;

        const figureData: IOpenPetPackageFigureData = {
            typeId: wrapper.readInt(),
            paletteId: wrapper.readInt(),
            color: wrapper.readString(),
            breedId: wrapper.readInt(),
            customParts: [],
        };

        let count = wrapper.readInt();

        while (count > 0) {
            figureData.customParts.push({ layerId: wrapper.readInt(), partId: wrapper.readInt(), paletteId: wrapper.readInt() });

            count--;
        }

        packet.figureData = figureData;

        return packet;
    }
}
