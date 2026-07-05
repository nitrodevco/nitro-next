import { AvatarActionStateType } from "./AvatarActionStateType";

export enum AvatarActionType {
    Default = 'Default',
    Lay = 'Lay',
    Float = 'Float',
    Swim = 'Swim',
    Sit = 'Sit',
    Snowboard360 = 'Snowboard360',
    SnowboardOllie = 'SnowboardOllie',
    SnowboardUp = 'SnowboardUp',
    SnowboardSquat = 'SnowboardSquat',
    RideJump = 'RideJump',
    Respect = 'Respect',
    Wave = 'Wave',
    Sign = 'Sign',
    Blow = 'Blow',
    Laugh = 'Laugh',
    Idle = 'Idle',
    AvatarEffect = 'AvatarEffect',
    Dance = 'Dance',
    UseItem = 'UseItem',
    CarryItem = 'CarryItem',
    Talk = 'Talk',
    Gesture = 'Gesture',
    GestureSmile = 'GestureSmile',
    GestureSad = 'GestureSad',
    GestureAngry = 'GestureAngry',
    GestureSurprised = 'GestureSurprised',
    Sleep = 'Sleep',
    Move = 'Move',
}

export class AvatarActionTypeUtilities {

    public static actionTypeToState(type: AvatarActionType): string {
        switch (type) {
            case AvatarActionType.Lay: return AvatarActionStateType.Lay;
            case AvatarActionType.Float: return AvatarActionStateType.Float;
            case AvatarActionType.Swim: return AvatarActionStateType.Swim;
            case AvatarActionType.Sit: return AvatarActionStateType.Sit;
            case AvatarActionType.Snowboard360: return AvatarActionStateType.Snowboard360;
            case AvatarActionType.SnowboardOllie: return AvatarActionStateType.SnowboardOllie;
            case AvatarActionType.SnowboardUp: return AvatarActionStateType.SnowboardUp;
            case AvatarActionType.SnowboardSquat: return AvatarActionStateType.Snowboard360;
            case AvatarActionType.RideJump: return AvatarActionStateType.RideJump;
            case AvatarActionType.Respect: return AvatarActionStateType.Respect;
            case AvatarActionType.Wave: return AvatarActionStateType.Wave;
            case AvatarActionType.Sign: return AvatarActionStateType.Sign;
            case AvatarActionType.Blow: return AvatarActionStateType.BlowAKiss;
            case AvatarActionType.Laugh: return AvatarActionStateType.Laugh;
            case AvatarActionType.Idle: return AvatarActionStateType.Idle;
            case AvatarActionType.AvatarEffect: return AvatarActionStateType.Effect;
            case AvatarActionType.Dance: return AvatarActionStateType.Dance;
            case AvatarActionType.UseItem: return AvatarActionStateType.UseObject;
            case AvatarActionType.CarryItem: return AvatarActionStateType.CarryObject;
            case AvatarActionType.Talk: return AvatarActionStateType.Talk;
            case AvatarActionType.Gesture: return AvatarActionStateType.Gesture;
            case AvatarActionType.GestureSmile: return AvatarActionStateType.Smile;
            case AvatarActionType.GestureSad: return AvatarActionStateType.Sad;
            case AvatarActionType.GestureAngry: return AvatarActionStateType.Angry;
            case AvatarActionType.GestureSurprised: return AvatarActionStateType.Surprised;
            case AvatarActionType.Sleep: return AvatarActionStateType.Sleep;
            case AvatarActionType.Move: return AvatarActionStateType.Walk;
            default: return AvatarActionStateType.Stand;
        }
    }
}