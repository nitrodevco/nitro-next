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
            <Region layout={{ position: 'absolute', left: 0, width: 220, top: 0, height: 84 }}>
                <ThemeImage
                    name="kittycat"
                    params={1311824}
                    src={srcKittycat ?? '${image.library.url}reception/confused.png'}
                    layout={{ position: 'absolute', left: 80, width: 78, top: 2, height: 59 }}
                />
                <Region
                    name="error"
                    params={1311824}
                    layout={{ position: 'absolute', left: 25, width: 185, top: 63, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionError ?? 'Landing view initialization error.'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
