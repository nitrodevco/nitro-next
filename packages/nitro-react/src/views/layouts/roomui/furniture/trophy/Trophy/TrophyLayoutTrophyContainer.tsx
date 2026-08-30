import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Named region `trophy_container` of TrophyLayout - configured through the parent's `trophyContainer` prop. */
export interface TrophyLayoutTrophyContainerProps {
    captionDate?: string;
    captionGreeting?: string;
    captionName?: string;
    captionTitle?: string;
    close?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    onTrophyContainer?: () => void;
    srcTrophyBg?: string;
    tintTrophyBg?: string;
}

export const TrophyLayoutTrophyContainer = ({ captionDate, captionGreeting, captionName, captionTitle, close, layout, onClose, onTrophyContainer, srcTrophyBg, tintTrophyBg }: TrophyLayoutTrophyContainerProps) => {
    return (
        <Region
            name="trophy_container"
            onPointerTap={onTrophyContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="trophy_bg"
                src={srcTrophyBg}
                tint={tintTrophyBg}
                layout={{ position: 'absolute', left: 0, width: 340, top: 0, height: 173 }}
            />
            <ThemeText
                text={captionGreeting ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet justo sagittis orci dapibus semper sagittis id neque. Nunc sed quam vitae felis semper neque. Nunc sed quam vitae felis semper neque. Nunc sed quam vitae felis semper neque. Nunc sed quam vitae felis semper neque. Nunc sed quam vitae felis semper  semper  semper  semper  semper  semper  semper  sempeaaaaaa'}
                textOptions={{ wordWrap: true, wordWrapWidth: 297 }}
                name="greeting"
                verticalAlign="top"
                layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 297, alignSelf: 'center', marginTop: -3.5, marginBottom: 3.5, height: 116 }}
            />
            <ThemeText
                text={captionDate ?? 'da.te.'}
                textOptions={{ wordWrap: true, wordWrapWidth: 83 }}
                name="date"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 21, width: 83, top: 142, height: 18 }}
            />
            <ThemeText
                text={captionName ?? 'kateislonger'}
                name="name"
                layout={{ position: 'absolute', right: 20, width: 74, top: 142, height: 17 }}
            />
            <Region
                name="close"
                onPointerTap={onClose}
                cursor="pointer"
                layout={{ position: 'absolute', right: 4, width: 18, top: 3, height: 20 }}
            >
                {close}
            </Region>
            <Region
                name="title_bg"
                backgroundColor="#ff0000"
                layout={{ position: 'absolute', width: 120, top: 4, height: 18, justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionTitle ?? 'Trophy'}
                    textOptions={{ align: 'center' }}
                    name="title"
                    layout={{ position: 'absolute', width: 120, top: 1, bottom: 0 }}
                />
            </Region>
        </Region>
    );
};
