import { Border, BoxLayout, Region } from '#base/theme';

/** Generated from `979_memenu_xml` (layout "memenu", 200x260) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuLayoutProps {
    layout?: BoxLayout;
}

export const MemenuLayout = ({ layout }: MemenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 200, height: 260, ...layout }}>
            <Border
                variant="6"
                name="main_content"
                tintColor="#5b5953"
                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 260 }}
            />
        </Region>
    );
};
