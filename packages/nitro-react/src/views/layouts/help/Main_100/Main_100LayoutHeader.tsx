import { Border, BoxLayout, Region, Shape, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { Main_100LayoutCutout, Main_100LayoutCutoutProps } from './Main_100LayoutCutout';
import { Main_100LayoutInformation, Main_100LayoutInformationProps } from './Main_100LayoutInformation';
import { Main_100LayoutInformation2, Main_100LayoutInformation2Props } from './Main_100LayoutInformation2';
import { Main_100LayoutPointsIndicatorContainer, Main_100LayoutPointsIndicatorContainerProps } from './Main_100LayoutPointsIndicatorContainer';
import { Main_100LayoutPrizeContent, Main_100LayoutPrizeContentProps } from './Main_100LayoutPrizeContent';

/** Named region `header` of Main_100Layout - configured through the parent's `header` prop. */
export interface Main_100LayoutHeaderProps {
    captionNextUnclaimedCount?: string;
    captionPreviousUnclaimedCount?: string;
    cutout?: Main_100LayoutCutoutProps;
    information?: Main_100LayoutInformationProps;
    information2?: Main_100LayoutInformation2Props;
    layout?: BoxLayout;
    onNextBtn?: () => void;
    onPreviousBtn?: () => void;
    pointsIndicatorContainer?: Main_100LayoutPointsIndicatorContainerProps;
    prizeContent?: Main_100LayoutPrizeContentProps;
    recolorDark?: string;
    recolorLight?: string;
    visibleNextUnclaimedIndicator?: boolean;
    visiblePreviousUnclaimedIndicator?: boolean;
}

export const Main_100LayoutHeader = ({ captionNextUnclaimedCount, captionPreviousUnclaimedCount, cutout, information, information2, layout, onNextBtn, onPreviousBtn, pointsIndicatorContainer, prizeContent, recolorDark, recolorLight, visibleNextUnclaimedIndicator, visiblePreviousUnclaimedIndicator }: Main_100LayoutHeaderProps) => {
    return (
        <Region
            name="header"
            layout={{ position: 'absolute', left: 0, right: 12, top: 0, height: 243, ...layout }}
        >
            <Main_100LayoutCutout {...cutout} />
            <Border
                variant="15"
                name="rewards"
                tintColor={recolorLight ?? '#ddebf9'}
                layout={{ position: 'absolute', left: 232, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    src={layoutImage('reward_track_prizes_background.png')}
                    tint={recolorDark ?? '#3576b9'}
                    layout={{ position: 'absolute', left: 2, right: 2, top: -2, height: 243 }}
                />
                <Region layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }} />
                <ThemeImage
                    src={layoutImage('reward_track_prizes_background_stars.png')}
                    layout={{ position: 'absolute', left: 1, right: 1, top: 0, height: 243 }}
                />
                <Region
                    name="track"
                    layout={{ position: 'absolute', left: 165, right: 22, top: 2, bottom: 2 }}
                >
                    <Region
                        name="loading_bar"
                        layout={{ position: 'absolute', left: 29, right: 29, top: 92, height: 13 }}
                    >
                        <Shape
                            name="bg"
                            shape="round_rectangle"
                            color="#888888"
                            strokeThickness={1}
                            radius={6}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        />
                        <Region
                            name="progress"
                            layout={{ position: 'absolute', left: 0, width: 300, top: 0, bottom: 0 }}
                        >
                            <Region
                                name="loading_bar"
                                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                            >
                                <Shape
                                    name="shape"
                                    shape="round_rectangle"
                                    color="#71af24"
                                    strokeThickness={1}
                                    radius={6}
                                    layout={{ position: 'absolute', left: 0, right: -4, top: 0, bottom: 0 }}
                                />
                            </Region>
                            <Region
                                blendMode="add"
                                layout={{ position: 'absolute', left: 1, right: 0, top: 1, bottom: 1 }}
                            />
                        </Region>
                    </Region>
                </Region>
                <Main_100LayoutPointsIndicatorContainer {...pointsIndicatorContainer} />
                <Main_100LayoutPrizeContent {...prizeContent} />
                <Border
                    variant="15"
                    name="free_tier_cont"
                    tintColor="#f9efe0"
                    blend={0.5}
                    layout={{ position: 'absolute', left: 96, width: 700, top: 6, height: 80 }}
                >
                    <Main_100LayoutInformation {...information} />
                </Border>
                <Border
                    variant="15"
                    name="premium_tier_cont"
                    tintColor="#f1def7"
                    blend={0.5}
                    layout={{ position: 'absolute', left: 96, width: 700, top: 115, height: 80 }}
                >
                    <Main_100LayoutInformation2 {...information2} />
                    <ThemeImage
                        src={layoutImage('reward_track_premium_track.png')}
                        layout={{ position: 'absolute', left: 24, width: 58, top: 4, height: 45 }}
                    />
                </Border>
                <Region
                    name="previous_btn"
                    dynamicStyle="button"
                    onPointerTap={onPreviousBtn}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 54, width: 33, top: 84, height: 34 }}
                >
                    <ThemeImage
                        src={layoutImage('icons_back.png')}
                        layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 34 }}
                    />
                </Region>
                <Region
                    name="next_btn"
                    dynamicStyle="button"
                    onPointerTap={onNextBtn}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 805, width: 33, top: 84, height: 34 }}
                >
                    <ThemeImage
                        src={layoutImage('icons_forward.png')}
                        layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 34 }}
                    />
                </Region>
                {(visiblePreviousUnclaimedIndicator ?? false) && (
                    <Border
                        variant="7"
                        name="previous_unclaimed_indicator"
                        tintColor="#ee2924"
                        layout={{ position: 'absolute', right: 756, width: 17, top: 77, height: 18 }}
                    >
                        <ThemeText
                            text={captionPreviousUnclaimedCount ?? '2'}
                            textStyle="text-style-il-regular-white"
                            name="previous_unclaimed_count"
                            layout={{ position: 'absolute', left: 3, top: 0, height: 16 }}
                        />
                    </Border>
                )}
                {(visibleNextUnclaimedIndicator ?? false) && (
                    <Border
                        variant="7"
                        name="next_unclaimed_indicator"
                        tintColor="#ee2924"
                        layout={{ position: 'absolute', right: 3, width: 17, top: 77, height: 18 }}
                    >
                        <ThemeText
                            text={captionNextUnclaimedCount ?? '2'}
                            textStyle="text-style-il-regular-white"
                            name="next_unclaimed_count"
                            layout={{ position: 'absolute', left: 3, top: 0, height: 16 }}
                        />
                    </Border>
                )}
            </Border>
        </Region>
    );
};
