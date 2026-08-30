import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Row template `header` of EntityLayout - pass real rows through its `items…` slot. */
export interface EntityLayoutHeaderItemProps {
    captionName?: string;
    layout?: BoxLayout;
    onHeader?: () => void;
    onRegionProfile?: () => void;
    srcCanvas?: string;
    tintCanvas?: string;
    visibleCanvas?: boolean;
    visibleName?: boolean;
    visibleRegionProfile?: boolean;
}

export const EntityLayoutHeaderItem = ({ captionName, layout, onHeader, onRegionProfile, srcCanvas, tintCanvas, visibleCanvas, visibleName, visibleRegionProfile }: EntityLayoutHeaderItemProps) => {
    return (
        <Region
            name="header"
            onPointerTap={onHeader}
            cursor="pointer"
            layout={{ width: 119, height: 24, flexShrink: 0, ...layout }}
        >
            {(visibleName ?? true) && (
                <ThemeText
                    text={captionName ?? ''}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff' }}
                    name="name"
                    layout={{ position: 'absolute', left: 33, width: 86, top: 2, height: 18 }}
                />
            )}
            {(visibleRegionProfile ?? true) && (
                <Region
                    name="region_profile"
                    onPointerTap={onRegionProfile}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 86, top: 0, bottom: 0 }}
                >
                    <Region layout={{ position: 'absolute', left: -11, width: 50, top: -25, height: 70, justifyContent: 'center' }}>
                        {(visibleCanvas ?? true) && (
                            <ThemeImage
                                name="canvas"
                                src={srcCanvas}
                                tint={tintCanvas}
                                layout={{ position: 'absolute', width: 10, alignSelf: 'center', height: 10 }}
                            />
                        )}
                    </Region>
                </Region>
            )}
        </Region>
    );
};
