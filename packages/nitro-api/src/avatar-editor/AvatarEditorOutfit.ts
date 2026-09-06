import { AvatarGenderType } from '#api/avatar/enum';

export interface AvatarEditorOutfit {
    figure: string;
    gender: AvatarGenderType;
    imageUrl?: string;
}
