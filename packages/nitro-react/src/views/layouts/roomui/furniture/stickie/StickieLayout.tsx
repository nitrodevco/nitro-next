import { ReactNode, useState } from 'react';

import { BoxLayout, Region, TextInput, ThemeImage } from '#base/theme';

/** Generated from `883_stickie_xml` (layout "stickie", 185x178) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface StickieLayoutProps {
    blue?: ReactNode;
    cyan?: ReactNode;
    green?: ReactNode;
    layout?: BoxLayout;
    onBlue?: () => void;
    onCyan?: () => void;
    onGreen?: () => void;
    onOrange?: () => void;
    onPurple?: () => void;
    onRed?: () => void;
    onWhite?: () => void;
    onYellow?: () => void;
    orange?: ReactNode;
    purple?: ReactNode;
    red?: ReactNode;
    srcBg?: string;
    srcClose?: string;
    srcDelete?: string;
    tintBg?: string;
    tintClose?: string;
    tintDelete?: string;
    white?: ReactNode;
    yellow?: ReactNode;
}

export const StickieLayout = ({ blue, cyan, green, layout, onBlue, onCyan, onGreen, onOrange, onPurple, onRed, onWhite, onYellow, orange, purple, red, srcBg, srcClose, srcDelete, tintBg, tintClose, tintDelete, white, yellow }: StickieLayoutProps) => {
    const [ textValue, setTextValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 185, height: 178, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}>
                <ThemeImage
                    name="bg"
                    src={srcBg}
                    tint={tintBg}
                    layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 178 }}
                />
                <ThemeImage
                    name="delete"
                    src={srcDelete}
                    tint={tintDelete}
                    layout={{ position: 'absolute', left: 9, width: 10, top: 4, height: 10 }}
                />
                <Region
                    name="blue"
                    backgroundColor="#9cceff"
                    onPointerTap={onBlue}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 26, width: 9, top: 5, height: 9 }}
                >
                    {blue}
                </Region>
                <Region
                    name="purple"
                    backgroundColor="#ff9cff"
                    onPointerTap={onPurple}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 38, width: 9, top: 5, height: 9 }}
                >
                    {purple}
                </Region>
                <Region
                    name="green"
                    backgroundColor="#9cff9c"
                    onPointerTap={onGreen}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 50, width: 9, top: 5, height: 9 }}
                >
                    {green}
                </Region>
                <Region
                    name="yellow"
                    backgroundColor="#ffff33"
                    onPointerTap={onYellow}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 62, width: 9, top: 5, height: 9 }}
                >
                    {yellow}
                </Region>
                <Region
                    name="white"
                    backgroundColor="#ffffff"
                    onPointerTap={onWhite}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 74, width: 9, top: 5, height: 9 }}
                >
                    {white}
                </Region>
                <Region
                    name="red"
                    backgroundColor="#ff9c9c"
                    onPointerTap={onRed}
                    cursor="pointer"
                    layout={{ position: 'absolute', marginLeft: -2, marginRight: 2, width: 9, top: 5, height: 9 }}
                >
                    {red}
                </Region>
                <Region
                    name="orange"
                    backgroundColor="#ffcc66"
                    onPointerTap={onOrange}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 98, width: 9, top: 5, height: 9 }}
                >
                    {orange}
                </Region>
                <Region
                    name="cyan"
                    backgroundColor="#9cffff"
                    onPointerTap={onCyan}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 110, width: 9, top: 5, height: 9 }}
                >
                    {cyan}
                </Region>
                <ThemeImage
                    name="close"
                    src={srcClose}
                    tint={tintClose}
                    layout={{ position: 'absolute', right: 7, width: 10, top: 5, height: 10 }}
                />
                <TextInput
                    value={textValue}
                    onChange={setTextValue}
                    maxLength={500}
                    multiline
                    layout={{ position: 'absolute', left: 5, right: 5, alignSelf: 'center', marginTop: 2.5, marginBottom: -2.5, height: 135 }}
                />
            </Region>
        </Region>
    );
};
