import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3112_avatar_editor_effect_griditem_xml` (layout "avatar_editor_effect_griditem", 50x50) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatarEditorEffectGriditemLayoutProps {
    captionEffectAmount?: string;
    layout?: BoxLayout;
    srcBitmap?: string;
    srcProgressBar?: string;
    tintBitmap?: string;
    tintProgressBar?: string;
    visibleDurationContainer?: boolean;
}

export const AvatarEditorEffectGriditemLayout = ({ captionEffectAmount, layout, srcBitmap, srcProgressBar, tintBitmap, tintProgressBar, visibleDurationContainer }: AvatarEditorEffectGriditemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 50, height: 50, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}>
                {/* `static_bitmap` is hidden and has no name to show it by */}
                <ThemeImage
                    name="bitmap"
                    src={srcBitmap}
                    tint={tintBitmap}
                    layout={{ position: 'absolute', width: 40, alignSelf: 'center', height: 40, maxWidth: 50, maxHeight: 50 }}
                />
                <Region
                    name="effect_amount_bg1"
                    backgroundColor="#dddddd"
                    layout={{ position: 'absolute', left: 30, width: 18, top: 2, height: 14 }}
                >
                    <Region
                        name="effect_amount_bg2"
                        backgroundColor="#666666"
                        layout={{ position: 'absolute', left: 1, width: 16, top: 1, height: 12 }}
                    >
                        <ThemeText
                            text={captionEffectAmount ?? '99'}
                            textOptions={{ fill: '#eeeeee' }}
                            name="effect_amount"
                            layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 13 }}
                        />
                    </Region>
                </Region>
                {(visibleDurationContainer ?? false) && (
                    <Region
                        name="duration_container"
                        backgroundColor="#dddddd"
                        layout={{ position: 'absolute', left: 4, width: 42, top: 41, height: 5 }}
                    >
                        <ThemeImage
                            name="progress_bar"
                            src={srcProgressBar}
                            tint={tintProgressBar}
                            layout={{ position: 'absolute', left: 1, width: 40, top: 1, height: 3 }}
                        />
                    </Region>
                )}
            </Region>
        </Region>
    );
};
