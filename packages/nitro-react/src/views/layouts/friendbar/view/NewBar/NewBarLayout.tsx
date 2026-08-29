import { BoxLayout, Region } from '#base/theme';

import { NewBarLayoutBorder, NewBarLayoutBorderProps } from './NewBarLayoutBorder';

/** Generated from `24_new_bar_xml` (layout "new_bar", 300x48) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewBarLayoutProps {
    border?: NewBarLayoutBorderProps;
    layout?: BoxLayout;
}

export const NewBarLayout = ({ border, layout }: NewBarLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 300, height: 48, ...layout }}>
            <NewBarLayoutBorder {...border} />
        </Region>
    );
};
