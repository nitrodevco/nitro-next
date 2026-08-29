import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `303_snowwar_exit_xml` (layout "snowwar_exit", 68x50) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SnowwarExitLayoutProps {
    exitButton?: SnowwarExitLayoutExitButtonProps;
    layout?: BoxLayout;
}

export const SnowwarExitLayout = ({ exitButton, layout }: SnowwarExitLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 68, height: 50, ...layout }}>
            <SnowwarExitLayoutExitButton {...exitButton} />
        </Region>
    );
};

/** Named region `exitButton` of SnowwarExitLayout - configured through the parent's `exitButton` prop. */
export interface SnowwarExitLayoutExitButtonProps {
    layout?: BoxLayout;
    onExitButton?: () => void;
    srcBackgroundImage?: string;
}

export const SnowwarExitLayoutExitButton = ({ layout, onExitButton, srcBackgroundImage }: SnowwarExitLayoutExitButtonProps) => {
    return (
        <Region
            name="exitButton"
            params={1}
            onPointerTap={onExitButton}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 68, top: 0, height: 50, ...layout }}
        >
            <ThemeImage
                name="backgroundImage"
                tags={[ 'bitmap' ]}
                params={16}
                src={srcBackgroundImage ?? layoutImage('ui_exit_down.png')}
                layout={{ position: 'absolute', left: 0, width: 68, top: 0, height: 50 }}
            />
        </Region>
    );
};
