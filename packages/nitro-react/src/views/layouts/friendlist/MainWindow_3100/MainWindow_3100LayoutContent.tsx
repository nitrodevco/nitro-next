import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage } from '#base/theme';

import { MainWindow_3100LayoutConversation, MainWindow_3100LayoutConversationProps } from './MainWindow_3100LayoutConversation';

/** Named region `content` of MainWindow_3100Layout - configured through the parent's `content` prop. */
export interface MainWindow_3100LayoutContentProps {
    bg?: ReactNode;
    conversation?: MainWindow_3100LayoutConversationProps;
    conversationstab?: ReactNode;
    layout?: BoxLayout;
    onContent?: () => void;
    onConversationstab?: () => void;
    srcConvoBg?: string;
    tintConvoBg?: string;
}

export const MainWindow_3100LayoutContent = ({ bg, conversation, conversationstab, layout, onContent, onConversationstab, srcConvoBg, tintConvoBg }: MainWindow_3100LayoutContentProps) => {
    return (
        <Region
            name="content"
            backgroundColor="#ffffff"
            onPointerTap={onContent}
            cursor="pointer"
            layout={{ position: 'absolute', left: 1, right: 1, top: 0, bottom: 100, ...layout }}
        >
            <ThemeImage
                name="convo_bg"
                src={srcConvoBg}
                tint={tintConvoBg}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 31 }}
            />
            <Region
                name="conversationstab"
                onPointerTap={onConversationstab}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 600 }}
            >
                {conversationstab}
            </Region>
            <MainWindow_3100LayoutConversation {...conversation} />
            <Region
                name="bg"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 1 }}
            >
                {bg}
            </Region>
        </Region>
    );
};
