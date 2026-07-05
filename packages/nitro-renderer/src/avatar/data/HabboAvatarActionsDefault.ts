import { AvatarActionStateType, AvatarActionType, AvatarGeometryType, AvatarPartSetType, AvatarScaleType, type IAssetAvatarActionData } from "@nitrodevco/nitro-api";

export const HabboAvatarActionsDefault: IAssetAvatarActionData = {
    actions: [
        {
            id: AvatarActionType.Default,
            state: AvatarActionStateType.Stand,
            precedence: 1000,
            main: true,
            isDefault: true,
            geometryType: AvatarGeometryType.Vertical,
            activePartSet: AvatarPartSetType.Figure,
            assetPartDefinition: "std"
        }],
    actionOffsets: [
        {
            action: "lay",
            offsets: [
                {
                    size: AvatarScaleType.Large,
                    direction: 4,
                    x: -17,
                    y: 17,
                    z: -0.9
                },
                {
                    size: AvatarScaleType.Large,
                    direction: 2,
                    x: 22,
                    y: 17,
                    z: -0.9
                },
                {
                    size: AvatarScaleType.Small,
                    direction: 4,
                    x: -5,
                    y: 16,
                    z: -0.9
                },
                {
                    size: AvatarScaleType.Small,
                    direction: 2,
                    x: 9,
                    y: 16,
                    z: -0.9
                }
            ]
        }
    ]
};