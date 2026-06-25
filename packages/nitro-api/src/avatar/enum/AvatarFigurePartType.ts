export class AvatarFigurePartType {
    public static MALE: string = 'M' as const;
    public static FEMALE: string = 'F' as const;
    public static UNISEX: string = 'U' as const;
    public static SCALE: string = 'h' as const;
    public static STD: string = 'std' as const;
    public static DEFAULT_FRAME: number = 0;
    public static BODY: string = 'bd' as const;
    public static SHOES: string = 'sh' as const;
    public static LEGS: string = 'lg' as const;
    public static CHEST: string = 'ch' as const;
    public static WAIST_ACCESSORY: string = 'wa' as const;
    public static CHEST_ACCESSORY: string = 'ca' as const;
    public static HEAD: string = 'hd' as const;
    public static HAIR: string = 'hr' as const;
    public static FACE_ACCESSORY: string = 'fa' as const;
    public static EYE_ACCESSORY: string = 'ea' as const;
    public static HEAD_ACCESSORY: string = 'ha' as const;
    public static HEAD_ACCESSORY_EXTRA: string = 'he' as const;
    public static COAT_CHEST: string = 'cc' as const;
    public static CHEST_PRINT: string = 'cp' as const;
    public static LEFT_HAND_ITEM: string = 'li' as const;
    public static LEFT_HAND: string = 'lh' as const;
    public static LEFT_SLEEVE: string = 'ls' as const;
    public static RIGHT_HAND: string = 'rh' as const;
    public static RIGHT_SLEEVE: string = 'rs' as const;
    public static FACE: string = 'fc' as const;
    public static EYES: string = 'ey' as const;
    public static HAIR_BIG: string = 'hrb' as const;
    public static RIGHT_HAND_ITEM: string = 'ri' as const;
    public static LEFT_COAT_SLEEVE: string = 'lc' as const;
    public static RIGHT_COAT_SLEEVE: string = 'rc' as const;
    public static FIGURE_SETS: string[] = [
        AvatarFigurePartType.SHOES,
        AvatarFigurePartType.LEGS,
        AvatarFigurePartType.CHEST,
        AvatarFigurePartType.WAIST_ACCESSORY,
        AvatarFigurePartType.CHEST_ACCESSORY,
        AvatarFigurePartType.HEAD,
        AvatarFigurePartType.HAIR,
        AvatarFigurePartType.FACE_ACCESSORY,
        AvatarFigurePartType.EYE_ACCESSORY,
        AvatarFigurePartType.HEAD_ACCESSORY,
        AvatarFigurePartType.HEAD_ACCESSORY_EXTRA,
        AvatarFigurePartType.COAT_CHEST,
        AvatarFigurePartType.CHEST_PRINT,
    ];
}
