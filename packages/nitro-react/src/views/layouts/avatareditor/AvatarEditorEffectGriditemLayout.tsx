import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `3112_avatar_editor_effect_griditem_xml` (layout "avatar_editor_effect_griditem", 50x50) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatarEditorEffectGriditemLayoutProps {
    durationContainer?: AvatarEditorEffectGriditemLayoutDurationContainerProps;
    effectAmountBg1?: AvatarEditorEffectGriditemLayoutEffectAmountBg1Props;
    layout?: BoxLayout;
    srcBitmap?: string;
}

export const AvatarEditorEffectGriditemLayout = ({ durationContainer, effectAmountBg1, layout, srcBitmap }: AvatarEditorEffectGriditemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 50, height: 50, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50, justifyContent: 'center' }}>
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                >
                    <ThemeImage
                        src={layoutImage('avatar_editor_parts_hilite.png')}
                        layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                    />
                </Region>
                <ThemeImage
                    name="bitmap"
                    src={srcBitmap}
                    layout={{ position: 'absolute', width: 40, alignSelf: 'center', height: 40, maxWidth: 50, maxHeight: 50 }}
                />
                <AvatarEditorEffectGriditemLayoutEffectAmountBg1 {...effectAmountBg1} />
                <AvatarEditorEffectGriditemLayoutDurationContainer {...durationContainer} />
            </Region>
        </Region>
    );
};

/** Named region `effect_amount_bg2` of AvatarEditorEffectGriditemLayout - configured through the parent's `effectAmountBg2` prop. */
export interface AvatarEditorEffectGriditemLayoutEffectAmountBg2Props {
    captionEffectAmount?: string;
    layout?: BoxLayout;
}

export const AvatarEditorEffectGriditemLayoutEffectAmountBg2 = ({ captionEffectAmount, layout }: AvatarEditorEffectGriditemLayoutEffectAmountBg2Props) => {
    return (
        <Region
            name="effect_amount_bg2"
            backgroundColor="#666666"
            layout={{ position: 'absolute', left: 1, width: 16, top: 1, height: 12, ...layout }}
        >
            <Region
                name="effect_amount"
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionEffectAmount ?? '99'}
                    textOptions={{ fill: '#eeeeee' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `effect_amount_bg1` of AvatarEditorEffectGriditemLayout - configured through the parent's `effectAmountBg1` prop. */
export interface AvatarEditorEffectGriditemLayoutEffectAmountBg1Props {
    effectAmountBg2?: AvatarEditorEffectGriditemLayoutEffectAmountBg2Props;
    layout?: BoxLayout;
}

export const AvatarEditorEffectGriditemLayoutEffectAmountBg1 = ({ effectAmountBg2, layout }: AvatarEditorEffectGriditemLayoutEffectAmountBg1Props) => {
    return (
        <Region
            name="effect_amount_bg1"
            backgroundColor="#dddddd"
            layout={{ position: 'absolute', left: 30, width: 18, top: 2, height: 14, ...layout }}
        >
            <AvatarEditorEffectGriditemLayoutEffectAmountBg2 {...effectAmountBg2} />
        </Region>
    );
};

/** Named region `duration_container` of AvatarEditorEffectGriditemLayout - configured through the parent's `durationContainer` prop. */
export interface AvatarEditorEffectGriditemLayoutDurationContainerProps {
    layout?: BoxLayout;
    srcProgressBar?: string;
    visibleDurationContainer?: boolean;
}

export const AvatarEditorEffectGriditemLayoutDurationContainer = ({ layout, srcProgressBar, visibleDurationContainer }: AvatarEditorEffectGriditemLayoutDurationContainerProps) => {
    return (
        <Region
            name="duration_container"
            visible={visibleDurationContainer ?? false}
            backgroundColor="#dddddd"
            layout={{ position: 'absolute', left: 4, width: 42, top: 41, height: 5, ...layout }}
        >
            <ThemeImage
                name="progress_bar"
                src={srcProgressBar}
                layout={{ position: 'absolute', left: 1, width: 40, top: 1, height: 3 }}
            />
        </Region>
    );
};
