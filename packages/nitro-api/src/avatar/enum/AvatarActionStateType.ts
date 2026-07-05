export enum AvatarActionStateType {
    None = '',
    CarryObject = 'cri',
    Dance = 'dance',
    Effect = 'fx',

    // Expressions
    Expression = 'expression',
    BlowAKiss = 'blow',
    Cry = 'cry',
    Idle = 'idle',
    Laugh = 'laugh',
    Respect = 'respect',
    RideJump = 'ridejump',
    SnowboardOllie = 'sbollie',
    Snowboard360 = 'sb360',
    SnowboardUp = 'sbup',
    SnowboardSquat = 'sbsq',
    Wave = 'wave',

    // Gestures
    Gesture = 'gest',
    Angry = 'agr',
    Sad = 'sad',
    Smile = 'sml',
    Surprised = 'srp',

    // Guide & Status
    GuideStatus = 'guide',
    Muted = 'muted',
    PlayingGame = 'playing_game',

    // Pet Gestures
    PetBlink = 'eyb',
    PetCrazy = 'crz',
    PetJoy = 'joy',
    PetMiserable = 'mis',
    PetPuzzled = 'puz',
    PetTongue = 'tng',

    // Postures
    Posture = 'posture',
    Float = 'float',
    Lay = 'lay',
    Sit = 'sit',
    Stand = 'std',
    Swim = 'swim',
    Walk = 'mv',

    // Other Actions
    Sign = 'sign',
    Sleep = 'sleep',
    Talk = 'talk',
    Blink = 'blink',
    Typing = 'typing',
    UseObject = 'usei',
    Vote = 'vote',

    // Snowwar
    SnowwarDieBack = 'swdieback',
    SnowwarDieFront = 'swdiefront',
    SnowwarPick = 'swpick',
    SnowwarRun = 'swrun',
    SnowwarThrow = 'swthrow'
}

export class AvatarActionStateTypeUtilities {
    public static GESTURE_MAP = [
        AvatarActionStateType.None,
        AvatarActionStateType.Smile,
        AvatarActionStateType.Angry,
        AvatarActionStateType.Surprised,
        AvatarActionStateType.Sad,
        AvatarActionStateType.PetJoy,
        AvatarActionStateType.PetCrazy,
        AvatarActionStateType.PetTongue,
        AvatarActionStateType.PetBlink,
        AvatarActionStateType.PetMiserable,
        AvatarActionStateType.PetPuzzled,
    ];

    public static EXPRESSION_MAP = [
        AvatarActionStateType.None,
        AvatarActionStateType.Wave,
        AvatarActionStateType.BlowAKiss,
        AvatarActionStateType.Laugh,
        AvatarActionStateType.Cry,
        AvatarActionStateType.Idle,
        AvatarActionStateType.Dance,
        AvatarActionStateType.Respect,
        AvatarActionStateType.SnowboardOllie,
        AvatarActionStateType.Snowboard360,
        AvatarActionStateType.RideJump,
    ];

    public static getExpression(expressionId: number): AvatarActionStateType | undefined {
        return AvatarActionStateTypeUtilities.EXPRESSION_MAP[expressionId];
    }

    public static getExpressionId(expression: AvatarActionStateType): number {
        return AvatarActionStateTypeUtilities.EXPRESSION_MAP.indexOf(expression);
    }

    public static getExpressionTimeout(expressionId: number): number {
        switch (expressionId) {
            case 1:
                return 5000;
            case 2:
                return 1400;
            case 3:
                return 2000;
            case 4:
                return 2000;
            case 5:
                return 0;
            case 6:
                return 700;
            case 7:
                return 2000;
            case 8:
                return 1500;
            case 9:
                return 1500;
            case 10:
                return 1500;
            default:
                return 0;
        }
    }

    public static getGestureId(gesture: AvatarActionStateType): number {
        return AvatarActionStateTypeUtilities.GESTURE_MAP.indexOf(gesture);
    }

    public static getGesture(gestureId: number): AvatarActionStateType | undefined {
        return AvatarActionStateTypeUtilities.GESTURE_MAP[gestureId];
    }
}
