import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Icon, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `chat_input_container` of ChatinputWindowNewLayout - configured through the parent's `chatInputContainer` prop. */
export interface ChatinputWindowNewLayoutChatInputContainerProps {
    captionBlockText?: string;
    helpbuttonShowHoverRegion?: ReactNode;
    layout?: BoxLayout;
    onChatExtraButton?: () => void;
    onHelpbuttonShowHoverRegion?: () => void;
    onStyles?: () => void;
    srcChatExtraBg?: string;
    srcChatExtraBg2?: string;
    srcChatExtraIcon?: string;
    srcChatExtraSetIcon?: string;
    srcStyleBg?: string;
    srcStyleIcon?: string;
    tintChatExtraSetIcon?: string;
    visibleBlockText?: boolean;
}

export const ChatinputWindowNewLayoutChatInputContainer = ({ captionBlockText, helpbuttonShowHoverRegion, layout, onChatExtraButton, onHelpbuttonShowHoverRegion, onStyles, srcChatExtraBg, srcChatExtraBg2, srcChatExtraIcon, srcChatExtraSetIcon, srcStyleBg, srcStyleIcon, tintChatExtraSetIcon, visibleBlockText }: ChatinputWindowNewLayoutChatInputContainerProps) => {
    const t = useTranslation();
    const [ chatInputValue, setChatInputValue ] = useState('');

    return (
        <Region
            name="chat_input_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 60, height: 57, ...layout }}
        >
            <Border
                variant="8"
                name="input_border"
                tintColor="#e5e5e5"
                layout={{ position: 'absolute', left: 11, width: 400, top: 0, height: 38 }}
            >
                <Region
                    name="helpbutton_show_hover_region"
                    onPointerTap={onHelpbuttonShowHoverRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 1, right: -2, top: -1, bottom: 2 }}
                >
                    {helpbuttonShowHoverRegion}
                </Region>
                {(visibleBlockText ?? false) && (
                    <Region
                        name="block_text"
                        layout={{ position: 'absolute', left: 10, width: 325, top: 9, bottom: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionBlockText ?? t('chat.input.alert.flood')}
                            textOptions={{ fill: '#ff0000' }}
                        />
                    </Region>
                )}
                <TextInput
                    value={chatInputValue}
                    onChange={setChatInputValue}
                    maxLength={100}
                    textColor="#777777"
                    layout={{ position: 'absolute', left: 50, width: 326, top: 7, bottom: 7 }}
                />
            </Border>
            <Region
                name="styles"
                onPointerTap={onStyles}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 39, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="style_bg"
                    src={srcStyleBg ?? layoutImage('common_chat_style_block.png')}
                    layout={{ position: 'absolute', left: 0, width: 57, top: 0, height: 38 }}
                />
                <ThemeImage
                    name="style_icon"
                    src={srcStyleIcon ?? layoutImage('common_chat_styles.png')}
                    layout={{ position: 'absolute', marginLeft: 3.5, marginRight: -3.5, width: 17, top: 10, height: 19 }}
                />
                <Icon
                    variant="7"
                    dynamicStyle="brightness_and_shadow_under"
                    tintColor="#4c4c4c"
                    layout={{ position: 'absolute', left: 10, width: 10, alignSelf: 'center', height: 5 }}
                />
            </Region>
            <Region
                name="chat_extra_button"
                dynamicStyle="lifted_hover"
                onPointerTap={onChatExtraButton}
                cursor="pointer"
                layout={{ position: 'absolute', right: 3, width: 41, top: 0, height: 38 }}
            >
                <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                    <ThemeImage
                        name="chat_extra_bg"
                        src={srcChatExtraBg ?? layoutImage('habbicons_sticky_note.png')}
                        layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 38 }}
                    />
                    <ThemeImage
                        name="chat_extra_set_icon"
                        src={srcChatExtraSetIcon}
                        tint={tintChatExtraSetIcon}
                        layout={{ position: 'absolute', left: 3, width: 30, top: 3, height: 30 }}
                    />
                    <ThemeImage
                        name="chat_extra_icon"
                        src={srcChatExtraIcon ?? layoutImage('habbicons_clip.png')}
                        layout={{ position: 'absolute', right: 0, width: 18, top: 2, height: 15 }}
                    />
                    <ThemeImage
                        name="chat_extra_bg"
                        src={srcChatExtraBg2 ?? layoutImage('habbicons_sticky_note2.png')}
                        layout={{ position: 'absolute', right: 5, width: 12, bottom: 0, height: 12 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
