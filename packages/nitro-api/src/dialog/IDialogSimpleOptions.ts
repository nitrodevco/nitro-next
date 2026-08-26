export interface IDialogSimpleCallbacks {
    onLink?: () => void;
    onClose?: () => void;
}

export interface IDialogSimpleOptions extends IDialogSimpleCallbacks {
    linkTitle?: string;
    linkUrl?: string;
    imageUrl?: string;
}
