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
            <Region layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 178 }}>
                <ThemeImage
                    name="bg"
                    tags={[ 'bg' ]}
                    src={srcBg}
                    layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 178 }}
                />
                <ThemeImage
                    name="delete"
                    tags={[ 'delete_button' ]}
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
    tags?: string[];
}

export const StickieLayoutBlue = ({ layout, onBlue, tags }: StickieLayoutBlueProps) => {
    return (
        <Region
            name="blue"
            tags={tags}
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
    tags?: string[];
}

export const StickieLayoutPurple = ({ layout, onPurple, tags }: StickieLayoutPurpleProps) => {
    return (
        <Region
            name="purple"
            tags={tags}
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
    tags?: string[];
}

export const StickieLayoutGreen = ({ layout, onGreen, tags }: StickieLayoutGreenProps) => {
    return (
        <Region
            name="green"
            tags={tags}
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
    tags?: string[];
}

export const StickieLayoutYellow = ({ layout, onYellow, tags }: StickieLayoutYellowProps) => {
    return (
        <Region
            name="yellow"
            tags={tags}
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
    tags?: string[];
}

export const StickieLayoutWhite = ({ layout, onWhite, tags }: StickieLayoutWhiteProps) => {
    return (
        <Region
            name="white"
            tags={tags}
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
    tags?: string[];
}

export const StickieLayoutRed = ({ layout, onRed, tags }: StickieLayoutRedProps) => {
    return (
        <Region
            name="red"
            tags={tags}
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
    tags?: string[];
}

export const StickieLayoutOrange = ({ layout, onOrange, tags }: StickieLayoutOrangeProps) => {
    return (
        <Region
            name="orange"
            tags={tags}
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
    tags?: string[];
}

export const StickieLayoutCyan = ({ layout, onCyan, tags }: StickieLayoutCyanProps) => {
    return (
        <Region
            name="cyan"
            tags={tags}
            backgroundColor="#9cffff"
            onPointerTap={onCyan}
            cursor="pointer"
            layout={{ position: 'absolute', left: 110, width: 9, top: 5, height: 9, ...layout }}
        />
    );
};
