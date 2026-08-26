import { DialogKindEnum } from "./DialogKindEnum";
import { DialogTypeEnum } from "./DialogTypeEnum";

export interface IDialogData {
    readonly id: number;
    readonly kind: DialogKindEnum;
    readonly type: DialogTypeEnum;
    readonly modal: boolean;
    readonly flags: number;
    readonly title: string;
    readonly subtitle: string;
    readonly summary: string;
    readonly linkTitle: string;
    readonly linkUrl: string;
    readonly imageUrl: string;
}
