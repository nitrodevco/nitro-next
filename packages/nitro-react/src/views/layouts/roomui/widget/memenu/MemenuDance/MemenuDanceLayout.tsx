import { BoxLayout, Region } from '#base/theme';

import { MemenuDanceLayoutDanceContainer, MemenuDanceLayoutDanceContainerProps } from './MemenuDanceLayoutDanceContainer';

/** Generated from `834_memenu_dance_xml` (layout "memenu_dance", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuDanceLayoutProps {
    danceContainer?: MemenuDanceLayoutDanceContainerProps;
    layout?: BoxLayout;
}

export const MemenuDanceLayout = ({ danceContainer, layout }: MemenuDanceLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <MemenuDanceLayoutDanceContainer {...danceContainer} />
        </Region>
    );
};
