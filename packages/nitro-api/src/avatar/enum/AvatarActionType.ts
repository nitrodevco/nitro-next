export enum AvatarActionType {
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
    Wave = 'wave',

    // Gestures
    Gesture = 'gest',
    Aggravated = 'agr',
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

export class AvatarActionTypeUtilities {
    public static GESTURE_MAP = [
        AvatarActionType.None,
        AvatarActionType.Smile,
        AvatarActionType.Aggravated,
        AvatarActionType.Surprised,
        AvatarActionType.Sad,
        AvatarActionType.PetJoy,
        AvatarActionType.PetCrazy,
        AvatarActionType.PetTongue,
        AvatarActionType.PetBlink,
        AvatarActionType.PetMiserable,
        AvatarActionType.PetPuzzled,
    ];

    public static EXPRESSION_MAP = [
        AvatarActionType.None,
        AvatarActionType.Wave,
        AvatarActionType.BlowAKiss,
        AvatarActionType.Laugh,
        AvatarActionType.Cry,
        AvatarActionType.Idle,
        AvatarActionType.Dance,
        AvatarActionType.Respect,
        AvatarActionType.SnowboardOllie,
        AvatarActionType.Snowboard360,
        AvatarActionType.RideJump,
    ];

    public static getExpression(expressionId: number): AvatarActionType | undefined {
        return AvatarActionTypeUtilities.EXPRESSION_MAP[expressionId];
    }

    public static getExpressionId(expression: AvatarActionType): number {
        return AvatarActionTypeUtilities.EXPRESSION_MAP.indexOf(expression);
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

    public static getGestureId(gesture: AvatarActionType): number {
        return AvatarActionTypeUtilities.GESTURE_MAP.indexOf(gesture);
    }

    public static getGesture(gestureId: number): AvatarActionType | undefined {
        return AvatarActionTypeUtilities.GESTURE_MAP[gestureId];
    }

    public static idToAvatarActionState(id: string): string {
        if (id === 'Lay') return 'lay';
        if (id === 'Float') return 'float';
        if (id === 'Swim') return 'swim';
        if (id === 'Sit') return 'sit';
        if (id === 'Respect') return 'respect';
        if (id === 'Wave') return 'wave';
        if (id === 'Idle') return 'idle';
        if (id === 'Dance') return 'dance';
        if (id === 'UseItem') return 'usei';
        if (id === 'CarryItem') return 'cri';
        if (id === 'Talk') return 'talk';
        if (id === 'Sleep') return 'Sleep';
        if (id === 'Move') return 'mv';

        return 'std';
    }
}
