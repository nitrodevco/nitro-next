import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `85_facebook_xml` (layout "facebook", 121x19) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FacebookLayoutProps {
    facebook?: FacebookLayoutFacebookProps;
    layout?: BoxLayout;
}

export const FacebookLayout = ({ facebook, layout }: FacebookLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 121, height: 19, ...layout }}>
            <FacebookLayoutFacebook {...facebook} />
        </Region>
    );
};

/** Named region `facebook` of FacebookLayout - configured through the parent's `facebook` prop. */
export interface FacebookLayoutFacebookProps {
    captionName?: string;
    layout?: BoxLayout;
    srcIcon?: string;
}

export const FacebookLayoutFacebook = ({ captionName, layout, srcIcon }: FacebookLayoutFacebookProps) => {
    return (
        <Region
            name="facebook"
            params={144}
            backgroundColor="#72893f"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 19, ...layout }}
        >
            <ThemeImage
                name="icon"
                params={16}
                src={srcIcon ?? layoutImage('fb_icon_small.png')}
                layout={{ position: 'absolute', left: 1, width: 14, top: 2, height: 14 }}
            />
            <Region
                name="name"
                params={8388752}
                layout={{ position: 'absolute', left: 32, right: 2, top: -2, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionName ?? 'Baz Bar Foo'}
                    textStyle="text-style-u-small"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 87 }}
                />
            </Region>
        </Region>
    );
};
