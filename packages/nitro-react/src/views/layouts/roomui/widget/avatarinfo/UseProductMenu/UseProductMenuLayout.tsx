import { BoxLayout, Bubble, Region } from '#base/theme';

import { UseProductMenuLayoutBorder, UseProductMenuLayoutBorderProps } from './UseProductMenuLayoutBorder';

/** Generated from `1029_use_product_menu_xml` (layout "context_menu_widget", 115x302) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UseProductMenuLayoutProps {
    border?: UseProductMenuLayoutBorderProps;
    layout?: BoxLayout;
}

export const UseProductMenuLayout = ({ border, layout }: UseProductMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 302, ...layout }}>
            <Bubble
                variant="0"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 115, bottom: -9, height: 302 }}
            >
                <UseProductMenuLayoutBorder {...border} />
            </Bubble>
        </Region>
    );
};
