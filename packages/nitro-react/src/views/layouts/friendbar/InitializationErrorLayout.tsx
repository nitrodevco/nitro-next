import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `22_initialization_error_xml` (layout "initialization_error", 220x84) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InitializationErrorLayoutProps {
    captionError?: string;
    layout?: BoxLayout;
    srcKittycat?: string;
}

export const InitializationErrorLayout = ({ captionError, layout, srcKittycat }: InitializationErrorLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 220, height: 84, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <ThemeImage
                    name="kittycat"
                    src={srcKittycat ?? '${image.library.url}reception/confused.png'}
                    layout={{ position: 'absolute', right: 62, width: 78, bottom: 23, height: 59 }}
                />
                <ThemeText
                    text={captionError ?? 'Landing view initialization error.'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff' }}
                    name="error"
                    layout={{ position: 'absolute', right: 10, width: 185, bottom: 4, height: 17 }}
                />
            </Region>
        </Region>
    );
};
