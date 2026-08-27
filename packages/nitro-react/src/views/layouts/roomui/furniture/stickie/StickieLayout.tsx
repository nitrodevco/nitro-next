import { useState } from 'react';

import { BoxLayout, Region, TextInput, ThemeImage } from '#base/theme';

/** Generated from `883_stickie_xml` (layout "stickie", 185x178) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface StickieLayoutProps {
    layout?: BoxLayout;
    onBlue?: () => void;
    onCyan?: () => void;
    onGreen?: () => void;
    onOrange?: () => void;
    onPurple?: () => void;
    onRed?: () => void;
    onWhite?: () => void;
    onYellow?: () => void;
    srcBg?: string;
    srcClose?: string;
    srcDelete?: string;
}

export const StickieLayout = ({ layout, onBlue, onCyan, onGreen, onOrange, onPurple, onRed, onWhite, onYellow, srcBg, srcClose, srcDelete }: StickieLayoutProps) => {
    const [ textValue, setTextValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 185, height: 178, ...layout }}>
            <Region
                params={32784}
                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 178 }}
            >
                <ThemeImage
                    name="bg"
                    tags={[ 'bg' ]}
                    params={273}
                    src={srcBg}
                    layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 178 }}
                />
                <ThemeImage
                    name="delete"
                    tags={[ 'delete_button' ]}
                    params={17}
                    src={srcDelete}
                    layout={{ position: 'absolute', left: 9, width: 10, top: 4, height: 10 }}
                />
                <Region
                    name="blue"
                    params={17}
                    backgroundColor="#9cceff"
                    onPointerTap={onBlue}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 26, width: 9, top: 5, height: 9 }}
                />
                <Region
                    name="purple"
                    params={17}
                    backgroundColor="#ff9cff"
                    onPointerTap={onPurple}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 38, width: 9, top: 5, height: 9 }}
                />
                <Region
                    name="green"
                    params={17}
                    backgroundColor="#9cff9c"
                    onPointerTap={onGreen}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 50, width: 9, top: 5, height: 9 }}
                />
                <Region
                    name="yellow"
                    params={17}
                    backgroundColor="#ffff33"
                    onPointerTap={onYellow}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 62, width: 9, top: 5, height: 9 }}
                />
                <Region
                    name="white"
                    params={17}
                    backgroundColor="#ffffff"
                    onPointerTap={onWhite}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 74, width: 9, top: 5, height: 9 }}
                />
                <Region
                    name="red"
                    params={17}
                    backgroundColor="#ff9c9c"
                    onPointerTap={onRed}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 86, width: 9, top: 5, height: 9 }}
                />
                <Region
                    name="orange"
                    params={17}
                    backgroundColor="#ffcc66"
                    onPointerTap={onOrange}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 98, width: 9, top: 5, height: 9 }}
                />
                <Region
                    name="cyan"
                    params={17}
                    backgroundColor="#9cffff"
                    onPointerTap={onCyan}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 110, width: 9, top: 5, height: 9 }}
                />
                <ThemeImage
                    name="close"
                    tags={[ 'close_button' ]}
                    params={17}
                    src={srcClose}
                    layout={{ position: 'absolute', left: 168, width: 10, top: 5, height: 10 }}
                />
                <TextInput
                    value={textValue}
                    onChange={setTextValue}
                    maxLength={500}
                    multiline
                    layout={{ position: 'absolute', left: 5, width: 175, top: 24, height: 135 }}
                />
            </Region>
        </Region>
    );
};
