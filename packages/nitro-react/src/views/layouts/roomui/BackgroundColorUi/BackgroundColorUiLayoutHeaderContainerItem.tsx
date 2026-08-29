import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Row template `header_container` of BackgroundColorUiLayout - pass real rows through its `items…` slot. */
export interface BackgroundColorUiLayoutHeaderContainerItemProps {
    captionDimmerInfo?: string;
    layout?: BoxLayout;
    srcColorPreviewBitmap?: string;
    tintColorPreviewBitmap?: string;
    visibleColorPreviewBitmap?: boolean;
    visibleDimmerInfo?: boolean;
}

export const BackgroundColorUiLayoutHeaderContainerItem = ({ captionDimmerInfo, layout, srcColorPreviewBitmap, tintColorPreviewBitmap, visibleColorPreviewBitmap, visibleDimmerInfo }: BackgroundColorUiLayoutHeaderContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header_container"
            layout={{ width: 270, height: 29, flexShrink: 0, ...layout }}
        >
            {(visibleDimmerInfo ?? true) && (
                <Region
                    name="dimmer_info"
                    layout={{ position: 'absolute', left: 4, width: 218, top: 0, height: 31, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDimmerInfo ?? t('widget.backgroundcolor.info')}
                        textStyle="text-style-u-small"
                        textOptions={{ wordWrap: true, wordWrapWidth: 218 }}
                    />
                </Region>
            )}
            <Border
                variant="100"
                layout={{ position: 'absolute', left: 239, width: 30, top: 2, height: 28 }}
            >
                {(visibleColorPreviewBitmap ?? true) && (
                    <ThemeImage
                        name="color_preview_bitmap"
                        src={srcColorPreviewBitmap}
                        tint={tintColorPreviewBitmap}
                        layout={{ position: 'absolute', left: 1, width: 28, top: 1, height: 26 }}
                    />
                )}
            </Border>
        </Region>
    );
};
