import { useState } from 'react';

import { BoxLayout, Region, TextInput, ThemeImage } from '#base/theme';

/** Generated from `883_stickie_xml` (layout "stickie", 185x178) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface StickieLayoutProps {
    blue?: StickieLayoutBlueProps;
    cyan?: StickieLayoutCyanProps;
    green?: StickieLayoutGreenProps;
    layout?: BoxLayout;
    orange?: StickieLayoutOrangeProps;
    purple?: StickieLayoutPurpleProps;
    red?: StickieLayoutRedProps;
    srcBg?: string;
    srcClose?: string;
    srcDelete?: string;
    white?: StickieLayoutWhiteProps;
    yellow?: StickieLayoutYellowProps;
}

export const StickieLayout = ({ blue, cyan, green, layout, orange, purple, red, srcBg, srcClose, srcDelete, white, yellow }: StickieLayoutProps) => {
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
                <StickieLayoutBlue {...blue} />
                <StickieLayoutPurple {...purple} />
                <StickieLayoutGreen {...green} />
                <StickieLayoutYellow {...yellow} />
                <StickieLayoutWhite {...white} />
                <StickieLayoutRed {...red} />
                <StickieLayoutOrange {...orange} />
                <StickieLayoutCyan {...cyan} />
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

/** Named region `blue` of StickieLayout - configured through the parent's `blue` prop. */
export interface StickieLayoutBlueProps {
    layout?: BoxLayout;
    onBlue?: () => void;
}

export const StickieLayoutBlue = ({ layout, onBlue }: StickieLayoutBlueProps) => {
    return (
        <Region
            name="blue"
            params={17}
            backgroundColor="#9cceff"
            onPointerTap={onBlue}
            cursor="pointer"
            layout={{ position: 'absolute', left: 26, width: 9, top: 5, height: 9, ...layout }}
        />
    );
};

/** Named region `purple` of StickieLayout - configured through the parent's `purple` prop. */
export interface StickieLayoutPurpleProps {
    layout?: BoxLayout;
    onPurple?: () => void;
}

export const StickieLayoutPurple = ({ layout, onPurple }: StickieLayoutPurpleProps) => {
    return (
        <Region
            name="purple"
            params={17}
            backgroundColor="#ff9cff"
            onPointerTap={onPurple}
            cursor="pointer"
            layout={{ position: 'absolute', left: 38, width: 9, top: 5, height: 9, ...layout }}
        />
    );
};

/** Named region `green` of StickieLayout - configured through the parent's `green` prop. */
export interface StickieLayoutGreenProps {
    layout?: BoxLayout;
    onGreen?: () => void;
}

export const StickieLayoutGreen = ({ layout, onGreen }: StickieLayoutGreenProps) => {
    return (
        <Region
            name="green"
            params={17}
            backgroundColor="#9cff9c"
            onPointerTap={onGreen}
            cursor="pointer"
            layout={{ position: 'absolute', left: 50, width: 9, top: 5, height: 9, ...layout }}
        />
    );
};

/** Named region `yellow` of StickieLayout - configured through the parent's `yellow` prop. */
export interface StickieLayoutYellowProps {
    layout?: BoxLayout;
    onYellow?: () => void;
}

export const StickieLayoutYellow = ({ layout, onYellow }: StickieLayoutYellowProps) => {
    return (
        <Region
            name="yellow"
            params={17}
            backgroundColor="#ffff33"
            onPointerTap={onYellow}
            cursor="pointer"
            layout={{ position: 'absolute', left: 62, width: 9, top: 5, height: 9, ...layout }}
        />
    );
};

/** Named region `white` of StickieLayout - configured through the parent's `white` prop. */
export interface StickieLayoutWhiteProps {
    layout?: BoxLayout;
    onWhite?: () => void;
}

export const StickieLayoutWhite = ({ layout, onWhite }: StickieLayoutWhiteProps) => {
    return (
        <Region
            name="white"
            params={17}
            backgroundColor="#ffffff"
            onPointerTap={onWhite}
            cursor="pointer"
            layout={{ position: 'absolute', left: 74, width: 9, top: 5, height: 9, ...layout }}
        />
    );
};

/** Named region `red` of StickieLayout - configured through the parent's `red` prop. */
export interface StickieLayoutRedProps {
    layout?: BoxLayout;
    onRed?: () => void;
}

export const StickieLayoutRed = ({ layout, onRed }: StickieLayoutRedProps) => {
    return (
        <Region
            name="red"
            params={17}
            backgroundColor="#ff9c9c"
            onPointerTap={onRed}
            cursor="pointer"
            layout={{ position: 'absolute', left: 86, width: 9, top: 5, height: 9, ...layout }}
        />
    );
};

/** Named region `orange` of StickieLayout - configured through the parent's `orange` prop. */
export interface StickieLayoutOrangeProps {
    layout?: BoxLayout;
    onOrange?: () => void;
}

export const StickieLayoutOrange = ({ layout, onOrange }: StickieLayoutOrangeProps) => {
    return (
        <Region
            name="orange"
            params={17}
            backgroundColor="#ffcc66"
            onPointerTap={onOrange}
            cursor="pointer"
            layout={{ position: 'absolute', left: 98, width: 9, top: 5, height: 9, ...layout }}
        />
    );
};

/** Named region `cyan` of StickieLayout - configured through the parent's `cyan` prop. */
export interface StickieLayoutCyanProps {
    layout?: BoxLayout;
    onCyan?: () => void;
}

export const StickieLayoutCyan = ({ layout, onCyan }: StickieLayoutCyanProps) => {
    return (
        <Region
            name="cyan"
            params={17}
            backgroundColor="#9cffff"
            onPointerTap={onCyan}
            cursor="pointer"
            layout={{ position: 'absolute', left: 110, width: 9, top: 5, height: 9, ...layout }}
        />
    );
};
