export enum RoomObjectUserType {
    User = 1,
    Pet = 2,
    Bot = 3,
    RentableBot = 4,
}

export class RoomObjectUserTypeName {
    public static User: string = 'user';
    public static Pet: string = 'pet';
    public static Bot: string = 'bot';
    public static RentableBot: string = 'rentable_bot';
    public static MonsterPlant: string = 'monsterplant';
}

export class RoomObjectUserTypeUtils {
    private static _avatarTypeToName: Map<RoomObjectUserType, string> = new Map([
        [RoomObjectUserType.User, RoomObjectUserTypeName.User],
        [RoomObjectUserType.Pet, RoomObjectUserTypeName.Pet],
        [RoomObjectUserType.Bot, RoomObjectUserTypeName.Bot],
        [RoomObjectUserType.RentableBot, RoomObjectUserTypeName.RentableBot],
    ]);
    private static _avatarNameToType: Map<string, RoomObjectUserType> = new Map([
        [RoomObjectUserTypeName.User, RoomObjectUserType.User],
        [RoomObjectUserTypeName.Pet, RoomObjectUserType.Pet],
        [RoomObjectUserTypeName.Bot, RoomObjectUserType.Bot],
        [RoomObjectUserTypeName.RentableBot, RoomObjectUserType.RentableBot],
    ]);

    public static getAvatarType(type: string): RoomObjectUserType | undefined { //getTypeNumber
        return this._avatarNameToType.get(type);
    }

    public static getAvatarTypeName(type: RoomObjectUserType): string | undefined { //getTypeString
        return this._avatarTypeToName.get(type);
    }

    public static getAvatarRealType(type: RoomObjectUserType): RoomObjectUserType { //getRealType
        switch (type) {
            case RoomObjectUserType.Bot:
            case RoomObjectUserType.RentableBot:
                return RoomObjectUserType.User;
            default:
                return type;
        }
    }

    public static getAvatarRealTypeByName(type: string): RoomObjectUserType | undefined { //getRealType
        const avatarType = this.getAvatarType(type);

        switch (avatarType) {
            case RoomObjectUserType.Bot:
            case RoomObjectUserType.RentableBot:
                return RoomObjectUserType.User;
            default:
                return avatarType;
        }
    }
}
