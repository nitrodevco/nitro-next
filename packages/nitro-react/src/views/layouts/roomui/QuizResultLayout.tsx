import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `966_quiz_result_xml` (layout "quiz_result", 200x65) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface QuizResultLayoutProps {
    captionLblDislikeCount?: string;
    captionLblLikeCount?: string;
    captionQuizTopic?: string;
    layout?: BoxLayout;
}

export const QuizResultLayout = ({ captionLblDislikeCount, captionLblLikeCount, captionQuizTopic, layout }: QuizResultLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 200, height: 65, ...layout }}>
            <Region
                params={147456}
                layout={{ position: 'absolute', left: -1, width: 200, top: 0, height: 63 }}
            >
                <Border
                    variant="2"
                    name="window_bg"
                    params={4341776}
                    tintColor="#000000"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 63 }}
                >
                    <Region
                        params={4341776}
                        layout={{ position: 'absolute', left: 8, width: 192, top: 0, height: 63, maxWidth: 772, flexDirection: 'row', gap: 20 }}
                    >
                        <Region
                            params={131073}
                            dynamicStyle="brightness_and_shadow_under"
                            layout={{ width: 32, height: 32, flexShrink: 0 }}
                        >
                            <Border
                                variant="2"
                                params={16}
                                tintColor="#b32e22"
                                layout={{ position: 'absolute', left: 0, width: 32, top: 0, height: 32 }}
                            />
                            <Region
                                name="lbl_dislike_count"
                                params={933904}
                                layout={{ position: 'absolute', left: 9, width: 12, top: 7, height: 19, maxWidth: 130, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionLblDislikeCount ?? '0'}
                                    textStyle="text-style-u-headline-small"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                        </Region>
                        <Region
                            name="quiz_topic"
                            params={5131472}
                            layout={{ width: 80, height: 30, flexShrink: 0, minWidth: 10, maxWidth: 660, maxHeight: 58, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionQuizTopic ?? 'topic'}
                                textStyle="text-style-ubuntu-condensed-regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: 80 }}
                            />
                        </Region>
                        <Region
                            params={131073}
                            dynamicStyle="brightness_and_shadow_under"
                            layout={{ width: 40, height: 34, flexShrink: 0 }}
                        >
                            <Border
                                variant="2"
                                params={16}
                                tintColor="#117843"
                                layout={{ position: 'absolute', left: 0, width: 32, top: 0, height: 32 }}
                            />
                            <Region
                                name="lbl_like_count"
                                params={933904}
                                layout={{ position: 'absolute', left: 9, width: 12, top: 7, height: 19, maxWidth: 130, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionLblLikeCount ?? '0'}
                                    textStyle="text-style-u-headline-small"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                        </Region>
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
