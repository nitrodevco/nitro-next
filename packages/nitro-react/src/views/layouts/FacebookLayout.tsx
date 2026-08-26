import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `85_facebook_xml` (layout "facebook", 121x19) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FacebookLayoutProps {
    layout?: BoxLayout;
}

export const FacebookLayout = ({ layout }: FacebookLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 121, height: 19, ...layout }}>
            <Region
                name="facebook"
                params={144}
                backgroundColor="#72893f"
                layout={{ position: 'absolute', left: 0, width: 121, top: 0, height: 19 }}
            >
                <ThemeImage
                    name="icon"
                    params={16}
                    src={layoutImage('fb_icon_small.png')}
                    layout={{ position: 'absolute', left: 1, width: 14, top: 2, height: 14 }}
                />
                <Region
                    name="name"
                    params={8388752}
                    layout={{ position: 'absolute', left: 32, width: 87, top: -2, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="Baz Bar Foo"
                        textStyle="text-style-u-small"
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 87 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
