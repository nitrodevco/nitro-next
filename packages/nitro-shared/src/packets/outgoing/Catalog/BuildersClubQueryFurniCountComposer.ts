import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type BuildersClubQueryFurniCountComposerType = object;

export class BuildersClubQueryFurniCountComposer implements IOutgoingPacket<BuildersClubQueryFurniCountComposerType> {
    public constructor(private params: BuildersClubQueryFurniCountComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
