import { AvatarActionStateType, AvatarActionType, AvatarGeometryType, AvatarPartSetType, AvatarScaleType, IAssetAvatarActionData } from '@nitrodevco/nitro-api';

/*
 * The actions the Flash client bakes into `AvatarRenderManager` before the downloaded
 * HabboAvatarActions arrive: the default stand, and the snowwar postures the game modes
 * need. The snowwar prevents lists are copied verbatim - the `fx167`..`fx176` entries
 * (no dot) are typos in the client and match nothing, exactly as they do there.
 */
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
            assetPartDefinition: 'std',
        },
        {
            id: AvatarActionType.SnowWarRun,
            state: AvatarActionStateType.SnowwarRun,
            precedence: 104,
            main: true,
            geometryType: AvatarGeometryType.Vertical,
            activePartSet: AvatarPartSetType.SnowWarnRun,
            assetPartDefinition: 'swrun',
            prevents: [ 'fx.2', 'fx.3', 'fx.6', 'fx.14', 'fx.15', 'fx.17', 'fx.18', 'fx.19', 'fx.20', 'fx.21', 'fx.22', 'fx.33', 'fx.34', 'fx.35', 'fx.36', 'fx.38', 'fx.39', 'fx.45', 'fx.46', 'fx.48', 'fx.54', 'fx.55', 'fx.56', 'fx.57', 'fx.58', 'fx.69', 'fx.71', 'fx.72', 'fx.89', 'fx.90', 'fx.91', 'fx.92', 'fx.94', 'fx.97', 'fx.100', 'fx.104', 'fx.107', 'fx.108', 'fx.115', 'fx.116', 'fx.117', 'fx.118', 'fx.119', 'fx.120', 'fx.121', 'fx.122', 'fx.123', 'fx.124', 'fx.125', 'fx.127', 'fx.129', 'fx.130', 'fx.131', 'fx.132', 'fx.134', 'fx.135', 'fx.136', 'fx.137', 'fx.138', 'fx.139', 'fx.140', 'fx.141', 'fx.142', 'fx.143', 'fx.144', 'fx.145', 'fx.146', 'fx.147', 'fx.148', 'fx.149', 'fx.150', 'fx.151', 'fx.152', 'fx.153', 'fx.154', 'fx.155', 'fx.156', 'fx.157', 'fx.158', 'fx.159', 'fx.160', 'fx.161', 'fx.162', 'fx.164', 'fx.165', 'fx.166', 'fx167', 'fx168', 'fx169', 'fx170', 'fx171', 'fx172', 'fx173', 'fx174', 'fx175', 'fx176', 'dance' ],
        },
        {
            id: AvatarActionType.SnowWarDieFront,
            state: AvatarActionStateType.SnowwarDieFront,
            precedence: 105,
            main: true,
            startFromFrameZero: true,
            geometryType: AvatarGeometryType.SnowwarsHorizontal,
            activePartSet: AvatarPartSetType.SnowWarDieFront,
            assetPartDefinition: 'swdie',
            prevents: [ 'fx.2', 'fx.3', 'fx.6', 'fx.14', 'fx.15', 'fx.17', 'fx.18', 'fx.19', 'fx.20', 'fx.21', 'fx.22', 'fx.33', 'fx.34', 'fx.35', 'fx.36', 'fx.38', 'fx.39', 'fx.45', 'fx.46', 'fx.48', 'fx.54', 'fx.55', 'fx.56', 'fx.57', 'fx.58', 'fx.69', 'fx.71', 'fx.72', 'fx.89', 'fx.90', 'fx.91', 'fx.92', 'fx.94', 'fx.97', 'fx.100', 'fx.104', 'fx.105', 'fx.107', 'fx.108', 'fx.115', 'fx.116', 'fx.117', 'fx.118', 'fx.119', 'fx.120', 'fx.121', 'fx.122', 'fx.123', 'fx.124', 'fx.125', 'fx.127', 'fx.129', 'fx.130', 'fx.131', 'fx.132', 'fx.134', 'fx.135', 'fx.136', 'fx.137', 'fx.138', 'fx.139', 'fx.140', 'fx.141', 'fx.142', 'fx.143', 'fx.144', 'fx.145', 'fx.146', 'fx.147', 'fx.148', 'fx.149', 'fx.150', 'fx.151', 'fx.152', 'fx.153', 'fx.154', 'fx.155', 'fx.156', 'fx.157', 'fx.158', 'fx.159', 'fx.160', 'fx.161', 'fx.162', 'fx.164', 'fx.165', 'fx.166', 'fx167', 'fx168', 'fx169', 'fx170', 'fx171', 'fx172', 'fx173', 'fx174', 'fx175', 'fx176', 'dance' ],
        },
        {
            id: AvatarActionType.SnowWarDieBack,
            state: AvatarActionStateType.SnowwarDieBack,
            precedence: 106,
            main: true,
            startFromFrameZero: true,
            geometryType: AvatarGeometryType.SnowwarsHorizontal,
            activePartSet: AvatarPartSetType.SnowWarDieBack,
            assetPartDefinition: 'swdie',
            prevents: [ 'fx.2', 'fx.3', 'fx.6', 'fx.14', 'fx.15', 'fx.17', 'fx.18', 'fx.19', 'fx.20', 'fx.21', 'fx.22', 'fx.33', 'fx.34', 'fx.35', 'fx.36', 'fx.38', 'fx.39', 'fx.45', 'fx.46', 'fx.48', 'fx.54', 'fx.55', 'fx.56', 'fx.57', 'fx.58', 'fx.69', 'fx.71', 'fx.72', 'fx.89', 'fx.90', 'fx.91', 'fx.92', 'fx.94', 'fx.97', 'fx.100', 'fx.104', 'fx.105', 'fx.107', 'fx.108', 'fx.115', 'fx.116', 'fx.117', 'fx.118', 'fx.119', 'fx.120', 'fx.121', 'fx.122', 'fx.123', 'fx.124', 'fx.125', 'fx.127', 'fx.129', 'fx.130', 'fx.131', 'fx.132', 'fx.134', 'fx.135', 'fx.140', 'fx.141', 'fx.142', 'fx.143', 'fx.144', 'fx.145', 'fx.146', 'fx.147', 'fx.148', 'fx.149', 'fx.150', 'fx.151', 'fx.152', 'fx.153', 'fx.154', 'fx.155', 'fx.156', 'fx.157', 'fx.158', 'fx.159', 'fx.160', 'fx.161', 'fx.162', 'fx.164', 'fx.165', 'fx.166', 'fx167', 'fx168', 'fx169', 'fx170', 'fx171', 'fx172', 'fx173', 'fx174', 'fx175', 'fx176', 'dance' ],
        },
        {
            id: AvatarActionType.SnowWarPick,
            state: AvatarActionStateType.SnowwarPick,
            precedence: 107,
            main: true,
            startFromFrameZero: true,
            geometryType: AvatarGeometryType.Vertical,
            activePartSet: AvatarPartSetType.SnowWarPick,
            assetPartDefinition: 'swpick',
            prevents: [ 'fx.2', 'fx.3', 'fx.6', 'fx.14', 'fx.15', 'fx.17', 'fx.18', 'fx.19', 'fx.20', 'fx.21', 'fx.22', 'fx.33', 'fx.34', 'fx.35', 'fx.36', 'fx.38', 'fx.39', 'fx.45', 'fx.46', 'fx.48', 'fx.54', 'fx.55', 'fx.56', 'fx.57', 'fx.58', 'fx.69', 'fx.71', 'fx.72', 'fx.89', 'fx.90', 'fx.91', 'fx.92', 'fx.94', 'fx.97', 'fx.100', 'fx.104', 'fx.105', 'fx.107', 'fx.108', 'fx.115', 'fx.116', 'fx.117', 'fx.118', 'fx.119', 'fx.120', 'fx.121', 'fx.122', 'fx.123', 'fx.124', 'fx.125', 'fx.127', 'fx.129', 'fx.130', 'fx.131', 'fx.132', 'fx.134', 'fx.135', 'fx.136', 'fx.137', 'fx.138', 'fx.139', 'fx.140', 'fx.141', 'fx.142', 'fx.143', 'fx.144', 'fx.145', 'fx.146', 'fx.147', 'fx.148', 'fx.149', 'fx.150', 'fx.151', 'fx.152', 'fx.153', 'fx.154', 'fx.155', 'fx.156', 'fx.157', 'fx.158', 'fx.159', 'fx.160', 'fx.161', 'fx.162', 'fx.164', 'fx.165', 'fx.166', 'fx167', 'fx168', 'fx169', 'fx170', 'fx171', 'fx172', 'fx173', 'fx174', 'fx175', 'fx176', 'dance' ],
        },
        {
            id: AvatarActionType.SnowWarThrow,
            state: AvatarActionStateType.SnowwarThrow,
            precedence: 108,
            main: true,
            startFromFrameZero: true,
            geometryType: AvatarGeometryType.Vertical,
            activePartSet: AvatarPartSetType.SnowWarThrow,
            assetPartDefinition: 'swthrow',
            prevents: [ 'fx.2', 'fx.3', 'fx.6', 'fx.14', 'fx.15', 'fx.17', 'fx.18', 'fx.19', 'fx.20', 'fx.21', 'fx.22', 'fx.33', 'fx.34', 'fx.35', 'fx.36', 'fx.38', 'fx.39', 'fx.45', 'fx.46', 'fx.48', 'fx.54', 'fx.55', 'fx.56', 'fx.57', 'fx.58', 'fx.69', 'fx.71', 'fx.72', 'fx.89', 'fx.90', 'fx.91', 'fx.92', 'fx.94', 'fx.97', 'fx.100', 'fx.104', 'fx.105', 'fx.107', 'fx.108', 'fx.115', 'fx.116', 'fx.117', 'fx.118', 'fx.119', 'fx.120', 'fx.121', 'fx.122', 'fx.123', 'fx.124', 'fx.125', 'fx.127', 'fx.129', 'fx.130', 'fx.131', 'fx.132', 'fx.134', 'fx.135', 'fx.136', 'fx.137', 'fx.138', 'fx.139', 'fx.140', 'fx.141', 'fx.142', 'fx.143', 'fx.144', 'fx.145', 'fx.146', 'fx.147', 'fx.148', 'fx.149', 'fx.150', 'fx.151', 'fx.152', 'fx.153', 'fx.154', 'fx.155', 'fx.156', 'fx.157', 'fx.158', 'fx.159', 'fx.160', 'fx.161', 'fx.162', 'fx.164', 'fx.165', 'fx.166', 'fx167', 'fx168', 'fx169', 'fx170', 'fx171', 'fx172', 'fx173', 'fx.174', 'fx175', 'fx176', 'dance' ],
        },
    ],
    actionOffsets: [
        {
            action: 'lay',
            offsets: [
                {
                    size: AvatarScaleType.Large,
                    direction: 4,
                    x: -17,
                    y: 17,
                    z: -0.9,
                },
                {
                    size: AvatarScaleType.Large,
                    direction: 2,
                    x: 22,
                    y: 17,
                    z: -0.9,
                },
                {
                    size: AvatarScaleType.Small,
                    direction: 4,
                    x: -5,
                    y: 16,
                    z: -0.9,
                },
                {
                    size: AvatarScaleType.Small,
                    direction: 2,
                    x: 9,
                    y: 16,
                    z: -0.9,
                },
            ],
        },
        {
            // `action_offset_swim` in the client's assets
            action: 'swim',
            offsets: [
                {
                    size: AvatarScaleType.Small,
                    direction: 0,
                    x: -28,
                    y: 0,
                    z: 0,
                },
                {
                    size: AvatarScaleType.Small,
                    direction: 1,
                    x: -28,
                    y: 0,
                    z: 0,
                },
                {
                    size: AvatarScaleType.Small,
                    direction: 2,
                    x: -28,
                    y: 0,
                    z: 0,
                },
                {
                    size: AvatarScaleType.Small,
                    direction: 3,
                    x: -28,
                    y: 0,
                    z: 0,
                },
                {
                    size: AvatarScaleType.Small,
                    direction: 4,
                    x: 0,
                    y: 0,
                    z: 0,
                },
                {
                    size: AvatarScaleType.Small,
                    direction: 5,
                    x: 0,
                    y: 0,
                    z: 0,
                },
                {
                    size: AvatarScaleType.Small,
                    direction: 6,
                    x: 0,
                    y: 0,
                    z: 0,
                },
                {
                    size: AvatarScaleType.Small,
                    direction: 7,
                    x: -28,
                    y: 0,
                    z: 0,
                },
            ],
        },
    ],
};
