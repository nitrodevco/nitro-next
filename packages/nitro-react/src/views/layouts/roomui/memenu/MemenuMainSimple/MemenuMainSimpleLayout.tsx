import { BoxLayout, Region } from '#base/theme';

import { MemenuMainSimpleLayoutButtons, MemenuMainSimpleLayoutButtonsProps } from './MemenuMainSimpleLayoutButtons';

/** Generated from `1042_memenu_main_simple_xml` (layout "memenu_main", 165x245) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuMainSimpleLayoutProps {
    buttons?: MemenuMainSimpleLayoutButtonsProps;
    layout?: BoxLayout;
}

export const MemenuMainSimpleLayout = ({ buttons, layout }: MemenuMainSimpleLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 165, height: 245, ...layout }}>
            <MemenuMainSimpleLayoutButtons {...buttons} />
        </Region>
    );
};
