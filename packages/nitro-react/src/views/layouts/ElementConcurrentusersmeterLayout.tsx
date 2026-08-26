import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `82_element_concurrentusersmeter_xml` (layout "element_concurrentusersmeter", 250x46) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ElementConcurrentusersmeterLayoutProps {
    layout?: BoxLayout;
}

export const ElementConcurrentusersmeterLayout = ({ layout }: ElementConcurrentusersmeterLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 250, height: 46, ...layout }}>
            <ThemeImage
                name="image"
                params={16}
                src={undefined}
                layout={{ position: 'absolute', left: 0, width: 63, top: 0, height: 157 }}
            />
        </Region>
    );
};
