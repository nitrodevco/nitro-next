import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, Frame, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `2879_error_popup_xml` (layout "error_popup", 300x328) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ErrorPopupLayoutProps {
    itemsContentList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const ErrorPopupLayout = ({ itemsContentList, layout, onClose }: ErrorPopupLayoutProps) => {
    return (
        <Frame
            variant="3"
            params={32769}
            caption="Title"
            tintColor="#d43d59"
            onClose={onClose}
            layout={{ width: 300, height: 328, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="content_list"
                    params={144}
                    layout={{ position: 'absolute', left: 17, right: 18, top: 10, height: 271, flexDirection: 'column', gap: 10 }}
                >
                    {itemsContentList ?? (
                        <>
                            <ErrorPopupLayoutErrorMsgTextItem />
                            <ErrorPopupLayoutInfoTextItem />
                            <ErrorPopupLayoutErrorInfoBorderItem />
                            <ErrorPopupLayoutDoNotShowContainerItem />
                            <ErrorPopupLayoutButtonRowItem />
                        </>
                    )}
                </Region>
            </Region>
        </Frame>
    );
};

/** Row template `error_msg_text` of ErrorPopupLayout - pass real rows through its `items…` slot. */
export interface ErrorPopupLayoutErrorMsgTextItemProps {
    captionErrorMsgText?: string;
    layout?: BoxLayout;
}

export const ErrorPopupLayoutErrorMsgTextItem = ({ captionErrorMsgText, layout }: ErrorPopupLayoutErrorMsgTextItemProps) => {
    return (
        <Region
            name="error_msg_text"
            params={144}
            layout={{ width: 265, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionErrorMsgText ?? 'Error message'}
                textOptions={{ wordWrap: true, wordWrapWidth: 265, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `info_text` of ErrorPopupLayout - pass real rows through its `items…` slot. */
export interface ErrorPopupLayoutInfoTextItemProps {
    captionInfoText?: string;
    layout?: BoxLayout;
}

export const ErrorPopupLayoutInfoTextItem = ({ captionInfoText, layout }: ErrorPopupLayoutInfoTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="info_text"
            params={144}
            layout={{ width: 265, height: 28, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionInfoText ?? t('error_window.info')}
                textOptions={{ wordWrap: true, wordWrapWidth: 265, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `error_info_border` of ErrorPopupLayout - pass real rows through its `items…` slot. */
export interface ErrorPopupLayoutErrorInfoBorderItemProps {
    layout?: BoxLayout;
}

export const ErrorPopupLayoutErrorInfoBorderItem = ({ layout }: ErrorPopupLayoutErrorInfoBorderItemProps) => {
    const [ errorInfoContentsValue, setErrorInfoContentsValue ] = useState('');

    return (
        <Border
            variant="105"
            name="error_info_border"
            tags={[ 'error_info' ]}
            params={144}
            layout={{ width: 265, height: 136, flexShrink: 0, ...layout }}
        >
            <TextInput
                value={errorInfoContentsValue}
                onChange={setErrorInfoContentsValue}
                multiline
                layout={{ position: 'absolute', left: 5, right: 5, top: 5, bottom: 5 }}
            />
        </Border>
    );
};

/** Row template `do_not_show_container` of ErrorPopupLayout - pass real rows through its `items…` slot. */
export interface ErrorPopupLayoutDoNotShowContainerItemProps {
    layout?: BoxLayout;
    onDoNotShowCbx?: () => void;
}

export const ErrorPopupLayoutDoNotShowContainerItem = ({ layout, onDoNotShowCbx }: ErrorPopupLayoutDoNotShowContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="do_not_show_container"
            params={144}
            layout={{ width: 265, height: 20, flexShrink: 0, ...layout }}
        >
            <CheckBox
                variant="3"
                name="do_not_show_cbx"
                params={17}
                onPointerTap={onDoNotShowCbx}
                layout={{ position: 'absolute', left: 0, width: 17, top: 1, height: 17 }}
            />
            <Region
                params={16}
                layout={{ position: 'absolute', left: 20, width: 110, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={t('error_window.do_not_show')} />
            </Region>
        </Region>
    );
};

/** Row template `ok_button` of ErrorPopupLayout - pass real rows through its `items…` slot. */
export interface ErrorPopupLayoutOkButtonItemProps {
    layout?: BoxLayout;
    onOkButton?: () => void;
}

export const ErrorPopupLayoutOkButtonItem = ({ layout, onOkButton }: ErrorPopupLayoutOkButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="ok_button"
            params={131089}
            onPointerTap={onOkButton}
            layout={{ width: 125, height: 30, flexShrink: 0, minWidth: 125, ...layout }}
        >
            {t('error_window.ok')}
        </Button>
    );
};

/** Row template `copy_button` of ErrorPopupLayout - pass real rows through its `items…` slot. */
export interface ErrorPopupLayoutCopyButtonItemProps {
    layout?: BoxLayout;
    onCopyButton?: () => void;
}

export const ErrorPopupLayoutCopyButtonItem = ({ layout, onCopyButton }: ErrorPopupLayoutCopyButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="copy_button"
            params={131089}
            onPointerTap={onCopyButton}
            layout={{ width: 125, height: 30, flexShrink: 0, minWidth: 125, ...layout }}
        >
            {t('error_window.copy')}
        </Button>
    );
};

/** Row template `button_row` of ErrorPopupLayout - pass real rows through its `items…` slot. */
export interface ErrorPopupLayoutButtonRowItemProps {
    itemsButtonRow?: ReactNode;
    layout?: BoxLayout;
}

export const ErrorPopupLayoutButtonRowItem = ({ itemsButtonRow, layout }: ErrorPopupLayoutButtonRowItemProps) => {
    return (
        <Region
            name="button_row"
            params={786640}
            layout={{ width: 265, height: 30, flexShrink: 0, flexDirection: 'row', gap: 15, ...layout }}
        >
            {itemsButtonRow ?? (
                <>
                    <ErrorPopupLayoutOkButtonItem />
                    <ErrorPopupLayoutCopyButtonItem />
                </>
            )}
        </Region>
    );
};
