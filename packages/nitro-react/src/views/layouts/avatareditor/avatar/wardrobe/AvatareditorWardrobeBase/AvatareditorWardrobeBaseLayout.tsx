import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { AvatareditorWardrobeBaseLayoutMainContainer, AvatareditorWardrobeBaseLayoutMainContainerProps } from './AvatareditorWardrobeBaseLayoutMainContainer';

/** Generated from `3117_avatareditor_wardrobe_base_xml` (layout "avatareditor_wardrobe", 182x490) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatareditorWardrobeBaseLayoutProps {
    layout?: BoxLayout;
    mainContainer?: AvatareditorWardrobeBaseLayoutMainContainerProps;
    spacing?: ReactNode;
    spacing2?: ReactNode;
    splitter?: ReactNode;
}

export const AvatareditorWardrobeBaseLayout = ({ layout, mainContainer, spacing, spacing2, splitter }: AvatareditorWardrobeBaseLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 182, height: 490, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <Region
                    name="splitter"
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, width: 1, top: 0, bottom: 0 }}
                >
                    {splitter}
                </Region>
                <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'row' }}>
                    <Region
                        name="spacing"
                        layout={{ width: 6, height: 30, flexShrink: 0 }}
                    >
                        {spacing}
                    </Region>
                    <AvatareditorWardrobeBaseLayoutMainContainer {...mainContainer} />
                    <Region
                        name="spacing"
                        layout={{ width: 8, height: 30, flexShrink: 0 }}
                    >
                        {spacing2}
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
