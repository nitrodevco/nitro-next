import { IInputSourcesConf } from './IInputSourcesConf';
import { IWiredContext } from './IWiredContext';

export interface IWiredFurniActionDefBase {
    furniLimit: number;
    stuffIds: number[];
    stuffIds2: number[];
    id: number;
    stringParam: string;
    intParams: number[];
    variableIds: string[];
    stuffTypeId: number;
    code: number;
    furniSourceTypes: number[];
    userSourceTypes: number[];
    advancedMode: boolean;
    inputSourcesConf: IInputSourcesConf;
    allowWallFurni: boolean;
    wiredContext: IWiredContext;
    defaultIntParams: number[];
}
