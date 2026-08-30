import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `85_facebook_xml` (layout "facebook", 121x19) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FacebookLayoutProps {
    captionName?: string;
    layout?: BoxLayout;
    srcIcon?: string;
    tintIcon?: string;
}

export const FacebookLayout = ({ captionName, layout, srcIcon, tintIcon }: FacebookLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 121, height: 19, ...layout }}>
            <Region
                name="facebook"
                backgroundColor="#72893f"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    name="icon"
                    src={srcIcon ?? layoutImage('fb_icon_small.png')}
                    tint={tintIcon}
                    layout={{ position: 'absolute', left: 1, width: 14, top: 2, height: 14 }}
                />
                <ThemeText
                    text={captionName ?? 'Baz Bar Foo'}
                    textStyle="text-style-u-small"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 87 }}
                    name="name"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 32, right: 2, top: -2 }}
                />
            </Region>
        </Region>
    );
};
