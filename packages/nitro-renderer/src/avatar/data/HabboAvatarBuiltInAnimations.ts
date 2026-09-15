import { AvatarActionType, AvatarBodyPartType, IAssetAnimation } from '@nitrodevco/nitro-api';

/*
 * Animations embedded in the Flash client itself (`HabboAvatarRenderLib`) rather than in an
 * effect library, registered at start-up by `registerBuiltInAnimations`. `dance.sixseven` is
 * the "67" gesture: expression 67 plays it as a dance.
 */
export const HabboAvatarBuiltInAnimations: IAssetAnimation[] = [
    {
        name: 'dance.sixseven',
        desc: '67 meme gesture',
        frames: [
            {
                bodyparts: [
                    { id: AvatarBodyPartType.LeftArm, action: AvatarActionType.Default, frame: 0, dx: -1, dy: 1, dd: 0 },
                    { id: AvatarBodyPartType.Torso, action: AvatarActionType.Default, frame: 0, dx: 0, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.Head, action: AvatarActionType.Default, frame: 0, dx: 0, dy: 1, dd: 0 },
                    { id: AvatarBodyPartType.RightArm, action: AvatarActionType.Default, frame: 0, dx: 1, dy: 1, dd: 0 },
                ],
            },
            {
                bodyparts: [
                    { id: AvatarBodyPartType.LeftArm, action: AvatarActionType.CarryItem, frame: 0, dx: -1, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.Torso, action: AvatarActionType.Default, frame: 0, dx: 0, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.Head, action: AvatarActionType.Default, frame: 0, dx: 0, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.RightArm, action: AvatarActionType.CarryItem, frame: 0, dx: 1, dy: 1, dd: 0 },
                ],
            },
            {
                bodyparts: [
                    { id: AvatarBodyPartType.LeftArm, action: AvatarActionType.CarryItem, frame: 0, dx: -1, dy: 1, dd: 0 },
                    { id: AvatarBodyPartType.Torso, action: AvatarActionType.Default, frame: 0, dx: 0, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.Head, action: AvatarActionType.Default, frame: 0, dx: 0, dy: 1, dd: 0 },
                    { id: AvatarBodyPartType.RightArm, action: AvatarActionType.CarryItem, frame: 0, dx: 1, dy: 0, dd: 0 },
                ],
            },
            {
                bodyparts: [
                    { id: AvatarBodyPartType.LeftArm, action: AvatarActionType.CarryItem, frame: 0, dx: -1, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.Torso, action: AvatarActionType.Default, frame: 0, dx: 0, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.Head, action: AvatarActionType.Default, frame: 0, dx: 0, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.RightArm, action: AvatarActionType.CarryItem, frame: 0, dx: 1, dy: -1, dd: 0 },
                ],
            },
            {
                bodyparts: [
                    { id: AvatarBodyPartType.LeftArm, action: AvatarActionType.CarryItem, frame: 0, dx: -1, dy: -1, dd: 0 },
                    { id: AvatarBodyPartType.Torso, action: AvatarActionType.Default, frame: 0, dx: 0, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.Head, action: AvatarActionType.Talk, frame: 0, dx: 0, dy: 1, dd: 0 },
                    { id: AvatarBodyPartType.RightArm, action: AvatarActionType.CarryItem, frame: 0, dx: 1, dy: 0, dd: 0 },
                ],
            },
            {
                bodyparts: [
                    { id: AvatarBodyPartType.LeftArm, action: AvatarActionType.CarryItem, frame: 0, dx: -1, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.Torso, action: AvatarActionType.Default, frame: 0, dx: 0, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.Head, action: AvatarActionType.Talk, frame: 1, dx: 0, dy: 0, dd: 1 },
                    { id: AvatarBodyPartType.RightArm, action: AvatarActionType.CarryItem, frame: 0, dx: 1, dy: 1, dd: 0 },
                ],
            },
            {
                bodyparts: [
                    { id: AvatarBodyPartType.LeftArm, action: AvatarActionType.CarryItem, frame: 0, dx: -1, dy: 1, dd: 0 },
                    { id: AvatarBodyPartType.Torso, action: AvatarActionType.Default, frame: 0, dx: 0, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.Head, action: AvatarActionType.Talk, frame: 0, dx: 0, dy: 0, dd: 1 },
                    { id: AvatarBodyPartType.RightArm, action: AvatarActionType.CarryItem, frame: 0, dx: 1, dy: 0, dd: 0 },
                ],
            },
            {
                bodyparts: [
                    { id: AvatarBodyPartType.LeftArm, action: AvatarActionType.CarryItem, frame: 0, dx: -1, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.Torso, action: AvatarActionType.Default, frame: 0, dx: 0, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.Head, action: AvatarActionType.Talk, frame: 1, dx: 0, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.RightArm, action: AvatarActionType.CarryItem, frame: 0, dx: 1, dy: -1, dd: 0 },
                ],
            },
            {
                bodyparts: [
                    { id: AvatarBodyPartType.LeftArm, action: AvatarActionType.CarryItem, frame: 0, dx: -1, dy: -1, dd: 0 },
                    { id: AvatarBodyPartType.Torso, action: AvatarActionType.Default, frame: 0, dx: 0, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.Head, action: AvatarActionType.Talk, frame: 0, dx: 0, dy: 1, dd: 0 },
                    { id: AvatarBodyPartType.RightArm, action: AvatarActionType.CarryItem, frame: 0, dx: 1, dy: 0, dd: 0 },
                ],
            },
            {
                bodyparts: [
                    { id: AvatarBodyPartType.LeftArm, action: AvatarActionType.CarryItem, frame: 0, dx: -1, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.Torso, action: AvatarActionType.Default, frame: 0, dx: 0, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.Head, action: AvatarActionType.Talk, frame: 1, dx: 0, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.RightArm, action: AvatarActionType.CarryItem, frame: 0, dx: 1, dy: 1, dd: 0 },
                ],
            },
            {
                bodyparts: [
                    { id: AvatarBodyPartType.LeftArm, action: AvatarActionType.CarryItem, frame: 0, dx: -1, dy: 1, dd: 0 },
                    { id: AvatarBodyPartType.Torso, action: AvatarActionType.Default, frame: 0, dx: 0, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.Head, action: AvatarActionType.Default, frame: 0, dx: 0, dy: 1, dd: 0 },
                    { id: AvatarBodyPartType.RightArm, action: AvatarActionType.CarryItem, frame: 0, dx: 1, dy: 0, dd: 0 },
                ],
            },
            {
                bodyparts: [
                    { id: AvatarBodyPartType.LeftArm, action: AvatarActionType.CarryItem, frame: 0, dx: -1, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.Torso, action: AvatarActionType.Default, frame: 0, dx: 0, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.Head, action: AvatarActionType.Default, frame: 0, dx: 0, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.RightArm, action: AvatarActionType.CarryItem, frame: 0, dx: 1, dy: -1, dd: 0 },
                ],
            },
            {
                bodyparts: [
                    { id: AvatarBodyPartType.LeftArm, action: AvatarActionType.Default, frame: 0, dx: -1, dy: 1, dd: 0 },
                    { id: AvatarBodyPartType.Torso, action: AvatarActionType.Default, frame: 0, dx: 0, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.Head, action: AvatarActionType.Default, frame: 0, dx: 0, dy: 1, dd: 0 },
                    { id: AvatarBodyPartType.RightArm, action: AvatarActionType.Default, frame: 1, dx: 1, dy: 1, dd: 0 },
                ],
            },
            {
                bodyparts: [
                    { id: AvatarBodyPartType.LeftArm, action: AvatarActionType.Default, frame: 0, dx: -1, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.Torso, action: AvatarActionType.Default, frame: 0, dx: 0, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.Head, action: AvatarActionType.Default, frame: 0, dx: 0, dy: 0, dd: 0 },
                    { id: AvatarBodyPartType.RightArm, action: AvatarActionType.Default, frame: 0, dx: 1, dy: 0, dd: 0 },
                ],
            },
        ],
    },
];
