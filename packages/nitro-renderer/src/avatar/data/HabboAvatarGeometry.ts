import { AvatarBodyPartType, AvatarFigurePartType, AvatarGeometryType, AvatarScaleType, AvatarSetType, type IAssetAvatarGeometryConfig } from "@nitrodevco/nitro-api";

export const HabboAvatarGeometry: IAssetAvatarGeometryConfig = {
    direction: 0,
    camera: {
        x: 0,
        y: 0,
        z: 10
    },
    canvases: [
        {
            scale: AvatarScaleType.Large,
            geometries: [
                {
                    id: AvatarGeometryType.Vertical,
                    width: 90,
                    height: 130,
                    dx: 0,
                    dy: 0
                },
                {
                    id: AvatarGeometryType.Sitting,
                    width: 90,
                    height: 130,
                    dx: 0,
                    dy: 0
                },
                {
                    id: AvatarGeometryType.Horizontal,
                    width: 128,
                    height: 80,
                    dx: 30,
                    dy: 0
                },
                {
                    id: AvatarGeometryType.SnowwarsHorizontal,
                    width: 192,
                    height: 120,
                    dx: 0,
                    dy: -40
                }
            ]
        },
        {
            scale: AvatarScaleType.Small,
            geometries: [
                {
                    id: AvatarGeometryType.Vertical,
                    width: 45,
                    height: 72,
                    dx: 0,
                    dy: 0
                },
                {
                    id: AvatarGeometryType.Sitting,
                    width: 45,
                    height: 72,
                    dx: 0,
                    dy: 0
                },
                {
                    id: AvatarGeometryType.Horizontal,
                    width: 64,
                    height: 50,
                    dx: 15,
                    dy: -10
                },
                {
                    id: AvatarGeometryType.SnowwarsHorizontal,
                    width: 96,
                    height: 70,
                    dx: 0,
                    dy: -20
                },
                {
                    id: AvatarGeometryType.Swim,
                    width: 64,
                    height: 70,
                    dx: 25,
                    dy: 10
                }
            ]
        }
    ],
    avatarSets: [
        {
            id: AvatarSetType.Full,
            avatarSets: [
                {
                    id: AvatarSetType.Body,
                    main: true,
                    bodyParts: [
                        {
                            id: AvatarBodyPartType.Top
                        },
                        {
                            id: AvatarBodyPartType.Bottom
                        },
                        {
                            id: AvatarBodyPartType.Behind
                        },
                        {
                            id: AvatarBodyPartType.Torso
                        },
                        {
                            id: AvatarBodyPartType.LeftItem
                        },
                        {
                            id: AvatarBodyPartType.RightItem
                        },
                        {
                            id: AvatarBodyPartType.LeftArm
                        },
                        {
                            id: AvatarBodyPartType.RightArm
                        }
                    ]
                },
                {
                    id: AvatarSetType.Head,
                    bodyParts: [
                        {
                            id: AvatarBodyPartType.Head
                        }
                    ]
                }
            ]
        }
    ],
    types: [
        {
            id: AvatarGeometryType.Vertical,
            bodyParts: [
                {
                    id: AvatarBodyPartType.Top,
                    x: 0,
                    y: 0,
                    z: 0.0,
                    radius: 2.0
                },
                {
                    id: AvatarBodyPartType.Bottom,
                    x: 0,
                    y: 0,
                    z: 0.0,
                    radius: 0.001
                },
                {
                    id: AvatarBodyPartType.Behind,
                    x: 0,
                    y: 0,
                    z: 0.2,
                    radius: 0.3
                },
                {
                    id: AvatarBodyPartType.Torso,
                    x: 0,
                    y: 0,
                    z: 0.0,
                    radius: 0.4,
                    items: [
                        {
                            id: AvatarFigurePartType.Body,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: true
                        },
                        {
                            id: AvatarFigurePartType.BodySwim,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: true
                        },
                        {
                            id: AvatarFigurePartType.Chest,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.04,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.Shoes,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.02,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.Legs,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.03,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.Ss,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.04,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.ChestPrint,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.045,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.WaistAccessory,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.05,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.CoatChest,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.06,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.ChestAccessory,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.07,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                },
                {
                    id: AvatarBodyPartType.LeftItem,
                    x: 0,
                    y: 0,
                    z: -0.29,
                    radius: 0.3,
                    items: [
                        {
                            id: AvatarFigurePartType.LeftHandItem,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                },
                {
                    id: AvatarBodyPartType.RightItem,
                    x: 0,
                    y: 0,
                    z: -0.29,
                    radius: 0.3,
                    items: [
                        {
                            id: AvatarFigurePartType.RightHandItem,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                },
                {
                    id: AvatarBodyPartType.LeftArm,
                    x: -1,
                    y: 0,
                    z: -0.51,
                    radius: 0.5,
                    items: [
                        {
                            id: AvatarFigurePartType.LeftHand,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.LeftHandSwim,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.LeftSleeve,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.02,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.LeftCoatSleeve,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.025,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                },
                {
                    id: AvatarBodyPartType.RightArm,
                    x: 1,
                    y: 0,
                    z: -0.51,
                    radius: 0.5,
                    items: [
                        {
                            id: AvatarFigurePartType.RightHand,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.RightHandSwim,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.RightSleeve,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.02,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.RightCoatSleeve,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.025,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                },
                {
                    id: AvatarBodyPartType.Head,
                    x: 0,
                    y: 0,
                    z: 0,
                    radius: 0.5,
                    items: [
                        {
                            id: AvatarFigurePartType.Head,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: true
                        },
                        {
                            id: AvatarFigurePartType.Face,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.02,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.Eyes,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.03,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.Hair,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.04,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: true
                        },
                        {
                            id: AvatarFigurePartType.HairBig,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.05,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: true
                        },
                        {
                            id: AvatarFigurePartType.FaceAccessory,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.06,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.EyeAccessory,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.07,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.HeadAccessory,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.08,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.HeadAccessoryExtra,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.09,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                }
            ]
        },
        {
            id: AvatarGeometryType.Sitting,
            bodyParts: [
                {
                    id: AvatarBodyPartType.Top,
                    x: 0,
                    y: 0,
                    z: 0.0,
                    radius: 2.0
                },
                {
                    id: AvatarBodyPartType.Bottom,
                    x: 0,
                    y: 0,
                    z: 0.0,
                    radius: 0.001
                },
                {
                    id: AvatarBodyPartType.Behind,
                    x: 0,
                    y: 0,
                    z: 0.2,
                    radius: 0.3
                },
                {
                    id: AvatarBodyPartType.Torso,
                    x: 0,
                    y: 0,
                    z: 0.0,
                    radius: 0.4,
                    items: [
                        {
                            id: AvatarFigurePartType.Body,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: true
                        },
                        {
                            id: AvatarFigurePartType.BodySwim,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: true
                        },
                        {
                            id: AvatarFigurePartType.Chest,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.03,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.Shoes,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.04,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.Legs,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.02,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.Ss,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.04,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.ChestPrint,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.045,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.WaistAccessory,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.05,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.CoatChest,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.06,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.ChestAccessory,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.07,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                },
                {
                    id: AvatarBodyPartType.LeftItem,
                    x: 0,
                    y: 0,
                    z: -0.29,
                    radius: 0.3,
                    items: [
                        {
                            id: AvatarFigurePartType.LeftHandItem,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                },
                {
                    id: AvatarBodyPartType.RightItem,
                    x: 0,
                    y: 0,
                    z: -0.29,
                    radius: 0.3,
                    items: [
                        {
                            id: AvatarFigurePartType.RightHandItem,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                },
                {
                    id: AvatarBodyPartType.LeftArm,
                    x: -1,
                    y: 0,
                    z: -0.51,
                    radius: 0.5,
                    items: [
                        {
                            id: AvatarFigurePartType.LeftHand,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.LeftHandSwim,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.LeftSleeve,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.02,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.LeftCoatSleeve,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.025,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                },
                {
                    id: AvatarBodyPartType.RightArm,
                    x: 1,
                    y: 0,
                    z: -0.51,
                    radius: 0.5,
                    items: [
                        {
                            id: AvatarFigurePartType.RightHand,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.RightHandSwim,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.RightSleeve,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.02,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.RightCoatSleeve,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.025,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                },
                {
                    id: AvatarBodyPartType.Head,
                    x: 0,
                    y: 0,
                    z: 0,
                    radius: 0.5,
                    items: [
                        {
                            id: AvatarFigurePartType.Head,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: true
                        },
                        {
                            id: AvatarFigurePartType.Face,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.02,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.Eyes,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.03,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.Hair,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.04,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: true
                        },
                        {
                            id: AvatarFigurePartType.HairBig,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.05,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: true
                        },
                        {
                            id: AvatarFigurePartType.FaceAccessory,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.06,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.EyeAccessory,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.07,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.HeadAccessory,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.08,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.HeadAccessoryExtra,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.09,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                }
            ]
        },
        {
            id: AvatarGeometryType.Horizontal,
            bodyParts: [
                {
                    id: AvatarBodyPartType.Torso,
                    x: 0,
                    y: 0,
                    z: 0.0,
                    radius: 0.4,
                    items: [
                        {
                            id: AvatarFigurePartType.Body,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: true
                        },
                        {
                            id: AvatarFigurePartType.BodySwim,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: true
                        },
                        {
                            id: AvatarFigurePartType.Chest,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.02,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.ChestPrint,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.025,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.Shoes,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.04,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.Legs,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.03,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.Ss,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.03,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.WaistAccessory,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.05,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.CoatChest,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.06,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.ChestAccessory,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.07,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                },
                {
                    id: AvatarBodyPartType.LeftItem,
                    x: 0,
                    y: 0,
                    z: -0.29,
                    radius: 0.3,
                    items: [
                        {
                            id: AvatarFigurePartType.LeftHandItem,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                },
                {
                    id: AvatarBodyPartType.RightItem,
                    x: 0,
                    y: 0,
                    z: -0.29,
                    radius: 0.3,
                    items: [
                        {
                            id: AvatarFigurePartType.RightHandItem,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                },
                {
                    id: AvatarBodyPartType.LeftArm,
                    x: -1,
                    y: 0,
                    z: -0.51,
                    radius: 0.6,
                    items: [
                        {
                            id: AvatarFigurePartType.LeftHand,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.LeftHandSwim,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.LeftSleeve,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.02,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.LeftCoatSleeve,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.025,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                },
                {
                    id: AvatarBodyPartType.RightArm,
                    x: 1,
                    y: 0,
                    z: -0.51,
                    radius: 0.6,
                    items: [
                        {
                            id: AvatarFigurePartType.RightHand,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.RightHandSwim,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.RightSleeve,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.02,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.RightCoatSleeve,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.025,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                },
                {
                    id: AvatarBodyPartType.Head,
                    x: 0,
                    y: 0,
                    z: 0,
                    radius: 0.5,
                    items: [
                        {
                            id: AvatarFigurePartType.Head,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: true
                        },
                        {
                            id: AvatarFigurePartType.Face,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.02,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.Eyes,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.03,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.Hair,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.04,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: true
                        },
                        {
                            id: AvatarFigurePartType.HairBig,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.05,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: true
                        },
                        {
                            id: AvatarFigurePartType.FaceAccessory,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.06,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.EyeAccessory,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.07,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.HeadAccessory,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.08,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.HeadAccessoryExtra,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.09,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                }
            ]
        },
        {
            id: AvatarGeometryType.SnowwarsHorizontal,
            bodyParts: [
                {
                    id: AvatarBodyPartType.Torso,
                    x: 0,
                    y: 0,
                    z: 0.0,
                    radius: 0.4,
                    items: [
                        {
                            id: AvatarFigurePartType.Body,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: true
                        },
                        {
                            id: AvatarFigurePartType.BodySwim,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: true
                        },
                        {
                            id: AvatarFigurePartType.Chest,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.02,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.ChestPrint,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.025,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.Shoes,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.04,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.Legs,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.03,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.Ss,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.03,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.WaistAccessory,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.05,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.CoatChest,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.06,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.ChestAccessory,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.07,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                },
                {
                    id: AvatarBodyPartType.LeftItem,
                    x: 0,
                    y: 0,
                    z: -0.29,
                    radius: 0.3,
                    items: [
                        {
                            id: AvatarFigurePartType.LeftHandItem,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                },
                {
                    id: AvatarBodyPartType.RightItem,
                    x: 0,
                    y: 0,
                    z: -0.29,
                    radius: 0.3,
                    items: [
                        {
                            id: AvatarFigurePartType.RightHandItem,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                },
                {
                    id: AvatarBodyPartType.LeftArm,
                    x: -1,
                    y: 0,
                    z: -0.51,
                    radius: 0.6,
                    items: [
                        {
                            id: AvatarFigurePartType.LeftHand,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.LeftHandSwim,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.LeftSleeve,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.02,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.LeftCoatSleeve,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.025,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                },
                {
                    id: AvatarBodyPartType.RightArm,
                    x: 1,
                    y: 0,
                    z: -0.51,
                    radius: 0.6,
                    items: [
                        {
                            id: AvatarFigurePartType.RightHand,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.RightHandSwim,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.RightSleeve,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.02,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.RightCoatSleeve,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.025,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                },
                {
                    id: AvatarBodyPartType.Head,
                    x: 0,
                    y: 0,
                    z: 0,
                    radius: 0.5,
                    items: [
                        {
                            id: AvatarFigurePartType.Head,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: true
                        },
                        {
                            id: AvatarFigurePartType.Face,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.02,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.Eyes,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.03,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.Hair,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.04,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: true
                        },
                        {
                            id: AvatarFigurePartType.HairBig,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.05,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: true
                        },
                        {
                            id: AvatarFigurePartType.FaceAccessory,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.06,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.EyeAccessory,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.07,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.HeadAccessory,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.08,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.HeadAccessoryExtra,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.09,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                }
            ]
        },
        {
            id: AvatarGeometryType.Swim,
            bodyParts: [
                {
                    id: AvatarBodyPartType.Torso,
                    x: 0,
                    y: 0,
                    z: 0.0,
                    radius: 0.4,
                    items: [
                        {
                            id: AvatarFigurePartType.BodySwim,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: true
                        },
                        {
                            id: AvatarFigurePartType.Ss,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.03,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                },
                {
                    id: AvatarBodyPartType.Head,
                    x: 0,
                    y: 0,
                    z: 0,
                    radius: 0.5,
                    items: [
                        {
                            id: AvatarFigurePartType.Head,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.01,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: true
                        },
                        {
                            id: AvatarFigurePartType.Face,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.02,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.Eyes,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.03,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.Hair,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.04,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: true
                        },
                        {
                            id: AvatarFigurePartType.HairBig,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.05,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: true
                        },
                        {
                            id: AvatarFigurePartType.FaceAccessory,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.06,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.EyeAccessory,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.07,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.HeadAccessory,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.08,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        },
                        {
                            id: AvatarFigurePartType.HeadAccessoryExtra,
                            x: 0,
                            y: 0,
                            z: 0,
                            radius: 0.09,
                            nx: 0,
                            ny: 0,
                            nz: -1,
                            double: false
                        }
                    ]
                }
            ]
        }
    ]
};
