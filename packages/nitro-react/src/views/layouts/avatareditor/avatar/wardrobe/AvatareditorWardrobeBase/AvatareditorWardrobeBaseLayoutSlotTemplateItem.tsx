import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `slot_template` of AvatareditorWardrobeBaseLayout - pass real rows through its `items…` slot. */
export interface AvatareditorWardrobeBaseLayoutSlotTemplateItemProps {
    getFigure?: ReactNode;
    layout?: BoxLayout;
    onGetButton?: () => void;
    onGetFigure?: () => void;
    onSetButton?: () => void;
    srcImage?: string;
    tintImage?: string;
    visibleGetButton?: boolean;
    visibleGetFigure?: boolean;
    visibleImage?: boolean;
    visibleSetButton?: boolean;
}

export const AvatareditorWardrobeBaseLayoutSlotTemplateItem = ({ getFigure, layout, onGetButton, onGetFigure, onSetButton, srcImage, tintImage, visibleGetButton, visibleGetFigure, visibleImage, visibleSetButton }: AvatareditorWardrobeBaseLayoutSlotTemplateItemProps) => {
    return (
        <Region
            name="slot_template"
            layout={{ width: 56, height: 56, flexShrink: 0, ...layout }}
        >
            <Border
                variant="3"
                tintColor="#666666"
                blend={0.3}
                layout={{ position: 'absolute', left: 29, width: 24, top: 3, height: 50 }}
            />
            {(visibleSetButton ?? true) && (
                <Region
                    name="set_button"
                    onPointerTap={onSetButton}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 3, width: 22, top: 3, height: 26 }}
                >
                    <ThemeImage
                        src={layoutImage('icons_forward_small.png')}
                        layout={{ position: 'absolute', left: 0, width: 22, top: 9, height: 15 }}
                    />
                </Region>
            )}
            {(visibleGetButton ?? true) && (
                <Region
                    name="get_button"
                    onPointerTap={onGetButton}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 2, width: 22, top: 28, height: 26 }}
                >
                    <ThemeImage
                        src={layoutImage('icons_back_small.png')}
                        layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 15 }}
                    />
                </Region>
            )}
            {(visibleImage ?? true) && (
                <ThemeImage
                    name="image"
                    src={srcImage}
                    tint={tintImage}
                    layout={{ position: 'absolute', left: 30, width: 22, top: 4, height: 48 }}
                />
            )}
            {(visibleGetFigure ?? true) && (
                <Region
                    name="get_figure"
                    onPointerTap={onGetFigure}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 29, width: 24, top: 3, height: 50 }}
                >
                    {getFigure}
                </Region>
            )}
        </Region>
    );
};
