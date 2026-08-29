import { useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Frame, TextInput } from '#base/theme';

import { MainWindow_3100LayoutContent, MainWindow_3100LayoutContentProps } from './MainWindow_3100LayoutContent';

/** Generated from `3100_main_window_xml` (layout "messenger_main_window", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MainWindow_3100LayoutProps {
    content?: MainWindow_3100LayoutContentProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const MainWindow_3100Layout = ({ content, layout, onClose }: MainWindow_3100LayoutProps) => {
    const t = useTranslation();
    const [ messageInputValue, setMessageInputValue ] = useState('');

    return (
        <Frame
            variant="2"
            id="messenger_window"
            name="messenger_window"
            caption={t('messenger.title')}
            onClose={onClose}
            layout={{ width: 212, height: 405, ...layout }}
        >
            <MainWindow_3100LayoutContent {...content} />
            <TextInput
                value={messageInputValue}
                onChange={setMessageInputValue}
                textColor="#000000"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 10, right: 12, bottom: 36, height: 54 }}
            />
        </Frame>
    );
};
