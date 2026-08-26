import { DialogFlagEnum } from "./DialogFlagEnum";
import { DialogKindEnum } from "./DialogKindEnum";
import { DialogTypeEnum } from "./DialogTypeEnum";
import { IDialogCaption } from "./IDialogCaption";

export type DialogCaptionFlag = DialogFlagEnum.ButtonOk | DialogFlagEnum.ButtonCancel | DialogFlagEnum.ButtonCustom;

export interface IDialogData {
    readonly id: number;
    readonly kind: DialogKindEnum;
    readonly type: DialogTypeEnum;
    readonly modal: boolean;
    readonly flags: number;
    readonly title: string;
    readonly subtitle: string;
    readonly summary: string;
    readonly titleBarColor: string | null;
    readonly captions: Partial<Record<DialogCaptionFlag, IDialogCaption>>;
    readonly linkTitle: string;
    readonly linkUrl: string;
    readonly imageUrl: string;
}
