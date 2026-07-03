import type { IAssetAvatarActionData } from "@nitrodevco/nitro-api";

export const HabboAvatarActionsDefault: IAssetAvatarActionData = {
    actions: [
        {
            "id": "Default",
            "state": "std",
            "precedence": 1000,
            "main": true,
            "isDefault": true,
            "geometryType": "vertical",
            "activePartSet": "figure",
            "assetPartDefinition": "std"
        }],
    actionOffsets: [
        {
            "action": "lay",
            "offsets": [
                {
                    "size": "h",
                    "direction": 4,
                    "x": -17,
                    "y": 17,
                    "z": -0.9
                },
                {
                    "size": "h",
                    "direction": 2,
                    "x": 22,
                    "y": 17,
                    "z": -0.9
                },
                {
                    "size": "sh",
                    "direction": 4,
                    "x": -5,
                    "y": 16,
                    "z": -0.9
                },
                {
                    "size": "sh",
                    "direction": 2,
                    "x": 9,
                    "y": 16,
                    "z": -0.9
                }
            ]
        }
    ]
};