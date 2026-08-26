import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, Frame, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `2879_error_popup_xml` (layout "error_popup", 300x328) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ErrorPopupLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onCopyButton?: () => void;
    onDoNotShowCbx?: () => void;
    onOkButton?: () => void;
}

export const ErrorPopupLayout = ({ layout, onClose, onCopyButton, onDoNotShowCbx, onOkButton }: ErrorPopupLayoutProps) => {
    const t = useTranslation();
    const [ errorInfoContentsValue, setErrorInfoContentsValue ] = useState('');

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
                    layout={{ position: 'absolute', left: 17, width: 265, top: 10, height: 271, flexDirection: 'column', gap: 10 }}
                >
                    <Region
                        name="error_msg_text"
                        params={144}
                        layout={{ width: 265, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text="Error message"
                            textOptions={{ wordWrap: true, wordWrapWidth: 265, align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="info_text"
                        params={144}
                        layout={{ width: 265, height: 28, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('error_window.info')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 265, align: 'center' }}
                        />
                    </Region>
                    <Border
                        variant="105"
                        name="error_info_border"
                        tags={[ 'error_info' ]}
                        params={144}
                        layout={{ width: 265, height: 136, flexShrink: 0 }}
                    >
                        <TextInput
                            value={errorInfoContentsValue}
                            onChange={setErrorInfoContentsValue}
                            multiline
                            layout={{ position: 'absolute', left: 5, width: 255, top: 5, height: 126 }}
                        />
                    </Border>
                    <Region
                        name="do_not_show_container"
                        params={144}
                        layout={{ width: 265, height: 20, flexShrink: 0 }}
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
                    <Region
                        name="button_row"
                        params={786640}
                        layout={{ width: 265, height: 30, flexShrink: 0, flexDirection: 'row', gap: 15 }}
                    >
                        <Button
                            variant="3"
                            name="ok_button"
                            params={131089}
                            onPointerTap={onOkButton}
                            layout={{ width: 125, height: 30, flexShrink: 0, minWidth: 125 }}
                        >
                            {t('error_window.ok')}
                        </Button>
                        <Button
                            variant="3"
                            name="copy_button"
                            params={131089}
                            onPointerTap={onCopyButton}
                            layout={{ width: 125, height: 30, flexShrink: 0, minWidth: 125 }}
                        >
                            {t('error_window.copy')}
                        </Button>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
