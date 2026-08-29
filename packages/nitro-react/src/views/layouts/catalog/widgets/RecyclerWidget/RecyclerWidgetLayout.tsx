import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Button, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { RecyclerWidgetLayoutNormal, RecyclerWidgetLayoutNormalProps } from './RecyclerWidgetLayoutNormal';

/** Generated from `1583_recyclerWidget_xml` (layout "recyclerWidget", 360x208) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RecyclerWidgetLayoutProps {
    layout?: BoxLayout;
    normal?: RecyclerWidgetLayoutNormalProps;
    onPatFrankBtn?: () => void;
    srcEmoji1?: string;
    srcEmoji2Template?: string;
    visibleDisabledBorder?: boolean;
}

export const RecyclerWidgetLayout = ({ layout, normal, onPatFrankBtn, srcEmoji1, srcEmoji2Template, visibleDisabledBorder }: RecyclerWidgetLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 208, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <RecyclerWidgetLayoutNormal {...normal} />
                {(visibleDisabledBorder ?? false) && (
                    <Border
                        variant="3"
                        name="disabled_border"
                        tintColor="#888888"
                        blend={0.7}
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                        <ThemeImage
                            src={layoutImage('image_frank_dont_know.png')}
                            layout={{ position: 'absolute', left: 235, width: 118, bottom: -67, height: 176 }}
                        />
                        <Bubble
                            variant="7"
                            pointer="right"
                            layout={{ position: 'absolute', left: 107, width: 155, bottom: 29, height: 81 }}
                        >
                            <Region layout={{ position: 'absolute', left: 4, width: 107, top: 4, minWidth: 107, maxWidth: 107, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <ThemeText
                                    text={t('recycler.broken')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 107 }}
                                />
                            </Region>
                            <ThemeImage
                                name="emoji_1"
                                src={srcEmoji1 ?? layoutImage('franks_emotions_sad.png')}
                                layout={{ position: 'absolute', left: 115, width: 20, top: 5, height: 20 }}
                            />
                        </Bubble>
                        <Button
                            variant="3"
                            name="pat_frank_btn"
                            onPointerTap={onPatFrankBtn}
                            textStyle="text-style-button-shiny-regular"
                            layout={{ position: 'absolute', right: 10, width: 115, top: 11, height: 30 }}
                        >
                            {t('recycler.pat_frank')}
                        </Button>
                        <ThemeImage
                            name="emoji_2_template"
                            src={srcEmoji2Template ?? layoutImage('franks_emotions_heart.png')}
                            layout={{ position: 'absolute', left: 32, width: 40, bottom: -42, height: 40 }}
                        />
                    </Border>
                )}
            </Region>
        </Region>
    );
};
