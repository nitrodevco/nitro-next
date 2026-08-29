import { BoxLayout, Region } from '#base/theme';

import { MemenuMainLayoutButtons, MemenuMainLayoutButtonsProps } from './MemenuMainLayoutButtons';

/** Generated from `1103_memenu_main_xml` (layout "memenu_main", 245x249) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuMainLayoutProps {
    buttons?: MemenuMainLayoutButtonsProps;
    layout?: BoxLayout;
}

export const MemenuMainLayout = ({ buttons, layout }: MemenuMainLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 245, height: 249, ...layout }}>
            <MemenuMainLayoutButtons {...buttons} />
        </Region>
    );
};
