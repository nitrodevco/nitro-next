import { DialogEventTypeEnum } from "./DialogEventTypeEnum";

export interface IDialogEvent {
    readonly type: DialogEventTypeEnum;
}

export interface IDialogHandle {
    readonly id: number;
    readonly disposed: boolean;
    dispose(): void;
}

export interface IAlertDialogHandle extends IDialogHandle {
    readonly title: string;
    readonly summary: string;
    callback: DialogCallback | null;
}

export interface IAlertLinkDialogHandle extends IAlertDialogHandle {
    readonly linkTitle: string;
    readonly linkUrl: string;
}

export type DialogCallback = (dialog: IAlertDialogHandle, event: IDialogEvent) => void;
