import { AvatarGenderType } from '@nitrodevco/nitro-api';

export interface IOutfitData {
    readonly slotId: number;
    readonly figure: string;
    readonly gender: AvatarGenderType;
}
