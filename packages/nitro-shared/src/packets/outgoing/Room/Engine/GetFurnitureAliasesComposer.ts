import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetFurnitureAliasesComposerType = object;

export class GetFurnitureAliasesComposer implements IOutgoingPacket<GetFurnitureAliasesComposerType> {
    public constructor(private params: GetFurnitureAliasesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
