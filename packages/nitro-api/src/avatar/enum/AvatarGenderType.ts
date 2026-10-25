export enum AvatarGenderType {
    Male = 'M',
    Female = 'F',
    Unisex = 'U',
}

export class AvatarGenderTypeUtilities {
    public static genderToNumber(gender: AvatarGenderType) {
        switch (gender) {
            case AvatarGenderType.Female:
                return 1;
            default:
                return 0;
        }
    }

    public static numberToGender(gender: number) {
        switch (gender) {
            case 1:
                return AvatarGenderType.Female;
            default:
                return AvatarGenderType.Male;
        }
    }
}
